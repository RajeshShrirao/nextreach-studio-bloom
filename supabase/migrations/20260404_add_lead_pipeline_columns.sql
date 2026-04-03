-- Add missing columns to leads table for full pipeline support
ALTER TABLE leads ADD COLUMN IF NOT EXISTS follow_up_at timestamptz;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS email_2_sent_at timestamptz;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS email_3_sent_at timestamptz;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS enrichment_complete boolean DEFAULT false;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS demo_link_sent boolean DEFAULT false;

-- Update CHECK constraint to include all statuses used by application
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_status_check
  CHECK (status IN (
    'new', 'enriching', 'researched', 'demo_built',
    'email_sent', 'email_2_sent', 'email_3_sent',
    'replied', 'call_booked', 'won', 'lost', 'nurture'
  ));
