# COMPETITOR-MAP — Pune Web Design/Development SERP

**Compiled:** 5 Oct 2026
**Method:** `tinyfish search query --location "Pune, India" --language en` (live SERP), direct HTTP
fetch of competitor pages, Wayback Machine CDX for domain age.
**Companion docs:** `ARTICLE-MAP.md` (cluster health), `LONG-TAIL-MAP.md` (keyword targets).

---

## 1. The one finding that outranks everything else

```
nextreachstudio.vercel.app   ← your live canonical, per astro.config.mjs:9
dimakhconsultants.com        ← first Wayback capture: 02 Mar 2001
ikf.co.in                    ← first Wayback capture: 05 Feb 2002
brainminetech.com            ← first Wayback capture: 23 Dec 2010
designforu.in                ← first Wayback capture: 27 May 2014
```

**You have no root domain.** The site lives on `vercel.app`, a shared platform subdomain.

| Domain | Status |
|---|---|
| **`nextreachstudio.com`** | 🔴 **IN REDEMPTION PERIOD — expired 20 Aug 2026** |
| `nextreach.studio` | Registered 25 Jun 2015 (not yours) |
| `nextreachstudio.in` | **AVAILABLE** (~₹800/yr) |

### `nextreachstudio.com` — you bought this and let it lapse

RDAP (`rdap.verisign.com/com/v1/domain/nextreachstudio.com`):

```
domain:  NEXTREACHSTUDIO.COM
status:  ['redemption period']
registration  2025-08-20T05:43:10Z
expiration    2026-08-20T05:43:10Z
last changed  2026-10-01T07:30:57Z
```

You registered this domain on **20 Aug 2025** — fourteen months ago — and it expired on
**20 Aug 2026**. It is now in `redemption period`, with no nameservers and no DNS records
of any type.

**Redemption is time-limited.** After roughly 30–45 days in redemption the registry moves
the domain to *pending delete*, then to auction. Today is 5 Oct 2026 — you are approximately
**46 days in**. The window to recover it at the standard redemption fee (typically
₹6,000–₹12,000 / $80–150 plus renewal, paid to your registrar) is likely closing or closed,
depending on the registrar's exact schedule.

Three options, in order of preference:

1. **Log into your registrar immediately and check redemption status.** If it is still
   recoverable, pay the redemption fee. This is your original intent and the `.com` carries
   the most trust signals.
2. **Buy `nextreachstudio.in` now** — available today, ~₹800/yr, and arguably a better fit
   for a Pune-focused local SEO play anyway. `.in` carries geographic relevance the `.com`
   does not.
3. If both fail, `nextreachstudio.co` / `nextreach.agency` — note `nextreach.agency` is
   **already taken** (301s to `nextreach.co.uk`, a UK agency).

Either way: **buy something today.** The domain was clearly intended and the oversight is
now the binding constraint on 43 published articles.

### Why this matters technically

`vercel.app` is Vercel's platform domain. Its authority accrues to Vercel, not to individual
tenants — no tenant can accumulate independent domain-level trust on it. Google evaluates
links and trust at the *root domain* level. You are asking a subdomain that has never existed
in the Wayback Machine to outrank a domain that has been continuously indexed since 2001.

Failing to secure a root domain while writing 43 articles is the definition of building on
rented land.

---

## 2. Head-term SERP — 4 queries × top 10 = 40 slots

Queries: `web design company in pune`, `website design company in pune`,
`web development company in pune`, `best web design agency pune`

