# Claude Code Skills一覧の一次情報検証レポート

## TL;DR
- スクリーンショットに列挙された項目のうち、**Superpowers・GStack・Caveman・Compound Engineering・Context7・Agent Browser・Claude Mem・Playwright MCP・GitHub MCP・UI UX Pro Max・Hyperframes・shadcn/ui Skill・Vercel Agent Skills・Frontend Design・Impeccable の15項目は実在が確認できた**（GitHub公式リポジトリ・公式ドキュメント・作者本人のリポジトリで裏付け）。一方「Codex」「Planner」は一般名詞で複数の別物が該当し、どれを指すか一意に特定できない。
- **重要な事実誤認が1件**：「Superpowers＝Claude Codeを強化する拡張機能集（公式）」という説明は誤解を招く。Superpowersは**Jesse Vincent（GitHub: obra、Prime Radiant所属）が作った第三者/コミュニティ製プラグイン（MITライセンス）**であり、Anthropic公式マーケットプレイスに「収録」されているだけでAnthropicが開発・保証しているわけではない。
- スクリーンショット中の「github.com/your-repo/claude-skills」は**実在URLではなくプレースホルダ（雛形の穴埋め文字列）**。実際のAnthropic公式リポジトリは `github.com/anthropics/skills`。

## Key Findings

### 確認できた事実（実在・インストール可能）
以下はすべて実在し、GitHubまたは公式サイトからインストール可能であることを確認した：

