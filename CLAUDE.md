# 現場でんき探偵 Pro — Claude Code Configuration

## Project Overview

**現場でんき探偵 Pro**（β確認版）は、電気工事の現場記録・確認・整理を支援するプロジェクト管理ツール。

- **形式**: Static HTML/JavaScript SPA（Vue.js相当）
- **主要ファイル**: `src/app.js` (197KB), `src/styles.css` (266KB)
- **対象ユーザー**: 電気工事現場の作業者・確認者・主任

## Key Features

- 📋 **案件管理**: 複数プロジェクト（A邸、Bマンション、C店舗等）
- 📅 **カレンダー機能**: 工事スケジュール・工程管理
- 👥 **担当者管理**: 新人・確認者・主任の役割別管理
- 🛠️ **工具カタログ**: 手工具・電動工具・測定器の安全管理
- ⭐ **お気に入り機能**: 頻出工具・工程の標準化
- 💾 **ローカルストレージ**: denki-coach-beta-state-v1キーで状態保存

## Development Branch

**Working Branch**: `claude/denki-tantei-pro-status-ciombn`

- Commit & push to this branch only
- No direct main push without review
- Create draft PRs for tracking

## Pricing & Plan Source of Truth

The current approved pricing/plan specification is:

- `docs/PRICING_AND_PLAN_SPEC.md` — **2026-08-08 meeting decision / current source of truth**

Current plan summary:

- **Founder:** ¥980/month — first 100 users, maximum 12 months
- **SOLO Pro:** ¥1,980/month — individual full feature set, AI support up to 30 uses/month
- **TEAM:** ¥4,980/month — up to 5 users, assignee management, team sharing, update history
- **BUSINESS:** ¥9,800+/month — permissions, audit logs, exports, company templates, business controls
- **Trial:** 14 days
- **Permanent free plan:** none
- **Safety-critical features:** available across all plans
- **Pricing screen:** SOLO Pro highlighted as recommended; target 1–2 minutes to field-use readiness

The late-July provisional pricing hypothesis such as `500円 / 980円 / 法人1,980円〜` is **superseded** and must not be used for new implementation or financial assumptions.

**Payment provider is not finalized.** Square may be evaluated, but implementation must remain provider-agnostic until a later explicit decision.

## Skills & Resources

### Installed Skills
- **thought-partner-council**: Decision support & brainstorming
  - Thought Partner mode: Consultation
  - Multi Persona Council: A/B/C discussion
  - Devil's Advocate: Risk analysis
  - Forced Connections: Cross-domain ideas

### Project Resources
- `.claude/RESOURCES/Claude_Code_Skills_verification_report.md` — Skills audit
- `docs/PRICING_AND_PLAN_SPEC.md` — Current pricing and plan source of truth
- `docs/denki-pro-financial-model.xlsx` — Financial planning; must be reconciled with the 2026-08-08 pricing specification before merge

## Google Drive Integration

**External Hub**: ④ひな🎀外部連携ハブ_業務共有用
- 3者専用（ひろみん・ひなð・Claude）
- Local Bridge v1.1.0 稼働中
- 9ファイル監視・GAS自動管理

## Recent Commits

```
f27ae02 Integrate thought-partner-council skill and project resources
5425d88 Fix beta notice routing and timeline markers
36510e1 Fix beta home mobile interactions
```

## Next Steps

- [ ] Reconcile `docs/denki-pro-financial-model.xlsx` with `docs/PRICING_AND_PLAN_SPEC.md`
- [ ] Review & test thought-partner-council skill
- [ ] Confirm payment provider separately after internal review; do not assume Square is final
- [ ] Run beta functional QA
- [ ] Merge PR #1 to main only after the above checks pass
- [ ] Update project documentation as needed

---

**Last Updated**: 2026-08-12
**Branch**: claude/denki-tantei-pro-status-ciombn