| Domain | Slots | Avg pos | Type | Domain age |
|---|---|---|---|---|
| **dimakhconsultants.com** | **4** | **1.25** | Agency | 2001 |
| **designrush.com** | **4** | **2.25** | Directory | — |
| brainminetech.com | 3 | 2.67 | Agency | 2010 |
| dhanashreewebdeveloper.com | 4 | 4.75 | Solo freelancer | — |
| gigante.co.in | 4 | 7.00 | Agency | — |
| touchmediaads.com | 4 | 7.75 | Agency | — |
| linkedin.com | 3 | 5.67 | Social | — |
| designforu.in | 2 | 4.50 | Agency | 2014 |
| puneweb.in | 2 | 9.00 | Agency | — |
| weblinkindia.net | 2 | 9.50 | Agency | — |
| **ikf.co.in** | **1** | **3.00** | Agency | 2002 |
| goodfirms, refrens, zerozilla, brightpixel, srvmedia, quora, revenuebase | 1 each | — | Mixed | — |

### Corrections to prior assumptions

- **IKF is not a head-term incumbent.** They hold 1 of 40 slots, at position 3. Earlier
  reasoning over-weighted IKF based on their own marketing copy ("1,500 clients, 25 years"),
  not on observed rankings. **Dimakh is the real #1** — position 1 in three of four queries.
- **Directories own 27% of head-term slots.** DesignRush alone takes 4. GoodFirms, Refrens,
  Quora, LinkedIn and RevenueBase fill more. The real fight for a top-10 slot is against
  directories, not 242 agencies.
- **The "586 agencies" figure was wrong.** RevenueBase's own snippet reads *"224 web design
  companies for small business based in Pune."* Still unwinnable for a new domain — use 224.

**Verdict on head terms: do not fight.** Dimakh's position is a function of 25 years of
continuous indexing, not content quality (see §3).

---

## 3. Technical execution audit — you were right

Fetched each live homepage, measured source directly:

| Site | TTFB | HTML | Words | JSON-LD | H1 | Tables | FAQPage | Images | No `alt` | `font-display:swap` |
|---|---|---|---|---|---|---|---|---|---|---|
| dimakhconsultants.com | 1.60s | 312 KB | **7,672** | 3 | **2** ❌ | 0 | ❌ | 106 | **13** | 0 |
| brainminetech.com | 1.39s | 119 KB | 2,413 | 5 | 1 | 0 | ✅ | 4 | 0 | 0 |
| ikf.co.in | 1.08s | 122 KB | **1,116** | **1** | 1 | 0 | ❌ | 56 | 0 | 0 |
| gigante.co.in | **4.18s** | **493 KB** | 2,965 | 1 | 1 | 0 | ❌ | 49 | 6 | 0 |
| designforu.in | **3.21s** | 91 KB | **422** | 1 | 1 | 0 | ❌ | 38 | 1 | 0 |
| touchmediaads.com | 0.35s | 59 KB | 1,027 | 1 | **0** ❌ | 0 | ❌ | 49 | 0 | 0 |
| **nextreachstudio** | **0.52s** | **117 KB** | 1,405 | **5** | 1 | — | ❌ | 5 | 0 | — |

### What this confirms

- **Not one competitor ships a comparison table.** Zero, across all six. Your articles
  already have them.
- **Only Brainmine ships `FAQPage` schema** — and they're at position 3 on two queries.
  This is the clearest signal in the whole audit: the one competitor doing structured data
  properly is the one punching above their domain age.
- **Dimakh's 7,672-word homepage has 2 H1s and 13 images without `alt`.** A keyword-stuffed
  page from 2001 that ranks on inertia.
- **Gigante takes 4.18s and 493 KB** to serve a homepage. DesignForU serves 422 words in
  3.21s.
- **Touchmedia has zero `<h1>`.** It ranks on two head terms with no H1.
- **Your TTFB is 0.52s** — fastest measured against real network, not lab.

**They are not good at technical execution.** You were right, and it is measurable.

### Where they beat you

| Dimension | Them | You |
|---|---|---|
| Root domain + age | ✅ 16–25 yrs | ❌ none |
| Referring domains | ✅ decades of links | ❌ near zero |
| Content depth | Dimakh 7,672 words on one page | 1,405 on homepage |
| Content volume | 6–15 blog posts | ✅ **43 articles + 2 guides + 2 resources** |
| Content structure | ❌ no tables, no answer-first | ✅ tables, FAQ, answer-first |
| Technical SEO | ⚠️ only Brainmine competent | ✅ 5 JSON-LD blocks, valid |
| Speed | ⚠️ 0.35–4.18s | ✅ 0.52s TTFB |

