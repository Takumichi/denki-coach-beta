# 現場でんき探偵 Pro — Pricing & Plan Specification

## Status

- **Decision date:** 2026-08-08
- **Recorded:** 2026-08-12
- **Status:** Current source of truth for pricing and plan design
- **Scope:** Product/pricing specification. Payment provider is not finalized.

> This document supersedes the late-July provisional pricing hypothesis such as 「500円 / 980円 / 法人1,980円〜」. Those figures are historical hypotheses only and must not be used for new implementation or financial assumptions unless explicitly reopened by a later decision.

## Current Plans

| Plan | Price | Target / Limit | Core direction |
|---|---:|---|---|
| Founder | ¥980 / month | First 100 users, maximum 12 months | Early adopter plan |
| SOLO Pro | ¥1,980 / month | Individual | Full individual feature set, AI support up to 30 uses/month |
| TEAM | ¥4,980 / month | Up to 5 users | Assignee management, team sharing, update history |
| BUSINESS | ¥9,800+ / month | Company / organization | Permissions, audit logs, exports, company templates, expanded business controls |

## Trial & Free-plan Policy

- **14-day free trial**
- **No permanent free plan**
- Trial UX should lead users naturally into paid plans without hiding safety-related functions.

## Safety Policy

Safety confirmation, warnings, and other safety-critical information are **available across all plans**.

Safety-related functionality must not be weakened, hidden, or paywalled merely to create plan differentiation.

## Paywall / Pricing Screen UX

- **SOLO Pro is the recommended/default highlighted plan.**
- Goal: users should be able to understand the plan, begin setup, and reach field-use readiness in approximately **1–2 minutes**.
- Pricing differences should be explained through user/team scale and management capability rather than withholding safety-critical guidance.

## Payment Provider

**TBD / not finalized.**

Square is under consideration, but no payment provider should be treated as a final architecture decision until the next internal meeting and explicit approval.

Do not hard-code a Square-specific implementation into the product architecture at this stage.

## Implementation Guardrails

1. Treat this document as the pricing/plan source of truth until superseded by a newer approved decision.
2. Do not reintroduce the late-July provisional pricing into UI, documentation, financial assumptions, or code.
3. Keep payment-provider integration abstract until the provider is formally approved.
4. Preserve safety-critical features across all plans.
5. Keep the Founder cap and maximum duration explicit in product logic/design when implementation begins.
6. TEAM must be designed around up to five users and shared operational visibility.
7. BUSINESS pricing starts at ¥9,800/month; any seat-, usage-, or company-size-based expansion remains a future design decision unless separately approved.

## Pending Reconciliation

The existing `docs/denki-pro-financial-model.xlsx` must be checked against this specification. Until that reconciliation is completed, any conflicting pricing values inside the spreadsheet should be considered **outdated assumptions**, not the current decision.

---

**Source of truth:** 2026-08-08 meeting decision, recorded in PR #1 before merge to `main`.
