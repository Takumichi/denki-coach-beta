# 現場でんき探偵 Pro — Claude Code Configuration

## Project Overview

**現場でんき探偵 Pro**（β確認版）は、電気工事の現場記録・確認・整理を支援するプロジェクト管理ツール。

- **形式**: Static HTML/JavaScript SPA（Vue.js相当）
- **主要ファイル**: `src/app.js` (197KB), `src/styles.css` (266KB)
- **対象ユーザー**: 電気工事現場の作業者・確認者・主任

## First Read / Handoff

Claude Codeは作業開始時、判断や変更を行う前に次を確認する。

1. `CLAUDE.md`（この文書）
2. `docs/DEVELOPMENT_HANDOFF_2026-08-12.md` — **PR #1で何が起き、なぜ停止し、何を直し、どの条件でmainへマージしたかの原因解決・判断経緯**
3. `docs/PRICING_AND_PLAN_SPEC.md` — 現在の料金・プラン正本
4. 必要な場合のみ `docs/denki-pro-financial-model.xlsx` — 現在は既知のレビュー指摘が残る未検証資料

重要なGit/GitHub操作を説明するときは、英語用語だけでなく日本語で操作結果を説明する。特に merge / commit / push / pull / branch / PR / deploy は平易な日本語を添える。

## Key Features

- 📋 **案件管理**: 複数プロジェクト（A邸、Bマンション、C店舗等）
- 📅 **カレンダー機能**: 工事スケジュール・工程管理
- 👥 **担当者管理**: 新人・確認者・主任の役割別管理
- 🛠️ **工具カタログ**: 手工具・電動工具・測定器の安全管理
- ⭐ **お気に入り機能**: 頻出工具・工程の標準化
- 💾 **ローカルストレージ**: denki-coach-beta-state-v1キーで状態保存

## Development Branch

- 作業開始時に `git branch --show-current` で現在ブランチを確認する。
- Commit / push は、ユーザーが明示承認した現在の作業ブランチに対してのみ行う。
- `main` への直接 push は、明示承認がない限り行わない。
- 変更追跡にはPRを使用する。
- セッション固有のブランチ名を恒久ルールとして固定しない。

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
- `docs/DEVELOPMENT_HANDOFF_2026-08-12.md` — PR #1原因解決・判断経緯・再発防止ルール
- `docs/PRICING_AND_PLAN_SPEC.md` — Current pricing and plan source of truth
- `docs/denki-pro-financial-model.xlsx` — Financial planning workbook. **Known review findings remain; do not use it as an authoritative decision source until corrected and revalidated.**

## Google Drive Integration

**External Hub**: ④ひな🎀外部連携ハブ_業務共有用
- 3者専用（ひろみん・ひな🎀・Claude）
- Local Bridge v1.1.0 稼働中
- 9ファイル監視・GAS自動管理

## Next Steps

- [ ] Correct and revalidate `docs/denki-pro-financial-model.xlsx`
- [ ] Confirm payment provider separately after internal review; do not assume Square is final
- [ ] Run beta functional QA
- [ ] Update project documentation as needed

---

**Last Updated**: 2026-08-12
