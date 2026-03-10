export interface DocPage {
  slug: string;
  title: string;
  description: string;
  section: string;
  readTime: string;
  updated: string;
  toc: string[];
  body: string[];
  steps?: string[];
  keyPoints?: string[];
  codeBlock?: string;
  related: string[];
}

export interface DocSection {
  title: string;
  slug: string;
  items: DocPage[];
}

export const docsSections: DocSection[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    items: [
      {
        slug: "quickstart",
        title: "Quickstart",
        description: "Connect Pulseboard, send your first events, and share one dashboard with the team.",
        section: "Getting Started",
        readTime: "6 min read",
        updated: "March 2026",
        toc: ["What Pulseboard does", "Before you begin", "Setup checklist", "Expected result"],
        body: [
          "Pulseboard is a product analytics SaaS for product-led teams. It tracks activation, weekly retention, churn signals, and workspace-level product health across web apps and internal tools.",
          "This guide will walk you through connecting your app and getting your first dashboard up and running in under 10 minutes.",
          "By the end of this guide, you'll have a functioning workspace with event tracking, an activation dashboard, and a shared view your team can access."
        ],
        steps: [
          "Create a new workspace and add your production URL",
          "Install the browser snippet or React SDK in your app",
          "Track three baseline events: user_signed_up, workspace_created, feature_activated",
          "Invite at least one teammate and pin the default dashboard"
        ],
        keyPoints: [
          "You don't need a data warehouse to get value - start with 3-5 clean events",
          "Focus on activation first: when do users reach their first value?",
          "One clean event taxonomy is better than 50 noisy events"
        ],
        related: ["installing", "dashboards", "events"]
      },
      {
        slug: "installing",
        title: "Install the SDK",
        description: "Add Pulseboard to your app with the browser snippet or React SDK.",
        section: "Getting Started",
        readTime: "5 min read",
        updated: "March 2026",
        toc: ["Choose your install method", "Browser snippet", "React SDK", "Verify installation"],
        body: [
          "Pulseboard supports two installation methods: a lightweight browser snippet for any framework, and a React SDK with TypeScript support for React applications.",
          "Choose the method that best fits your tech stack."
        ],
        steps: [
          "Copy your workspace public key from Settings → API Keys",
          "Add the tracking code to your app",
          "Send a test event and verify it appears in Live Stream",
          "Deploy to production"
        ],
        codeBlock: `<script>
  window.pulseboard = window.pulseboard || [];
  window.pulseboard.push(["init", { workspaceKey: "pk_live_xxxxx" }]);
  window.pulseboard.push(["track", "user_signed_up", { plan: "starter" }]);
</script>`,
        related: ["quickstart", "api-keys", "events"]
      }
    ]
  },
  {
    title: "Core Concepts",
    slug: "core-concepts",
    items: [
      {
        slug: "events",
        title: "Events API",
        description: "Learn about the events you can track and how to structure them.",
        section: "Core Concepts",
        readTime: "8 min read",
        updated: "March 2026",
        toc: ["Event structure", "Reserved events", "Custom events", "Property types"],
        body: [
          "Events are the foundation of Pulseboard. Every action a user takes in your product becomes an event that gets tracked and analyzed.",
          "Understanding how to structure your events is crucial for building meaningful dashboards and getting actionable insights."
        ],
        codeBlock: `// Track a user signing up
pulseboard.track("user_signed_up", {
  user_id: "usr_123",
  email: "john@example.com",
  signup_source: "organic",
  plan: "starter"
});`,
        keyPoints: [
          "Use reserved events for common actions like signups and logins",
          "Add relevant properties to events for better segmentation",
          "Keep event names consistent and descriptive"
        ],
        related: ["installing", "dashboards", "user-identity"]
      },
      {
        slug: "dashboards",
        title: "Dashboards",
        description: "Build and customize dashboards to visualize your product metrics.",
        section: "Core Concepts",
        readTime: "7 min read",
        updated: "March 2026",
        toc: ["Dashboard types", "Creating dashboards", "Adding charts", "Sharing views"],
        body: [
          "Dashboards are where your team gains insights into product usage, user behavior, and business health.",
          "Pulseboard provides pre-built dashboards for common metrics, but you can fully customize them or create new ones from scratch."
        ],
        steps: [
          "Navigate to Dashboards and click Create New",
          "Choose a template or start blank",
          "Add charts by selecting metrics and dimensions",
          "Save and share with your team"
        ],
        related: ["events", "segments", "alerts"]
      },
      {
        slug: "segments",
        title: "Segments",
        description: "Create user segments to analyze specific groups of users.",
        section: "Core Concepts",
        readTime: "5 min read",
        updated: "March 2026",
        toc: ["What are segments", "Creating segments", "Using segments", "Dynamic vs static"],
        body: [
          "Segments let you filter and analyze specific groups of users based on their behavior, attributes, or account properties.",
          "Use segments to understand how different user groups behave and identify opportunities for improvement."
        ],
        related: ["events", "dashboards", "user-identity"]
      }
    ]
  },
  {
    title: "Product Guides",
    slug: "product-guides",
    items: [
      {
        slug: "churn-alerts",
        title: "Configure Churn Alerts",
        description: "Set up alerts to detect and prevent customer churn.",
        section: "Product Guides",
        readTime: "6 min read",
        updated: "March 2026",
        toc: ["When to use alerts", "Alert types", "Destinations", "Best practices"],
        body: [
          "Churn alerts monitor key metrics and notify your team when patterns suggest a customer is at risk of churning.",
          "Proactive alerting helps your team intervene at the right moment to save relationships."
        ],
        steps: [
          "Choose the metric to monitor (e.g., weekly retention drop)",
          "Set threshold values that trigger alerts",
          "Select notification destinations (Slack, email, webhook)",
          "Configure cooldown periods to prevent alert fatigue"
        ],
        codeBlock: `{
  "alert_type": "retention_drop",
  "workspace_id": "ws_2048",
  "threshold_percent": 15,
  "cooldown_hours": 24
}`,
        related: ["dashboards", "webhooks", "api-keys"]
      },
      {
        slug: "cohort-analysis",
        title: "Cohort Analysis",
        description: "Understand user behavior patterns over time with cohort analysis.",
        section: "Product Guides",
        readTime: "8 min read",
        updated: "March 2026",
        toc: ["Understanding cohorts", "Creating cohorts", "Analyzing retention", "Exporting data"],
        body: [
          "Cohort analysis groups users by signup date or other criteria to track how behavior changes over time.",
          "This is essential for understanding if your product improvements are actually working."
        ],
        related: ["dashboards", "segments", "events"]
      }
    ]
  },
  {
    title: "Reference",
    slug: "reference",
    items: [
      {
        slug: "api-keys",
        title: "API Keys",
        description: "Create, manage, and rotate API keys for secure access.",
        section: "Reference",
        readTime: "4 min read",
        updated: "March 2026",
        toc: ["Key types", "Creating keys", "Rotation policy", "Security best practices"],
        body: [
          "API keys authenticate requests to the Pulseboard API. Each key has specific permissions and can be scoped to different access levels.",
          "Always follow security best practices when handling API keys."
        ],
        steps: [
          "Create separate keys for staging and production",
          "Name keys descriptively after their use case",
          "Rotate keys periodically and after any exposure",
          "Review audit logs regularly"
        ],
        keyPoints: [
          "Browser keys (pk_) are safe for client-side use",
          "Server keys (sk_) should never be exposed in client code",
          "Rotate keys immediately if exposed"
        ],
        related: ["installing", "webhooks", "rest-api"]
      },
      {
        slug: "webhooks",
        title: "Webhooks",
        description: "Receive real-time events in your own systems via webhooks.",
        section: "Reference",
        readTime: "5 min read",
        updated: "March 2026",
        toc: ["Available events", "Signature verification", "Retry policy", "Troubleshooting"],
        body: [
          "Webhooks let Pulseboard push events to your servers in real-time. This enables integrations with your own tools and workflows.",
          "All webhooks include cryptographic signatures for verification."
        ],
        codeBlock: `x-pulseboard-signature: sha256=abc123...
x-pulseboard-event: workspace.churn_risk

{
  "workspace_id": "ws_2048",
  "risk_score": 78,
  "changed_from": 54
}`,
        related: ["churn-alerts", "api-keys", "rest-api"]
      },
      {
        slug: "rest-api",
        title: "REST API",
        description: "Programmatic access to Pulseboard data and functionality.",
        section: "Reference",
        readTime: "10 min read",
        updated: "March 2026",
        toc: ["Authentication", "Endpoints", "Rate limits", "Error handling"],
        body: [
          "The REST API provides programmatic access to workspaces, events, dashboards, and other resources.",
          "Use the API to build custom integrations, automate workflows, or export data."
        ],
        codeBlock: `curl -X GET https://api.pulseboard.io/v1/workspaces \\
  -H "Authorization: Bearer sk_live_xxxxx" \\
  -H "Content-Type: application/json"`,
        related: ["api-keys", "webhooks", "events"]
      },
      {
        slug: "billing",
        title: "Billing & Limits",
        description: "Understand usage limits, billing cycles, and plan details.",
        section: "Reference",
        readTime: "4 min read",
        updated: "March 2026",
        toc: ["Usage tracking", "Plan tiers", "Overage handling", "Invoices"],
        body: [
          "Pulseboard bills based on monthly tracked users and workspace seats. Understanding your usage helps avoid surprises.",
          "All paid plans include unlimited historical data retention."
        ],
        keyPoints: [
          "Tracked users are counted once per billing cycle",
          "Plans can be changed anytime from the Billing tab",
          "Invoice PDFs are available for all billing periods",
          "Trial workspaces pause after 14 days of inactivity"
        ],
        related: ["api-keys", "workspaces"]
      }
    ]
  }
];

export const allDocs = docsSections.flatMap(section => section.items);

export const docsMap = new Map(allDocs.map(doc => [doc.slug, doc]));

export const docsConfig = {
  title: "Pulseboard Docs",
  description: "Product analytics for product-led teams",
  baseUrl: "/demo/pulseboard"
};
