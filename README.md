# DEVTrails 2026 — Phase 1 Submission
## Adversarial Defense & Anti-Spoofing Strategy

> A resilient, layered architecture for parametric gig insurance — built under market-crash conditions.

---

## Threat Context

A 500-worker syndicate coordinated via Telegram to GPS-spoof their way into a red-alert weather zone, draining the platform's liquidity pool through mass false parametric payouts. Basic GPS verification failed completely.

This document explains how our architecture **prevents**, **detects**, and **adapts** to that attack — and future variants of it.

---

## TL;DR

| Signal | Status |
|--------|--------|
| GPS alone | Fakeable — not used as sole signal |
| 5 independent signals fused | Our trust score baseline |
| Risk score (0–100) | Generated per claim in real time |
| Fraud ring detection | Graph clustering on claim graph |
| Flagged worker payout | 60% released instantly regardless |

**Goal: Stop fraud without hurting real workers.**

---

## 1. The Differentiation

### Core Principle

> "GPS lies. The physical world does not."

A spoofed device can report any coordinate. A genuinely stranded worker **actually inhabits** that environment — and the environment leaves dozens of independent, hard-to-fake traces across device sensors, network state, and movement history.

Our system runs a **Multi-Signal Trust Scoring Model** at claim time. Every claim is evaluated across five orthogonal signal families, fused by a weighted ensemble ML model into a **risk score from 0 (certain legitimate) to 100 (certain fraud)**. A genuine worker naturally satisfies the majority of these checks without any extra action.

---

### Signal 1 — Device Sensor Coherence

A GPS spoofing app runs at the application layer. The phone's IMU — accelerometer, gyroscope, barometer, ambient light sensor — has no idea it's supposed to be in a flood zone.

| Scenario | Sensor Behavior |
|----------|----------------|
| Genuine worker in monsoon | Micro-vibrations, irregular orientation shifts, low-pressure barometric readings |
| Fraudster on couch | Flat, stationary IMU signature — contradicts claimed outdoor emergency |

---

### Signal 2 — Network Triangulation Delta

GPS coordinates are software. Cell tower handshake sequences are physics.

- If GPS says **Andheri West** but tower handoff log shows the device pinging the same three towers in **Thane for 4 hours** — that's a hard geographic contradiction
- Wi-Fi BSSID proximity scans add a second independent layer — BSSIDs are tied to physical access points

The larger the delta between GPS claim and network-derived position, the higher the risk score contribution.

---

### Signal 3 — Behavioral Trajectory Continuity

Real stranded workers have a **story before the claim**:

```
Office → Road → Approaching flood zone → Slowing → Stopped
```

Fraudulent actors "teleport":

```
Home → Sudden claim from flood zone (no travel path, impossible speed, no delivery order)
```

Our model checks the **90-minute pre-claim trace** for displacement plausibility, velocity smoothness, and consistency with the real road network.

---

### Signal 4 — Hyperlocal Weather Grid Validation

We ingest real-time weather data (IMD + Windy + OpenWeatherMap) at **1 km² polygon resolution**.

- Claim coordinate checked against the **exact active alert polygon** — not just the general area
- Spoofing actors routinely pick neighborhoods that sound right but sit just outside the precise alert boundary
- Live road-closure feeds cross-referenced — a worker claiming to be stuck on a route that traffic data shows as flowing freely fails immediately

---

### Signal 5 — Historical Claim Pattern & Cohort Analysis

Every claim is evaluated against:

1. The worker's **own claim history**
2. The behavior of their **peer cohort on the same weather event**

A single claim in a 500-person event is unremarkable.  
**Forty claims from a 6-device cluster with overlapping onboarding dates, filed within 8 minutes of each other** — is a statistical signature that does not appear in legitimate emergency data.

---

## 2. The Data

### Data Points Captured Beyond GPS

