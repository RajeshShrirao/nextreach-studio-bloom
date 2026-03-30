# Admin Dashboard

This admin dashboard allows you to manage leads for pet grooming salons and vet clinics. All data is persisted server-side in a JSON file and accessed via REST API endpoints.

## Access

The admin dashboard is accessible via:
**URL:** `/admin`

**Password:** `nextreach2026`

Authentication is maintained via a session cookie (7-day expiry).

## Features

### 📊 Overview Dashboard
- Total leads counter
- Pipeline breakdown: Not Contacted, In Pipeline, Clients, Nurture
- Real-time conversion funnel visualization
- Filter leads by pipeline status

### 📝 Lead Management
- Add new leads with full contact details
- View and expand lead rows for complete information
- Search and filter leads by status
- Update lead status through pipeline workflow
- Delete leads with confirmation
- Link to demo URLs and tracking links

### 📈 Analytics
- Aggregated statistics via `/api/leads/stats` endpoint
- Visual conversion funnel showing pipeline stages
- Status counts and funnel visualization

## Lead Pipeline Workflow

Each lead progresses through the following status workflow:

1. **not-contacted** - New lead, hasn't been reached out to
2. **demo-built** - Custom AI demo has been created for the lead
3. **email-1-sent** - First follow-up email sent
4. **email-2-sent** - Second follow-up email sent
5. **email-3-sent** - Third follow-up email sent
6. **clicked-demo** - Lead clicked on demo link
7. **replied** - Lead responded to outreach
8. **call-scheduled** - Sales call scheduled
9. **client** - Converted to paying customer
10. **not-interested** - Lead declined or lost
11. **nurture** - Lead to be followed up later

## Data Storage

- Leads are stored in `data/leads.json`
- Server-side REST API handles CRUD operations (`/api/leads`, `/api/leads/[id]/route.ts`, `/api/leads/stats/route.ts`)
- Data persistence utilities in `src/lib/leads.ts`
- JSON file is auto-created if missing

**Note:** On Vercel, the `data/` directory is ephemeral between builds. Consider migrating to a database for production persistence.

## API Endpoints

### `GET /api/leads`
List all leads with optional status filter:
```
GET /api/leads             # All leads
GET /api/leads?status=demo-built  # Filter by status
```

### `POST /api/leads`
Create a new lead:
```json
{
  "businessName": "Paw Spa",
  "ownerName": "Jane Smith",
  "email": "jane@pawspa.com",
  "phone": "555-1234",
  "city": "Austin",
  "website": "https://pawspa.com",
  "instagram": "@pawspa",
  "bookingSystem": "Groombook",
  "notes": "Interested in AI receptionist"
}
```

### `GET /api/leads/[id]`
Get a single lead by ID

### `PATCH /api/leads/[id]`
Update lead (typically status):
```json
{ "status": "client" }
```

### `DELETE /api/leads/[id]`
Delete a lead

### `GET /api/leads/stats`
Aggregate statistics:
```json
{
  "total": 42,
  "notContacted": 8,
  "inPipeline": 15,
  "clients": 5,
  "nurture": 4,
  "notInterested": 10,
  "byStatus": { "not-contacted": 8, "client": 5, ... }
}
```

## Lead Data Model

```typescript
interface Lead {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone?: string;
  city?: string;
  website?: string;
  instagram?: string;
  googleReviews?: { rating: number; count: number };
  bookingSystem?: string;
  status: string;
  demoUrl?: string;
  trackingLink?: string;
  plan?: "starter" | "business";
  paymentStatus?: "pending" | "partial" | "paid";
  notes?: string;
  createdAt: string;
  updatedAt: string;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
}
```

## Customization

### Change Admin Password
Update the password string in `/src/app/admin/page.tsx` (lines ~97 and ~432):
```typescript
if (password === "your-new-password") {
  // ...
}
```

### Modify Pipeline Statuses
Edit the `STATUSES` array and `STATUS_COLORS` object in `/src/app/admin/page.tsx` (lines ~44-70).

## Security Notes

- Password protection via cookie-based authentication
- Admin endpoint is not discoverable through site navigation
- Data is stored server-side (not in browser localStorage)
- Consider HTTPS for production deployments

## Usage Instructions

1. Navigate to `/admin`
2. Enter the admin password (`nextreach2026`)
3. Use the dashboard:
   - **Add Lead**: Click "+ Add Lead" to manually add leads
   - **View Leads**: Click rows to expand and see full details
   - **Update Status**: Use the status dropdown to advance leads in pipeline
   - **Filter**: Use the status filter to view specific pipeline stages
   - **Delete**: Click "Delete" to remove a lead (requires confirmation)

## Technical Details

- **Framework**: Next.js 15 App Router
- **Authentication**: Cookie-based (7-day session)
- **Data Layer**: JSON file storage via `src/lib/leads.ts`
- **REST API**: Next.js API routes (`src/app/api/leads/`)
- **Styling**: Glassmorphism design system with Tailwind CSS
- **Responsive**: Works on desktop and mobile devices

## Troubleshooting

**Can't access admin dashboard:**
- Verify URL is `/admin`
- Check password matches the one set in `/src/app/admin/page.tsx`
- Clear browser cookies and try again

**Leads not showing:**
- Check server console for data file errors
- Verify `data/leads.json` exists and is valid JSON
- On Vercel, data may reset between builds

**API errors:**
- Verify `/api/leads/` route exists in `src/app/api/leads/route.ts`
- Check server logs for file system errors
