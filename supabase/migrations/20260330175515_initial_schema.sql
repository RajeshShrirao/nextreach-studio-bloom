-- NextReach Studio — Initial Schema
-- Clients, conversations, leads, offline messages

-- ═══════════════════════════════════════════
-- CLIENTS (production widget configs)
-- Replaces: data/demo-configs/*.json for paying clients
-- ═══════════════════════════════════════════
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL, -- e.g. "paws-and-bubbles"
  business_name text NOT NULL,
  business_type text DEFAULT 'Pet Grooming Salon',
  owner_name text,
  owner_email text,
  owner_phone text,
  website text,
  instagram text,
  location text,
  hours text,
  timezone text DEFAULT 'America/New_York',
  
  -- Widget config
  greeting text,
  escalation text DEFAULT 'Let me have the team get back to you on that.',
  theme jsonb DEFAULT '{"primary_color": "#f59e0b"}'::jsonb,
  
  -- Services & FAQ (structured data)
  services jsonb DEFAULT '[]'::jsonb,
  faq jsonb DEFAULT '[]'::jsonb,
  
  -- System prompt (built server-side, never exposed to client widget)
  system_prompt text,
  
  -- Plan & billing
  plan text NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'business')),
  monthly_price numeric DEFAULT 49.00,
  setup_price numeric DEFAULT 299.00,
  message_limit integer DEFAULT 1000, -- 1000 starter, 3000 business
  messages_used_this_month integer DEFAULT 0,
  
  -- Status
  status text NOT NULL DEFAULT 'demo' CHECK (status IN ('demo', 'active', 'paused', 'cancelled')),
  activated_at timestamptz,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ═══════════════════════════════════════════
-- CONVERSATIONS (chat logs per session)
-- Analytics, dispute resolution, training data
-- ═══════════════════════════════════════════
CREATE TABLE conversations (
  id bigserial PRIMARY KEY,
  client_slug text NOT NULL REFERENCES clients(slug) ON DELETE CASCADE,
  session_id text NOT NULL, -- browser session, unique per visitor
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  visitor_name text,
  visitor_email text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_conversations_client ON conversations(client_slug);
CREATE INDEX idx_conversations_session ON conversations(session_id);
CREATE INDEX idx_conversations_created ON conversations(created_at);

-- ═══════════════════════════════════════════
-- LEADS (our CRM)
-- Replaces: data/leads.json
-- ═══════════════════════════════════════════
CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  owner_name text,
  email text,
  phone text,
  website text,
  instagram text,
  city text,
  state text,
  
  -- Enrichment
  google_rating numeric,
  google_review_count integer,
  booking_system text,
  pain_point text,
  
  -- Pipeline
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'researched', 'demo_built', 'email_sent', 'replied', 'call_booked', 'won', 'lost')),
  plan_interest text,
  demo_slug text, -- links to clients.slug if they become a client
  tracked_link text, -- short.io link
  
  -- Outreach tracking
  email_sent_at timestamptz,
  last_reply_at timestamptz,
  demo_clicked_at timestamptz,
  notes text,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_leads_status ON leads(status);

-- ═══════════════════════════════════════════
-- OFFLINE MESSAGES (after-hours captures)
-- Widget collects name/email/message when business is closed
-- ═══════════════════════════════════════════
CREATE TABLE offline_messages (
  id bigserial PRIMARY KEY,
  client_slug text NOT NULL REFERENCES clients(slug) ON DELETE CASCADE,
  visitor_name text,
  visitor_email text NOT NULL,
  message text NOT NULL,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_offline_client ON offline_messages(client_slug);
CREATE INDEX idx_offline_unresolved ON offline_messages(resolved) WHERE resolved = false;

-- ═══════════════════════════════════════════
-- TRIGGER: auto-update updated_at
-- ═══════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ═══════════════════════════════════════════
-- SEED: bark-and-bark demo (our existing demo)
-- ═══════════════════════════════════════════
INSERT INTO clients (
  slug, business_name, business_type, greeting, hours, location, owner_phone,
  services, faq, escalation, theme, plan, status
) VALUES (
  'bark-and-bark',
  'Bark & Bark Grooming',
  'Pet Grooming Salon',
  'Hi there! I''m the virtual receptionist at Bark & Bark. How can I help you and your pup today? 🐾',
  'Mon-Sat 9AM-6PM',
  'Portland, OR',
  '(503) 555-0199',
  '[
    {"name": "Full Groom - Small Dog", "price": "$55", "duration": "1.5 hrs"},
    {"name": "Full Groom - Large Dog", "price": "$85", "duration": "2 hrs"},
    {"name": "Bath & Brush", "price": "$35", "duration": "45 min"},
    {"name": "Nail Trim", "price": "$15", "duration": "15 min"}
  ]'::jsonb,
  '[
    {"q": "Do you groom cats?", "a": "We specialize in dogs only!"},
    {"q": "Do I need an appointment?", "a": "Yes, we work by appointment only. You can request one through this chat!"},
    {"q": "What vaccines do you require?", "a": "We need current rabies and Bordetella vaccination records."}
  ]'::jsonb,
  'Great question! Let me have the team get back to you on that.',
  '{"primary_color": "#f59e0b"}'::jsonb,
  'starter',
  'demo'
);