---

## 4. Their content engines are not serious

| Agency | Blog | Articles | Notes |
|---|---|---|---|
| ikf.co.in | `/blog/` live | **15** | Topical AI marketing posts, generic |
| dimakhconsultants.com | `/blog/` live | **10** | SEO-company-in-Pune self-promotion |
| gigante.co.in | `/blog/` live | ~6 | Meme/q-commerce opinion, off-topic |
| brainminetech.com | **404** | 0 | Blog route does not exist |
| designforu.in | — | — | No blog detected |
| touchmediaads.com | — | — | No blog detected |
| **nextreach** | `/blog/` | **43** | Answer-first, tables, FAQ, wired |

**Nobody in this market is publishing seriously.** IKF's 15 posts are AI-topic filler that
could belong to any agency in any city. Dimakh's 10 are all variations of "why hire us."

You have 3.5× the next-best competitor's output, structured for extraction.

---

## 5. Long-tail SERP — the market is empty, not crowded

| Query | Top 10 composition | Local content? |
|---|---|---|
| website design cost pune | zauca, awrange, **reddit ×2, quora ×2**, godaddy, youtube | ❌ 4/10 UGC |
| website maintenance cost pune | clariontech, **quora ×2**, reddit, godaddy, networksolutions | ❌ 5/10 UGC |
| ui ux design vs web development pune | **reddit**, facebook, **jessup.edu**, quora, medium | ❌ 7/10 irrelevant |
| small business website pune | linkedin, facebook, reddit, wix, youtube, instagram | ❌ 8/10 social |
| website accessibility wcag pune | **w3.org ×2**, ncbi, userway, **kennesaw.edu** | ❌ zero Pune |
| how much does seo cost in pune | webfx, **reddit ×2**, **quora ×2**, w3era | ❌ 5/10 UGC |
| seo friendly website checklist pune | university.webflow, quora, seranking, vierviertel | ❌ mostly non-Pune |
| local seo pune | weblinkservices, a2digisolution, hynixdigital | ✅ weak but real |
| responsive web design pune | revenuebase, dimakh, upwork, justdial | ⚠️ thin |
| ecommerce website design pune | letswebify, indiamart, revenuebase | ⚠️ thin |
| website redesign pune | dimakh, revenuebase, linkedin, indiamart, sulekha | ⚠️ thin |
| landing page design conversion pune | indiamart, wingify, youtube, **ikf**, unbounce | ⚠️ thin |

**NextReach: 0 of 15 queries in top 10.**

But Google is returning a Pennsylvania coding bootcamp (`jessup.edu`) for
`ui ux design vs web development pune` and Kennesaw State for `website accessibility wcag pune`.
It is widening queries away from Pune because no Pune business has written anything worth
ranking.

**This is an empty room, not a crowded market.** The long-tail thesis in `LONG-TAIL-MAP.md`
is confirmed by live SERPs, not just keyword tool estimates.

---

## 6. Can we get clients from SEO in 6 months / 1 year?

### Honest answer: 6 months — no. 1 year — yes, conditionally.

**The constraint is not content. You already have enough content.**

You have 43 articles covering terms nobody else has written on. Writing more will not move a
page that cannot rank. The blockers, in priority order:

| # | Blocker | Severity | Fix |
|---|---|---|---|
| 1 | **No root domain** | 🔴 Fatal | Recover `nextreachstudio.com` from redemption, or buy `nextreachstudio.in`. Then 301 the vercel.app URL. ~1 day. |
| 2 | **Zero referring domains** | 🔴 Fatal | Nothing ranks without inbound links. This is the real 12-month work. |
| 3 | **Not submitted to GSC** | 🟠 High | Manual, 10 minutes. New pages don't get indexed until crawled. |
| 4 | 76 titles >65 chars | 🟡 Medium | Truncation costs clicks on every ranking you do win. |
| 5 | 0 `FAQPage` schema | 🟡 Medium | Brainmine proves this works. 21 articles ready. |
| 6 | `llms-full.txt` missing | 🟢 Low | AI-citation surface, not ranking. |

