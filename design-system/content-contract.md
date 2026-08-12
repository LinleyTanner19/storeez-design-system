# Content Contract — UX Copy and Information Sufficiency (Storeez DS)

> The judgment layer for words. Components own the **shape** of copy and the words for their own states; screens supply the domain words. AI surfaces obey the same ladder. Guidance, not a resolver — a designer or agent makes the call with the reasoning in front of them.

---

## 1. The right amount of information

Not minimal. Not complete. **Sufficient for the decision in front of the user, with one route to more.** Minimal fails because the user cannot decide. Complete fails because the decision is buried. Both are writing for the document, not the moment.

### The one-decision test

Before writing any surface, name the single decision or answer the user came for:

```
Does every element serve that decision?        → if no, it belongs one level deeper
Can the decision be made without leaving?      → if no, something essential is missing
Is there exactly one obvious route to more?    → if no, the disclosure ladder is broken
```

A surface that answers two decisions equally well answers neither. Split it.

### The disclosure ladder

Four rungs, each reachable from the one above, no rung a dead end:

| Rung | Carries | Example (KUMITE) |
|---|---|---|
| **Glance** | The state and the number that state depends on | "Live — 12 fights · 4 title bouts" |
| **Answer** | Why that state, in one sentence | "Kenzi leads 29–28 after 2 rounds" |
| **Working** | The attributed detail behind the answer | Per-round judge scores, round by round |
| **Source** | The record, bracket or scorecard it came from | The scorecard, signed by judge ID |

Most surfaces need Glance and Answer inline, Working one interaction away. **Source is never more than two.** If a user must leave the product to check something the product asserted, the product has failed.

### What "deeper" must never hide

The disclosure ladder goes **down**, never sideways. Deeper never means: another tab, another app, another log-in, a PDF. It means one interaction closer to the source.

---

## 2. AI copy — the same ladder, with honesty on top

AI output climbs the ladder like anything else — and adds the Honest AI contract:

| Rung | AI carries |
|---|---|
| **Glance** | The AI's answer, stated plainly |
| **Answer** | WHY it answered that way ("Based on your last 3 profile views") |
| **Confidence** | Numeric % + bar (≥70 success / 50–69 warning / <50 error) |
| **Override** | "Edit filters" / "Not helpful" — AI never blocks the manual path |
| **Source** | What it drew on (cached suggestions when offline: "AI is offline. Here are cached suggestions.") |

**AI never silently rewrites user content.** AI proposes; the user disposes. An AI-generated itinerary edit is an addition, never a replacement. When AI cannot answer: what was searched + why + 3 alternatives (ai-empty), never a dead end.

---

## 3. Vertical voice

| Vertical | Voice | Example |
|---|---|---|
| **Storeez base** | Direct, expert, dry | "Renewal due 30 Nov — Rs 14,200" |
| **KUMITE** | Power, discipline, martial heritage. Short sentences. No hype | "Fight 4 — Scoring" not "Get ready for an epic showdown!" |
| **Travelz** | Warm, practical, wanderlust-with-brains | "Next: ferry to Île aux Cerfs — 15 min" |

Sentence case everywhere. UPPERCASE only for 11px overlines + brand names. Numbers/IDs/records/dates in mono — the copy names them, the type marks them as data.

---

## 4. State copy contracts (component-owned, screen-supplied words)

| State | Shape (component owns) | Words (screen supplies) |
|---|---|---|
| **empty** | Why it's empty + a next step. Never a dead end | "No fights yet. Your first one is coming." |
| **error** | What failed + nothing was saved + retry + ref code | "Scores didn't save. Nothing was lost. Retry — ref KMT-8421" |
| **offline** | Cached data + "synced X ago" | "Scores saved offline. Will sync when connected." |
| **success** | Confirmation + next step | "Result published. Records updated." |
| **ai-thinking** | What it's doing + query text + "Still working…" | "Finding fighters in your weight class…" |
| **ai-empty** | What was searched + why + 3 alternatives | "No fighters found near Antananarivo. Broaden the search, check the event calendar, or view all fighters." |

## 5. Anti-patterns (never)

- ❌ "Error occurred" — what failed, what's lost, what to do next.
- ❌ "Please wait…" past 3s — say what's happening ("Syncing 4 scores…").
- ❌ Empty state with no action — every empty state has a next step.
- ❌ AI presented as fact — confidence + disclaimer always.
- ❌ Semantic-red for status — risk/status = labels + icons; red = error/danger only.
- ❌ Emoji in copy — icons carry meaning, words carry the rest.

---

## Related
- `design-system/surface-behaviour.md` — surface × cohort (senior = plain language + human fallback on errors)
- `design-system/dynamic-ds.md` — transversal core × vertical tier
- Swan equivalent: `~/Projects/swan/06_KNOWLEDGE_BASE/design-system/content-contract.md`