| Category | Specific Data Points | Why It's Hard to Fake |
|----------|---------------------|----------------------|
| **Device Sensors** | Accelerometer XYZ variance, gyroscope drift, barometric pressure, ambient light | Hardware-layer sensors; no spoofing app reaches them without root access (which our SDK detects) |
| **Network Signals** | Cell tower IDs + handoff log, Wi-Fi BSSID scan list, Bluetooth beacon proximity | Requires physical presence; fabricating a consistent handoff sequence remotely is not feasible |
| **GPS Metadata** | SNR, satellite lock count, HDOP value, mock location API flag, developer mode status | Spoofing apps generate unnaturally perfect SNR and HDOP=0; legitimate GPS in bad weather shows degraded, noisy values |
| **Pre-Claim Trajectory** | 90-min GPS trace, per-segment speed, displacement vector, last delivery ping, road network plausibility | A fraudster cannot retroactively manufacture a coherent travel history through actual road geometry |
| **Weather Grid** | IMD/Windy 1 km² alert polygon membership, live road-closure feeds, radar rainfall at claim coordinate | Checks the exact coordinate — a spoofed pin in the "right neighborhood" fails polygon intersection |
| **Claim Graph** | Shared onboarding dates, overlapping delivery zones, claim timing distribution, pairwise device linkage | 500 coordinated actors produce a graph density score in the 99th percentile — detectable by claim #20 |
| **App Telemetry** | App foreground/background state, screen-on pattern, CPU load, battery temperature | Spoofing apps run in background; their CPU/battery signatures differ measurably from active outdoor use |

---

### Ring Detection — Claim Graph Analysis

We model every claim on a weather event as a node in a directed graph. Edges represent shared attributes: same onboarding cohort, overlapping delivery zones, co-located towers, or correlated filing timestamps.

We compute a **Cluster Density Score per event in real time**. Any cluster crossing the 99th percentile threshold triggers a **Ring Review flag** — payouts for that cluster are paused pending human review.

> The Telegram syndicate from the threat report would have produced a cluster with density scores **40–60x above baseline** — detectable before the 30th payout, long before the pool is materially drained.

---

## 3. The UX Balance

> Falsely denying a genuine stranded worker during an emergency is worse than missing a single fraudulent claim. Our system is calibrated around this asymmetry: **never block, always delay with transparency.**

### Risk Tier Framework

| Score | Tier | System Action | Worker Experience |
|-------|------|---------------|------------------|
| **0–30** | Trusted | Auto-approve, payout in under 60 seconds | No friction. Instant push notification. |
| **31–70** | Soft Flag | Passive re-verify (2–3 min); 60% advance released immediately | "Checking live weather data" — no accusatory language. Partial payment arrives while check runs. |
| **71–100** | Hard Flag | Full payout held; routed to human review | Live status tracker in app. Estimated resolution time shown. No ambiguity. |

---

### Soft-Flag Workflow — Step by Step

**Step 1 — Instant Acknowledgment (t = 0s)**  
Worker receives: *"Claim received — cross-checking with IMD weather grid. Usually takes under 3 minutes."*  
No accusation. No friction. Just information.

**Step 2 — 60% Advance Payment (t = 0–90s)**  
Before passive verification even completes, **60% of the calculated payout is disbursed**. The worker has money in hand while the check runs.

**Step 3 — Passive Auto-Verification (t = 0–3 min)**  
System re-runs trust model with updated cell tower data, refreshed weather polygon, and 90-second trajectory extension. For most genuine workers, this clears the flag automatically — no worker action required.

**Step 4 — Optional Manual Step (if passive fails)**  
Worker chooses ONE of:
- Geostamped photo
- 10-second video clip
- Corroboration from another verified partner in their zone

Framed as *"help us get you paid faster"* — not a demand for proof. Completing this releases the remaining 40% within 60 seconds.

**Step 5 — Human Review with Full Transparency (escalation only)**  
Worker sees live status tracker + estimated resolution window. Reviewer sees full signal report — not just a score. If cleared, worker's trust profile improves and future claims face less friction.

