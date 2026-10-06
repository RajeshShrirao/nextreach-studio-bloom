# 16. WhatsApp Campaign Tracking Plan

The campaign landing page is:

```text
https://www.nextreachstudio.in/fast-websites
```

## UTM naming convention

Keep names lowercase and reuse the same pattern in Meta Ads Manager:

```text
utm_source=meta
utm_medium=paid_social
utm_campaign=fast_websites_pune
utm_content=clinic_video_01
```

Example ad URL:

```text
https://www.nextreachstudio.in/fast-websites?utm_source=meta&utm_medium=paid_social&utm_campaign=fast_websites_pune&utm_content=clinic_video_01
```

Use one `utm_content` value per creative. Do not put a person's name, phone number, or WhatsApp message in a UTM parameter.

## Events already wired on the site

| Event | What it means | Useful properties |
|---|---|---|
| `whatsapp_cta_clicked` | Visitor clicked a WhatsApp action | `cta_name`, `cta_location`, `package` |
| `cta_clicked` | Visitor clicked a non-WhatsApp action | `cta_name`, `cta_location`, `package` |
| `lead_form_submitted` | Visitor submitted the recommendation form | `form_name`, `source` |

The form preserves `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and a temporary landing session ID in the Formspree submission. The session ID is for joining events to a form record; it is not a person identifier.

## Primary conversion

For the first campaign, treat `whatsapp_cta_clicked` as the landing-page conversion. In the lead sheet, record the actual downstream stages manually:

```text
WhatsApp conversation started
Qualified
Quote sent
Deposit received
Website launched
```

Because these are direct-to-WhatsApp ads, use Meta Ads Manager's conversation metrics as the ad-side measurement source. No website pixel is required for the primary flow. The website event tracking and form attribution are useful only for people who visit the landing page from other channels or use the fallback recommendation form.

Do not optimize for link clicks when qualified WhatsApp conversations are the actual business outcome.

## Weekly review

Review by `utm_content` and package:

- landing sessions
- WhatsApp CTA clicks
- form submissions
- qualified conversations
- quotes sent
- deposits received
- revenue

Pause a creative only after it has enough delivery to compare meaningfully. A cheap click with no qualified WhatsApp conversation is not a winning creative.