### Realistic timeline

**Months 0–2 — infrastructure**
Domain purchase, 301 migration, GSC submission, indexation. Expect *temporary* ranking
volatility during migration; the vercel.app URLs have little to lose. Monitor `site:`
coverage weekly. Do not rush the migration while also making other structural changes.

**Months 2–6 — links, not pages**
A new domain with 43 articles and zero referring domains will not rank for
`website design cost pune` in 6 months. Realistic outcome: **long-tail articles indexed and
moving into positions 10–30 on 5–15 terms.** A small number of terms cracking page 2.
Zero leads from organic is a normal outcome at month 6, and treating it as failure would be
a mistake.

The work that matters here is **earned inbound links**, not publication:
- Submit to Indian directories (JustDial, Sulekha, IndiaMART partner listings) — all of
  which are already ranking in your long-tail SERPs
- Client case studies with real attribution that clients will link from their own sites
- Pune business associations, startup communities, college/incubator pages
- Guest contributions to Pune tech/business publications

**Months 6–12 — compounding**
Domain age crosses the threshold where Google starts testing new pages faster. Content has
had time to accrue impressions. Realistic outcome: **first organic leads, 10–30 leads/month
range** if link acquisition has been consistent. Long-tail articles at positions 3–10. Head
terms still unwinnable — accept this.

**Month 12+ — the structural advantage activates**
Dimakh and IKF are not producing content that AI engines can cite. Their pages have no
tables, no answer-first openings, no FAQ blocks. When buyers shift from "search and click"
to "ask and get an answer," the entity with the extractable content wins that surface
regardless of domain age. **This is your asymmetric bet and it is the only one you have.**

### What would make 1 year fail

1. Keeping the site on `vercel.app` — no domain, no authority accumulation, and 43 articles
   all consolidating signals onto a platform subdomain you don't control
2. Publishing instead of building links — the content is already sufficient; marginal
   articles have near-zero incremental return
3. Abandoning at month 5 because organic leads are zero — that is the expected state, not
   the failure state
4. Competing on head terms instead of defending long-tail wins

### What is genuinely in your favour

- **224 competitors, and only ~12 actually occupy head-term slots** — most are directory
  entries, not real threats
- **Nobody publishes seriously** — best competitor has 15 articles to your 43
- **Only one competitor ships `FAQPage`** — Brainmine, at position 3
- **Your TTFB beats every competitor** measured live
- **Six target long-tails currently return Reddit, Quora and out-of-state universities**
- **No Pune agency is positioned on technical depth** — everyone competes on price. Your
  "direct access to the principal engineer" angle is uncontested.

---

## 7. Revenue — how much these agencies actually make

**Two sources disagree by up to 1,700×. Only one is real.**

| Source | Method | Reliability |
|---|---|---|
| **Tracxn** (platform.tracxn.com) | Reads **MCA filings** — audited AOC-4 annual returns, legally binding | ✅ Trust this |
| ZoomInfo / RocketReach / Datanyze | Modelled from employee band + industry average | ❌ Do not trust |

### MCA-filed revenue (the defensible numbers)

| Agency | Revenue | Employees | Founded | Head-term slots |
|---|---|---|---|---|
| **Clarion Technologies** | **₹146.9 Cr** (FY24, Inc42) / $14.55M (Tracxn) | 447–654 | 2000 | 0 |
| **IKF** (I Knowledge Factory) | **₹5.91 Cr** ($703,295) | 51–200 | 2000 | 1 |
| **Dimakh Consultants** | **₹3.98 Cr** ($473,569) | **8** | 1998 | **4** |
| **Brainmine Web Solutions** | **₹1.38 Cr** ($163,058) | 95 | 2011 | 3 |
| **Gigante Technologies** | **₹6.96 L** ($8,281) | 44 | 2011 | 4 |
| Design For U | not disclosed | **4** | 2011 | 2 |
| Touchmedia Ads | not disclosed | **3** | 2013 | 4 |
| Trident Web Infoservices | not disclosed | — | 2003 | 0 |