---

### Network Drop Grace Period

A genuine GPS signal dropout in severe weather is expected. Our system holds the **last verified location as valid for 8 minutes** after signal loss.

If a worker was confirmed inside the alert polygon before the drop, they are treated as still inside — unless independent non-GPS signals actively contradict it.

---

### What We Never Do

- Block 100% of the payout pending review — 60% advance is always released
- Ask for more than one verification action
- Use "fraud detected" language anywhere in the worker UX
- Require re-verification mid-storm once a claim is in flight
- Permanently penalize false positives — cleared flags update trust score positively

---

## 4. Architecture Layers

The trust scoring logic runs across **three distinct layers**, each with a specific responsibility. Separating them matters because a coordinated attack will probe for the weakest layer first.

---

### Layer 1 — Edge Validation (On-Device SDK)

The first line of defence runs **inside the worker app**, before any network call is made.

| Check | What It Detects |
|-------|----------------|
| Mock location API flag | Android exposes whether a mock location provider is active |
| Root / jailbreak detection | OS-level compromise — prerequisite for deep-layer spoofing |
| IMU sanity check (30s snapshot) | False IMU data is synthetically smooth; real outdoor environments are noisy |

Edge validation does **not block claims**. It appends a device integrity tag to the payload that the cloud model factors into the trust score. Worker experience is preserved.

---

### Layer 2 — Real-Time Scoring Engine (Cloud Microservice)

A **separate microservice** — not embedded in the claims processing service — so it can be updated continuously as attack patterns evolve, without touching the claims flow.

| Component | Role |
|-----------|------|
| **Signal Aggregator** | Pulls cell tower logs, Wi-Fi scans, IMD weather polygon, road-closure feed, and pre-claim trajectory **in parallel** — target latency under 1.5 seconds |
| **Feature Store** | Pre-computed worker history features served at low latency without hitting the main database |
| **Ensemble Scorer** | Weighted model combining all signals into 0–100 risk score; **retrained weekly** on labeled outcomes from human-reviewed claims |
| **Claim Graph Engine** | Maintains live graph of claims per event; updates cluster density score in real time; triggers Ring Review flag at 99th percentile |
| **Decision Router** | Translates score → action; emits event to claims service and notification service |

---

### Layer 3 — Retrospective Learning & Feedback Loop

The scoring engine is only as good as its training data. Layer 3 closes the loop:

- Every **human-reviewed claim** generates a labeled outcome — cleared claims improve worker trust profile; confirmed fraud enters the next training batch
- Ensemble model **retrained weekly** on the previous 30 days, biased toward recent outcomes
- **Ring Review outcomes** feed back into the claim graph model — confirmed ring density at level X moves the threshold below X
- A **nightly anomaly detection job** scans raw claim data for novel patterns outside known signal families — early warning for attack variants not yet seen

> A static scoring model loses value within weeks. The feedback loop is what makes the architecture durable rather than just correct at launch.

---

## 5. Adversary Evolution

The threat in this brief is not the final form of this attack. A syndicate that successfully drained one platform has both the incentive and the technical feedback to adapt.

---

### Variant A — Sensor Spoofing (6–12 month horizon)

Root-level IMU manipulation tools exist and will become more accessible. An attacker with a rooted device and custom kernel module can feed false accelerometer and barometric data to any app.

**Our counter:**
- Root detection in Layer 1 raises the base risk score before any other signal is evaluated
- False IMU data tends to be **synthetically smooth** — real physical environments produce irregular, noisy sensor output. We train on legitimate signal distributions and flag implausibly clean readings

---

### Variant B — Distributed Rings with Clean Profiles (3–6 month horizon)

Sophisticated syndicates won't reuse accounts with shared onboarding dates. They'll build **clean profiles with genuine delivery history**, spread across neighborhoods, and activate only during target events.

