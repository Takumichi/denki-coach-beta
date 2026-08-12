# 現場でんき探偵 Pro — Claude Code Configuration

## Project Overview

**現場でんき探偵 Pro**（β確認版）は、電気工事の現場記録・確認・整理を支援するプロジェクト管理ツール。

- **形式**: Static HTML/JavaScript SPA（Vue.js相当）
- **主要ファイル**: `src/app.js`, `src/styles.css`
- **対象ユーザー**: 電気工事現場の作業者・確認者・主任
- **状態**: main ブランチに統合済み・公開版に反映中

## Session Start Checklist

Claude Code がセッションを開始するときは、**判断や変更を行う前に** 以下を順番に確認する。

### 1️⃣ ドキュメント読み込み（順序厳守）

- [ ] `CLAUDE.md`（この文書）を読む
- [ ] `docs/DEVELOPMENT_HANDOFF_2026-08-12.md` を読む
  - PR #1 で何が起きたか、なぜ停止したか、何を直したか、どの条件で main へマージしたかの原因・判断経緯が記録されている
- [ ] `docs/PRICING_AND_PLAN_SPEC.md` を読む
  - 現在の料金・プランの正本（2026-08-08 会議決定）
- [ ] 必要な場合のみ `docs/denki-pro-financial-model.xlsx` を確認
  - ⚠️ 既知のレビュー指摘が残る未検証資料。修正・再検証まで価格判断・事業判断の正本として使わない

### 2️⃣ Git 状態確認

- [ ] `git branch --show-current` で現在ブランチを確認する
- [ ] `git status` で変更状態を確認する
- [ ] `git log --oneline -5` で最新コミットを確認する

### 3️⃣ 操作の条件確認

- **commit**: ユーザーから明示承認を受けた場合のみ実行
- **push**: ユーザーから明示承認を受けた場合のみ実行
- **merge**: ユーザーから明示承認を受けた場合のみ実行。操作内容を日本語で説明してから実行
- **main への直接 push**: 明示承認がない限り行わない

### 4️⃣ 報告フォーマット

Git/GitHub の重要操作を説明するときは、英語用語だけでなく日本語で操作結果を説明する。

例：「merge = 作業内容を正式版 main へ合流し、公開版へ反映される状態にします」

## Key Features

- 📋 **案件管理**: 複数プロジェクト（A邸、Bマンション、C店舗等）
- 📅 **カレンダー機能**: 工事スケジュール・工程管理
- 👥 **担当者管理**: 新人・確認者・主任の役割別管理
- 🛠️ **工具カタログ**: 手工具・電動工具・測定器の安全管理
- ⭐ **お気に入り機能**: 頻出工具・工程の標準化
- 💾 **ローカルストレージ**: denki-coach-beta-state-v1キーで状態保存
- ← **戻るボタン**: 詳細画面から前の画面へ戻る機能（2026-08-12 実装）

## Development Branch & Git Rules

**セッション固有のブランチ名を恒久ルールとして固定しない。** 今後は作業内容ごとにブランチ名を決定する。

- 作業開始時に `git branch --show-current` で現在ブランチを確認する
- commit / push は、ユーザーが明示承認した現在の作業ブランチに対してのみ行う
- `main` への直接 push は、明示承認がない限り行わない
- 変更追跡には PR を使用する
- 削除・リセット・強制プッシュなどの破壊的操作は明示承認なしに行わない

## Pricing & Plan（正本と参考資料の区分）

### 📌 料金・プランの正本

`docs/PRICING_AND_PLAN_SPEC.md` — **2026-08-08 会議決定・現在の正式仕様**

| プラン | 料金 | 対象 | 特徴 |
|--------|------|------|------|
| **Founder** | ¥980/月 | 先着100名・最大12ヶ月 | アーリーアダプタープラン |
| **SOLO Pro** | ¥1,980/月 | 個人向け | フル機能・AI支援30回/月 |
| **TEAM** | ¥4,980/月 | 5人まで | 担当者管理・チーム共有・更新履歴 |
| **BUSINESS** | ¥9,800+/月 | 会社向け | 権限管理・監査ログ・出力・テンプレート等 |

- **試用期間**: 14日間無料
- **無料プラン**: なし（永久無料プランはない）
- **安全機能**: すべてのプラン共通
- **推奨表示**: SOLO Pro を推奨・デフォルト表示
- **UX目標**: 現場開始まで1〜2分程度

### ⚠️ 古い情報・参考資料

- **7月末の旧仮説** (`500円 / 980円 / 法人1,980円〜`) は**廃止済み**。新規実装や財務判断に戻さない
- **決済事業者**: まだ決定していない。Square は候補だが正式決定ではない。実装は事業者に依存しない設計のままにする

### 📊 財務モデル（参考資料扱い）

`docs/denki-pro-financial-model.xlsx` には Codex レビューで複数の要修正点が見つかった。

修正・再検証されるまで、**価格判断・事業判断の正本として使わない**。

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

## Important Principles

Claude Code の判断基準：

- **「誰のミス」を探すのではなく、再発防止の仕組みに変える**
- ユーザーの言葉が技術用語と一致しない場合、意図を平易な日本語へ翻訳して確認する
- **既知の不具合を黙って正式版に入れない**
- ただし問題を領域ごとに分類し、アプリ本体に影響しない問題なら開発停止させない
- **正本（source of truth）を明確にする** — 古い仮説と正式決定を混同しない
- PRIVATE 情報（医療・福祉・家計・カード・認証情報・Secret）とプロジェクト情報を分離する
- commit / push / merge / deploy / 公開設定変更は明示承認の範囲内のみ実施する

## Current Status & Next Work

### ✅ 最近完了した作業

- 戻るボタン機能の実装・テスト（2026-08-12）
- PR #1 を main へマージ（b951c3e）
- 開発運用・Skill・財務の問題を分類・記録
- CLAUDE.md / ハンドオフドキュメントを整備

### 📋 今後のタスク

- [ ] `docs/denki-pro-financial-model.xlsx` を修正・再検証
- [ ] 決済事業者を正式決定（Square は候補だが暫定）
- [ ] β版機能テスト（ユーザーからのフィードバック確認）
- [ ] ドキュメントの定期更新（最低でも変更があったら CLAUDE.md に反映）

---

**Last Updated**: 2026-08-12  
**Maintained by**: Claude Code (Cloud) + ひろみん (User)  
**Emergency Contact**: こちらのドキュメントで記載されていない問題が起きたら、まず docs/DEVELOPMENT_HANDOFF_2026-08-12.md の「7. Claude Codeへの判断原則」を参照する
