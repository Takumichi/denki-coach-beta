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

## Skills & Resources

### Installed Skills
- **thought-partner-council**: Decision support & brainstorming
  - Thought Partner mode: Consultation
  - Multi Persona Council: A/B/C discussion
  - Devil's Advocate: Risk analysis
  - Forced Connections: Cross-domain ideas

### Project Resources
- `.claude/RESOURCES/Claude_Code_Skills_verification_report.md` — Skills audit
- `docs/denki-pro-financial-model.xlsx` — Financial planning

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

- [ ] Review & test thought-partner-council skill
- [ ] Verify financial model integration
- [ ] Merge PR #1 to main
- [ ] Update project documentation

---

**Last Updated**: 2026-08-09
**Branch**: claude/denki-tantei-pro-status-ciombn
