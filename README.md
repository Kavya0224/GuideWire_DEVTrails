<div align="center">

# ShieldGig
### AI-Powered Parametric Income Insurance for India's Gig Delivery Workers

*DEVTrails 2026 — Guidewire University Hackathon — Phase 1 Submission*

---

**Persona:** Food Delivery Partners — Zomato & Swiggy  
**Coverage:** Income Loss Only (weather, pollution, curfews — no health / vehicle / accident)  
**Pricing Model:** Weekly Subscription  
**Phase:** 1 of 6 — Ideation & Foundation

</div>

---

## Table of Contents

1. [Problem We're Solving](#1-problem-were-solving)
2. [Our Persona](#2-our-persona)
3. [What We Insure and What We Don't](#3-what-we-insure-and-what-we-dont)
4. [How It Works — Platform Overview](#4-how-it-works--platform-overview)
5. [Weekly Pricing Model](#5-weekly-pricing-model)
6. [AI-Powered Risk Assessment](#6-ai-powered-risk-assessment)
7. [Parametric Trigger System](#7-parametric-trigger-system)
8. [Intelligent Fraud Detection and Anti-Spoofing](#8-intelligent-fraud-detection-and-anti-spoofing)
9. [Claim Workflow and Payout Processing](#9-claim-workflow-and-payout-processing)
10. [Integration Architecture](#10-integration-architecture)
11. [Analytics Dashboard](#11-analytics-dashboard)
12. [Adversarial Defense — Architecture Layers](#12-adversarial-defense--architecture-layers)
13. [Adversary Evolution and Future-Proofing](#13-adversary-evolution-and-future-proofing)
14. [Financial Model and Unit Economics](#14-financial-model-and-unit-economics)
15. [6-Week Roadmap](#15-6-week-roadmap)
16. [Golden Rules Compliance](#16-golden-rules-compliance)

---

## 1. Problem We're Solving

India's food delivery ecosystem runs on approximately **5 million platform-based delivery partners** across Zomato and Swiggy. These workers are the infrastructure behind same-day commerce — but they operate with zero income protection.

When external disruptions hit — a monsoon red alert, an AQI spike above 400, a sudden local curfew — deliveries halt immediately. The worker loses **20–30% of monthly earnings** in a single week, with no recourse, no safety net, and no mechanism to recover.

```
What happens today when a Mumbai delivery partner faces a flood alert:

  Monday    ──  Full earnings day           ₹1,200
  Tuesday   ──  Red alert issued, 0 orders  ₹0
  Wednesday ──  Roads flooded, app paused   ₹0
  Thursday  ──  Partial recovery            ₹400
  Friday    ──  Back to normal              ₹1,100

  Weekly loss:  ₹1,000+ (approx. 25% of weekly income)
  Current safety net: None
```

**ShieldGig** provides automated, parametric income insurance that pays out the moment a verified disruption is detected — without requiring the worker to file a claim, speak to an agent, or prove anything.

---

## 2. Our Persona

**Segment:** Food Delivery Partners — Zomato & Swiggy  
**Geography:** Tier-1 cities — Mumbai, Delhi NCR, Bengaluru, Chennai, Hyderabad, Pune

| Attribute | Profile |
|-----------|---------|
| Average daily earnings | ₹800 – ₹1,400 |
| Working hours per day | 8 – 12 hours |
| Weekly take-home | ₹4,500 – ₹7,500 |
| Primary disruption risks | Monsoon, extreme heat, AQI alerts, curfews, app outages |
| Payment preference | UPI (PhonePe, GPay) — weekly cycle |
| Primary device | Android, entry-to-mid range |
| Insurance awareness | Low — most have never held a formal policy |

### Why Food Delivery Specifically

Food delivery partners face the most acute income volatility of any gig segment:

- Orders drop to near-zero within 30 minutes of a red-weather alert
- No advance notice — disruptions hit mid-shift with no ramp-down period
- No alternative income stream available during the halt
- Already operating on thin daily margins with minimal savings buffer
- Platform algorithms do not compensate for forced downtime

---

## 3. What We Insure and What We Don't

### Covered — Income Loss from External Disruptions

| Disruption Type | Specific Trigger | Example |
|----------------|-----------------|---------|
| **Extreme Weather** | IMD Red or Orange alert active in worker's zone | Mumbai flood alert, cyclone warning |
| **Severe Heat** | Temperature above 43°C during peak delivery hours | Delhi May heatwave — outdoor work unsafe |
| **Pollution Emergency** | AQI above 400 (Severe+) in worker's city | Delhi winter smog emergency |
| **Heavy Rain** | Rainfall above 65mm per hour (IMD data) | Bengaluru flash flooding |
| **Curfew / Social Disruption** | Government-declared curfew or Section 144 | Unplanned civil disruption, sudden market closure |
| **Platform App Outage** | Verified downtime greater than 2 hours during peak window | Zomato or Swiggy server outage |

### Strictly Excluded — No Exceptions

- Health insurance or medical bills of any kind
- Life insurance or accidental death benefits
- Vehicle repair, maintenance, or damage costs
- Fuel costs or vehicle depreciation
- Claims arising from self-caused disruptions
- Pre-existing income loss unrelated to a covered trigger

---

## 4. How It Works — Platform Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                          SHIELDGIG PLATFORM                          │
│                                                                      │
│  ┌───────────────┐    ┌────────────────┐    ┌────────────────────┐  │
│  │  ONBOARDING   │───▶│  RISK ENGINE   │───▶│   POLICY ISSUED    │  │
│  │               │    │   (AI / ML)    │    │   Weekly pricing   │  │
│  │  KYC + zone   │    │  Score 0–100   │    │   UPI auto-debit   │  │
│  └───────────────┘    └────────────────┘    └────────────────────┘  │
│                                                       │              │
│                               ┌───────────────────────┘              │
│                               ▼                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                 PARAMETRIC TRIGGER MONITOR                     │  │
│  │   IMD API  ·  AQI Feed  ·  Traffic API  ·  Platform API mock  │  │
│  │              Continuous polling — 15-minute intervals           │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                               │                                      │
│            ┌──────────────────┼──────────────────┐                  │
│            ▼                  ▼                  ▼                  │
│  ┌───────────────┐   ┌───────────────┐   ┌──────────────────────┐  │
│  │   TRIGGER     │   │     FRAUD     │   │   PAYOUT PROCESSING  │  │
│  │   DETECTED    │──▶│  VALIDATION   │──▶│   UPI / wallet       │  │
│  │               │   │  (5-signal)   │   │   Target: 4 hours    │  │
│  └───────────────┘   └───────────────┘   └──────────────────────┘  │
│                                                                      │
│                    ┌─────────────────────────┐                      │
│                    │   ANALYTICS DASHBOARD   │                      │
│                    │   Risk · Claims · ROI   │                      │
│                    └─────────────────────────┘                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Onboarding Flow — Optimized for Delivery Partners

Designed for completion in under **4 minutes** on a mid-range Android device:

1. **Phone + OTP** — No passwords. UPI-linked number is the identity anchor
2. **Platform verification** — Worker enters their Zomato or Swiggy partner ID (verified via platform API mock)
3. **Zone selection** — Auto-detected via GPS; worker confirms their primary delivery zone
4. **Earnings baseline** — Last 30-day average pulled from platform API with consent, or entered manually
5. **Risk profiling** — AI assigns zone risk score in background (invisible to worker; zero friction)
6. **Plan selection** — Two tiers shown with weekly premium and max payout stated clearly
7. **UPI mandate** — Weekly auto-debit set up; policy confirmation sent on WhatsApp

---

## 5. Weekly Pricing Model

All premiums and payouts are structured on a **weekly cycle** to match the earnings rhythm of food delivery partners. A monthly premium creates a cash-flow mismatch for workers paid weekly. A weekly debit of ₹49–89 is psychologically and financially aligned with how they already manage money.

### Premium Tiers

| Tier | Weekly Premium | Max Weekly Payout | Daily Payout Cap | Best For |
|------|---------------|-------------------|-----------------|----------|
| **Shield Basic** | ₹49 / week | ₹1,500 | ₹500 / day | Workers earning ₹4,500–₹5,500 / week |
| **Shield Plus** | ₹89 / week | ₹2,800 | ₹900 / day | Workers earning ₹5,500–₹7,500 / week |

### Dynamic Premium Calculation

Premium is not flat-rate. It is calculated per worker using the AI risk model:

```
Base Premium (tier selected)
  × Zone Risk Multiplier      [0.80 – 1.40]  based on city and delivery zone
  × Seasonality Factor        [1.00 – 1.60]  peaks during monsoon, winter smog season
  × Claim History Adjustment  [0.90 – 1.20]  rewards clean history
  × Platform Tenure Modifier  [0.95]         discount for partners active > 18 months
──────────────────────────────────────────────────────────────────────
= Final Weekly Premium  (rounded to nearest ₹5)
```

**Example calculation:**  
A Swiggy partner in Dharavi (high flood-risk zone, Mumbai) during July monsoon:  
`₹49 × 1.35 (zone) × 1.50 (monsoon) × 1.00 (no claims) × 1.00 (tenure) = ₹99 / week`  
Payout ceiling stays at ₹1,500. The premium adjusts; the protection does not.

### Payout Calculation

```
Verified Disruption Hours × Hourly Income Baseline × 80% Coverage Ratio
────────────────────────────────────────────────────────────────────────
= Daily Payout (capped at daily limit for the selected tier)

Hourly Income Baseline = Worker's 30-day earnings average ÷ average daily hours
Coverage Ratio = 80%  (worker bears 20% to reduce moral hazard)
```

---

## 6. AI-Powered Risk Assessment

### Zone-Adjusted Risk Score (ZARS)

Every worker receives a ZARS at onboarding, updated monthly. It drives premium calculation and claim monitoring intensity.

| Feature | Source | Weight |
|---------|--------|--------|
| Primary delivery zone flood and heat risk | IMD historical zone maps | 30% |
| City and season combination | IMD 5-year climate records | 20% |
| Historical disruption frequency in zone | IMD archive | 20% |
| Platform tenure and earnings consistency | Platform API mock | 15% |
| Claim history (returning subscribers) | Internal database | 10% |
| Device quality proxy | App telemetry | 5% |

**Score ranges:**
- 0–35: Low risk → base premium rate
- 36–65: Medium risk → moderate multiplier applied
- 66–100: High risk → adjusted premium, enhanced monitoring during claims

### Zone-Level Predictive Modeling

Beyond individual scoring, we run zone-level models to forecast disruption probability:

- 7-day IMD forecast → monsoon likelihood per zone for the coming week
- Historical earnings drop patterns correlated with past IMD alerts in same zones
- Platform order volume drops during previous alerts — used to calibrate trigger thresholds

This drives **dynamic pool sizing**: how much liquidity must be held per zone per week — the core actuarial function of the platform.

---

## 7. Parametric Trigger System

### What Parametric Means Here

Traditional insurance: loss occurs → worker files claim → adjuster reviews → payout arrives days or weeks later.

ShieldGig: external trigger detected → **automatic claim initiated → payout within 4 hours**. No claim form. No adjuster. No waiting.

### Trigger Conditions

| Trigger | Data Source | Threshold | Verification Method |
|---------|------------|-----------|-------------------|
| IMD Weather Alert | IMD API (real-time) | Red or Orange alert in worker's city | Cross-checked against 2 API sources |
| Rainfall Intensity | IMD rain gauge data | Above 65mm/hour sustained 30 minutes | Zone-level polygon, not city-wide |
| Temperature Extreme | IMD + OpenWeatherMap | Above 43°C between 11am and 4pm | Worker's active delivery zone |
| AQI Emergency | CPCB AQI API | AQI above 400 for 3+ consecutive hours | City-level with zone weighting |
| Curfew / Section 144 | News API + government feed | Active in worker's delivery zone | Dual-source confirmation required |
| Platform App Outage | Zomato/Swiggy status mock | Unavailable for 2+ hours during 11am–9pm | Confirmed via status API |

### Trigger Monitor Architecture

```
Every 15 minutes:
  Poll IMD API         →  parse alert level for each active worker zone
  Poll CPCB AQI feed   →  check thresholds per city
  Poll traffic API     →  detect curfew-related road closures
  Poll platform mock   →  check app status

If threshold crossed for zone Z:
  Mark all active policies in zone Z as "disruption active"
  Initiate fraud validation batch for all zone Z workers
  Queue payouts for workers who pass validation
  Send push notification to affected workers
```

---

## 8. Intelligent Fraud Detection and Anti-Spoofing

This section addresses a verified threat: organized syndicates using GPS-spoofing applications to fake their location inside a disruption zone and claim payouts while sitting at home. A 500-worker syndicate using this method can drain a liquidity pool in hours — as demonstrated in the threat scenario provided for this phase.

**Core principle: GPS lies. The physical world does not.**

### The 5-Signal Trust Scoring Model

Every claim is evaluated across five independent signal families, fused by a weighted ensemble ML model into a **Trust Risk Score from 0 (certain legitimate) to 100 (certain fraud)**. A genuine stranded worker naturally satisfies these without any extra action.

---

#### Signal 1 — Device Sensor Coherence

A GPS spoofing application runs at the software layer. The phone's physical sensors — accelerometer, gyroscope, barometer, ambient light — have no awareness that they are supposed to be in a flood zone.

| Real Worker in Monsoon | Fraudster at Home |
|----------------------|------------------|
| Micro-vibrations, irregular orientation shifts | Flat, stationary IMU readings throughout |
| Barometric pressure consistent with storm system | Indoor ambient pressure — contradicts claimed outdoor zone |
| Noisy, irregular sensor patterns | Synthetically smooth output — the most detectable signature |

---

#### Signal 2 — Network Triangulation Delta

Cell tower handshake sequences cannot be fabricated without physical presence at the tower.

- GPS reports **Andheri West** but tower handoff log shows device pinging the same three towers in **Thane for 4 hours** → hard geographic contradiction
- Wi-Fi BSSID scan list unchanged for 3 hours → device has not moved, regardless of GPS reading
- The delta between GPS-reported position and network-derived position → weighted contribution to risk score

---

#### Signal 3 — Behavioral Trajectory Continuity

Genuine workers have a journey before the claim. Their 90-minute pre-claim trace is physically coherent:

```
11:00 AM  Picked up order — Bandra
11:40 AM  Delivered — Kurla
12:05 PM  Accepted next order — moving toward Dharavi
12:30 PM  Speed decreasing — rain intensifying
12:45 PM  Stopped — Red alert issued  ← claim triggered
```

Fraudulent actors teleport. Their pre-claim trace shows either a stationary device suddenly placed in a disruption zone, or a location jump at physically impossible speed with no delivery order context.

Our model checks displacement plausibility, velocity smoothness, and route consistency against actual road network geometry.

---

#### Signal 4 — Hyperlocal Weather Grid Validation

We ingest weather data at **1 km² polygon resolution** from IMD, Windy, and OpenWeatherMap.

- Claim coordinate checked against the exact active alert polygon — not just the general city or area
- Spoofing actors commonly select "nearby" coordinates that sound right but fall just outside the active boundary
- Live road-closure feeds cross-referenced: a worker claiming to be stranded on a route that traffic data shows as flowing freely fails this check immediately

---

#### Signal 5 — Claim Graph and Cohort Analysis

Claims are modeled as nodes in a directed graph. Edges represent shared attributes between claimants:

```
Shared device onboarding date         →  edge
Overlapping primary delivery zones    →  edge
Co-located cell towers at claim time  →  edge
Claim filed within 8-minute window    →  edge
Shared payout destination account     →  edge
```

A **Cluster Density Score** is computed per weather event in real time. Any cluster crossing the **99th percentile of historical event density** triggers a Ring Review flag — payouts for that cluster are paused and routed to the human review queue.

> A Telegram-coordinated 500-worker syndicate would produce a cluster density score **40–60 times above baseline**. Detectable before the 30th payout is processed.

---

### Trust Score Decision Framework

| Score | Tier | System Action | Worker Experience |
|-------|------|--------------|-----------------|
| 0–30 | Trusted | Auto-approve; payout initiated in 60 seconds | Instant push notification; no friction whatsoever |
| 31–70 | Soft Flag | Passive re-verify (2–3 min); **60% advance released immediately regardless** | "Verifying with IMD weather data" — no accusatory language |
| 71–100 | Hard Flag | Full payout held; routed to human review queue | Live status tracker shown in app; estimated resolution time displayed |

### Soft-Flag Recovery — One Step, Worker's Choice

If passive verification does not resolve the flag, the worker chooses **one** of the following:

- Upload a geostamped photo from their current location
- Record a 10-second video clip
- Get corroboration from another verified partner in the same zone

Completing this step releases the remaining 40% within 60 seconds. Always framed as *"help us get you paid faster"* — never as a demand for proof of innocence.

### Duplicate Claim Prevention

- One active claim per disruption event per policy (each event tied to a unique IMD alert ID)
- Device fingerprint combined with policy ID checked against the active claims table before any payout initiates
- A single physical device cannot hold two simultaneously active policies

### What We Never Do to Honest Workers

- Block 100% of the payout pending review — the 60% advance is always released for soft-flag claims
- Ask for more than one verification action
- Use "fraud" or "suspicious" language in any worker-facing communication
- Require re-verification mid-storm once a claim is in flight
- Permanently penalize a false positive — cleared flags update the worker's trust score positively

---

## 9. Claim Workflow and Payout Processing

### Automatic Claim Initiation — No Worker Action Required

```
Trigger detected in Zone Z
         │
         ▼
All active policies in Zone Z flagged as "disruption active"
         │
         ▼
5-signal fraud validation runs in background (target: under 90 seconds)
         │
    ┌────┴──────────────┬──────────────────────┐
    │                   │                      │
 Score 0–30          Score 31–70           Score 71–100
    │                   │                      │
    ▼                   ▼                      ▼
Auto-approve      60% advance released    Hold — human review
Full payout       Passive verify runs     Worker notified with ETA
initiated         in background
    │                   │
    │              Pass → Remaining 40% released automatically
    │              Fail → One-step optional verification offered
    ▼
Worker notified via WhatsApp push + in-app notification
```

### Payout Channels

| Channel | Default | Target Settlement |
|---------|---------|-----------------|
| UPI (PhonePe / GPay / BHIM) | Primary | Within 4 hours of trigger |
| Zomato / Swiggy wallet credit | Optional | Same day |
| Bank NEFT | Fallback if UPI fails | Next business day |

### Network Drop Grace Period

A genuine GPS signal dropout during a severe storm is expected behavior, not fraud. Our system holds the **last verified location as valid for 8 minutes** after signal loss. If the worker was confirmed inside the alert polygon before the dropout, they are treated as still inside — unless independent non-GPS signals (tower data, IMU readings) actively contradict that position.

---

## 10. Integration Architecture

| Integration | Type Used | Data Consumed |
|------------|----------|--------------|
| **IMD Weather API** | Real — free tier | Alert level, rainfall intensity, zone polygons |
| **CPCB AQI API** | Real — free tier | City and zone AQI, hourly trends |
| **OpenWeatherMap** | Real — free tier | Secondary weather validation, 7-day forecast |
| **Zomato / Swiggy Partner API** | Simulated mock | Worker ID, earnings history, active order status |
| **Google Maps / OpenStreetMap** | Real — free tier | Zone polygon mapping, road network for trajectory check |
| **UPI / Razorpay** | Sandbox environment | Mandate setup, payout disbursement |
| **WhatsApp Business API** | Trial tier | Claim notifications, weekly policy reminders |
| **Cell Tower Data** | Simulated (OpenCelliD structure) | Network triangulation delta for fraud scoring |

---

## 11. Analytics Dashboard

### Worker-Facing View

| Panel | Content |
|-------|---------|
| Coverage status | Active, lapsed, or disruption currently active |
| Premium history | All weekly payments with dates |
| Claims history | Each event with trigger type, hours covered, payout received |
| Live disruption alert | If a trigger is active in their zone right now |

### Operations View

| Panel | What It Shows |
|-------|--------------|
| **Live Trigger Map** | Active disruption zones overlaid on city map with worker density heatmap |
| **Pool Health Monitor** | Current liquidity vs projected payouts for all active triggers |
| **Claim Queue** | Soft-flag and hard-flag claims with time-in-queue |
| **Fraud Ring Monitor** | Real-time cluster density score per active weather event |
| **Zone Risk Heatmap** | ZARS distribution across all enrolled workers by city zone |
| **Weekly P&L** | Premiums collected vs payouts disbursed vs operational cost |
| **Retention Metrics** | Weekly renewal rate, churn segmented by zone and tier |

---

## 12. Adversarial Defense — Architecture Layers

The fraud scoring system runs across three separated layers. Each has a distinct responsibility. Separating them matters because attackers probe for the weakest layer first — if fraud detection lived inside the claims service, updating it would require touching production claims code.

### Layer 1 — Edge Validation (On-Device SDK)

Runs inside the worker app **before any network call is made**. Zero latency impact on the worker.

| Check | What It Catches |
|-------|----------------|
| Mock location API flag | Android exposes whether a mock location provider is active |
| Root and jailbreak detection | OS-level compromise is a prerequisite for all deep-layer spoofing |
| 30-second IMU sanity snapshot | Synthetic sensor data is unnaturally smooth; real outdoor environments produce noisy, irregular readings |

Does not block claims. Appends a **device integrity tag** to the payload. Honest workers experience zero friction.

### Layer 2 — Real-Time Scoring Engine (Separate Cloud Microservice)

Completely decoupled from the claims processing service — can be updated as attack patterns evolve without touching claims infrastructure.

| Component | Role |
|-----------|------|
| **Signal Aggregator** | Fetches all 5 signal families in parallel — target latency under 1.5 seconds total |
| **Feature Store** | Pre-computed worker history served at low latency without hitting the main database |
| **Ensemble Scorer** | Weighted ML model → 0–100 risk score; **retrained weekly** on labeled human-review outcomes |
| **Claim Graph Engine** | Maintains live graph per weather event; cluster density score updated in real time |
| **Decision Router** | Translates score to action; emits event to claims service and notification service |

### Layer 3 — Retrospective Learning and Feedback Loop

| Mechanism | How It Works |
|-----------|-------------|
| Human-reviewed claim outcomes | Every cleared or confirmed-fraud decision is a labeled training sample |
| Weekly model retraining | Ensemble retrained on last 30 days, biased toward recent patterns |
| Ring threshold recalibration | Confirmed fraud ring at density X → detection threshold moves below X |
| Nightly anomaly detection | Scans raw claim data for novel patterns outside all known signal families |

A static model loses accuracy within weeks of deployment. The feedback loop is what makes the defense durable rather than just correct on launch day.

---

## 13. Adversary Evolution and Future-Proofing

The 500-worker GPS-spoofing syndicate is not the final form of this attack. A group that successfully drains one platform has both the incentive and the technical feedback to evolve.

### Variant A — Sensor Spoofing (6–12 month horizon)

Root-level IMU manipulation tools already exist and will become more accessible. A rooted device with a custom kernel module can feed false accelerometer and barometric readings to any application.

**Counter:** Root detection in Layer 1 raises the base risk score before any other signal is evaluated. Additionally, false sensor data is characteristically *too clean* — real monsoon environments produce irregular, noisy readings that synthetic data does not replicate well. We train on legitimate signal distributions and flag implausibly smooth sensor output as a distinct fraud signature.

### Variant B — Clean-Profile Rings (3–6 month horizon)

Sophisticated syndicates will stop using accounts with shared onboarding dates. Instead they will build genuine profiles with real delivery history over weeks, spread across different neighborhoods, and activate only during target events.

**Counter:** Even clean profiles produce **timing correlation** during coordinated attacks. Eighty claims filed within a 12-minute window from accounts with no prior interaction still produces an anomalous cluster density score, regardless of how old or genuine each individual profile appears. Long-term investment in behavioral biometrics — in-app interaction fingerprints that are hard to replicate across a ring of devices — adds a second detection layer.

### Variant C — Recruited Legitimate Workers (12+ month horizon)

The most difficult variant to detect technically: a syndicate pays actual registered delivery partners a cut to file real claims from real locations during real disruptions — for shifts they never actually worked.

**Counter:** Delivery-chain validation as a backstop. We cross-reference every claim with the worker's active order log at claim time. A worker with no open delivery within 3 km of the claimed zone — and no delivery attempt for 90 minutes prior — has a plausibility problem the model weights heavily. A recruited non-worker sitting in a flood zone without an active order fails this check without the system needing to know in advance that they were recruited.

### Attack Cost Comparison

| What Attackers Must Now Do | What Genuine Workers Must Do |
|---------------------------|------------------------------|
| Root device — detectable by Layer 1 | Nothing — standard app works normally |
| Simultaneously spoof 5 independent signal families | Nothing — physical presence satisfies all signals naturally |
| Build and age clean profiles over weeks before use | Nothing — genuine work history is an asset, not a liability |
| Coordinate timing carefully to stay below cluster density threshold | Nothing — genuine emergencies produce organic timing variance |
| Adapt every week as the model retrains on their own attack data | Nothing — the feedback loop improves accuracy for honest workers too |

---

## 14. Financial Model and Unit Economics

### Core Metrics

| Metric | Value |
|--------|-------|
| Weekly premium — Shield Basic | ₹49 |
| Weekly premium — Shield Plus | ₹89 |
| Average payout per disruption day | ₹450 – ₹720 |
| Expected disruption days per worker per month | 2.5–4.0 (monsoon) / 0.8–1.5 (other seasons) |
| Scoring cost per claim (API calls + ML inference) | ~₹1.50 – ₹2.00 |
| Target fraud catch rate | 97–98% |

### Pool Sizing Logic

```
Weekly premium pool  =  Enrolled workers × average weekly premium

Required reserve     =  (Expected disruption days × average payout) × 1.3 safety margin

Reinsurance trigger  =  Reserve falls below 80% of required reserve level
```

The seasonality multiplier in the premium calculation means the pool grows entering monsoon season — the highest-risk window — before claims begin arriving. This is by design, not coincidence.

### The Breakeven Argument

At a 98% fraud catch rate, the scoring system pays for itself within the first **150–200 claims processed in a given month**. Every claim beyond that is pure margin protection. The operational cost of scoring one claim (~₹2.00) is lower than a standard UPI transaction fee.

The per-claim fraud prevention value is:

```
Average fraudulent payout prevented × catch rate
────────────────────────────────────────────────  =  ROI per claim scored
Scoring cost per claim
```

At average payout ₹600 and 98% catch rate: `₹588 protected per ₹2.00 spent = 294× return on fraud scoring investment`.

> The question is not whether this architecture is affordable. It is whether the platform can remain solvent without it.

---

## 15. 6-Week Roadmap

| Phase | Weeks | Theme | Key Deliverables |
|-------|-------|-------|-----------------|
| **Phase 1** | 1–2 | Ideation and Foundation | This README, system architecture diagram, persona research, API mock scaffolding |
| **Phase 2** | 3 | Risk Engine MVP | ZARS model prototype, city zone risk maps, dynamic premium calculator |
| **Phase 3** | 4 | Parametric Trigger System | IMD and AQI API integration, trigger monitor, auto-claim initiation logic |
| **Phase 4** | 5 | Fraud Detection and Payout | 5-signal trust scorer, claim graph engine, UPI sandbox payout flow |
| **Phase 5** | 6 | Dashboard and Demo | Analytics dashboard, full end-to-end demo, onboarding flow polish |
| **Phase 6** | — | Final Submission | Polished pitch deck, recorded demo, complete financial model |

---

## 16. Golden Rules Compliance

| Rule from Problem Statement | How ShieldGig Satisfies It |
|----------------------------|---------------------------|
| Persona: delivery partners only | Strictly Food Delivery — Zomato and Swiggy partners only. No other segment. |
| Coverage: income loss only | All payout triggers are income-loss events. Health, accident, and vehicle are explicitly excluded in Section 3. |
| Weekly pricing model | All premiums and payouts are weekly. UPI mandate is set weekly. Dynamic calculation operates on weekly baseline. |
| AI-powered risk assessment | ZARS model with 6-feature input, dynamic premium multipliers, 7-day predictive zone modeling. See Section 6. |
| Intelligent fraud detection | 5-signal trust scorer, claim graph ring detection, 3-layer architecture with weekly retraining. See Section 8 and 12. |
| Parametric automation | Real-time 15-minute trigger monitor, auto-claim initiation without worker action, 4-hour payout target. See Section 7. |
| Integration capabilities | IMD real, CPCB AQI real, OpenWeatherMap real, platform API mocked, UPI sandbox, WhatsApp trial. See Section 10. |
| Analytics dashboard | Operations view with 7 panels including live trigger map, pool health, fraud ring monitor. Worker view included. See Section 11. |
| Optimized onboarding | 4-minute completion target on mid-range Android; 7-step flow designed for low-insurance-literacy users. See Section 4. |

---

<div align="center">

---

> *"Spoofing a GPS coordinate is trivial. Simultaneously spoofing cell tower logs, IMU sensor data, battery telemetry, pre-claim trajectory history, and a 1 km² hyperlocal weather grid — while coordinating 500 people whose claim-graph density stays within normal statistical bounds — is not."*

---

**ShieldGig** — Protecting the people who keep India's food moving.

*DEVTrails 2026 · Guidewire University Hackathon · Phase 1 Submission*

</div>