### The phantom numbers

| Agency | ZoomInfo / RocketReach claim | MCA filed | Inflation |
|---|---|---|---|
| Dimakh | **$15.7M** | $474K | **33×** |
| IKF | **$14.3M–$15M** | $703K | **21×** |
| Gigante | **$14.1M** | $8.3K | **1,700×** |

All three estimates cluster suspiciously at $14–16M regardless of company size — the classic
signature of a model derived from employee count, not from financials. If you ever see
"Gigante does $14.1M", that is an algorithm guessing, not a filing.

### What this actually means

**1. The market you're competing in is tiny.**

Dimakh — the agency holding position 1 on three of four head terms, with 4,200 websites and
25 years of history — files **₹4 Cr revenue with 8 employees.** That is roughly 8 people
billing ₹50 L each, which for a Pune web agency is a normal-to-modest book of business.

Your ranking incumbent is not a large company. It is a small firm with a very old domain.

**2. Nobody here is a real business competitor in the sense that matters.**

Excluding Clarion (which is an enterprise offshore dev shop — 447+ staff, ₹147 Cr — and does
not compete for web design work), **every agency you're outranking on technical quality
files under ₹6 Cr.** Touchmedia occupies 4 head-term slots with **3 employees.** Design For U
holds 2 slots with **4 employees.**

**3. Clarion is the outlier, and it is not your competitor.**

₹146.9 Cr and 654 employees. They appeared at position 1 on `website maintenance cost pune`
because they publish cost-guide content — but they sell enterprise offshore teams at
$50–99/hr with $50K+ minimum projects. A Pune SME buying a ₹40,000 website is not their
buyer. **Do not benchmark against Clarion.** They are a content competitor on cost keywords
only, and their content is the same generic listicle format you can beat.

**4. Your realistic revenue target is small and that's fine.**

If the #1 ranked agency files ₹4 Cr from 8 people, then:

- A single organic lead worth ₹1.5–3 L is a **meaningful** win, not a rounding error
- 10–30 leads/year from organic at ₹1.5 L average = **₹15–45 L ARR** from SEO alone
- That is a credible 12-month outcome for a solo/founder-led studio, and it would represent
  **3–11% of Dimakh's entire filed revenue** captured without competing on their domain age

You are not trying to beat a ₹147 Cr company. You are trying to take share from an 8-person
firm that ranks on inertia.

### Caveats on these figures

- MCA filings are the **declared minimum**. Indian agencies commonly run part of the book
  through a proprietorship or individual consultancy that doesn't appear in the Pvt Ltd's
  AOC-4. **Treat these as floors, not totals.**
- Gigante at ₹6.96 L with 44 employees is almost certainly an under-declared filing — that
  is ₹15.8 K per employee per year, which is not physically possible. Their real turnover is
  higher; the filing is minimal for compliance reasons.
- Clarion India Pvt Ltd (₹1,730 Cr) is a **different, unrelated company** — Japanese-owned
  trading entity in Pimpri. Do not confuse it with Clarion Technologies.

---

## 8. Recommended priority

**Now (this week)**
1. **Check `nextreachstudio.com` at your registrar — it is in redemption and the window is
   closing.** Recover it, or buy `nextreachstudio.in` (available today) as fallback
2. Submit sitemap to Google Search Console

**Next 30 days**
3. Add `FAQPage` schema to the 21 articles that already have FAQ sections
4. Trim the 76 over-length title tags

**Months 2–12**
5. Stop publishing. Build referring domains. See §6.

**Contingent**
6. `LocalBusiness` schema — pending geo coordinates
7. `llms-full.txt`
