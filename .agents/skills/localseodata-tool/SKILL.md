---
name: localseodata-tool
description: When the user needs live local SEO data including Google Business Profile (GBP) profile health, local 3-pack rankings, geogrid scans, review monitoring, NAP citation audits, or AI search visibility. Trigger on "check GBP," "local rankings," "geogrid scan," "review audit," or "local pack."
metadata:
  version: 1.0.0
  author: Garrett Smith (Local SEO Skills)
---

# Local SEO Data Tool

Local SEO Data (`localseodata.com`) is the primary data integration for the Local SEO Skills ecosystem. It provides direct access to Google Business Profile data, local 3-pack rankings, geogrid visibility, review sentiment, and citation audits.

## Core Endpoints

| Need | Endpoint | Notes |
|------|----------|-------|
| GBP profile details | `business_profile` | Pulls categories, address, hours, attributes |
| GBP health score | `profile_health` | Checks profile completeness & ranking gaps |
| Google 3-pack check | `local_pack` | Live snapshot of top 3 local businesses |
| Geogrid rankings | `geogrid_scan` | Maps rankings across geographic grid |
| Google reviews | `google_reviews` | Recent reviews, ratings, sentiments |
| Citation audit | `citation_audit` | Checks NAP consistency across 20+ directories |
| Full local audit | `local_audit` | Comprehensive local health assessment |

## Configuration in Antigravity

Add the MCP server to `~/.gemini/config/mcp_config.json`:

```json
{
  "mcpServers": {
    "LocalSEOData": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.localseodata.com/mcp?key=YOUR_API_KEY"
      ]
    }
  }
}
```