**Our counter:**
- Even clean profiles produce **timing correlation** during a coordinated attack — 80 claims within 12 minutes from accounts with no prior overlap still produces an anomalous density score
- Long-term investment in **behavioral biometrics**: typing cadence, scroll patterns, and in-app interaction fingerprints that are hard to replicate across a ring of devices

---

### Variant C — Legitimate Worker Recruitment (12+ month horizon)

The hardest variant: a syndicate recruits **actual registered delivery workers**, pays them a cut, and has them file real claims from real locations during real events — for deliveries they didn't actually attempt.

**Our counter:**
- **Delivery-chain validation** as a backstop: we cross-reference claims with the worker's active order log at claim time
- A worker with no open delivery within 3 km of the claimed zone — and no delivery for 90 minutes — has a plausibility problem the trust model weights heavily
- A recruited non-worker in a flood zone, with no delivery order to protect, fails this check without the system needing to know in advance they were recruited

---

### The Attack-Cost Table

| What We Make Harder for Attackers | What Stays Easy for Legitimate Workers |
|-----------------------------------|---------------------------------------|
| Requires root access (detectable) | Zero — standard app works normally |
| Must spoof 5 independent signal families simultaneously | Zero — physical presence satisfies all of them |
| Must build and maintain clean profiles over weeks | Zero — genuine work history is an asset |
| Must coordinate timing to avoid graph density spikes | Zero — genuine emergencies generate organic timing variance |
| Must beat a model retrained weekly on their own attack data | Zero — the learning loop improves accuracy for legitimate cases too |

---

## 6. Why This Is the Right Investment

### The Cost of Not Building This

At a modest average payout of ₹800/claim, a 500-worker syndicate drains **₹4,00,000 in hours** — before the platform can respond. At scale, the exposure is linear with platform size.

Secondary costs are harder to quantify but larger:
- Reinsurance terms **reprice immediately** after a fraud event at this scale
- Investor confidence in the liquidity model takes a hit
- Workers experiencing delayed legitimate payouts due to a drained pool create churn worth **multiples of the original fraud loss**

---

### The Cost of Building This

| Component | What It Requires | Scale Behavior |
|-----------|-----------------|---------------|
| Edge SDK (Layer 1) | One-time development; runs on worker's device | Fixed cost — zero infrastructure |
| Scoring Engine (Layer 2) | External API calls (weather, tower data), ML inference, feature store | Scales with claim volume; 80–85% of claims auto-approve at Layer 1 or early Layer 2 — expensive compute reserved for edge cases only |
| Feedback Loop (Layer 3) | Human reviewer time for escalations, weekly retraining pipeline | Reviewer volume decreases as model improves — cost goes **down** over time |

---

### The Ratio That Matters

| Metric | Value |
|--------|-------|
| Cost to score one claim (all APIs + inference) | ~₹1.20–2.00 |
| Average legitimate payout protected | ₹600–1,200 |
| Conservative fraud catch rate | 98% |
| Break-even point per month | First ~200 claims |

> The architecture costs less to run per claim than the platform charges in processing fees. The question is not whether this is affordable — it's whether the platform can afford to operate without it.

---

## Summary

| What We Don't Do | What We Do Instead |
|-----------------|-------------------|
| Trust GPS alone | Fuse 5 independent signal families |
| Block flagged workers | Delay with transparency + 60% advance |
| Use a static model | Retrain weekly on labeled outcomes |
| React after the pool drains | Detect rings by claim #20–30 |
| Treat fraud as a cost center | Frame it as margin protection with clear ROI |

---

> **"Spoofing a GPS coordinate is trivial. Simultaneously spoofing cell tower logs, IMU sensor data, battery telemetry, pre-claim trajectory history, and a 1 km² hyperlocal weather grid — while coordinating 500 people whose claim-graph density falls within normal statistical bounds — is not."**

---

*DEVTrails 2026 — Phase 1 Submission*