1. **Superpowers** — 実在。`github.com/obra/superpowers`。作者はJesse Vincent（Prime Radiant）。MITライセンス。
2. **GStack (gstack)** — 実在。`github.com/garrytan/gstack`。作者はY Combinator CEOのGarry Tan。23個のスキルを含む。 [GitHub](https://github.com/garrytan/gstack)
3. **Caveman** — 実在。`github.com/JuliusBrussee/caveman`。トークン削減スキル。
4. **Compound Engineering** — 実在。`github.com/EveryInc/compound-engineering-plugin`。Every Inc.製。 [GitHub](https://github.com/everyinc/compound-engineering-plugin)
5. **Context7** — 実在。Upstash製MCPサーバー。 [Pasquale Pillitteri](https://pasqualepillitteri.it/en/news/210/context7-mcp-realtime-updated-documentation-claude-code) `upstash/context7`。
6. **Agent Browser** — 実在。`github.com/vercel-labs/agent-browser`（Vercel Labs製）。
7. **Claude Mem (claude-mem)** — 実在。`docs.claude-mem.ai`。永続メモリプラグイン。
8. **Playwright MCP** — 実在。Microsoft公式 `github.com/microsoft/playwright-mcp`。
9. **GitHub MCP** — 実在。GitHub公式 `github.com/github/github-mcp-server`。
10. **UI UX Pro Max** — 実在。`github.com/nextlevelbuilder/ui-ux-pro-max-skill`。
11. **Hyperframes** — 実在。`github.com/heygen-com/hyperframes`。
12. **shadcn/ui Skill** — 実在。複数の実装が存在（例：`masonjames/Shadcnblocks-Skill`）。
13. **Vercel Agent Skills** — 実在。`github.com/vercel-labs/agent-skills`（Vercel公式）。
14. **Frontend Design** — 実在。**Anthropic公式** `anthropics/skills` リポジトリに `frontend-design` として含まれる。
15. **Impeccable** — 実在。`github.com/pbakaus/impeccable`。作者Paul Bakaus。

### 部分的にしか特定できない項目
16. **Codex** — 「Codex」という名前のスキルは複数存在。OpenAIのCodex CLIをClaude Codeから呼ぶラッパースキル群（`shimo4228/codex-review`、`openai/codex-plugin-cc`、`skills-directory/skill-codex` 等）が該当。「コード生成・理解をサポート」という説明はOpenAI Codex CLIそのものを指す可能性もある。単一の公式「Codexスキル」は特定できない。
17. **Planner** — 「Planner/planning」系スキルは多数存在（`OthmanAdi/planning-with-files`、`am-will/codex-skills` の planner 等）。どれを指すか一意に特定できない。

### 未確認・不確実な点
- **「Superpowers＝公式」表記の誤り**：Anthropicの `claude-plugins-official` リポジトリはプラグインを「Anthropic内製（/plugins）」と「第三者/コミュニティ製（/external_plugins）」に明確に分けており、Superpowersは後者。claude.com/plugins/superpowers ページでも「Made by Jesse Vincent」と表記され、"Anthropic verified" バッジは付いていない（同ページ内のFrontend Design・Code Review・Skill Creator等の内製スキルには付いている）。二次情報（ZecCloud／pasqualepillitteri.it）は「2026年1月15日に公式Anthropicマーケットプレイスに受理された」と報じつつ、"It remains a third-party project with MIT license"（第三者プロジェクトのまま）と明記している。ただしこの受理日は単一の二次情報に基づくもので、一次情報では確認できていない。
- **「github.com/your-repo/claude-skills」**：これは実在するリポジトリではなく、スキル公開手順の説明でよく使われるプレースホルダ文字列。

## Details

### スキルとは何か（前提）
Anthropicの「Agent Skills」は、SKILL.mdファイルを中心とした指示・スクリプト・リソースのフォルダで、Claudeが必要に応じて動的に読み込む仕組み。 [github](https://github.com/Human-Codex/skills)  [GitHub](https://github.com/anthropics/skills) Anthropicは**2025年10月16日にAgent Skillsを導入し、2025年12月18日に `agentskills.io` でオープン標準として公開**した（Anthropic PMのMahesh Muragの発言、VentureBeat：「We're launching Agent Skills as an independent open standard with a specification and reference SDK available at https://agentskills.io」）。公式リポジトリは `github.com/anthropics/skills`（GitHubスター約16.7万、フォーク約2万）。Claude Codeでは `/plugin marketplace add` コマンドでマーケットプレイスを追加し、`/plugin install` でインストールする。 [Claude Code Docs](https://code.claude.com/docs/en/discover-plugins)

### 各スキルの詳細

**Superpowers**：14〜20個以上の構造化スキルを注入するオープンソースプラグイン。ブレインストーミング、TDD（テスト駆動開発）、体系的デバッグ、サブエージェント駆動開発などを含む。 [Claude](https://claude.com/plugins/superpowers) 作者はJesse Vincent（GitHub: obra、Prime Radiant所属）で、本人は同ツールを「a complete software development methodology for your coding agents（コーディングエージェントのための完全なソフトウェア開発方法論）」と表現している。**GitHubスターは265.8k超**（awesomeclaudeskills.com／obra/superpowers、2026年8月時点）、公式ページ（claude.com/plugins/superpowers）でのインストール数は約100万と表示。Anthropic公式マーケットプレイス（claude-plugins-official）に第三者プラグインとして収録され、`/plugin install superpowers@claude-plugins-official` でインストール可能。

**GStack (gstack)**：Y Combinator CEOのGarry Tanが自身のClaude Code設定をオープンソース化したもの。 [Augment Code](https://www.augmentcode.com/learn/garry-tan-open-sources-gstack-claude-code) 23個のスラッシュコマンド型スキルを「Think→Plan→Build→Review→Test→Ship→Reflect」のスプリント構造で提供。/ [Augment Code](https://www.augmentcode.com/learn/garry-tan-gstack-claude-code) office-hours、/plan-ceo-review、/ [AgentConn](https://agentconn.com/blog/gstack-claude-code-harness-open-source-2026/) qa（Playwrightベースの実ブラウザテスト）、/codex（OpenAI Codexによるクロスモデルレビュー）などを含む。 [Augment Code](https://www.augmentcode.com/learn/garry-tan-open-sources-gstack-claude-code) **2026年3月にGarry Tanが公開し、公開11日で39,000スター、6週間で85,000スター**（Towards AI）に達した。2026年8月時点でバージョンv1.57.6.0、**108K stars・16.1K forks**（Augment Code）。

**Caveman**：Claudeの出力を「原始人のような短い言葉」にさせてトークンを削減するスキル。作者JuliusBrussee（`github.com/JuliusBrussee/caveman`）。READMEによれば「**Average 65% output reduction across 10 chat-style prompts (range 22–87%), measured against default verbose replies. Output tokens only**（チャット形式10プロンプトで平均65%、範囲22〜87%の出力削減。出力トークンのみが対象）」。長時間のエージェント的コーディング実行では削減率は約8.5%にとどまる。Claude Code、Codex、Cursor等30以上のエージェントに対応。

**Compound Engineering**：Every Inc.製の公式プラグイン（`EveryInc/compound-engineering-plugin`、MITライセンス）。**36 skills・51 agents**（WotAI）を搭載し、コマンドは /ce-ideate→/ce-brainstorm→/ce-plan→/ce-work→/ce-compound の流れ。解決済み問題を `docs/solutions/` に文書化して「複利的」に知識を蓄積する。2026年8月5日時点で**23,930 stars**（MoClaw）。

**Context7**：Upstash製のMCPサーバー。最新・バージョン固有のライブラリドキュメントをリアルタイムで取得しプロンプトに注入する。無料・オープンソース。 [Pasquale Pillitteri](https://pasqualepillitteri.it/en/news/210/context7-mcp-realtime-updated-documentation-claude-code) `/plugin marketplace add upstash/context7` でインストール、 [Context7](https://context7.com/docs/clients/claude-code) または `claude mcp add` でMCPサーバーとして追加。

**Agent Browser**：Vercel Labs製。AIエージェントがWebページをプログラム的に操作・スクレイピングできるようにする。`npx skills add vercel-labs/agent-browser` でインストール。 [ColdIQ](https://coldiq.com/skills-directory/agent-browser) GitHubスター数約1万（10,648）。（注：類似名の別実装 `SawyerHood/dev-browser` や `browserbase/skills` も存在する。）

**Claude Mem (claude-mem)**：セッション間でコンテキストを永続化するプラグイン。ツール使用の観測を自動的に取得・圧縮し、将来のセッションで利用可能にする。 [Claude-Mem](https://docs.claude-mem.ai/introduction) ローカルのSQLiteデータベースに保存。 [Termdock Team](https://www.termdock.com/blog/claude-mem-persistent-memory-claude-code) mem-search、timeline-report、knowledge-agent などのヘルパースキルを同梱。 [Medium](https://medium.com/@markchen69/give-claude-a-memory-a-3-step-tutorial-for-claude-mem-c3d088b9b19d) 公式ドキュメントは `docs.claude-mem.ai`。

**Playwright MCP**：Microsoft公式のMCPサーバー。`github.com/microsoft/playwright-mcp`。アクセシビリティスナップショットを介してブラウザを操作。 [GitHub](https://github.com/microsoft/playwright-mcp) Claude Code、Cursor、VS Code等に対応。 [TestCollab](https://testcollab.com/blog/playwright-mcp) 公式MCPレジストリにも登録。 [GitHub](https://github.com/microsoft/playwright-mcp/releases)

**GitHub MCP**：GitHub公式のMCPサーバー。`github.com/github/github-mcp-server`。リポジトリ・Issue・PR・GitHub Actionsへの自然言語アクセスを提供。リモート（ホスト型）とローカル（Docker/Goバイナリ）の両方をサポート。 [GitHub](https://github.com/github/github-mcp-server)

**UI/UX Pro Max**：`nextlevelbuilder/ui-ux-pro-max-skill`。67のUIスタイル、161のカラーパレット、57のフォントペアリング、UXガイドライン等の検索可能なデータベースを提供する設計知能スキル。 [Team](https://ui-ux-pro-max-skill.com/) Python検索スクリプトを含む。GitHubスター約6万。

**Hyperframes**：`heygen-com/hyperframes`（HeyGen製）。HTMLを書いて動画をレンダリングする、エージェント向けの19個のAIスキルを同梱。 [GitHub](https://github.com/heygen-com/hyperframes/blob/main/CLAUDE.md)

**shadcn/ui Skill**：単一の公式スキルではなく複数実装が存在。`masonjames/Shadcnblocks-Skill`（2,500以上のshadcn/uiブロックの知識） [GitHub](https://github.com/masonjames/shadcnblocks-skill) などが代表例。shadcn/uiコンポーネントの選定・インストール・構成を支援。

**Vercel Agent Skills**：`vercel-labs/agent-skills`（Vercel公式）。React/Next.jsのパフォーマンス最適化ルール（45ルール）、 [Medium](https://medium.com/@richardhightower/supercharge-your-react-performance-with-vercels-best-practices-agent-skill-for-claude-code-codex-212d6d2c0d8e) Web Design Guidelines、writing handbook等を含む。関連して `vercel-labs/skills`（`npx skills` CLI）と skills.sh ディレクトリも公開。 [Vercel](https://vercel.com/changelog/introducing-skills-the-open-agent-skills-ecosystem)

**Frontend Design**：**Anthropic公式**の `anthropics/skills` リポジトリに `frontend-design` として含まれる。claude.comでは "Anthropic verified" バッジ付き。「AI slop（ありがちなAI生成デザイン）」を避け、洗練されたフロントエンドUIを生成する。 [GitHub](https://github.com/binjuhor/shadcn-lar/blob/main/.claude/skills/frontend-design/SKILL.md)

**Impeccable**：`github.com/pbakaus/impeccable`（作者Paul Bakaus）。Anthropicのfrontend-designを土台に、 [GitHub](https://github.com/pbakaus/impeccable) 23コマンド・7デザイン柱・ブラウザ内ライブ編集モードを追加したデザイン言語スキル。 [Chase AI](https://www.chaseai.io/blog/claude-code-impeccable-skill-frontend-design) `npx impeccable install` でインストール。 [GitHub](https://github.com/pbakaus/impeccable)

### 「Codex」「Planner」が一意に特定できない理由
「Codex」はOpenAIのコーディングエージェント/CLIの名称であると同時に、それをClaude Codeから呼び出すためのラッパースキルが複数の作者から公開されている（`shimo4228/codex-review`、`openai/codex-plugin-cc`、 [Zenn](https://zenn.dev/shimo4228/articles/codex-review-cross-model-decorrelation?locale=en) `skills-directory/skill-codex` 等）。「コード生成・理解をサポート」という説明はOpenAI Codex本体を指している可能性が高い。「Planner」も同様に、`OthmanAdi/planning-with-files` をはじめ「計画立案」系スキルが多数存在し、一意に定まらない。

## Recommendations

1. **投稿の事実確認を最優先で行うべき箇所**：「Superpowers＝公式拡張集」という表現は、視聴者に「Anthropicが作った公式ツール」と誤認させる。「コミュニティ製（作者: Jesse Vincent／MITライセンス）でAnthropic公式マーケットプレイスに収録」と正確に記載すべき。真にAnthropic公式なのは `anthropics/skills` 内の Frontend Design、Skill Creator、 [GitHub](https://github.com/anthropics/skills/tree/main/skills) Code Review、PDF/DOCX/PPTX/XLSX、brand-guidelines [GitHub](https://github.com/anthropics/skills/tree/main/skills) 等に限られる。

2. **「github.com/your-repo/claude-skills」は削除または訂正**：これはプレースホルダであり、実在リポジトリと誤認させる。正しい公式リポジトリ `github.com/anthropics/skills` に置き換えるべき。

3. **「Codex」「Planner」は具体的なリポジトリ名を明記**：どの実装を指すか曖昧なため、スクリーンショット元の投稿者に確認するか、代表的リポジトリ名（例：Codexは `openai/codex-plugin-cc`、Plannerは `OthmanAdi/planning-with-files`）を併記すべき。

4. **インストール前のセキュリティ確認**：Anthropic自身が公式マーケットプレイスであっても「プラグインが含むMCPサーバーやファイルをAnthropicは管理・検証できない」と明記している。 [GitHub](https://github.com/anthropics/claude-plugins-official) 特にPythonスクリプトを含むスキル（UI/UX Pro Max等）は実行前にコードを確認すべき。

**判断が変わる基準**：Anthropicが将来Superpowersを "Anthropic verified" として内製カテゴリ（/plugins）に移した場合、または投稿者が「Codex/Planner」の具体的リポジトリを明示した場合は、上記の評価を更新する。

## Caveats
- GitHubスター数・インストール数は日々変動する。本レポートの数値は主に2026年8月9日時点の確認値で、情報源により時点が異なる（例：Superpowersのスターは「約26万」の他に「約24.8万」「約26.58万」など幅がある）。
- Superpowersの「2026年1月15日公式受理」という日付は二次情報（ZecCloud／pasqualepillitteri.it）のみに基づき、一次情報では未確認。ただし「第三者製・MITライセンス」という核心部分は一次情報（obra/superpowers リポジトリ、anthropics/claude-plugins-official の内製/第三者区分、claude.com/plugins/superpowers の "Made by Jesse Vincent" 表記）で確認済み。
- Compound Engineingのスキル数（32／36）やSuperpowersのスキル数（14／20＋）は情報源によって異なり、バージョン更新で変化している。
- 「shadcn/ui Skill」「Codex」「Planner」は同名・類似名の実装が複数あり、スクリーンショットがどれを指すかは投稿の文脈がないと確定できない。
- mcpmarket.com、claudemarketplaces.com、skillsclaude.org、awesomeclaudeskills.com 等の第三者スキルディレクトリは網羅的だが、掲載＝Anthropic公認ではない点に注意。