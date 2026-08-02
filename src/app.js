const STORAGE_KEY = 'denki-coach-beta-state-v1';

const calendarSampleWorks = [
  sampleCalendarWork('work-july08-lighting', '2026/07/08', '10:00', '12:00', 'C店舗 内装工事', '1階客席', '照明取付', '新人Aさん', 'C店舗', 'fixtures'),
  sampleCalendarWork('work-july11-insulation', '2026/07/11', '09:30', '11:30', 'Bマンション 改修工事', '3階', '絶縁測定', '確認者Bさん', 'Bマンション', 'inspection'),
  sampleCalendarWork('work-july14-piping', '2026/07/14', '09:00', '12:00', 'A邸 新築工事', '2階', '配管工事', '担当者Aさん', 'A邸', 'wiring'),
  sampleCalendarWork('work-july14-fixtures', '2026/07/14', '13:30', '16:30', 'Bマンション 改修工事', '3階', '器具取付', '新人Aさん', 'Bマンション', 'fixtures'),
  sampleCalendarWork('work-july15-layout', '2026/07/15', '08:30', '11:00', 'C店舗 内装工事', '1階売場', '墨出し', '確認者Bさん', 'C店舗', 'wiring'),
  sampleCalendarWork('work-july15-panel', '2026/07/15', '13:00', '16:00', 'A邸 新築工事', '1階', '分電盤結線', '主任Cさん', 'A邸', 'inspection'),
  sampleCalendarWork('work-july18-power', '2026/07/18', '14:00', '16:00', 'A邸 新築工事', '全階', '通電確認', '主任Cさん', 'A邸', 'inspection'),
  sampleCalendarWork('work-july22-inspection', '2026/07/22', '10:00', '12:30', 'C店舗 内装工事', '全体', '検査', '担当者Aさん', 'C店舗', 'inspection'),
  sampleCalendarWork('work-july28-correction', '2026/07/28', '09:00', '12:00', 'Bマンション 改修工事', '共用部', '手直し', '担当者Aさん', 'Bマンション', 'correction'),
  sampleCalendarWork('work-july31-cleanup', '2026/07/31', '15:00', '17:00', 'C店舗 内装工事', 'バックヤード', '清掃・片付け', '新人Aさん', 'C店舗', 'correction')
];

function sampleCalendarWork(id, date, startTime, endTime, projectTitle, floor, category, assignee, site, scheduleId) {
  return {
    id,
    date,
    startTime,
    endTime,
    projectTitle,
    floor,
    category,
    assignee,
    assistant: '新人Aさん',
    reviewer: '確認者Bさん',
    site,
    scheduleId,
    process: category,
    work: `${category}の作業内容と確認事項を工程表に沿って整理する。`,
    status: date < '2026/07/14' ? '完了' : date === '2026/07/14' && startTime === '09:00' ? '作業中' : '予定',
    progress: date < '2026/07/14' ? 100 : date === '2026/07/14' && startTime === '09:00' ? 45 : 0,
    nextAction: `${category}の次の確認項目を上司と共有する。`,
    supervisorCheck: '施工判断が必要な箇所は作業前に上司へ確認する。',
    author: '新人Aさん',
    updatedAt: '2026/07/13 18:30',
    updatedBy: assignee,
    reviewStatus: date < '2026/07/14' ? '確認済み' : '未確認'
  };
}

const toolCategories = ['手工具', '電動工具', '測定器', '安全用品', '消耗品', '配線材料', '取付材料', 'その他'];
const toolProcesses = ['図面確認', '墨出し', '配管', '配線', '器具取付', '分電盤', '検査', '是正・手直し'];

const defaultToolCatalog = [
  {
    id: 'tool-pliers', name: 'ペンチ', reading: 'ぺんち', aliases: ['電工ペンチ'], category: '手工具', processes: ['配線', '器具取付'],
    purpose: '電線の保持、曲げ、切断などに使う基本工具です。', beginnerNote: '握り方と刃の向きを確認してから、無理のない力で扱います。',
    preCheck: '刃の欠け、グリップの緩み、絶縁部分の傷を確認。', safetyNote: '活線では使用せず、切断対象を周囲から離して扱う。', askSupervisor: '会社指定のサイズと絶縁工具の扱いを確認する。', companyApproved: true, searchKeyword: 'ペンチ 電工工具', favorite: false, packingChecked: false
  },
  {
    id: 'tool-nippers', name: 'ニッパー', reading: 'にっぱー', aliases: ['電工ニッパー'], category: '手工具', processes: ['配線', '器具取付'],
    purpose: '電線や結束バンドの余分な部分を切断します。', beginnerNote: '切断面が飛ばない向きにし、必要な長さを残して切ります。',
    preCheck: '刃先の欠け、開閉の引っかかり、グリップの傷を確認。', safetyNote: '切断片の飛散に注意し、保護めがねのルールを守る。', askSupervisor: '切断してよい範囲と廃材の処理方法を確認する。', companyApproved: true, searchKeyword: 'ニッパー 電工', favorite: false, packingChecked: false
  },
  {
    id: 'tool-vvf-stripper', name: 'VVFストリッパー', reading: 'ぶいぶいえふすとりっぱー', aliases: ['VVF剥離工具', 'ストリッパー'], category: '手工具', processes: ['配線', '分電盤'],
    purpose: 'VVFケーブルの外装や絶縁被覆を所定の長さで剥きます。', beginnerNote: 'ケーブルの種類と剥離目盛を照合してから使用します。',
    preCheck: '刃の状態、目盛、ケーブルサイズの対応を確認。', safetyNote: '芯線を傷つけないよう、指定位置で軽く切れ目を入れる。', askSupervisor: '使用するケーブルに合う剥離位置と仕上がりを確認する。', companyApproved: true, searchKeyword: 'VVFストリッパー', favorite: false, packingChecked: false
  },
  {
    id: 'tool-electric-knife', name: '電工ナイフ', reading: 'でんこうないふ', aliases: ['ケーブルナイフ'], category: '手工具', processes: ['配線', '配管'],
    purpose: 'ケーブル外装の切り開きや梱包材の処理に使います。', beginnerNote: '刃先を自分や周囲へ向けず、浅く切り進めます。',
    preCheck: '刃の固定、折れや錆、収納状態を確認。', safetyNote: '使わないときは刃を収納し、腰袋の中で刃が露出しないようにする。', askSupervisor: '現場で使える刃物の種類と保管場所を確認する。', companyApproved: false, searchKeyword: '電工ナイフ ケーブル', favorite: false, packingChecked: false
  },
  {
    id: 'tool-crimping', name: '圧着工具', reading: 'あっちゃくこうぐ', aliases: ['リングスリーブ圧着工具', '圧着ペンチ'], category: '手工具', processes: ['配線', '分電盤'],
    purpose: '指定された接続材を圧着して電線を接続します。', beginnerNote: '電線本数とスリーブ記号を照合し、圧着後の刻印を確認します。',
    preCheck: '適合するスリーブ、工具サイズ、ラチェット解除を確認。', safetyNote: '電源を切った状態で作業し、圧着後の引張確認を行う。', askSupervisor: '会社ルールの圧着記号と確認方法を教えてもらう。', companyApproved: true, searchKeyword: '圧着工具 リングスリーブ', favorite: false, packingChecked: false
  },
  {
    id: 'tool-voltage-detector', name: '検電器', reading: 'けんでんき', aliases: ['検電ペン', '電圧検知器'], category: '測定器', processes: ['配線', '分電盤', '検査'],
    purpose: '電圧の有無を確認するための測定器です。', beginnerNote: '測定前後に既知の電源で動作確認する手順を覚えます。',
    preCheck: '電池、表示、先端、測定レンジを確認。', safetyNote: '検電だけで無電圧と断定せず、会社の停電確認手順を優先する。', askSupervisor: '検電器の使い方と無電圧確認の手順を確認する。', companyApproved: true, searchKeyword: '検電器 電圧検知', favorite: false, packingChecked: false
  },
  {
    id: 'tool-tester', name: 'テスター', reading: 'てすたー', aliases: ['マルチメーター', '回路計'], category: '測定器', processes: ['配線', '分電盤', '検査'],
    purpose: '電圧、導通などを確認するための測定器です。', beginnerNote: '測定対象とレンジを合わせ、リード線の接続を確認します。',
    preCheck: '電池、リード線、レンジ切替、表示を確認。', safetyNote: '測定方法を自己判断せず、対象回路と測定条件を確認する。', askSupervisor: '測定レンジ、測定箇所、記録方法を確認する。', companyApproved: false, searchKeyword: 'テスター マルチメーター', favorite: false, packingChecked: false
  },
  {
    id: 'tool-insulation-tester', name: '絶縁抵抗計', reading: 'ぜつえいたいこうけい', aliases: ['メガー', '絶縁計'], category: '測定器', processes: ['配線', '分電盤', '検査'],
    purpose: '回路の絶縁状態を確認するための測定器です。', beginnerNote: '測定対象を切り離す必要がある場合があるため、手順を先に確認します。',
    preCheck: '電池、測定コード、レンジ、校正表示を確認。', safetyNote: '測定電圧や放電手順を守り、接続された機器を傷めないようにする。', askSupervisor: 'メガーを使う回路、測定電圧、合否の記録方法を確認する。', companyApproved: true, searchKeyword: 'メガー 絶縁抵抗計', favorite: false, packingChecked: false
  },
  {
    id: 'tool-tape-measure', name: 'メジャー', reading: 'めじゃー', aliases: ['スケール', 'コンベックス'], category: '測定器', processes: ['図面確認', '墨出し', '器具取付'],
    purpose: '寸法や取付位置を測るために使います。', beginnerNote: '図面の基準点と現場の基準点をそろえて測ります。',
    preCheck: '目盛、爪、ロック、テープの戻りを確認。', safetyNote: 'テープの跳ね戻りに注意し、通路をふさがない。', askSupervisor: '基準寸法と測定結果の記録方法を確認する。', companyApproved: false, searchKeyword: 'メジャー コンベックス 工事', favorite: false, packingChecked: false
  },
  {
    id: 'tool-level', name: '水平器', reading: 'すいへいき', aliases: ['レベル'], category: '測定器', processes: ['墨出し', '器具取付', '配管'],
    purpose: '取付物や配管の水平・垂直を確認します。', beginnerNote: '測定面の汚れを取り、目盛の読み方を確認します。',
    preCheck: '気泡管、測定面、端部の欠けを確認。', safetyNote: '高所では落下防止と足場のルールを優先する。', askSupervisor: '許容差と確認する基準線を確認する。', companyApproved: false, searchKeyword: '水平器 レベル 工具', favorite: false, packingChecked: false
  },
  {
    id: 'tool-tool-bag', name: '腰袋', reading: 'こしぶくろ', aliases: ['工具差し', 'ツールバッグ'], category: '安全用品', processes: ['図面確認', '配管', '配線', '器具取付'],
    purpose: '必要な工具を身につけて持ち運ぶための入れ物です。', beginnerNote: '工具を詰め込みすぎず、刃物や重量物の位置を決めます。',
    preCheck: 'ベルト、金具、縫い目、落下防止を確認。', safetyNote: '高所では工具の落下防止を行い、通路に置かない。', askSupervisor: '現場で許可されている携帯方法を確認する。', companyApproved: false, searchKeyword: '腰袋 工具差し', favorite: false, packingChecked: false
  },
  {
    id: 'tool-helmet', name: 'ヘルメット', reading: 'へるめっと', aliases: ['保護帽', '安全帽'], category: '安全用品', processes: ['図面確認', '墨出し', '配管', '配線', '器具取付', '分電盤', '検査', '是正・手直し'],
    purpose: '現場で頭部を保護するための保護具です。', beginnerNote: 'あごひもを締め、着用前に外観と使用期限を確認します。',
    preCheck: '帽体、内装、あごひも、ラベルを確認。', safetyNote: '落下や強い衝撃を受けたものは使用を続けない。', askSupervisor: '現場指定の保護帽と着用ルールを確認する。', companyApproved: true, searchKeyword: 'ヘルメット 保護帽 工事', favorite: false, packingChecked: false
  },
  {
    id: 'tool-gloves', name: '保護手袋', reading: 'ほごてぶくろ', aliases: ['作業手袋', '絶縁手袋'], category: '安全用品', processes: ['配管', '配線', '器具取付', '是正・手直し'],
    purpose: '切創、汚れ、摩擦などから手を保護します。', beginnerNote: '作業内容に合う種類を選び、サイズを合わせます。',
    preCheck: '破れ、汚れ、湿り、サイズを確認。', safetyNote: '電気用保護具の扱いは、会社の点検・交換ルールを守る。', askSupervisor: '作業ごとに指定される手袋の種類を確認する。', companyApproved: true, searchKeyword: '保護手袋 作業手袋', favorite: false, packingChecked: false
  },
  {
    id: 'tool-cable-ties', name: '結束バンド', reading: 'けっそくばんど', aliases: ['ナイロンタイ', 'タイラップ'], category: '消耗品', processes: ['配線', '分電盤'],
    purpose: '配線をまとめ、仮固定や整理に使います。', beginnerNote: '締めすぎず、配線の識別や点検性を残して整理します。',
    preCheck: '長さ、幅、耐候性、必要数量を確認。', safetyNote: '余りを切るときは切断面を残さず、周囲を傷つけない。', askSupervisor: '使用箇所に合う材質と固定方法を確認する。', companyApproved: false, searchKeyword: '結束バンド ナイロンタイ', favorite: false, packingChecked: false
  },
  {
    id: 'tool-insulation-tape', name: '絶縁テープ', reading: 'ぜつえんてーぷ', aliases: ['ビニルテープ', '電工テープ'], category: '消耗品', processes: ['配線', '分電盤', '是正・手直し'],
    purpose: '配線の識別や端部の保護などに使うテープです。', beginnerNote: '用途に合う種類と色を選び、巻き終わりを整えます。',
    preCheck: '粘着、劣化、幅、色、残量を確認。', safetyNote: '絶縁テープだけで安全が確保できると判断しない。', askSupervisor: '補修・識別に使える範囲と会社指定品を確認する。', companyApproved: true, searchKeyword: '絶縁テープ ビニルテープ', favorite: false, packingChecked: false
  },
  {
    id: 'tool-screwdriver', name: 'ドライバーセット', reading: 'どらいばーせっと', aliases: ['プラスドライバー', 'マイナスドライバー'], category: '手工具', processes: ['器具取付', '分電盤', '是正・手直し'],
    purpose: '端子台や器具のねじを回すために使います。', beginnerNote: 'ねじ頭に合う先端を選び、押す力を保って回します。',
    preCheck: '先端の摩耗、絶縁グリップ、サイズを確認。', safetyNote: '電源を切る手順と、指定された絶縁工具の使用を優先する。', askSupervisor: '端子ごとの締付方法や指定ドライバーを確認する。', companyApproved: true, searchKeyword: 'ドライバーセット 電工', favorite: false, packingChecked: false
  },
  {
    id: 'tool-monkey-wrench', name: 'モンキーレンチ', reading: 'もんきーれんち', aliases: ['アジャスタブルレンチ'], category: '手工具', processes: ['配管', '器具取付'],
    purpose: 'ナットや継手を回すための調整式レンチです。', beginnerNote: '口幅を合わせ、ナットの面にしっかり掛けます。',
    preCheck: '開閉、ウォームギア、口の摩耗を確認。', safetyNote: '延長して過大な力をかけず、滑りに注意する。', askSupervisor: '締付方向と締付確認の方法を確認する。', companyApproved: false, searchKeyword: 'モンキーレンチ 配管', favorite: false, packingChecked: false
  },
  {
    id: 'tool-drill-driver', name: '充電ドライバー', reading: 'じゅうでんどらいばー', aliases: ['電動ドライバー', 'インパクト'], category: '電動工具', processes: ['墨出し', '器具取付', '配管'],
    purpose: 'ねじ締めや下穴あけを効率よく行う電動工具です。', beginnerNote: '回転方向、トルク、ビットの固定を確認してから使います。',
    preCheck: 'バッテリー、ビット、チャック、ブレーキを確認。', safetyNote: '保護具を着用し、回転部に手や衣服を近づけない。', askSupervisor: '使用許可、トルク設定、充電池の管理方法を確認する。', companyApproved: true, searchKeyword: '充電ドライバー 電工', favorite: false, packingChecked: false
  },
  {
    id: 'tool-conduit-cutter', name: '配管カッター', reading: 'はいかんかったー', aliases: ['パイプカッター'], category: '電動工具', processes: ['配管'],
    purpose: '指定された樹脂管などを切断するための工具です。', beginnerNote: '対象材と切断長さを確認し、まっすぐ切ります。',
    preCheck: '刃、ローラー、固定部、対応サイズを確認。', safetyNote: '切断片やバリに注意し、必要に応じて手袋を着用する。', askSupervisor: '対象となる管種、切断方法、端部処理を確認する。', companyApproved: false, searchKeyword: '配管カッター パイプカッター', favorite: false, packingChecked: false
  },
  {
    id: 'tool-marker', name: '墨出しマーカー', reading: 'すみだしまーかー', aliases: ['マーキングペン', '油性マーカー'], category: 'その他', processes: ['図面確認', '墨出し', '器具取付'],
    purpose: '基準位置や確認箇所を現場に印します。', beginnerNote: '図面と現場の基準を確認してから、消去可否を判断します。',
    preCheck: '色、太さ、残量、下地との相性を確認。', safetyNote: '消してよい場所かを確認し、仕上げ面を汚さない。', askSupervisor: '記入してよい範囲と使用する色を確認する。', companyApproved: false, searchKeyword: '墨出し マーカー', favorite: false, packingChecked: false
  },
];

const defaultState = {
  premium: false,
  activeToolId: 'tool-pliers',
  toolFilters: { keyword: '', category: 'すべて', process: 'すべて', favoriteOnly: false },
  tools: defaultToolCatalog,
  navigationVersion: 2,
  activeTab: 'home',
  activeProjectId: 'project-training-house',
  activeScheduleId: 'wiring',
  homeDate: '2026/07/14',
  homeListDate: '2026/07/14',
  calendarMonth: '2026/07',
  calendarMode: 'all',
  calendarPerson: '担当者Aさん',
  calendarSearch: '',
  selectedWorkDate: '2026/07/14',
  activeWorkId: 'work-july14-piping',
  activeAssignee: '担当者Aさん',
  activeCaseId: 'case-a-renovation-wiring',
  caseFilters: {
    keyword: '',
    type: 'すべて',
    process: 'すべて',
    assignee: 'すべて',
    status: 'すべて'
  },
  activePersonId: 'person-assignee-a',
  people: [
    { id: 'person-assignee-a', name: '担当者Aさん', role: '先輩', duty: '担当者' },
    { id: 'person-rookie-a', name: '新人Aさん', role: '新人', duty: '補助・記入者' },
    { id: 'person-reviewer-b', name: '確認者Bさん', role: '先輩', duty: '確認者' },
    { id: 'person-chief-c', name: '主任Cさん', role: '上司', duty: '現場責任者' },
    { id: 'person-admin', name: '管理者', role: '管理者', duty: '案件管理' }
  ],
  project: {
    id: 'project-training-house',
    title: '新築戸建 電気工事予習',
    client: '社内研修案件',
    schedule: '2026/07/03 現場前予習',
    location: '木造2階建て / 新築',
    address: 'サンプル県デモ市1-2-3',
    type: '新築',
    contractor: 'サンプル電設A社',
    startDate: '2026/07/03',
    endDate: '2026/07/24',
    status: '新人向け予習',
    supervisor: '主任Cさん',
    overallProgress: 45,
    assignee: '担当者Aさん',
    assistant: '新人Aさん',
    reviewer: '確認者Bさん',
    updatedBy: '担当者Aさん',
    memo: '木造2階建て新築の電気工事を、工程ごとに予習・記録する研修案件。',
    supervisorQuestion: '梁まわり、分電盤まわり、器具位置の判断が必要な場面を事前に確認する。',
    nextProcess: '配線作業'
  },
  projects: [
    {
      id: 'project-training-house',
      title: '新築戸建 電気工事予習',
      client: '社内研修案件',
      schedule: '2026/07/03 現場前予習',
      location: '木造2階建て / 新築',
      address: 'サンプル県デモ市1-2-3',
      type: '新築',
      contractor: 'サンプル電設A社',
      startDate: '2026/07/03',
      endDate: '2026/07/24',
      status: '新人向け予習',
      supervisor: '主任Cさん',
      overallProgress: 45,
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      reviewer: '確認者Bさん',
      updatedBy: '担当者Aさん',
      memo: '木造2階建て新築の電気工事を、工程ごとに予習・記録する研修案件。',
      supervisorQuestion: '梁まわり、分電盤まわり、器具位置の判断が必要な場面を事前に確認する。',
      nextProcess: '配線作業'
    },
    {
      id: 'project-renovation-a',
      title: 'A邸 リフォーム配線',
      client: 'A邸 改修工事',
      schedule: '2026/07/03 - 2026/07/17',
      location: '木造2階建て / リフォーム',
      address: 'テスト市モデル町4-5-6',
      type: 'リフォーム',
      contractor: 'サンプル電設A社',
      startDate: '2026/07/03',
      endDate: '2026/07/17',
      status: '作業中',
      supervisor: '主任Cさん',
      overallProgress: 60,
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      reviewer: '確認者Bさん',
      updatedBy: '担当者Aさん',
      memo: '既存配線の経路確認が必要。写真メモを多めに残す。',
      supervisorQuestion: '既存配線の切替と梁まわりの配線ルート変更を確認する。',
      nextProcess: '配線作業'
    },
    {
      id: 'project-fixture-b',
      title: 'Bマンション 器具取付',
      client: 'Bマンション 改修',
      schedule: '2026/07/10 - 2026/07/24',
      location: '集合住宅 / 器具取付',
      address: 'モデル県サンプル市7-8-9',
      type: '器具取付',
      contractor: 'デモ設備B社',
      startDate: '2026/07/10',
      endDate: '2026/07/24',
      status: '予定',
      supervisor: '主任Cさん',
      overallProgress: 20,
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      reviewer: '確認者Bさん',
      updatedBy: '確認者Bさん',
      memo: '器具品番、取付高さ、壁面状態を事前確認する。',
      supervisorQuestion: '取付位置変更が必要な場合の承認ルールを確認する。',
      nextProcess: '器具取付'
    }
  ],
  schedule: [
    {
      id: 'wiring',
      date: '2026/07/03',
      name: '配線作業',
      work: '図面と工程表を見ながら、配線ルート、スイッチ・コンセント位置、他業種との取り合いを確認する。',
      status: '作業中',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      progress: 60,
      nextAction: '2階居室のコンセント位置と回路番号を図面で照合する。',
      askSupervisor: '梁・間柱まわりで配線ルートを変える判断基準を確認する。',
      remaining: '分電盤まわり、浴室換気扇、弱電配線の確認。',
      photoMemo: '天井下地、分電盤予定位置、貫通部の写真を残す。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 21:04',
      updatedBy: '新人Aさん',
      reviewer: '確認者Bさん',
      reviewStatus: '要修正',
      internalMemo: '配線ルートは建築側の下地位置と合わせて確認中。',
      supervisorComment: '貫通部は勝手に判断せず、現地で一緒に確認すること。',
      nextInstruction: '次回は分電盤まわりの写真を追加する。'
    },
    {
      id: 'fixtures',
      date: '2026/07/10',
      name: '器具取付',
      work: '照明器具、スイッチ、コンセント、換気扇などの取付位置と取付順を予習する。',
      status: '予定',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      progress: 0,
      nextAction: '器具リストと平面図の記号を対応させる。',
      askSupervisor: '取付前に確認すべき傷・汚れ・下地位置を聞く。',
      remaining: '器具品番、必要工具、養生範囲の確認。',
      photoMemo: '器具箱、取付前の壁面、スイッチ高さの写真を残す。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 20:48',
      updatedBy: '新人Aさん',
      reviewer: '確認者Bさん',
      reviewStatus: '未確認',
      internalMemo: '器具リストと図面記号の対応を予習中。',
      supervisorComment: '取付前の壁面確認を忘れないこと。',
      nextInstruction: '器具品番と取付高さを一覧にする。'
    },
    {
      id: 'inspection',
      date: '2026/07/17',
      name: '検査・手直し',
      work: '通電前後の確認、表示、手直し、上司への報告内容を整理する。',
      status: '予定',
      assignee: '主任Cさん',
      assistant: '新人Aさん',
      progress: 0,
      nextAction: '検査前チェック項目を自分の言葉でメモする。',
      askSupervisor: '新人が触ってよい確認作業と、必ず指示を待つ作業を確認する。',
      remaining: '回路表示、写真整理、指摘事項メモの作成。',
      photoMemo: '分電盤表示、器具取付後、手直し箇所を残す。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 20:30',
      updatedBy: '新人Aさん',
      reviewer: '主任Cさん',
      reviewStatus: '未確認',
      internalMemo: '検査前に自分が見てよい範囲を整理する。',
      supervisorComment: '検査作業は必ず指示を受けてから行う。',
      nextInstruction: '検査項目を会社フォーマットと照合する。'
    },
    {
      id: 'correction',
      date: '2026/07/24',
      name: '是正確認',
      work: '指摘事項が残っていないか、会社の確認ルールに沿って見直す。',
      status: '要確認',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      progress: 20,
      nextAction: '前回の指摘メモを工程表に転記する。',
      askSupervisor: '施主検査前に新人が準備できる資料を確認する。',
      remaining: '写真メモの整理、未確認箇所の洗い出し。',
      photoMemo: '是正前後が分かる写真を組にして残す。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 20:12',
      updatedBy: '新人Aさん',
      reviewer: '確認者Bさん',
      reviewStatus: '確認済み',
      internalMemo: '是正前後の写真を同じ角度で残す。',
      supervisorComment: '写真の取り方は良い。未確認箇所だけ残すこと。',
      nextInstruction: '是正確認リストを次回までに更新する。'
    }
  ],
  photos: [
    {
      id: 'photo-wiring-1',
      scheduleId: 'wiring',
      projectTitle: 'A邸 リフォーム配線',
      relatedCaseId: 'case-a-renovation-wiring',
      date: '2026/07/03',
      status: '要相談',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      photographer: '新人Aさん',
      memo: '天井下地と配線ルートの確認用。貫通位置は主任Cさんに相談する。',
      src: '',
      author: '新人Aさん',
      updatedAt: '2026/07/03 21:00',
      updatedBy: '新人Aさん',
      reviewer: '確認者Bさん',
      reviewStatus: '要修正',
      internalMemo: '貫通予定位置の判断を保留。',
      supervisorComment: '写真だけでは判断しない。現地で確認する。',
      nextInstruction: '別角度の写真を追加する。'
    },
    {
      id: 'photo-wiring-2',
      scheduleId: 'wiring',
      projectTitle: 'A邸 リフォーム配線',
      relatedCaseId: 'case-a-renovation-wiring',
      date: '2026/07/07',
      status: '要相談',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      photographer: '新人Aさん',
      memo: '梁まわりの配線ルートが不明。上司確認用に撮影。',
      src: '',
      author: '新人Aさん',
      updatedAt: '2026/07/07 18:30',
      updatedBy: '新人Aさん',
      reviewer: '確認者Bさん',
      reviewStatus: '要修正',
      internalMemo: '既存配線ルート確認前の判断保留写真。',
      supervisorComment: '現場判断せず、既存配線ルート確認後に作業する。',
      nextInstruction: '別角度で梁下と配線入口を追加撮影する。'
    },
    {
      id: 'photo-fixtures-1',
      scheduleId: 'fixtures',
      projectTitle: 'Bマンション 器具取付位置確認',
      relatedCaseId: 'case-b-fixture-position',
      date: '2026/07/10',
      status: '確認前',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      photographer: '新人Aさん',
      memo: '器具取付前に、スイッチ高さと壁面状態を確認する予定。',
      src: '',
      author: '新人Aさん',
      updatedAt: '2026/07/03 20:50',
      updatedBy: '新人Aさん',
      reviewer: '確認者Bさん',
      reviewStatus: '未確認',
      internalMemo: '取付前の壁面状態を確認予定。',
      supervisorComment: '器具品番との対応も確認する。',
      nextInstruction: '器具取付前の写真を追加する。'
    }
  ],
  dailyWorks: [
    {
      id: 'work-a-wiring',
      date: '2026/07/04',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      reviewer: '確認者Bさん',
      site: 'A邸',
      scheduleId: 'wiring',
      process: '配線作業',
      work: '2階居室の配線ルートとコンセント位置を確認しながら、配線補助を行う。',
      status: '作業中',
      progress: 60,
      nextAction: '2階居室の回路番号を図面で照合する。',
      supervisorCheck: '梁まわりの配線ルート変更判断を確認者Bさんに確認する。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 21:18',
      updatedBy: '担当者Aさん',
      reviewStatus: '要修正'
    },
    {
      id: 'work-b-fixtures',
      date: '2026/07/04',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      reviewer: '確認者Bさん',
      site: 'Bマンション',
      scheduleId: 'fixtures',
      process: '器具取付',
      work: '器具リストと平面図を照合し、取付前の壁面状態を確認する。',
      status: '予定',
      progress: 0,
      nextAction: '器具品番と取付位置を一覧で確認する。',
      supervisorCheck: '取付前に確認すべき傷・汚れの基準を確認する。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 21:16',
      updatedBy: '担当者Aさん',
      reviewStatus: '未確認'
    },
    {
      id: 'work-a-helper',
      date: '2026/07/04',
      assignee: '新人Aさん',
      assistant: '担当者Aさん',
      reviewer: '確認者Bさん',
      site: 'A邸',
      scheduleId: 'wiring',
      process: '配線補助',
      work: '配線ルートの写真を撮り、判断が必要な箇所をメモする。',
      status: '作業中',
      progress: 40,
      nextAction: '写真メモを工程ごとに整理する。',
      supervisorCheck: '撮影してよい範囲と報告タイミングを確認する。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 21:20',
      updatedBy: '新人Aさん',
      reviewStatus: '未確認'
    },
    {
      id: 'work-c-photos',
      date: '2026/07/04',
      assignee: '新人Aさん',
      assistant: '担当者Aさん',
      reviewer: '確認者Bさん',
      site: 'C邸',
      scheduleId: 'correction',
      process: '写真整理',
      work: '是正前後の写真を整理し、上司確認待ちの箇所をまとめる。',
      status: '要確認',
      progress: 30,
      nextAction: '要相談写真を先輩確認に回す。',
      supervisorCheck: '是正前後の写真ペアが足りているか確認する。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 21:22',
      updatedBy: '新人Aさん',
      reviewStatus: '要修正'
    },
    {
      id: 'work-a-check',
      date: '2026/07/04',
      assignee: '確認者Bさん',
      assistant: '新人Aさん',
      reviewer: '主任Cさん',
      site: 'A邸',
      scheduleId: 'wiring',
      process: '確認済みチェック',
      work: '新人Aさんが整理した配線作業の記録と写真メモを確認し、修正が必要な箇所を戻す。',
      status: '完了',
      progress: 100,
      nextAction: '修正ポイントを新人Aさんへ共有し、次回の確認観点を決める。',
      supervisorCheck: '主任Cさんへ確認済みとして報告し、判断保留箇所の扱いを確認する。',
      author: '確認者Bさん',
      updatedAt: '2026/07/04 08:32',
      updatedBy: '確認者Bさん',
      reviewStatus: '確認済み'
    },
    {
      id: 'work-b-position',
      date: '2026/07/04',
      assignee: '確認者Bさん',
      assistant: '新人Aさん',
      reviewer: '主任Cさん',
      site: 'Bマンション',
      scheduleId: 'fixtures',
      process: '取付位置確認',
      work: '器具取付前に、図面記号、取付高さ、下地状態、他業種との干渉を確認する。',
      status: '要確認',
      progress: 50,
      nextAction: '取付位置の写真と図面メモを照合し、現場確認が必要な箇所を絞る。',
      supervisorCheck: '高さ変更や位置変更が必要な場合の判断ルールを主任Cさんに確認する。',
      author: '確認者Bさん',
      updatedAt: '2026/07/04 08:40',
      updatedBy: '確認者Bさん',
      reviewStatus: '要修正'
    },
    {
      id: 'work-a-inspection',
      date: '2026/07/05',
      assignee: '主任Cさん',
      assistant: '新人Aさん',
      reviewer: '管理者',
      site: 'A邸',
      scheduleId: 'inspection',
      process: '検査・手直し',
      work: '検査前の確認項目と新人が触ってよい作業範囲を整理する。',
      status: '予定',
      progress: 0,
      nextAction: '会社フォーマットの検査項目を確認する。',
      supervisorCheck: '新人が同席する確認範囲を決める。',
      author: '主任Cさん',
      updatedAt: '2026/07/03 19:40',
      updatedBy: '主任Cさん',
      reviewStatus: '確認済み'
    },
    ...calendarSampleWorks
  ],
  notices: [
    { id: 'notice-safety', date: '2026/07/14', title: '安全ミーティングのお知らせ', type: '安全', read: false },
    { id: 'notice-schedule', date: '2026/07/14', title: '工程変更のお知らせ', type: '工程変更', read: false },
    { id: 'notice-photo', date: '2026/07/13', title: '確認が必要な写真メモがあります', type: '写真メモ', read: false },
    { id: 'notice-comment', date: '2026/07/12', title: '上司コメントがあります', type: 'コメント', read: true }
  ],
  pastCases: [
    {
      id: 'case-a-renovation-wiring',
      title: 'A邸 リフォーム配線',
      type: 'リフォーム',
      process: '配線',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      reviewer: '確認者Bさん',
      status: '解決済み',
      situation: '既存配線の経路が不明で、梁まわりの配線ルート変更が必要か判断に迷った。',
      response: '現場判断せず、写真を残して上司確認。後日、既存配線のルートを確定してから作業した。',
      caution: '梁まわりの配線変更は必ず確認。既存配線の切断や移設は自分だけで判断しない。',
      photoMemo: '天井裏、梁まわり、既存配線の入り口と出口を同じ向きで撮影。',
      supervisorComment: '写真だけで判断せず、図面と現地を合わせて確認する。判断が必要な箇所は作業前に止める。',
      referenceAction: '似た状況では、配線ルート候補を写真付きで整理し、上司に「判断が必要な点」として渡す。',
      author: '新人Aさん',
      updatedAt: '2026/06/18 18:20',
      updatedBy: '確認者Bさん',
      reviewStatus: '確認済み'
    },
    {
      id: 'case-b-fixture-position',
      title: 'Bマンション 器具取付位置確認',
      type: '器具取付',
      process: '取付',
      assignee: '確認者Bさん',
      assistant: '新人Aさん',
      reviewer: '主任Cさん',
      status: '上司確認済み',
      situation: 'スイッチ高さと家具配置が干渉しそうで、図面通りに取付してよいか確認が必要だった。',
      response: '取付前の壁面写真、器具品番、平面図の記号をまとめて上司確認。位置変更の可否を確認してから取付した。',
      caution: '器具位置の変更は、施主確認や他業種との取り合いが関係するため、先に会社ルールを確認する。',
      photoMemo: '壁面全体、スイッチ予定位置、近くの建具や家具予定位置を撮影。',
      supervisorComment: '写真は近景と遠景を残す。位置変更の相談は、理由と影響範囲を添える。',
      referenceAction: '取付前に「位置変更が必要か」「誰の承認が必要か」を上司に確認する。',
      author: '確認者Bさん',
      updatedAt: '2026/06/22 19:10',
      updatedBy: '主任Cさん',
      reviewStatus: '確認済み'
    },
    {
      id: 'case-c-new-drawing',
      title: 'C邸 新築 図面確認',
      type: '新築',
      process: '図面確認',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      reviewer: '確認者Bさん',
      status: '要確認',
      situation: '建築図と電気図で収納内コンセントの位置表記がずれていた。',
      response: '図面の差分をメモし、現場で測る前に上司へ確認。建築側の納まりを確認してから位置を確定することになった。',
      caution: '図面の不一致は、自分の解釈で合わせない。どの図面を優先するかを確認する。',
      photoMemo: '該当壁面、収納内部、墨出し位置が分かる写真を残す予定。',
      supervisorComment: '図面差分は、該当ページ番号と記号をセットで残すと確認しやすい。',
      referenceAction: '図面確認では、電気図、建築図、現場位置の3点を並べてメモする。',
      author: '新人Aさん',
      updatedAt: '2026/06/25 20:05',
      updatedBy: '新人Aさん',
      reviewStatus: '未確認'
    },
    {
      id: 'case-d-aircon-circuit',
      title: 'D邸 エアコン専用回路',
      type: 'エアコン',
      process: '配線',
      assignee: '担当者Aさん',
      assistant: '新人Aさん',
      reviewer: '確認者Bさん',
      status: '上司確認済み',
      situation: 'エアコン専用回路の配線ルートが、下地と断熱材の位置に干渉しそうだった。',
      response: '予定ルートと別案を写真で残し、貫通位置と固定方法を上司に確認してから作業した。',
      caution: '貫通、固定、断熱材まわりは、会社ルールと現場責任者の指示を優先する。',
      photoMemo: 'エアコン位置、分電盤側、貫通候補位置、断熱材まわりを撮影。',
      supervisorComment: 'エアコン工事は電源だけでなく、外部配管や建築側の納まりも見る。',
      referenceAction: '配線ルート案を2つ出し、それぞれの注意点を上司確認リストへ入れる。',
      author: '新人Aさん',
      updatedAt: '2026/06/30 17:45',
      updatedBy: '確認者Bさん',
      reviewStatus: '確認済み'
    },
    {
      id: 'case-e-inspection-correction',
      title: 'E邸 検査後の是正確認',
      type: '是正',
      process: '手直し',
      assignee: '主任Cさん',
      assistant: '新人Aさん',
      reviewer: '管理者',
      status: '解決済み',
      situation: '検査後に器具表示と写真整理の不足が見つかり、是正前後の記録が必要になった。',
      response: '是正前後の写真を同じ角度で撮影し、指摘事項ごとに完了確認を残した。',
      caution: '是正完了の判断は、現場責任者と有資格者の確認を受ける。写真だけで完了扱いにしない。',
      photoMemo: '是正前、是正後、指摘番号、分電盤表示をセットで残す。',
      supervisorComment: '是正記録は、あとから社内で追えるように指摘番号と写真をそろえる。',
      referenceAction: '検査後は、残作業、写真不足、上司確認待ちを分けて整理する。',
      author: '主任Cさん',
      updatedAt: '2026/07/01 18:30',
      updatedBy: '主任Cさん',
      reviewStatus: '確認済み'
    }
  ],
  notes: [
    {
      time: '09:20',
      text: '建築施工管理の経験を活かして、他業種との取り合いと作業順を先に確認する。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 21:04',
      updatedBy: '新人Aさん',
      reviewer: '確認者Bさん',
      reviewStatus: '確認済み',
      internalMemo: '建築工程との関係を先に見ておく。',
      supervisorComment: 'その視点は良い。電気側の確認事項も分けて書くこと。',
      nextInstruction: '配線ルートの疑問点を工程表へ移す。'
    },
    {
      time: '09:35',
      text: '電気工事として判断が必要な点は自分で決めず、上司に確認する項目として残す。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 21:06',
      updatedBy: '新人Aさん',
      reviewer: '主任Cさん',
      reviewStatus: '確認済み',
      internalMemo: '判断保留の項目を見える化する。',
      supervisorComment: '判断しない作業を明確にできている。',
      nextInstruction: '確認が必要な作業は当日朝に共有する。'
    },
    {
      time: '10:10',
      text: '今日見るポイント: 配線ルート、分電盤位置、スイッチ高さ、写真を撮る場所。',
      author: '新人Aさん',
      updatedAt: '2026/07/03 21:10',
      updatedBy: '新人Aさん',
      reviewer: '確認者Bさん',
      reviewStatus: '未確認',
      internalMemo: '写真を撮る場所を先に決めておく。',
      supervisorComment: '分電盤まわりは特に多めに撮る。',
      nextInstruction: '写真メモを工程ごとに追加する。'
    }
  ],
  before: [
    { label: '今日の工程名と自分の担当範囲を確認', checked: true },
    { label: '図面記号と器具リストを照合', checked: true },
    { label: '上司に確認する質問を3つ書く', checked: false },
    { label: '必要工具と持ち物を確認', checked: false },
    { label: '現場で勝手に判断しない作業を確認', checked: true }
  ],
  after: [
    { label: '今日見た工程を工程表へ反映', checked: false },
    { label: '分からなかった用語・材料をメモ', checked: false },
    { label: '上司からの指示と注意点を整理', checked: true },
    { label: '次回の予習ポイントを決める', checked: false }
  ],
  betaTest: {
    status: '未確認',
    checks: [
      { label: '案件を新規作成できるか', checked: false },
      { label: '案件を編集できるか', checked: false },
      { label: '工程表が見やすいか', checked: false },
      { label: '進捗％がわかりやすいか', checked: false },
      { label: '担当者別工事一覧が見やすいか', checked: false },
      { label: '写真メモを追加・確認できるか', checked: false },
      { label: 'カレンダーから詳細へ移動できるか', checked: false },
      { label: '過去事例検索が使いやすいか', checked: false },
      { label: 'スマホで操作しやすいか', checked: false },
      { label: '現場前の確認に役立ちそうか', checked: false },
      { label: '上司確認メモが使いやすいか', checked: false }
    ],
    comments: {
      good: '',
      unclear: '',
      request: '',
      scene: '',
      unnecessary: ''
    }
  }
};

let state = loadPersistedState();
let toolDetailExpanded = true;
let saveStatus = {
  label: '保存済み',
  detail: 'ブラウザ内に保存済み',
  tone: 'saved'
};
let hasRendered = false;
let pendingSaveMessage = '';

const tabs = [
  { id: 'home', label: 'ホーム', icon: 'dashboard' },
  { id: 'calendar', label: '工程表検索', icon: 'schedule' },
  { id: 'record', label: '記録する', icon: 'record' },
  { id: 'notices', label: '連絡事項', icon: 'alert' },
  { id: 'menu', label: 'メニュー', icon: 'grid' },
  { id: 'projects', label: '案件', icon: 'briefcase' },
  { id: 'notes', label: '予習ノート', icon: 'note-pencil' },
  { id: 'before', label: '仕事前', icon: 'shield-check' },
  { id: 'schedule', label: '工程表', icon: 'timeline' },
  { id: 'assignments', label: '担当別', icon: 'people' },
  { id: 'cases', label: '過去事例', icon: 'search-stack' },
  { id: 'photos', label: '写真メモ', icon: 'camera' },
  { id: 'tools', label: '工具・資材検索', icon: 'wrench' },
  { id: 'people', label: '担当者', icon: 'people' },
  { id: 'after', label: '自宅整理', icon: 'home-check' },
  { id: 'beta', label: 'βテスト', icon: 'flask' }
];

const primaryTabIds = ['home', 'calendar', 'record', 'notices', 'menu'];
const quickTabIds = ['notes', 'before', 'schedule', 'assignments', 'cases', 'projects', 'photos', 'tools', 'people', 'after', 'beta'];

const tabInfo = {
  home: { category: 'ホーム', description: '今日の現場状況を俯瞰' },
  calendar: { category: '検索・参照', description: '日付と条件から工程を探す' },
  record: { category: '記録・共有', description: '写真・メモ・案件を残す' },
  notices: { category: '記録・共有', description: '連絡と注意事項を確認' },
  menu: { category: '機能一覧', description: '目的別に機能を選ぶ' },
  projects: { category: '検索・管理', description: '案件と現場情報を管理' },
  notes: { category: '記録・共有', description: '現場で使う要点をメモ' },
  before: { category: '準備・振り返り', description: '安全と手順を確認' },
  schedule: { category: '現場確認', description: '工程と進捗を確認' },
  assignments: { category: '現場確認', description: '担当者別に作業を確認' },
  cases: { category: '検索・管理', description: '過去の対応を参照' },
  photos: { category: '記録・共有', description: '写真とメモを残す' },
  tools: { category: '検索・管理', description: '工具・資材を探す' },
  people: { category: '現場確認', description: '連絡先と役割を確認' },
  after: { category: '準備・振り返り', description: '一日の学びを整理' },
  beta: { category: '機能一覧', description: '新機能を検証' }
};

const navigationCategories = [
  { id: 'field', label: '現場確認', description: '工程・担当・進捗をまとめて確認', icon: 'schedule', tabIds: ['schedule', 'assignments', 'people'] },
  { id: 'record', label: '記録・共有', description: '写真・メモ・連絡を残して伝える', icon: 'record', tabIds: ['notes', 'photos'] },
  { id: 'reference', label: '検索・管理', description: '案件・工具・過去事例を必要な時に探す', icon: 'search-stack', tabIds: ['projects', 'tools', 'cases'] },
  { id: 'prepare', label: '準備・振り返り', description: '仕事前後の確認事項を整理する', icon: 'clipboard-check', tabIds: ['before', 'after'] },
  { id: 'labs', label: '検証', description: '新しい機能を試す', icon: 'flask', tabIds: ['beta'] }
];

function tabCategoryLabel(tabId) {
  return tabInfo[tabId]?.category || '機能一覧';
}

function tabDescription(tabId) {
  return tabInfo[tabId]?.description || '';
}

const projectTypeOptions = ['新築', 'リフォーム', 'エアコン', '配線', '器具取付', '検査', '是正'];
const caseTypeOptions = ['すべて', '新築', 'リフォーム', 'エアコン', '配線', '器具取付', '検査', '是正'];
const caseProcessOptions = ['すべて', '図面確認', '配線', '取付', '検査', '手直し'];
const caseStatusOptions = ['すべて', '解決済み', '要確認', '上司確認済み'];
const personRoleOptions = ['新人', '先輩', '上司', '管理者'];
const personDutyOptions = ['担当者', '補助・記入者', '確認者', '現場責任者', '案件管理'];
const betaStatusOptions = ['未確認', '確認中', '改善必要', 'OK'];

const premiumFeatures = [
  '工程別の予習テンプレート保存',
  '写真メモの見出し整理',
  '上司への確認リスト出力',
  '社内報告用メモの作成準備'
];

function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function mergeState(defaultValue, savedValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(savedValue) ? savedValue : cloneState(defaultValue);
  }

  if (isPlainObject(defaultValue)) {
    const merged = {};
    Object.entries(defaultValue).forEach(([key, value]) => {
      merged[key] = mergeState(value, savedValue?.[key]);
    });

    if (isPlainObject(savedValue)) {
      Object.entries(savedValue).forEach(([key, value]) => {
        if (!(key in merged)) {
          merged[key] = value;
        }
      });
    }

    return merged;
  }

  return savedValue ?? defaultValue;
}

function normalizePersistedState(savedState) {
  const source = isPlainObject(savedState) ? { ...savedState } : {};

  if (source.navigationVersion !== 2 && source.activeTab === 'notes') {
    source.activeTab = 'home';
  }

  if (!Array.isArray(source.projects) && isPlainObject(source.project)) {
    const project = {
      ...defaultState.project,
      ...source.project,
      id: source.project.id || defaultState.project.id
    };
    source.projects = [project];
    source.activeProjectId = project.id;
  }

  const merged = mergeState(defaultState, source);
  if (!Array.isArray(merged.projects) || !merged.projects.length) {
    merged.projects = cloneState(defaultState.projects);
  }

  const savedTools = Array.isArray(merged.tools) ? merged.tools : [];
  const toolIds = new Set(savedTools.map(tool => tool.id));
  const missingTools = defaultToolCatalog.filter(tool => !toolIds.has(tool.id));
  merged.tools = [...savedTools, ...cloneState(missingTools)].map((tool, index) => ({
    ...tool,
    id: tool.id || `tool-legacy-${index}`,
    aliases: Array.isArray(tool.aliases) ? tool.aliases : [],
    processes: Array.isArray(tool.processes) ? tool.processes : [],
    favorite: Boolean(tool.favorite),
    packingChecked: Boolean(tool.packingChecked)
  }));

  // Remove the superseded prototype-only sample when upgrading an earlier preview.
  if (merged.tools.length > 20 && merged.tools.some(tool => tool.id === 'tool-safety-glasses')) {
    merged.tools = merged.tools.filter(tool => tool.id !== 'tool-safety-glasses');
  }

  if (!merged.tools.length) {
    merged.tools = cloneState(defaultToolCatalog);
  }

  if (!merged.activeToolId || !merged.tools.find(tool => tool.id === merged.activeToolId)) {
    merged.activeToolId = merged.tools[0].id;
  }

  merged.toolFilters = {
    keyword: '',
    category: 'すべて',
    process: 'すべて',
    favoriteOnly: false,
    ...(isPlainObject(merged.toolFilters) ? merged.toolFilters : {})
  };

  if (!merged.activeProjectId || !merged.projects.find(project => project.id === merged.activeProjectId)) {
    merged.activeProjectId = merged.projects[0].id;
  }

  const project = merged.projects.find(item => item.id === merged.activeProjectId) || merged.projects[0];
  merged.project = { ...defaultState.project, ...project };
  merged.navigationVersion = 2;

  const savedWorks = Array.isArray(merged.dailyWorks) ? merged.dailyWorks : [];
  const workIds = new Set(savedWorks.map(work => work.id));
  const missingSamples = defaultState.dailyWorks.filter(work => !workIds.has(work.id));
  merged.dailyWorks = [...savedWorks, ...cloneState(missingSamples)].map((work, index) => ({
    ...work,
    id: work.id || `work-legacy-${index}`,
    date: formatDate(work.date || merged.homeDate),
    startTime: work.startTime || '09:00',
    endTime: work.endTime || '17:00',
    projectTitle: work.projectTitle || `${work.site || 'サンプル現場'} 工事`,
    floor: work.floor || work.site || '現場',
    category: work.category || work.process || 'その他'
  }));

  if (!merged.people.some(person => person.name === merged.calendarPerson)) {
    merged.calendarPerson = merged.people[0]?.name || '';
  }

  return merged;
}

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneState(defaultState);
    return normalizePersistedState(JSON.parse(raw));
  } catch (error) {
    return cloneState(defaultState);
  }
}

function setSaveStatus(label, tone = 'saved', detail = tone === 'unsaved' ? 'まだ保存されていません' : 'ブラウザ内に保存済み') {
  saveStatus = { label, tone, detail };
  const status = document.querySelector('.save-status');
  if (!status) return;
  status.className = `save-status save-status-${tone}`;
  status.querySelector('span').textContent = label;
  status.querySelector('small').textContent = detail;
}

function persistState(message = '自動保存しました') {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setSaveStatus(message, 'saved', 'localStorage に保存済み');
  } catch (error) {
    setSaveStatus('未保存', 'unsaved', '保存容量またはブラウザ設定を確認してください');
  }
}

function resetToSampleState() {
  state = cloneState(defaultState);
  pendingSaveMessage = 'サンプルデータに戻しました';
  render();
}

function fileToDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result || ''));
    reader.addEventListener('error', () => resolve(''));
    reader.readAsDataURL(file);
  });
}

function render() {
  persistState(hasRendered ? pendingSaveMessage || '自動保存しました' : '保存済み');
  pendingSaveMessage = '';
  hasRendered = true;

  const app = document.querySelector('#app');
  app.innerHTML = `
    ${appHeader()}

    <main data-active-tab="${state.activeTab}">
      ${['home', 'calendar', 'notices', 'record', 'menu'].includes(state.activeTab) ? '' : safetyNotice()}
      <section class="screen screen-${state.activeTab}">
        ${screenCharacterVisual()}
        ${activeScreen()}
      </section>
      ${tabNavigation()}
    </main>
  `;
}

function appHeader() {
  if (state.activeTab === 'calendar') return '';
  const unread = (state.notices || []).filter(item => !item.read).length;

  return `
    <header class="topbar app-header">
      <button class="header-icon-button" data-tab="menu" type="button" aria-label="メニューを開く">${lineIcon('grid')}</button>
      <button class="header-brand" data-tab="home" type="button" aria-label="ホームへ戻る">
        <span class="helmet-mark" aria-hidden="true"><i></i>${lineIcon('bolt')}</span>
        <span class="header-brand-copy">
          <small>NEO FIELD TECH 3.0</small>
          <strong>現場でんき探偵 <em>Pro</em></strong>
        </span>
      </button>
      <button class="header-icon-button header-notice-button" data-tab="notices" type="button" aria-label="連絡事項 ${unread}件未読">
        ${lineIcon('alert')}
        ${unread ? '<span class="unread-dot" aria-hidden="true"></span>' : ''}
      </button>
    </header>
  `;
}

function lineIcon(name) {
  const paths = {
    bolt: '<path d="m13 2-8 11h6l-1 9 8-12h-6z" />',
    dashboard: '<rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" />',
    schedule: '<rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /><circle cx="16.5" cy="16.5" r="3.5" /><path d="M16.5 14.8v1.9l1.3.8" />',
    record: '<rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h4" /><path d="m12.5 17.5 5.2-5.2 2 2-5.2 5.2-3 1z" />',
    alert: '<path d="m12 3 9 17H3z" /><path d="M12 9v5M12 17v.01" />',
    grid: '<rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /><path d="M10 7h4M7 10v4M17 10v4M10 17h4" />',
    briefcase: '<path d="M4 8h16v11H4z" /><path d="M9 8V5h6v3M3 12h18M10 12v2h4v-2" />',
    'briefcase-plus': '<path d="M4 8h16v11H4z" /><path d="M9 8V5h6v3M3 12h18" /><path d="M12 14v4M10 16h4" />',
    'note-pencil': '<path d="M5 3h10l4 4v14H5z" /><path d="M15 3v5h4M8 11h6M8 15h4" /><path d="m12 19 5.2-5.2 2 2-5.2 5.2-3 1z" />',
    'shield-check': '<path d="M12 3 5 6v5c0 4.8 2.9 8.1 7 10 4.1-1.9 7-5.2 7-10V6z" /><path d="m9 12 2 2 4-4" />',
    timeline: '<path d="M4 6h16M4 12h16M4 18h16" /><circle cx="8" cy="6" r="2" /><circle cx="15" cy="12" r="2" /><circle cx="11" cy="18" r="2" />',
    people: '<circle cx="8.5" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c.6-3.3 2.8-5 5.5-5s4.9 1.7 5.5 5M14 15c3.5-.3 6 1.4 6 4" />',
    'search-stack': '<rect x="4" y="4" width="12" height="12" rx="2" /><path d="M7 8h6M7 11h4" /><circle cx="15.5" cy="15.5" r="4.5" /><path d="m19 19 2 2" />',
    camera: '<path d="M4 8h4l2-3h4l2 3h4v11H4z" /><circle cx="12" cy="13" r="3.5" /><path d="M17 11h.01" />',
    wrench: '<path d="M14.5 5.5a4.5 4.5 0 0 0 4.9 5.9l-8.2 8.2a2.2 2.2 0 0 1-3.1-3.1l8.2-8.2a4.5 4.5 0 0 0-1.8-2.8Z" /><path d="m5 19-2 2M7 17l-2 2" />',
    'home-check': '<path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /><path d="m8 13 2 2 4-4" />',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" /><path d="M7 15h10" />',
    'clipboard-check': '<rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2h6v2M8 10h4M8 14h3M14 14l1.5 1.5L18 13" />',
    'calendar-arrow': '<rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M8 16h8M13 13l3 3-3 3" />',
    'message-alert': '<path d="M4 5h16v11H9l-5 4z" /><path d="M12 8v4M12 14v.01" /><path d="M17 3v4M15 5h4" />',
    'route-search': '<path d="M5 4h.01M19 20h.01M5 4c6 0 3 8 9 8s3 8 5 8" /><circle cx="12" cy="7" r="3.5" /><path d="m14.5 9.5 2 2" />',
    reset: '<path d="M4 8V4h4" /><path d="M4.5 4.5A8 8 0 1 1 4 14" />',
    site: '<path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" />',
    memo: '<rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3h6v3H9z" /><path d="M8 10h8M8 14h8M8 18h5" />',
    prep: '<rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 3h8v3H8z" /><path d="m8 12 2 2 4-4M8 18h7" />',
    flow: '<path d="M5 4h14M5 10h14M5 16h14M5 20h7" />',
    team: '<circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c.6-3.3 2.8-5 6-5s5.4 1.7 6 5M14 15c3.5-.3 6 1.4 6 4" />',
    case: '<circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" />',
    photo: '<path d="M4 8h3l2-3h6l2 3h5v11H4z" /><circle cx="12" cy="13" r="3.5" />',
    tool: '<path d="m14.7 6.3 3-3a5 5 0 0 0 3.9 6.8l-8.6 8.6a2.3 2.3 0 0 1-3.2-3.2l8.6-8.6a5 5 0 0 0-3.7-.6Z" /><path d="m5 19-2 2M7 17l-2 2" />',
    heart: '<path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.7 4.7 0 0 1 12 6.5a4.7 4.7 0 0 1 8.8 2.3Z" />',
    check: '<path d="m5 12 4 4L19 6" />',
    external: '<path d="M14 5h5v5M19 5l-9 9" /><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />',
    shield: '<path d="M12 3 5 6v5c0 4.8 2.9 8.1 7 10 4.1-1.9 7-5.2 7-10V6z" /><path d="m9 12 2 2 4-4" />',
    user: '<circle cx="12" cy="8" r="3.5" /><path d="M5 20c.6-3.3 2.8-5 7-5s6.4 1.7 7 5" />',
    home: '<path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" />',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" />',
    plus: '<path d="M12 5v14M5 12h14" />',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" />',
    menu: '<path d="M4 6h16M4 12h16M4 18h16" />',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z" />',
    search: '<circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" />',
    clock: '<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />',
    back: '<path d="m15 18-6-6 6-6" />',
    chevron: '<path d="m9 18 6-6-6-6" />',
    megaphone: '<path d="m3 11 14-6v14L3 13z" /><path d="M6 14v5h4l1-4" />',
    beta: '<rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 3h8v3H8z" /><path d="m8 12 2 2 4-4M8 18h7" />'
  };

  return `<svg class="line-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name] || ''}</svg>`;
}

function assetImage(file, alt, className = '', loading = 'lazy') {
  return `<img class="${className}" src="./assets/characters/${file}" alt="${alt}" loading="${loading}" decoding="async">`;
}

function characterVisual(file, alt, className = '', loading = 'lazy') {
  return `<figure class="character-visual ${className}">${assetImage(file, alt, '', loading)}</figure>`;
}

function screenCharacterVisual() {
  const visuals = {
    before: ['03_checklist.png', '作業前チェックのイラスト'],
    schedule: ['04_completed.png', '工程完了のイラスト'],
    assignments: ['07_team.png', 'チームで働く電気工事士のイラスト'],
    cases: ['02_advice.png', '先輩からのアドバイスのイラスト'],
    projects: ['08_logo_character.png', '現場でんき探偵 Pro の公式キャラクター'],
    people: ['06_female_senior.png', '先輩電気工事士のイラスト'],
    after: ['05_warning.png', '安全確認の注意イラスト']
  };
  const visual = visuals[state.activeTab];

  return visual
    ? characterVisual(visual[0], visual[1], `screen-character-visual screen-character-visual-${state.activeTab}`, 'eager')
    : '';
}

function quickNavigation() {
  return `
    <nav class="quick-nav" aria-label="主要機能">
      ${navigationCategories.map(category => `
        <section class="quick-nav-group quick-nav-group-${category.id}" data-info-category="${category.id}">
          <header class="quick-nav-group-heading">
            <span class="quick-nav-group-icon" aria-hidden="true">${lineIcon(category.icon)}</span>
            <span><strong>${category.label}</strong><small>${category.description}</small></span>
          </header>
          <div class="quick-nav-group-items">
            ${category.tabIds.map(tabId => tabs.find(tab => tab.id === tabId)).filter(Boolean).map(tab => `
              <button class="quick-nav-item ${state.activeTab === tab.id ? 'is-active' : ''}" data-tab="${tab.id}" data-info-category="${category.id}" type="button">
                <span class="tab-icon tab-icon-${tab.icon}" aria-hidden="true">${lineIcon(tab.icon)}</span>
                <span class="quick-nav-item-copy"><strong>${tab.label}</strong><small>${tabDescription(tab.id)}</small></span>
                <span class="quick-nav-item-arrow" aria-hidden="true">${lineIcon('chevron')}</span>
              </button>
            `).join('')}
          </div>
        </section>
      `).join('')}
    </nav>
  `;
}

function tabNavigation() {
  return `
    <nav class="tabs bottom-nav" aria-label="画面切り替え">
      ${primaryTabIds.map(tabId => tabs.find(tab => tab.id === tabId)).filter(Boolean).map(tab => `
        <button class="tab ${tab.id === 'record' ? 'tab-record' : ''} ${bottomTabIsActive(tab.id) ? 'is-active' : ''}" data-tab="${tab.id}" type="button">
          <span class="tab-icon tab-icon-${tab.icon}" aria-hidden="true">${lineIcon(tab.icon)}</span>
          <span class="tab-label">${tab.id === 'calendar' ? '工程表' : tab.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

function bottomTabIsActive(tabId) {
  if (tabId === 'menu') return state.activeTab === 'menu' || quickTabIds.includes(state.activeTab);
  return state.activeTab === tabId;
}

function overallProgress() {
  return state.project.overallProgress;
}

function activeProject() {
  return state.projects.find(project => project.id === state.activeProjectId) || state.projects[0];
}

function applyActiveProject(project = activeProject()) {
  state.activeProjectId = project.id;
  state.project = { ...project };
  state.activeAssignee = project.assignee || state.activeAssignee;
}

function syncActiveProjectFromProject() {
  const index = state.projects.findIndex(project => project.id === state.activeProjectId);
  if (index >= 0) {
    state.projects[index] = { ...state.projects[index], ...state.project };
  }
}

function projectInputDate(date) {
  return (date || '').replaceAll('/', '-');
}

function projectScheduleLabel(project) {
  if (project.startDate && project.endDate) {
    return `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`;
  }

  return project.schedule || '日程未設定';
}

function projectLocationLabel(project) {
  return [project.address, project.type].filter(Boolean).join(' / ') || project.location || '現場情報未設定';
}

function nextScheduleItem() {
  return state.schedule.find(item => item.status === '作業中' || item.status === '要確認' || item.progress < 100) || state.schedule.at(-1);
}

function activeScheduleItem() {
  return state.schedule.find(item => item.id === state.activeScheduleId) || state.schedule[0];
}

function scheduleById(scheduleId) {
  return state.schedule.find(item => item.id === scheduleId);
}

function workById(workId) {
  return state.dailyWorks.find(work => work.id === workId);
}

function photosForSchedule(scheduleId) {
  return state.photos.filter(photo => photo.scheduleId === scheduleId);
}

function photosForCase(caseId) {
  return state.photos.filter(photo => photo.relatedCaseId === caseId);
}

function photosForDate(date) {
  const normalized = formatDate(date);
  return state.photos.filter(photo => formatDate(photo.date) === normalized);
}

function reviewPhotos() {
  return state.photos.filter(photo => photo.status === '要相談' || photo.reviewStatus === '要修正');
}

function photoSummaryForSchedule(scheduleId) {
  const photos = photosForSchedule(scheduleId);
  return {
    total: photos.length,
    needsReview: photos.filter(photo => photo.status === '要相談' || photo.reviewStatus === '要修正').length
  };
}

function scheduleName(scheduleId) {
  return state.schedule.find(item => item.id === scheduleId)?.name || '未設定工程';
}

function caseName(caseId) {
  return state.pastCases.find(item => item.id === caseId)?.title || '未設定の過去事例';
}

function peopleNames() {
  return state.people.map(person => person.name);
}

function activePerson() {
  return state.people.find(person => person.id === state.activePersonId) || state.people[0];
}

function peopleOptions(selected) {
  return peopleNames().map(person => `
    <option value="${person}" ${person === selected ? 'selected' : ''}>${person}</option>
  `).join('');
}

function replaceNameFields(record, oldName, newName) {
  ['assignee', 'assistant', 'reviewer', 'author', 'updatedBy', 'photographer', 'supervisor'].forEach(field => {
    if (record[field] === oldName) {
      record[field] = newName;
    }
  });
}

function replacePersonReferences(oldName, newName) {
  replaceNameFields(state.project, oldName, newName);
  [...state.projects, ...state.schedule, ...state.photos, ...state.dailyWorks, ...state.pastCases, ...state.notes, ...state.before, ...state.after].forEach(record => {
    replaceNameFields(record, oldName, newName);
  });

  if (state.activeAssignee === oldName) state.activeAssignee = newName;
  if (state.caseFilters.assignee === oldName) state.caseFilters.assignee = newName;
}

function workDates() {
  return [...new Set(state.dailyWorks.map(work => work.date))];
}

function calendarDates() {
  return [...new Set([
    ...state.schedule.map(item => item.date),
    ...state.dailyWorks.map(work => work.date),
    ...state.photos.map(photo => formatDate(photo.date))
  ])].sort();
}

function worksForDate(date) {
  return state.dailyWorks.filter(work => work.date === date);
}

function schedulesForDate(date) {
  return state.schedule.filter(item => item.date === date);
}

function groupWorksByAssignee(works) {
  return works.reduce((groups, work) => {
    if (!groups[work.assignee]) groups[work.assignee] = [];
    groups[work.assignee].push(work);
    return groups;
  }, {});
}

function worksByAssignee(date) {
  return groupWorksByAssignee(worksForDate(date));
}

function activeDailyWork() {
  const works = worksForDate(state.selectedWorkDate);
  return works.find(work => work.id === state.activeWorkId)
    || works.find(work => work.assignee === state.activeAssignee)
    || works[0];
}

function pastCaseText(item) {
  return [
    item.title,
    item.type,
    item.process,
    item.assignee,
    item.status,
    item.situation,
    item.response,
    item.caution,
    item.photoMemo,
    item.supervisorComment,
    item.referenceAction,
    item.reviewer
  ].join(' ').toLowerCase();
}

function filteredPastCases() {
  const keyword = state.caseFilters.keyword.trim().toLowerCase();

  return state.pastCases.filter(item => {
    const matchesKeyword = !keyword || pastCaseText(item).includes(keyword);
    const matchesType = state.caseFilters.type === 'すべて' || item.type === state.caseFilters.type;
    const matchesProcess = state.caseFilters.process === 'すべて' || item.process === state.caseFilters.process;
    const matchesAssignee = state.caseFilters.assignee === 'すべて' || item.assignee === state.caseFilters.assignee;
    const matchesStatus = state.caseFilters.status === 'すべて' || item.status === state.caseFilters.status;

    return matchesKeyword && matchesType && matchesProcess && matchesAssignee && matchesStatus;
  });
}

function syncActiveCaseWithFilters() {
  const results = filteredPastCases();
  if (!results.find(item => item.id === state.activeCaseId)) {
    state.activeCaseId = results[0]?.id || state.activeCaseId;
  }
}

function readCaseFiltersFromDOM() {
  document.querySelectorAll('[data-case-filter]').forEach(control => {
    state.caseFilters[control.dataset.caseFilter] = control.value;
  });
}

function clearCaseFilters() {
  state.caseFilters = {
    keyword: '',
    type: 'すべて',
    process: 'すべて',
    assignee: 'すべて',
    status: 'すべて'
  };
}

function activePastCase(results = filteredPastCases()) {
  return results.find(item => item.id === state.activeCaseId) || results[0] || state.pastCases[0];
}

function processNameForSchedule(scheduleId) {
  return {
    wiring: '配線',
    fixtures: '取付',
    inspection: '検査',
    correction: '手直し'
  }[scheduleId] || '';
}

function pastCasesForSchedule(scheduleId) {
  const process = processNameForSchedule(scheduleId);
  return state.pastCases.filter(item => item.process === process);
}

function primaryCaseForSchedule(scheduleId) {
  return pastCasesForSchedule(scheduleId)[0] || photosForSchedule(scheduleId).map(photo => state.pastCases.find(item => item.id === photo.relatedCaseId)).find(Boolean);
}

function similarPastCases() {
  const activeSchedule = activeScheduleItem();
  const matched = pastCasesForSchedule(activeSchedule.id);

  return (matched.length ? matched : state.pastCases).slice(0, 2);
}

function appDate(value) {
  const [year, month, day] = formatDate(value || state.homeDate).split('/').map(Number);
  return new Date(year, month - 1, day, 12);
}

function dateKey(date) {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
}

function shiftDate(value, amount) {
  const date = appDate(value);
  date.setDate(date.getDate() + amount);
  return dateKey(date);
}

function monthStart(value = state.calendarMonth) {
  const match = String(value || '').match(/^(\d{4})\/(\d{2})/);
  if (match) return new Date(Number(match[1]), Number(match[2]) - 1, 1, 12);
  const fallback = appDate(state.homeDate);
  return new Date(fallback.getFullYear(), fallback.getMonth(), 1, 12);
}

function monthKey(date) {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function longDateLabel(value) {
  const date = appDate(value);
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${weekdays[date.getDay()]}）`;
}

function workStartTime(work) {
  return work.startTime || '09:00';
}

function workEndTime(work) {
  return work.endTime || '17:00';
}

function workProjectTitle(work) {
  return work.projectTitle || `${work.site || 'サンプル現場'} 工事`;
}

function workFloor(work) {
  return work.floor || work.site || '現場';
}

const workCategoryGroups = [
  { label: '準備・確認', pattern: /図面確認|墨出し/ },
  { label: '施工', pattern: /配管|配線|器具取付|分電盤/ },
  { label: '検査・安全', pattern: /絶縁|通電|検査/ },
  { label: '完了・整理', pattern: /清掃|片付け|手直し|是正/ }
];

function workCategoryGroup(category) {
  const match = workCategoryGroups.find(item => item.pattern.test(String(category || '')));
  return match?.label || 'その他';
}

function workCategory(work) {
  return work.category || work.process || 'その他';
}

function calendarWorkLabel(category) {
  return {
    '配線作業': '配線',
    '配管工事': '配管',
    '器具取付': '器具',
    '絶縁測定': '測定',
    '通電確認': '通電',
    '清掃・片付け': '片付け',
  }[category] || category;
}

function calendarCategoryTone(category) {
  if (/墨出し|絶縁|検査/.test(category)) return 'green';
  if (/配管|分電盤|通電/.test(category)) return 'blue';
  if (/器具|手直し/.test(category)) return 'purple';
  if (/照明/.test(category)) return 'orange';
  if (/清掃|片付け/.test(category)) return 'teal';
  return 'gray';
}

function homeDashboardScreen() {
  const today = state.homeDate;
  const tomorrow = shiftDate(today, 1);
  const listDate = state.homeListDate || today;
  const works = worksForDate(listDate).sort((a, b) => workStartTime(a).localeCompare(workStartTime(b)));

  return `
    <div class="home-dashboard">
      <section class="home-greeting" aria-label="今日の挨拶">
        <div class="home-greeting-copy">
          <h2>おはようございます！</h2>
          <p>今日も安全第一で頑張りましょう！</p>
        </div>
        <div class="home-city-scene" aria-hidden="true">
          <span class="scene-sun"></span>
          <span class="scene-cloud scene-cloud-one"></span>
          <span class="scene-cloud scene-cloud-two"></span>
          <span class="scene-crane"></span>
          <span class="scene-buildings"><i></i><i></i><i></i><i></i><i></i></span>
        </div>
      </section>

      ${homeTodaySummary(works)}
      <section class="home-feature-grid" aria-label="ホームメニュー">
        ${homeFeatureCard('green', '本日の工事', '今日の現場と作業内容を確認できます', `data-home-work-date="${today}"`)}
        ${homeFeatureCard('blue', '明日の工事', '明日の予定と準備内容を確認できます', `data-home-work-date="${tomorrow}"`)}
        ${homeFeatureCard('yellow', '連絡事項', 'お知らせや注意事項を確認できます', 'data-tab="notices"')}
        ${homeFeatureCard('purple', '工程表検索', '工程表をカレンダーで確認・検索できます', 'data-tab="calendar"')}
      </section>

      <section class="home-secondary-grid home-quick-access" aria-label="クイックアクセス">
        ${homeSecondaryCard('projects', 'briefcase', '案件', '担当現場の情報や図面を確認')}
        ${homeSecondaryCard('photos', 'camera', '写真メモ', '現場写真やメモを記録・確認')}
        ${homeSecondaryCard('tools', 'wrench', '工具・資材検索', '工程に必要な道具を検索・確認')}
        ${homeSecondaryCard('people', 'people', '担当者', '関係者の連絡先と役割を確認')}
      </section>

      ${homeWorkList(listDate, works, today, tomorrow)}
    </div>
  `;
}

function homeTodaySummary(works) {
  const nextWork = works[0];
  const status = nextWork ? nextWork.status || '予定' : '準備中';
  const progressValue = nextWork && Number.isFinite(Number(nextWork.progress))
    ? Math.max(0, Math.min(100, Number(nextWork.progress)))
    : 0;
  const timeLabel = nextWork
    ? `${workStartTime(nextWork)}〜${workEndTime(nextWork)}`
    : '本日の予定なし';
  const nextAction = nextWork
    ? nextWork.nextAction || nextWork.work || workCategory(nextWork)
    : '予定を登録すると次の作業を表示します';
  const greeting = `
    <div class="home-summary-greeting" aria-label="今日の挨拶">
      <strong>おはようございます！</strong>
      <span>今日も安全第一で頑張りましょう！</span>
    </div>
  `;
  const action = nextWork
    ? `<div class="home-summary-actions">
        <button class="home-summary-action" data-work-id="${nextWork.id}" type="button">現場を確認する${lineIcon('chevron')}</button>
        <button class="home-summary-record" data-tab="record" type="button">${lineIcon('record')}<span>記録する</span></button>
      </div>`
    : '<span class="home-summary-empty-action">本日の予定を登録すると表示されます</span>';

  return `
    <section class="home-today-summary" aria-label="今日の現場サマリー">
      ${greeting}
      <div class="home-summary-heading">
        <div>
          <span class="section-kicker">TODAY / FIELD STATUS</span>
          <h2>今日の現場サマリー</h2>
        </div>
        <span class="home-summary-pulse" aria-hidden="true"></span>
      </div>
      <dl class="home-summary-grid">
        <div class="home-summary-project"><dt>現場名</dt><dd>${escapeHTML(nextWork ? workProjectTitle(nextWork) : '本日の現場は未登録')}</dd><span class="home-summary-time">${escapeHTML(timeLabel)}</span></div>
        <div><dt>次の工程</dt><dd>${escapeHTML(nextWork ? workCategory(nextWork) : '次の工程は未登録')}</dd></div>
        <div><dt>担当者</dt><dd>${escapeHTML(nextWork?.assignee || '担当者未設定')}</dd></div>
        <div class="home-summary-state"><dt>状態</dt><dd>${escapeHTML(status)}</dd></div>
        <div class="home-summary-progress"><dt>進捗</dt><dd><strong>${progressValue}%</strong><span class="home-summary-progress-track" style="--progress:${progressValue}%"><i></i></span></dd></div>
        <div class="home-summary-next"><dt>次にする作業</dt><dd>${escapeHTML(nextAction)}</dd></div>
      </dl>
      ${action}
    </section>
  `;
}

function homeFeatureCard(tone, title, body, actionAttribute) {
  const compactBody = {
    green: '今日の現場と作業を確認',
    blue: '明日の予定と準備を確認',
    yellow: 'お知らせと注意事項を確認',
    purple: '月間カレンダーから検索',
  }[tone] || body;
  const monthPrefix = String(state.homeDate || '').slice(0, 7);
  const featureMeta = {
    green: `${tabCategoryLabel('schedule')} · ${worksForDate(state.homeDate).length}件の工事予定`,
    blue: `${tabCategoryLabel('schedule')} · ${worksForDate(shiftDate(state.homeDate, 1)).length}件の工事予定`,
    yellow: `${tabCategoryLabel('notices')} · 未読 ${(state.notices || []).filter(item => !item.read).length}件`,
    purple: `${tabCategoryLabel('calendar')} · 今月 ${(state.dailyWorks || []).filter(work => String(work.date || '').startsWith(monthPrefix)).length}件`,
  }[tone] || '';

  return `
    <button class="home-feature-card home-feature-${tone}" ${actionAttribute} type="button">
      ${homeFeatureVisual(tone)}
      <strong>${title}</strong>
      <small>${compactBody}</small>
      <span class="home-feature-meta">${featureMeta}</span>
      <span class="home-feature-arrow" aria-hidden="true">${lineIcon('chevron')}</span>
    </button>
  `;
}

function homeFeatureVisual(tone) {
  if (tone === 'green' || tone === 'blue') {
    return `
      <span class="home-feature-visual feature-calendar-visual" aria-hidden="true">
        ${lineIcon(tone === 'green' ? 'clipboard-check' : 'calendar-arrow')}
        <i class="feature-${tone === 'green' ? 'sun' : 'moon'}"></i>
      </span>
    `;
  }

  if (tone === 'purple') {
    return `<span class="home-feature-visual feature-search-visual" aria-hidden="true">${lineIcon('route-search')}<i>${lineIcon('search')}</i></span>`;
  }

  return `<span class="home-feature-visual feature-megaphone-visual" aria-hidden="true">${lineIcon('message-alert')}</span>`;
}

function homeSecondaryCard(tab, icon, title, body) {
  const activeProjectCount = (state.projects || []).filter(project => Number(project.overallProgress) < 100).length;
  const statusByTab = {
    projects: `進行中${activeProjectCount}件`,
    photos: `確認待ち${reviewPhotos().length}件`,
    tools: `持ち物${(state.tools || []).filter(tool => tool.packingChecked).length}件`,
    people: `登録${(state.people || []).length}名`
  };
  const status = statusByTab[tab] || body;
  const category = tabCategoryLabel(tab);

  return `
    <button class="home-secondary-card home-secondary-${tab}" data-tab="${tab}" type="button">
      <span aria-hidden="true">${lineIcon(icon)}</span>
      <span><strong>${title}</strong><small class="home-secondary-status">${category} · ${status}</small></span>
      <i aria-hidden="true">${lineIcon('chevron')}</i>
    </button>
  `;
}

function homeWorkList(date, works, today, tomorrow) {
  const label = date === today ? '本日の予定' : date === tomorrow ? '明日の予定' : `${longDateLabel(date)}の予定`;
  return `
    <section class="home-work-section" id="home-work-list" aria-label="${label}">
      <div class="home-section-heading">
        <div><span class="section-accent"></span><h3>${label}</h3></div>
        <span>${works.length}件の工事予定</span>
      </div>
      <div class="home-work-list">
        ${works.length ? works.map(homeWorkRow).join('') : '<p class="home-empty-state">この日の工事予定はありません。</p>'}
      </div>
    </section>
  `;
}

function homeWorkRow(work) {
  return `
    <button class="home-work-row" data-work-id="${work.id}" type="button">
      <span class="home-work-time">${workStartTime(work)}〜${workEndTime(work)}</span>
      <span class="home-work-copy">
        <strong class="home-work-title">${escapeHTML(workProjectTitle(work))}</strong>
        <span class="home-work-meta"><span class="home-work-group">${escapeHTML(workCategoryGroup(workCategory(work)))}</span><span class="home-work-category">${escapeHTML(workCategory(work))}</span><span class="home-work-place">${escapeHTML(workFloor(work))} / ${escapeHTML(work.assignee || '担当者未設定')}</span></span>
      </span>
      <span class="home-work-status">${escapeHTML(work.status || '予定')}</span>
      <span class="home-work-arrow" aria-hidden="true">${lineIcon('chevron')}</span>
    </button>
  `;
}

function filteredCalendarWorks() {
  const keyword = String(state.calendarSearch || '').trim().toLowerCase();
  return state.dailyWorks.filter(work => {
    const personMatch = state.calendarMode !== 'person' || work.assignee === state.calendarPerson;
    const text = [workProjectTitle(work), work.site, workCategory(work), workFloor(work), work.assignee].join(' ').toLowerCase();
    return personMatch && (!keyword || text.includes(keyword));
  });
}

function calendarSearchScreen() {
  const month = monthStart();
  const monthLabel = `${month.getFullYear()}年 ${month.getMonth() + 1}月`;
  const works = filteredCalendarWorks();
  const selected = state.selectedWorkDate || dateKey(month);

  return `
    <div class="calendar-search-screen">
      <header class="calendar-screen-header">
        <button class="icon-button" data-tab="home" type="button" aria-label="ホームへ戻る">${lineIcon('back')}</button>
        <h2>工程表検索</h2>
        <div class="calendar-header-tools">
          <button data-action="show-calendar-filter" type="button" aria-label="絞り込み">${lineIcon('filter')}<span>絞り込み</span></button>
          <button data-action="focus-calendar-search" type="button" aria-label="検索">${lineIcon('search')}<span>検索</span></button>
          <span aria-label="カレンダー">${lineIcon('calendar')}</span>
        </div>
      </header>

      <section class="calendar-filter-panel" aria-label="表示条件">
        <div class="calendar-mode-switch">
          <button class="${state.calendarMode === 'all' ? 'is-active' : ''}" data-calendar-mode="all" type="button"><i>${state.calendarMode === 'all' ? '✓' : ''}</i>全員の動き</button>
          <button class="${state.calendarMode === 'person' ? 'is-active' : ''}" data-calendar-mode="person" type="button"><i>${state.calendarMode === 'person' ? '✓' : ''}</i>個人の動き</button>
        </div>
        <label class="calendar-person-filter ${state.calendarMode === 'person' ? 'is-visible' : ''}">
          <span>担当者</span>
          <select data-action="set-calendar-person">${peopleOptions(state.calendarPerson)}</select>
        </label>
        <label class="calendar-keyword-filter">
          ${lineIcon('search')}
          <input type="search" value="${escapeHTML(state.calendarSearch)}" data-calendar-search placeholder="案件名・工程名・場所で検索" aria-label="工程表を検索">
          ${state.calendarSearch ? '<button data-action="clear-calendar-search" type="button">クリア</button>' : ''}
        </label>
      </section>

      <section class="month-calendar-card" aria-label="${monthLabel}の工程表">
        <div class="month-calendar-controls">
          <button data-calendar-month="-1" type="button" aria-label="前月">${lineIcon('back')}</button>
          <strong>${monthLabel}</strong>
          <button data-calendar-month="1" type="button" aria-label="翌月">${lineIcon('chevron')}</button>
          <button class="today-button" data-action="calendar-today" type="button">今日</button>
        </div>
        <div class="calendar-weekdays">${['日', '月', '火', '水', '木', '金', '土'].map(day => `<span>${day}</span>`).join('')}</div>
        ${monthCalendarGrid(month, works, selected)}
      </section>

      ${selectedCalendarDay(selected, works)}
    </div>
  `;
}

function monthCalendarGrid(month, works, selectedDate) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1, 12);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });

  return `
    <div class="month-calendar-grid">
      ${days.map(date => {
        const key = dateKey(date);
        const dayWorks = works.filter(work => work.date === key);
        const visible = dayWorks.slice(0, 2);
        return `
          <button class="month-calendar-day ${date.getMonth() !== month.getMonth() ? 'is-outside' : ''} ${key === selectedDate ? 'is-selected' : ''}" data-calendar-day="${key}" type="button" aria-label="${longDateLabel(key)} ${dayWorks.length}件">
            <span class="calendar-day-number">${date.getDate()}</span>
            <span class="calendar-day-events">
              ${visible.map(work => {
                const fullLabel = workCategory(work);
                return `<small class="calendar-event-label tone-${calendarCategoryTone(fullLabel)}" title="${escapeHTML(fullLabel)}" aria-label="${escapeHTML(fullLabel)}"><span class="calendar-event-label-compact">${escapeHTML(calendarWorkLabel(fullLabel))}</span><span class="calendar-event-label-full">${escapeHTML(fullLabel)}</span></small>`;
              }).join('')}
              ${dayWorks.length > 2 ? `<small class="calendar-more">ほか${dayWorks.length - 2}件</small>` : ''}
            </span>
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function selectedCalendarDay(date, calendarWorks) {
  const works = calendarWorks.filter(work => work.date === date).sort((a, b) => workStartTime(a).localeCompare(workStartTime(b)));
  return `
    <section class="selected-day-card" id="calendar-day-detail" aria-label="${longDateLabel(date)}の工事一覧">
      <div class="selected-day-heading"><div>${lineIcon('calendar')}<h3>${longDateLabel(date)}</h3></div><span>${works.length}件の予定</span></div>
      <div class="selected-day-list">${works.length ? works.map(calendarWorkRow).join('') : '<p class="calendar-empty">表示条件に合う工事予定はありません。</p>'}</div>
    </section>
  `;
}

function calendarWorkRow(work) {
  const tone = calendarCategoryTone(workCategory(work));
  return `
    <button class="calendar-detail-row" data-work-id="${work.id}" type="button">
      <span class="calendar-detail-time">${workStartTime(work)}〜${workEndTime(work)}</span>
      <span class="calendar-detail-main"><strong>${escapeHTML(workCategory(work))}</strong><small>${escapeHTML(workCategoryGroup(workCategory(work)))} · ${escapeHTML(workProjectTitle(work))} / ${escapeHTML(work.site)}</small><small>担当：${escapeHTML(work.assignee)}</small></span>
      <span class="calendar-detail-floor tone-${tone}">${escapeHTML(workFloor(work))}</span>
      <span class="calendar-detail-arrow" aria-hidden="true">${lineIcon('chevron')}</span>
    </button>
  `;
}

function noticesScreen() {
  const unread = state.notices.filter(item => !item.read).length;
  return `
    <div class="notices-screen">
      <header class="utility-screen-header"><div><p class="eyebrow">Information</p><h2>連絡事項</h2></div><span>${unread}件 未読</span></header>
      <div class="notice-list">
        ${state.notices.map(item => `
          <button class="notice-item ${item.read ? 'is-read' : 'is-unread'}" data-notice-id="${item.id}" type="button">
            <span class="notice-type">${escapeHTML(item.type)}</span>
            <span class="notice-copy"><time>${item.date}</time><strong>${escapeHTML(item.title)}</strong></span>
            <span class="notice-state">${item.read ? '確認済み' : '未読'}</span>
            <span class="notice-arrow">${lineIcon('chevron')}</span>
          </button>
        `).join('')}
      </div>
      <p class="screen-footnote">β版のサンプル連絡事項です。外部商品検索はボタン操作時に別サイトを開きます。</p>
    </div>
  `;
}

function recordMenuScreen() {
  return `
    <div class="record-menu-screen">
      <header class="utility-screen-header"><div><p class="eyebrow">Quick record</p><h2>記録する</h2></div></header>
      <div class="record-choice-grid">
        ${recordChoice('photos', 'photo', '写真メモ', '現場写真と確認事項を記録')}
        ${recordChoice('notes', 'memo', '予習ノート', '気づきと確認事項を整理')}
        <button class="record-choice" data-action="open-project-create" type="button"><span>${lineIcon('site')}</span><strong>案件作成</strong><small>新しい現場案件を追加</small><i>${lineIcon('chevron')}</i></button>
      </div>
    </div>
  `;
}

function recordChoice(tab, icon, title, body) {
  return `<button class="record-choice" data-tab="${tab}" type="button"><span>${lineIcon(icon)}</span><strong>${title}</strong><small>${body}</small><i>${lineIcon('chevron')}</i></button>`;
}

function menuScreen() {
  return `
    <div class="menu-screen">
      <header class="utility-screen-header"><div><p class="eyebrow">All features</p><h2>メニュー</h2></div><span>既存機能</span></header>
      ${quickNavigation()}
      ${publicDataNotice()}
      <section class="menu-settings" aria-label="表示と保存の設定">
        <div><strong>表示と保存</strong><small>この端末のブラウザ内に保存されます</small></div>
        <label class="premium-switch"><span>${state.premium ? '有料版' : '無料版'}</span><input type="checkbox" ${state.premium ? 'checked' : ''} data-action="toggle-premium" aria-label="有料版表示を切り替え"></label>
        <div class="save-status save-status-${saveStatus.tone}" aria-live="polite"><span>${saveStatus.label}</span><small>${saveStatus.detail}</small></div>
        <button class="reset-sample-button" data-action="reset-sample" type="button">${lineIcon('reset')}<span>サンプルデータに戻す</span></button>
      </section>
    </div>
  `;
}

function activeTool() {
  return state.tools.find(tool => tool.id === state.activeToolId) || state.tools[0];
}

const toolCategoryDisplayLabels = {
  '手工具': '手工具',
  '電動工具': '電動工具',
  '測定器': '測定・検査',
  '安全用品': '安全・保護具',
  '消耗品': '消耗品・資材',
  '配線材料': '配線材料',
  '取付材料': '取付材料',
  'その他': 'その他'
};

function toolCategoryLabel(category) {
  return toolCategoryDisplayLabels[category] || category || 'その他';
}

function toolCategoryTone(category) {
  return {
    '手工具': 'hand',
    '電動工具': 'power',
    '測定器': 'measure',
    '安全用品': 'safety',
    '消耗品': 'consumable',
    '配線材料': 'wiring',
    '取付材料': 'fixture',
    'その他': 'other'
  }[category] || 'other';
}

function toolOptionList(options, selected, labelFor = option => option) {
  return ['すべて', ...options].map(option => `
    <option value="${escapeHTML(option)}" ${option === selected ? 'selected' : ''}>${escapeHTML(labelFor(option))}</option>
  `).join('');
}

function filteredTools() {
  const filters = state.toolFilters || {};
  const keyword = String(filters.keyword || '').trim().toLowerCase();

  return state.tools.filter(tool => {
    const text = [
      tool.name,
      tool.reading,
      ...(tool.aliases || []),
      tool.category,
      ...(tool.processes || []),
      tool.purpose,
      tool.beginnerNote,
      tool.searchKeyword
    ].join(' ').toLowerCase();
    const searchText = tool.category === '測定器' ? `${text} 測る` : text;
    const matchesKeyword = !keyword || searchText.includes(keyword);
    const matchesCategory = !filters.category || filters.category === 'すべて' || tool.category === filters.category;
    const matchesProcess = !filters.process || filters.process === 'すべて' || (tool.processes || []).includes(filters.process);
    const matchesFavorite = !filters.favoriteOnly || tool.favorite;
    return matchesKeyword && matchesCategory && matchesProcess && matchesFavorite;
  });
}

function toolFavoriteButton(tool, compact = false) {
  return `
    <button class="tool-favorite-button ${tool.favorite ? 'is-active' : ''} ${compact ? 'is-compact' : ''}" data-tool-favorite="${tool.id}" type="button" aria-pressed="${tool.favorite}">
      ${lineIcon('heart')}<span>${tool.favorite ? 'お気に入り済み' : 'お気に入り'}</span>
    </button>
  `;
}

function toolPackingControl(tool, compact = false) {
  return `
    <label class="tool-packing-control ${tool.packingChecked ? 'is-checked' : ''} ${compact ? 'is-compact' : ''}">
      <input type="checkbox" data-tool-packing="${tool.id}" ${tool.packingChecked ? 'checked' : ''}>
      <span>${lineIcon('check')}持ち物チェック</span>
    </label>
  `;
}

function toolCard(tool) {
  const tone = toolCategoryTone(tool.category);
  const isSelected = tool.id === state.activeToolId;
  const inlineDetailId = `tool-inline-detail-${tool.id}`;
  return `
    <article class="tool-card tool-card-${tone} ${isSelected ? 'is-selected' : ''}" data-tool-id="${tool.id}">
      <button class="tool-card-main" data-tool-select="${tool.id}" type="button" aria-expanded="${isSelected && toolDetailExpanded}"${isSelected ? ` aria-controls="${inlineDetailId}"` : ''}>
        <span class="tool-card-icon" aria-hidden="true">${lineIcon('tool')}</span>
        <span class="tool-card-copy">
          <span class="tool-card-topline"><small>${escapeHTML(toolCategoryLabel(tool.category))}</small>${tool.favorite ? `<span class="tool-favorite-mark">${lineIcon('heart')}</span>` : ''}</span>
          <strong>${escapeHTML(tool.name)}</strong>
          <small>${escapeHTML(tool.reading)} / ${(tool.processes || []).slice(0, 2).map(escapeHTML).join('・')}</small>
        </span>
        <span class="tool-card-arrow" aria-hidden="true">${lineIcon('chevron')}</span>
      </button>
      <div class="tool-card-actions">
        ${toolFavoriteButton(tool, true)}
        ${toolPackingControl(tool, true)}
      </div>
      ${isSelected ? `<div class="tool-inline-detail${toolDetailExpanded ? '' : ' is-collapsed'}" id="${inlineDetailId}">${toolDetailCard(tool)}</div>` : ''}
    </article>
  `;
}

function toolDetailCard(tool) {
  if (!tool) {
    return `<section class="tool-detail-card tool-detail-empty"><p>工具を選択すると、用途と確認事項が表示されます。</p></section>`;
  }

  const tone = toolCategoryTone(tool.category);
  return `
    <section class="tool-detail-card tool-detail-${tone}" aria-label="${escapeHTML(tool.name)}の詳細">
      <header class="tool-detail-header">
        <div>
          <span class="tool-category-chip tone-${tone}">${escapeHTML(toolCategoryLabel(tool.category))}</span>
          <h3>${escapeHTML(tool.name)}</h3>
          <p>${escapeHTML(tool.reading)}${tool.aliases?.length ? ` / ${tool.aliases.map(escapeHTML).join('・')}` : ''}</p>
        </div>
        <span class="tool-detail-icon" aria-hidden="true">${lineIcon('tool')}</span>
      </header>
      <div class="tool-process-list" aria-label="関連工程">
        ${(tool.processes || []).map(process => `<span>${escapeHTML(process)}</span>`).join('')}
      </div>
      <div class="tool-detail-sections">
        <section><h4>用途</h4><p>${escapeHTML(tool.purpose)}</p></section>
        <section><h4>新人向け説明</h4><p>${escapeHTML(tool.beginnerNote)}</p></section>
        <section><h4>使用前チェック</h4><p>${escapeHTML(tool.preCheck)}</p></section>
        <section class="tool-detail-warning"><h4>安全上の注意</h4><p>${escapeHTML(tool.safetyNote)}</p></section>
        <section class="tool-detail-ask"><h4>上司に確認すること</h4><p>${escapeHTML(tool.askSupervisor)}</p></section>
      </div>
      <div class="tool-approval-row">
        <span class="tool-approved-badge ${tool.companyApproved ? 'is-approved' : 'is-unconfirmed'}">${tool.companyApproved ? '会社指定品の候補' : '会社指定は要確認'}</span>
        <small>会社ルール・現場責任者の指示を優先</small>
      </div>
      <div class="tool-detail-actions">
        ${toolFavoriteButton(tool)}
        ${toolPackingControl(tool)}
        <a class="tool-shop-button" href="${toolExternalSearchURL(tool)}" target="_blank" rel="noopener noreferrer">${lineIcon('external')}<span>モノタロウで検索</span></a>
      </div>
      <p class="tool-external-note">外部の商品検索サイトが開きます。商品仕様・価格・在庫は移動先のサイトで確認してください。</p>
      <p class="tool-external-note tool-non-affiliation-note">本アプリは株式会社MonotaROの公式サービスまたは提携サービスではありません。</p>
    </section>
  `;
}

function toolExternalSearchURL(tool) {
  return `https://www.monotaro.com/s/?q=${encodeURIComponent(tool.searchKeyword || tool.name)}`;
}

function toolSearchScreen() {
  const filters = state.toolFilters || {};
  const results = filteredTools();
  const selected = activeTool();
  const packingCount = state.tools.filter(tool => tool.packingChecked).length;
  const favoriteCount = state.tools.filter(tool => tool.favorite).length;

  return `
    <div class="tool-search-screen">
      <header class="utility-screen-header tool-screen-header">
        <div><p class="eyebrow">Field tools</p><h2>工具・資材検索</h2></div>
        <span>${state.tools.length}件</span>
      </header>
      <section class="tool-safety-banner" aria-label="安全に関する注意">
        <span class="tool-safety-icon" aria-hidden="true">${lineIcon('shield')}</span>
        <p>工具・材料の選定、測定方法、施工判断は、所属会社のルール、現場責任者、上司、有資格者の指示を優先してください。</p>
      </section>
      <section class="tool-search-panel" aria-label="工具・資材を検索">
        <label class="tool-search-field">
          ${lineIcon('search')}
          <input type="search" value="${escapeHTML(filters.keyword || '')}" data-tool-filter="keyword" placeholder="工具名・読み方・用途で検索" aria-label="工具・資材を検索">
        </label>
        <div class="tool-filter-grid">
          <label><span>カテゴリ</span><select data-tool-filter="category">${toolOptionList(toolCategories, filters.category, toolCategoryLabel)}</select></label>
          <label><span>工程</span><select data-tool-filter="process">${toolOptionList(toolProcesses, filters.process)}</select></label>
        </div>
        <div class="tool-search-actions">
          <button class="tool-favorite-filter ${filters.favoriteOnly ? 'is-active' : ''}" data-action="toggle-tool-favorites" type="button" aria-pressed="${Boolean(filters.favoriteOnly)}">${lineIcon('heart')}お気に入り <span>${favoriteCount}</span></button>
          <span class="tool-packing-count">${lineIcon('check')}持ち物 ${packingCount}件</span>
          <button class="tool-clear-button" data-action="clear-tool-filters" type="button">条件をクリア</button>
        </div>
      </section>
      <div class="tool-results-heading"><strong>検索結果 ${results.length}件</strong><small>工具名・別名・用途・工程から部分一致</small></div>
      <div class="tool-layout">
        <section class="tool-list" aria-label="工具一覧">
          ${results.length ? results.map(toolCard).join('') : '<p class="tool-empty-state">条件に合う工具がありません。キーワードや絞り込みを変更してください。</p>'}
        </section>
        <aside class="tool-detail-panel">
          ${toolDetailCard(selected)}
        </aside>
      </div>
    </div>
  `;
}

function projectSummary() {
  const progress = overallProgress();
  const next = nextScheduleItem();
  const photos = photosForSchedule(next.id);
  const todayWorks = worksForDate(state.selectedWorkDate);
  const needsReviewPhotos = reviewPhotos();
  const project = state.project;

  return `
    <section class="welcome-card" aria-label="今日の挨拶">
      <div>
        <p class="eyebrow">${state.selectedWorkDate} / Field note</p>
        <h2>おつかれさまです、${(project.assignee || '現場メンバー').replace(/さん$/, '')}さん</h2>
        <p>今日の現場記録と確認事項を整理しましょう。</p>
      </div>
      ${characterVisual('01_welcome.png', '現場でんき探偵 Pro の挨拶イラスト', 'welcome-art', 'eager')}
      <div class="welcome-mark" aria-hidden="true">${lineIcon('bolt')}<small>PRO</small></div>
    </section>
    <section class="dashboard-stats" aria-label="担当工事の概要">
      ${dashboardStats(todayWorks)}
    </section>
    <section class="project-summary" aria-label="案件概要">
      <div>
        <p class="eyebrow">${project.status}</p>
        <h2>${project.title}</h2>
        <p>新人の第二種電気工事士向け / 上司: ${project.supervisor}</p>
      </div>
      ${summaryPriorityStrip(next, progress, needsReviewPhotos, todayWorks)}
      <div class="summary-meta">
        <span>${projectScheduleLabel(project)}</span>
        <span>${projectLocationLabel(project)}</span>
        <span>元請け・担当会社：${project.contractor || project.client}</span>
      </div>
      <button class="summary-project-link" data-tab="projects" type="button">案件を作成・編集</button>
      ${projectAssignmentControls()}
      <div class="summary-progress">
        <div>
          <span>全体進捗</span>
          <strong>${progress}%</strong>
        </div>
        <div class="meter" aria-label="全体進捗 ${progress}%">
          <span style="width: ${progress}%"></span>
        </div>
      </div>
      <button class="next-step" data-schedule-id="${next.id}" type="button">
        <span>次の工程</span>
        <strong>${next.date} ${next.name}</strong>
        <p>${next.nextAction}</p>
      </button>
      <div class="summary-photos">
        <span>関連写真</span>
        ${miniPhotoList(photos, next)}
      </div>
      ${calendarJumpPanel('top')}
      ${topReviewPhotos(needsReviewPhotos)}
      ${topDailyWorks(todayWorks)}
      ${topSimilarCases(similarPastCases())}
    </section>
  `;
}

function dashboardStats(works) {
  const stats = [
    { label: '今日の工事件数', value: works.length, tone: 'total' },
    { label: '進行中', value: works.filter(work => work.status === '作業中').length, tone: 'active' },
    { label: '確認待ち', value: works.filter(work => work.status === '要確認').length, tone: 'review' },
    { label: '完了', value: works.filter(work => work.status === '完了').length, tone: 'done' },
    { label: '未着手', value: works.filter(work => work.status === '予定' && work.progress === 0).length, tone: 'planned' }
  ];

  return stats.map(stat => `
    <article class="stat-card stat-card-${stat.tone}">
      <span>${stat.label}</span>
      <strong>${stat.value}</strong>
      <small>件</small>
    </article>
  `).join('');
}

function summaryPriorityStrip(next, progress, needsReviewPhotos, todayWorks) {
  const todayMain = todayWorks[0];
  const assignee = todayMain?.assignee || next.assignee || state.project.assignee;
  const reviewLabel = needsReviewPhotos.length ? `要確認 ${needsReviewPhotos.length}件` : '要確認なし';

  return `
    <div class="summary-priority-grid" aria-label="スマホ用重要情報">
      <article>
        <span>今日の工程</span>
        <strong>${todayMain ? todayMain.process : next.name}</strong>
      </article>
      <article>
        <span>担当者</span>
        <strong>${assignee}</strong>
      </article>
      <article>
        <span>進捗率</span>
        <strong>${progress}%</strong>
      </article>
      <article>
        <span>写真メモ</span>
        <strong>${reviewLabel}</strong>
      </article>
      <article class="summary-priority-wide">
        <span>次にやること</span>
        <strong>${todayMain?.nextAction || next.nextAction}</strong>
      </article>
    </div>
  `;
}

function projectAssignmentControls() {
  return `
    <section class="project-assignment" aria-label="案件担当者">
      <label>
        <span>担当者</span>
        <select data-action="set-project-person" data-field="assignee">
          ${peopleOptions(state.project.assignee)}
        </select>
      </label>
      <label>
        <span>補助</span>
        <select data-action="set-project-person" data-field="assistant">
          ${peopleOptions(state.project.assistant)}
        </select>
      </label>
      <label>
        <span>確認者</span>
        <select data-action="set-project-person" data-field="reviewer">
          ${peopleOptions(state.project.reviewer)}
        </select>
      </label>
    </section>
  `;
}

function topDailyWorks(works) {
  const groups = groupWorksByAssignee(works);

  return `
    <section class="top-daily-works" aria-label="今日の担当者別工事">
      <div>
        <span>今日の担当者別工事</span>
        <strong>${state.selectedWorkDate}</strong>
      </div>
      <div class="top-work-groups">
        ${Object.entries(groups).length ? Object.entries(groups).map(([assignee, items]) => `
          <div class="top-work-group">
            <button class="top-assignee" data-assignee-name="${assignee}" type="button">
              <span>${assignee}</span>
              <small>${items.length}件</small>
            </button>
            <div class="top-work-list">
              ${items.map(work => `
                <button class="top-work-item" data-work-id="${work.id}" type="button">
                  <strong>${work.site} ${work.process}</strong>
                  <small>${work.status} / 進捗${work.progress}%</small>
                </button>
              `).join('')}
            </div>
          </div>
        `).join('') : '<p class="top-empty">選択日の担当者別工事は未登録です。</p>'}
      </div>
    </section>
  `;
}

function topSimilarCases(cases) {
  return `
    <section class="top-similar-cases" aria-label="似た過去事例">
      <div>
        <span>似た過去事例</span>
        <strong>${cases.length}件</strong>
      </div>
      <div class="top-case-list">
        ${cases.map(item => `
          <button class="top-case-item" data-case-id="${item.id}" type="button">
            <strong>${item.title}</strong>
            <small>${item.process} / ${item.status} / 確認者：${item.reviewer}</small>
          </button>
        `).join('')}
      </div>
    </section>
  `;
}

function topReviewPhotos(photos) {
  const items = photos.slice(0, 3);

  return `
    <section class="top-review-photos" aria-label="要確認の写真メモ">
      <div>
        <span>要確認の写真メモ</span>
        <strong>${photos.length}件</strong>
      </div>
      <div class="top-photo-list">
        ${items.length ? items.map(photo => `
          <button class="top-photo-item" data-photo-id="${photo.id}" type="button">
            ${photo.src ? `<img src="${photo.src}" alt="${scheduleName(photo.scheduleId)}の写真">` : '<span>写真</span>'}
            <div>
              <strong>${scheduleName(photo.scheduleId)}</strong>
              <small>${formatDate(photo.date)} / ${photo.status} / 撮影者：${photo.photographer || photo.author}</small>
              <p>${escapeHTML(photo.memo)}</p>
            </div>
          </button>
        `).join('') : '<p class="top-empty">要確認の写真メモはありません。</p>'}
      </div>
    </section>
  `;
}

function calendarJumpPanel(variant = 'full') {
  const dates = calendarDates();
  const selectedDate = dates.includes(state.selectedWorkDate) ? state.selectedWorkDate : dates[0];

  if (!selectedDate) return '';

  return `
    <section class="calendar-jump-panel ${variant === 'top' ? 'is-compact' : ''}" aria-label="日付から詳細へ移動">
      <div class="section-title">
        <div>
          <p class="eyebrow">Calendar jump</p>
          <h3>日付から探す</h3>
        </div>
        <span>選択中 ${selectedDate}</span>
      </div>
      <div class="calendar-date-list" aria-label="日付リスト">
        ${dates.map(date => {
          const workCount = worksForDate(date).length;
          const scheduleCount = schedulesForDate(date).length;
          const photoCount = photosForDate(date).length;

          return `
            <button class="calendar-date ${date === selectedDate ? 'is-selected' : ''}" data-calendar-date="${date}" type="button">
              <time>${date}</time>
              <span>工事${workCount} / 工程${scheduleCount} / 写真${photoCount}</span>
            </button>
          `;
        }).join('')}
      </div>
      ${calendarDayDetail(selectedDate)}
    </section>
  `;
}

function calendarDayDetail(date) {
  const works = worksForDate(date);
  const schedules = schedulesForDate(date);
  const photos = photosForDate(date);

  return `
    <section class="calendar-day-detail" id="calendar-day-detail" aria-label="${date}の詳細">
      <div>
        <p class="eyebrow">Selected date</p>
        <h3>${date} の工事一覧</h3>
      </div>
      ${works.length ? `
        <div class="calendar-work-list">
          ${works.map(work => calendarWorkCard(work)).join('')}
        </div>
      ` : '<article class="empty-case"><strong>この日の担当者別工事は未登録です</strong><p>工程表や写真メモから関連する詳細を確認できます。</p></article>'}
      <div class="calendar-related-grid">
        ${schedules.map(item => calendarRelatedCard('工程', `${item.name} / ${item.status}`, item.nextAction, detailActionButtons({ scheduleId: item.id }))).join('')}
        ${photos.slice(0, 2).map(photo => calendarRelatedCard('写真メモ', `${scheduleName(photo.scheduleId)} / ${photo.status}`, photo.memo, detailActionButtons({ scheduleId: photo.scheduleId, photoId: photo.id, caseId: photo.relatedCaseId }))).join('')}
      </div>
    </section>
  `;
}

function calendarWorkCard(work) {
  const schedule = scheduleById(work.scheduleId);
  const pastCase = primaryCaseForSchedule(work.scheduleId);

  return `
    <article class="calendar-work-card ${work.id === state.activeWorkId ? 'is-selected' : ''}">
      <div>
        <time>${work.date}</time>
        <strong>${work.site} ${work.process}</strong>
        <small>案件：${state.project.title}</small>
        <p>${work.work}</p>
      </div>
      <div class="calendar-work-meta">
        <span>担当者：${work.assignee}</span>
        <span>進捗 ${work.progress}%</span>
        <span class="status-badge status-${statusClass(work.status)}">${work.status}</span>
      </div>
      <dl class="schedule-details">
        <div>
          <dt>次にやること</dt>
          <dd>${work.nextAction}</dd>
        </div>
        <div>
          <dt>上司に確認すること</dt>
          <dd>${work.supervisorCheck}</dd>
        </div>
      </dl>
      ${detailActionButtons({ workId: work.id, scheduleId: schedule?.id, caseId: pastCase?.id })}
    </article>
  `;
}

function calendarRelatedCard(label, title, body, actions) {
  return `
    <article class="calendar-related-card">
      <span>${label}</span>
      <strong>${title}</strong>
      <p>${escapeHTML(body)}</p>
      ${actions}
    </article>
  `;
}

function detailActionButtons({ scheduleId, workId, photoId, caseId }) {
  const photoCount = scheduleId ? photosForSchedule(scheduleId).length : 0;
  const resolvedCaseId = caseId || (scheduleId ? primaryCaseForSchedule(scheduleId)?.id : '');

  return `
    <div class="detail-actions">
      ${scheduleId ? `<button data-schedule-id="${scheduleId}" type="button">工程詳細</button>` : ''}
      ${workId ? `<button data-work-id="${workId}" type="button">担当詳細</button>` : ''}
      ${scheduleId ? `<button data-photo-summary-schedule-id="${scheduleId}" ${photoId ? `data-photo-id="${photoId}"` : ''} type="button">写真メモ ${photoCount}件</button>` : ''}
      ${resolvedCaseId ? `<button data-case-id="${resolvedCaseId}" type="button">過去事例</button>` : ''}
    </div>
  `;
}

function publicDataNotice() {
  return `
    <aside class="notice public-data-notice" aria-label="公開β版の保存と外部サイトについて">
      <strong>公開β版の保存・外部サイトについて</strong>
      <ul>
        <li>入力したデータはこのブラウザ内のlocalStorageへ保存されます。</li>
        <li>アプリが保存データを外部へアップロードする機能はありません。</li>
        <li>外部商品検索ボタンを押すと第三者のサイトが開きます。</li>
        <li>外部サイトでは、そのサイトのプライバシーポリシーやCookie方針が適用されます。</li>
        <li>実在する氏名、住所、顧客情報、現場写真、図面を入力しないでください。</li>
        <li>施工判断は所属会社、上司、現場責任者、有資格者の指示を優先してください。</li>
      </ul>
    </aside>
  `;
}

function safetyNotice() {
  return publicDataNotice();
}

function miniPhotoList(photos, schedule) {
  const items = photos.length ? photos.slice(0, 3) : [{
    id: `empty-${schedule.id}`,
    scheduleId: schedule.id,
    date: schedule.date,
    status: '確認前',
    memo: schedule.photoMemo,
    src: ''
  }];

  return `
    <div class="mini-photo-list">
      ${items.map(photo => `
        <button class="mini-photo" ${photos.length ? `data-photo-id="${photo.id}"` : `data-photo-summary-schedule-id="${photo.scheduleId}"`} type="button" aria-label="${scheduleName(photo.scheduleId)}の写真メモ">
          ${photo.src ? `<img src="${photo.src}" alt="${scheduleName(photo.scheduleId)}の写真">` : '<span>写真</span>'}
          <small>${photo.date}</small>
        </button>
      `).join('')}
    </div>
  `;
}

function auditInfo(record) {
  return {
    assignee: record.assignee || state.project.assignee || '担当者Aさん',
    assistant: record.assistant || state.project.assistant || '新人Aさん',
    author: record.author || '新人Aさん',
    updatedAt: record.updatedAt || '2026/07/03 21:04',
    updatedBy: record.updatedBy || state.project.updatedBy || '担当者Aさん',
    reviewer: record.reviewer || state.project.reviewer || '確認者Bさん',
    reviewStatus: record.reviewStatus || '未確認'
  };
}

function recordMeta(record) {
  const audit = auditInfo(record);

  return `
    <div class="record-meta">
      <span>担当者：${audit.assignee}</span>
      <span>補助：${audit.assistant}</span>
      <span>記入者：${audit.author}</span>
      <span>最終更新：${audit.updatedAt} / 更新者：${audit.updatedBy}</span>
      <span>確認者：${audit.reviewer}</span>
      <span class="review-pill review-${reviewStatusClass(audit.reviewStatus)}">確認状態：${audit.reviewStatus}</span>
    </div>
  `;
}

function photoSummaryBadges(scheduleId) {
  const summary = photoSummaryForSchedule(scheduleId);
  if (!summary.total) {
    return `<div class="photo-badges"><span data-photo-summary-schedule-id="${scheduleId}">関連写真：0件</span></div>`;
  }

  return `
    <div class="photo-badges">
      <span data-photo-summary-schedule-id="${scheduleId}">関連写真：${summary.total}件</span>
      <span data-photo-summary-schedule-id="${scheduleId}">写真メモあり</span>
      ${summary.needsReview ? `<span class="photo-alert" data-photo-summary-schedule-id="${scheduleId}">要確認写真あり：${summary.needsReview}件</span>` : ''}
    </div>
  `;
}

function internalSharePanel(record) {
  return `
    <section class="internal-share" aria-label="社内共有メモ">
      <label>
        <span>社内共有メモ</span>
        <textarea rows="2">${escapeHTML(record.internalMemo || '社内確認用のメモを残す。')}</textarea>
      </label>
      <label>
        <span>上司コメント</span>
        <textarea rows="2">${escapeHTML(record.supervisorComment || '上司・先輩が確認したコメントを残す。')}</textarea>
      </label>
      <label>
        <span>次回指示</span>
        <textarea rows="2">${escapeHTML(record.nextInstruction || '次回までに確認することを残す。')}</textarea>
      </label>
    </section>
  `;
}

function reviewStatusClass(status) {
  return {
    '未確認': 'pending',
    '確認済み': 'checked',
    '要修正': 'revision'
  }[status] || 'pending';
}

function activeScreen() {
  if (state.activeTab === 'home') return homeDashboardScreen();
  if (state.activeTab === 'calendar') return calendarSearchScreen();
  if (state.activeTab === 'notices') return noticesScreen();
  if (state.activeTab === 'record') return recordMenuScreen();
  if (state.activeTab === 'menu') return menuScreen();
  if (state.activeTab === 'tools') return toolSearchScreen();

  if (state.activeTab === 'projects') {
    return projectsScreen();
  }

  if (state.activeTab === 'before') {
    return checklistScreen(
      '仕事前チェック',
      '現場へ出る前や自宅での予習用チェックです。今日の段取り、自分がやること、上司に聞くことを整理します。',
      state.before,
      'before'
    );
  }

  if (state.activeTab === 'schedule') {
    return scheduleScreen();
  }

  if (state.activeTab === 'assignments') {
    return assignmentsScreen();
  }

  if (state.activeTab === 'cases') {
    return pastCasesScreen();
  }

  if (state.activeTab === 'photos') {
    return photoMemoScreen();
  }

  if (state.activeTab === 'people') {
    return peopleMasterScreen();
  }

  if (state.activeTab === 'after') {
    return checklistScreen(
      '自宅整理チェック',
      '仕事後や自宅で、分からなかった点・上司の指示・次回の予習ポイントを整理します。',
      state.after,
      'after'
    );
  }

  if (state.activeTab === 'beta') {
    return betaTestScreen();
  }

  return notesScreen();
}

function projectProgressValue(project) {
  const progress = Number(project.overallProgress);
  return Number.isFinite(progress) ? Math.min(100, Math.max(0, Math.round(progress))) : 0;
}

function projectsScreen() {
  const project = activeProject();
  const progress = projectProgressValue(project);
  const completedCount = state.projects.filter(item => projectProgressValue(item) >= 100).length;
  const activeCount = state.projects.length - completedCount;
  const averageProgress = state.projects.length
    ? Math.round(state.projects.reduce((total, item) => total + projectProgressValue(item), 0) / state.projects.length)
    : 0;

  return `
    <div class="screen-header project-screen-header">
      <div>
        <p class="eyebrow">Project workspace</p>
        <h2>案件管理</h2>
      </div>
      <button class="project-open-form-button" data-action="open-project-create" type="button">
        ${lineIcon('briefcase-plus')}
        <span>案件フォーム</span>
      </button>
    </div>
    <p class="lead project-screen-lead">担当案件の現在地を確認し、工程・担当・記録へ迷わず進むための画面です。</p>
    <section class="project-workspace-hero" aria-label="選択中の案件 ${escapeHTML(project.title)}">
      <div class="project-hero-heading">
        <span class="project-hero-icon" aria-hidden="true">${lineIcon('briefcase')}</span>
        <div>
          <p class="eyebrow">選択中の案件</p>
          <h3>${escapeHTML(project.title)}</h3>
          <div class="project-hero-tags">
            <span class="status-badge status-${statusClass(project.status)}">${escapeHTML(project.status)}</span>
            <span>${escapeHTML(project.type)}</span>
          </div>
        </div>
      </div>
      <div class="project-hero-progress" role="progressbar" aria-label="${escapeHTML(project.title)}の進捗率 ${progress}%" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}" style="--project-progress: ${progress}%">
        <strong>${progress}%</strong>
        <span>進捗</span>
      </div>
      <dl class="project-hero-facts">
        <div><dt>次の工程</dt><dd>${escapeHTML(project.nextProcess || nextScheduleItem().name)}</dd></div>
        <div><dt>担当</dt><dd>${escapeHTML(project.assignee || '未設定')}</dd></div>
        <div><dt>期間</dt><dd>${escapeHTML(projectScheduleLabel(project))}</dd></div>
      </dl>
      <div class="project-hero-actions" aria-label="選択中の案件の操作">
        <button data-action="focus-project-form" type="button">${lineIcon('note-pencil')}<span>案件を編集</span></button>
        <button data-tab="schedule" type="button">${lineIcon('timeline')}<span>工程を確認</span></button>
      </div>
    </section>
    <section class="project-portfolio-stats" aria-label="案件全体の概要">
      <article><span aria-hidden="true">${lineIcon('briefcase')}</span><small>全案件</small><strong>${state.projects.length}件</strong></article>
      <article><span aria-hidden="true">${lineIcon('timeline')}</span><small>進行中</small><strong>${activeCount}件</strong></article>
      <article><span aria-hidden="true">${lineIcon('dashboard')}</span><small>平均進捗</small><strong>${averageProgress}%</strong></article>
    </section>
    <aside class="notice project-storage-notice">
      案件の追加・更新内容は、このブラウザの保存領域に反映されます。本番ログイン・クラウド共有・権限管理は未実装です。
    </aside>
    <div class="project-manager-layout">
      <section class="project-list" aria-label="案件一覧">
        <div class="section-title">
          <div>
            <p class="eyebrow">Projects</p>
            <h3>案件を選ぶ</h3>
          </div>
          <span>${state.projects.length}件</span>
        </div>
        <div class="project-list-items">
          ${state.projects.map(item => projectCard(item)).join('')}
        </div>
      </section>
      ${projectDetail(project)}
      ${projectForm(project)}
    </div>
  `;
}

function projectCard(project) {
  const progress = projectProgressValue(project);
  const isSelected = project.id === state.activeProjectId;

  return `
    <button class="project-card ${isSelected ? 'is-selected' : ''}" data-project-id="${project.id}" type="button" aria-pressed="${isSelected}">
      <span class="project-card-icon" aria-hidden="true">${lineIcon('briefcase')}</span>
      <span class="project-card-copy">
        <span class="project-card-heading">
          <span>${escapeHTML(project.type)}</span>
          <span class="project-card-status status-${statusClass(project.status)}">${escapeHTML(project.status)}</span>
        </span>
        <strong>${escapeHTML(project.title)}</strong>
        <small>${escapeHTML(project.address || project.location || '現場情報未設定')}</small>
        <span class="project-card-next"><b>次の工程</b>${escapeHTML(project.nextProcess || nextScheduleItem().name)}</span>
        <span class="project-card-progress-row"><span>担当 ${escapeHTML(project.assignee || '未設定')}</span><b>${progress}%</b></span>
        <span class="project-card-progress" role="progressbar" aria-label="進捗率 ${progress}%" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><i style="width: ${progress}%"></i></span>
      </span>
      <span class="project-card-chevron" aria-hidden="true">${lineIcon('chevron')}</span>
    </button>
  `;
}

function projectDetail(project) {
  const progress = projectProgressValue(project);

  return `
    <section class="project-detail" id="project-detail" aria-label="${project.title}の詳細">
      <div class="screen-header project-detail-header">
        <span class="project-detail-icon" aria-hidden="true">${lineIcon('site')}</span>
        <div class="project-detail-heading-copy">
          <p class="eyebrow">Selected project</p>
          <h2>${escapeHTML(project.title)}</h2>
        </div>
        <span class="status-badge status-${statusClass(project.status)}">${escapeHTML(project.status)}</span>
      </div>
      <section class="project-next-action" aria-label="次にすること">
        <span aria-hidden="true">${lineIcon('bolt')}</span>
        <div>
          <small>現場で次にすること</small>
          <strong>${escapeHTML(project.nextProcess || nextScheduleItem().name)}</strong>
          <p>${escapeHTML(project.supervisorQuestion || '次の工程の確認事項を上司と共有する。')}</p>
        </div>
      </section>
      <div class="selected-detail-summary">
        <article>
          <span>案件名</span>
          <strong>${escapeHTML(project.title)}</strong>
        </article>
        <article>
          <span>工事種別</span>
          <strong>${escapeHTML(project.type)}</strong>
        </article>
        <article>
          <span>担当者</span>
          <strong>${escapeHTML(project.assignee)}</strong>
        </article>
        <article>
          <span>確認者</span>
          <strong>${escapeHTML(project.reviewer)}</strong>
        </article>
        <article>
          <span>工程</span>
          <strong>${escapeHTML(project.nextProcess || nextScheduleItem().name)}</strong>
        </article>
        <article class="detail-progress-card">
          <span>進捗率</span>
          <strong>${progress}%</strong>
          <div class="detail-progress-bar" role="progressbar" aria-label="案件の進捗率 ${progress}%" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
            <span style="width: ${progress}%"></span>
          </div>
        </article>
        <article>
          <span>着工予定日</span>
          <strong>${formatDate(project.startDate || '')}</strong>
        </article>
        <article>
          <span>完了予定日</span>
          <strong>${formatDate(project.endDate || '')}</strong>
        </article>
      </div>
      <div class="detail-grid">
        <article>
          <span>現場住所</span>
          <p>${project.address || '未入力'}</p>
        </article>
        <article>
          <span>元請け・担当会社</span>
          <p>${project.contractor || project.client || '未入力'}</p>
        </article>
        <article>
          <span>補助担当</span>
          <p>${project.assistant}</p>
        </article>
        <article>
          <span>確認者</span>
          <p>${project.reviewer}</p>
        </article>
        <article>
          <span>次の工程</span>
          <p>${project.nextProcess || nextScheduleItem().name}</p>
        </article>
        <article>
          <span>現場メモ</span>
          <p>${project.memo || '現場メモは未入力です。'}</p>
        </article>
        <article>
          <span>上司に確認すること</span>
          <p>${project.supervisorQuestion || '上司確認事項は未入力です。'}</p>
        </article>
      </div>
      <div class="detail-actions project-action-grid" aria-label="案件から移動">
        <button class="detail-edit-button" data-action="focus-project-form" type="button">${lineIcon('note-pencil')}<span>編集する</span></button>
        <button data-tab="schedule" type="button">${lineIcon('timeline')}<span>工程表</span></button>
        <button data-tab="assignments" type="button">${lineIcon('people')}<span>担当者別</span></button>
        <button data-tab="photos" type="button">${lineIcon('camera')}<span>写真メモ</span></button>
        <button data-tab="cases" type="button">${lineIcon('case')}<span>過去事例</span></button>
      </div>
    </section>
  `;
}

function projectForm(project) {
  return `
    <details class="project-form mobile-disclosure" aria-label="案件作成フォーム">
      <summary class="project-form-summary">
        <div>
        <p class="eyebrow">Create / Edit</p>
        <h3>案件作成フォーム</h3>
        <p>入力内容は、案件一覧・トップ概要・工程表・担当者別工事・写真メモの案件名表示へ画面上で反映されます。</p>
        </div>
        <span class="disclosure-hint">編集するボタンから開く</span>
      </summary>
      <div class="project-form-content">
      <details class="form-disclosure" open>
        <summary>基本情報・担当者情報</summary>
        <div class="project-form-grid">
        <label>
          <span>案件名</span>
          <input type="text" value="${escapeHTML(project.title)}" data-project-field="title">
        </label>
        <label>
          <span>現場住所</span>
          <input type="text" value="${escapeHTML(project.address || '')}" data-project-field="address">
        </label>
        <label>
          <span>工事種別</span>
          <select data-project-field="type">
            ${projectTypeOptions.map(type => `
              <option value="${type}" ${type === project.type ? 'selected' : ''}>${type}</option>
            `).join('')}
          </select>
        </label>
        <label>
          <span>元請け・担当会社</span>
          <input type="text" value="${escapeHTML(project.contractor || project.client || '')}" data-project-field="contractor">
        </label>
        <label>
          <span>担当者</span>
          <select data-project-field="assignee">
            ${peopleOptions(project.assignee)}
          </select>
        </label>
        <label>
          <span>補助担当</span>
          <select data-project-field="assistant">
            ${peopleOptions(project.assistant)}
          </select>
        </label>
        <label>
          <span>確認者</span>
          <select data-project-field="reviewer">
            ${peopleOptions(project.reviewer)}
          </select>
        </label>
        <label>
          <span>着工予定日</span>
          <input type="date" value="${projectInputDate(project.startDate)}" data-project-field="startDate">
        </label>
        <label>
          <span>完了予定日</span>
          <input type="date" value="${projectInputDate(project.endDate)}" data-project-field="endDate">
        </label>
        </div>
      </details>
      <details class="form-disclosure" open>
        <summary>メモ・上司確認</summary>
        <div class="project-form-notes">
      <label class="field">
        <span>現場メモ</span>
        <textarea rows="3" data-project-field="memo">${escapeHTML(project.memo || '')}</textarea>
      </label>
      <label class="field">
        <span>上司に確認すること</span>
        <textarea rows="3" data-project-field="supervisorQuestion">${escapeHTML(project.supervisorQuestion || '')}</textarea>
      </label>
        </div>
      </details>
      <div class="project-form-actions">
        <button class="primary-button" data-action="create-project" type="button">新規案件として追加</button>
        <button data-action="update-project" type="button">選択中の案件を更新</button>
      </div>
      </div>
    </details>
  `;
}

function peopleMasterScreen() {
  const person = activePerson();

  return `
    <div class="screen-header">
      <div>
        <p class="eyebrow">People master</p>
        <h2>担当者マスタ</h2>
      </div>
    </div>
    <p class="lead">会社ごとに担当者名を変更・追加できる想定の画面モックです。本番の社員管理、ログイン、権限管理はまだ行いません。</p>
    <div class="people-master-layout">
      <section class="people-list" aria-label="担当者一覧">
        ${state.people.map(personItem => `
          <button class="person-card ${personItem.id === state.activePersonId ? 'is-selected' : ''}" data-person-id="${personItem.id}" type="button">
            <strong>${personItem.name}：${personItem.duty}</strong>
            <span>役割：${personItem.role}</span>
          </button>
        `).join('')}
      </section>
      <details class="person-editor mobile-disclosure" aria-label="担当者編集" open>
        <summary class="person-editor-summary">
          <div>
          <p class="eyebrow">Edit person</p>
          <h3>${person.name}</h3>
          </div>
          <span class="disclosure-hint">担当者情報を開閉</span>
        </summary>
        <div class="person-editor-content">
        <div class="person-form-grid">
          <label>
            <span>担当者名</span>
            <input type="text" value="${escapeHTML(person.name)}" data-person-name>
          </label>
          <label>
            <span>役割</span>
            <select data-person-role>
              ${personRoleOptions.map(role => `
                <option value="${role}" ${role === person.role ? 'selected' : ''}>${role}</option>
              `).join('')}
            </select>
          </label>
          <label>
            <span>画面内の主な使い方</span>
            <select data-person-duty>
              ${personDutyOptions.map(duty => `
                <option value="${duty}" ${duty === person.duty ? 'selected' : ''}>${duty}</option>
              `).join('')}
            </select>
          </label>
        </div>
        <div class="master-actions">
          <button data-action="add-person" type="button">追加</button>
          <button data-action="update-person" type="button">編集を反映</button>
          <button data-action="delete-person" type="button">削除</button>
        </div>
        </div>
      </details>
    </div>
    <section class="master-link-note" aria-label="担当者マスタの反映先">
      <span>反映先</span>
      <p>案件、工程表、担当者別工事一覧、写真メモ、過去事例検索の担当者・撮影者選択は、この担当者マスタの名前を使う想定です。</p>
    </section>
  `;
}

function photoMemoScreen() {
  const active = activeScheduleItem();
  const needsReview = reviewPhotos();

  return `
    <div class="screen-header">
      <div>
        <p class="eyebrow">Photo memo</p>
        <h2>写真メモ</h2>
      </div>
      <div class="progress-ring" aria-label="写真メモ ${state.photos.length}件">${state.photos.length}</div>
    </div>
    <p class="lead">案件ごと・工程ごと・訪問日ごとに、現場写真と上司確認用メモを残すための画面モックです。</p>
    <aside class="notice">
      この写真機能は、現場記録・上司確認・過去事例整理のためのものです。実際の施工判断は、所属会社のルール、現場責任者、上司、有資格者の指示に従ってください。
    </aside>
    ${photoUploadPanel(active)}
    <section class="photo-review-summary" aria-label="要確認写真メモの概要">
      <div>
        <span>要確認の写真メモ</span>
        <strong>${needsReview.length}件</strong>
      </div>
      <p>${needsReview.length ? needsReview.map(photo => `${scheduleName(photo.scheduleId)}：${photo.memo}`).join(' / ') : '要確認の写真メモはありません。'}</p>
    </section>
    ${allPhotoCards()}
  `;
}

function allPhotoCards() {
  return `
    <section class="photo-section" aria-label="写真メモ一覧">
      <div class="section-title">
        <div>
          <p class="eyebrow">All photos</p>
          <h3>写真メモ一覧</h3>
        </div>
        <span>${state.photos.length}枚</span>
      </div>
      <div class="photo-grid">
        ${state.photos.length ? state.photos.map(photo => photoCard(photo)).join('') : '<article class="empty-case"><strong>写真メモはまだありません</strong><p>写真追加エリアから画像を選択すると、ブラウザ上でプレビュー表示されます。</p></article>'}
      </div>
    </section>
  `;
}

function notesScreen() {
  return `
    <div class="screen-header">
      <div>
        <p class="eyebrow">Study note</p>
        <h2>予習ノート</h2>
      </div>
      <button class="primary-button" type="button">追加</button>
    </div>

    <label class="field">
      <span>予習メモ</span>
      <textarea rows="5" placeholder="図面で見たこと、当日確認すること、上司に聞くことを残す"></textarea>
    </label>

    <div class="quick-fields" aria-label="予習メモの補助項目">
      <label>
        <span>自分がやること</span>
        <input type="text" value="図面記号と配線ルートを照合する">
      </label>
      <label>
        <span>上司に確認</span>
        <input type="text" value="判断が必要な作業範囲と報告タイミング">
      </label>
    </div>

    <div class="note-list">
      ${state.notes.map(note => `
        <article class="note-item">
          <time>${note.time}</time>
          <p>${note.text}</p>
          ${recordMeta(note)}
          ${internalSharePanel(note)}
        </article>
      `).join('')}
    </div>

    ${premiumPanel('有料版の整理機能', premiumFeatures)}
  `;
}

function scheduleScreen() {
  const progress = overallProgress();
  const active = activeScheduleItem();

  return `
    <div class="screen-header">
      <div>
        <p class="eyebrow">Schedule</p>
        <h2>工程表</h2>
      </div>
      <div class="progress-ring" aria-label="全体進捗 ${progress}%">${progress}%</div>
    </div>
    <p class="lead">新築・リフォームの電気工事を予習するための工程メモです。進捗と確認事項を工程ごとに整理します。</p>
    <div class="status-legend" aria-label="工程ステータス">
      ${['予定', '作業中', '完了', '延期', '要確認'].map(status => `
        <span class="status-badge status-${statusClass(status)}">${status}</span>
      `).join('')}
    </div>
    <div class="section-title">
      <div>
        <p class="eyebrow">Calendar</p>
        <h3>工程カレンダー</h3>
      </div>
    </div>
    <div class="schedule-calendar" aria-label="工程カレンダー">
      ${state.schedule.map(item => `
        <button class="calendar-item ${item.id === active.id ? 'is-selected' : ''}" data-schedule-id="${item.id}" type="button">
          <time>${item.date}</time>
          <span>${item.name}</span>
        </button>
      `).join('')}
    </div>
    <div class="schedule-list">
      ${state.schedule.map(item => scheduleItem(item)).join('')}
    </div>
    ${scheduleDetail(active)}
    ${state.premium ? premiumPanel('有料版の工程整理', [
      '工程ごとの予習テンプレートを保存',
      '上司確認リストを工程別にまとめる',
      '写真メモから報告用の見出しを作る'
    ]) : premiumPanel('有料版でできること', [
      '工程表テンプレートの保存',
      '写真メモの分類',
      '確認事項の社内共有準備'
    ])}
  `;
}

function assignmentsScreen() {
  const groups = worksByAssignee(state.selectedWorkDate);
  const activeWork = activeDailyWork();

  return `
    <div class="screen-header">
      <div>
        <p class="eyebrow">Daily assignments</p>
        <h2>${state.selectedWorkDate} 今日の担当者別工事一覧</h2>
      </div>
    </div>
    <p class="lead">日付を選ぶと、その日の工事を担当者別に確認できます。担当者や工程カードから詳細へ移動できます。</p>
    <label class="assignment-filter">
      <span>担当者を選択</span>
      <select data-action="set-active-assignee">
        ${peopleOptions(state.activeAssignee)}
      </select>
    </label>
    <div class="work-date-calendar" aria-label="担当者別工事カレンダー">
      ${calendarDates().map(date => `
        <button class="work-date ${date === state.selectedWorkDate ? 'is-selected' : ''}" data-work-date="${date}" type="button">
          <time>${date}</time>
          <span>工事${worksForDate(date).length} / 工程${schedulesForDate(date).length} / 写真${photosForDate(date).length}</span>
        </button>
      `).join('')}
    </div>
    <div class="assignment-groups">
      ${Object.entries(groups).length ? Object.entries(groups).map(([assignee, works]) => assignmentGroup(assignee, works)).join('') : '<article class="empty-case"><strong>この日の担当者別工事は未登録です</strong><p>工程表や写真メモから関連する予定を確認できます。</p></article>'}
    </div>
    ${assigneeDetail(activeWork)}
  `;
}

function assignmentGroup(assignee, works) {
  return `
    <section class="assignment-group ${assignee === state.activeAssignee ? 'is-selected' : ''}" aria-label="${assignee}の工事一覧">
      <button class="assignment-person" data-assignee-name="${assignee}" type="button">
        <span>${assignee}</span>
        <small>${works.length}件</small>
      </button>
      <div class="assignment-work-list">
        ${works.map(work => dailyWorkCard(work)).join('')}
      </div>
    </section>
  `;
}

function dailyWorkCard(work) {
  const pastCase = primaryCaseForSchedule(work.scheduleId);

  return `
    <button class="daily-work-card" data-work-id="${work.id}" type="button">
      <div class="daily-work-head">
        <div>
          <time>${work.date}</time>
          <strong>${work.site} ${work.process}</strong>
          <small>案件：${state.project.title}</small>
        </div>
        <span class="status-badge status-${statusClass(work.status)}">${work.status}</span>
      </div>
      <p>${work.work}</p>
      ${photoSummaryBadges(work.scheduleId)}
      ${pastCase ? `<div class="inline-links"><span data-case-id="${pastCase.id}">関連する過去事例：${pastCase.title}</span></div>` : ''}
      <div class="item-progress">
        <span>進捗 ${work.progress}%</span>
        <div class="meter" aria-label="${work.site} ${work.process}の進捗 ${work.progress}%">
          <span style="width: ${work.progress}%"></span>
        </div>
      </div>
      <dl class="schedule-details">
        <div>
          <dt>次にやること</dt>
          <dd>${work.nextAction}</dd>
        </div>
        <div>
          <dt>上司確認</dt>
          <dd>${work.supervisorCheck}</dd>
        </div>
      </dl>
      ${recordMeta(work)}
    </button>
  `;
}

function assigneeDetail(work) {
  if (!work) return '';

  const works = worksForDate(state.selectedWorkDate).filter(item => item.assignee === work.assignee);
  const schedule = scheduleById(work.scheduleId);
  const photos = photosForSchedule(work.scheduleId);
  const pastCase = primaryCaseForSchedule(work.scheduleId);

  return `
    <section class="assignee-detail" id="assignee-detail" aria-label="${work.assignee}の担当詳細">
      <div class="screen-header">
        <div>
          <p class="eyebrow">Assignee detail</p>
          <h2>${work.assignee} 担当詳細</h2>
        </div>
        <span>${state.selectedWorkDate}</span>
      </div>
      <div class="assignee-summary">
        <span>担当者：${work.assignee}</span>
        <span>補助：${work.assistant}</span>
        <span>確認者：${work.reviewer}</span>
      </div>
      <div class="selected-detail-summary">
        <article>
          <span>日付</span>
          <strong>${work.date}</strong>
        </article>
        <article>
          <span>案件名</span>
          <strong>${state.project.title}</strong>
        </article>
        <article>
          <span>工程名</span>
          <strong>${work.process}</strong>
        </article>
        <article>
          <span>担当者</span>
          <strong>${work.assignee}</strong>
        </article>
        <article>
          <span>進捗率</span>
          <strong>${work.progress}%</strong>
        </article>
        <article>
          <span>ステータス</span>
          <strong>${work.status}</strong>
        </article>
      </div>
      ${detailActionButtons({ workId: work.id, scheduleId: work.scheduleId, caseId: pastCase?.id })}
      <div class="detail-grid">
        <article>
          <span>作業内容</span>
          <p>${work.work}</p>
        </article>
        <article>
          <span>次にやること</span>
          <p>${work.nextAction}</p>
        </article>
        <article>
          <span>上司に確認すること</span>
          <p>${work.supervisorCheck}</p>
        </article>
        <article>
          <span>関連写真メモ</span>
          <p>${photos.length ? `${photos.length}件の写真メモがあります。` : schedule?.photoMemo || '関連写真メモは未登録です。'}</p>
        </article>
        <article>
          <span>関連する過去事例</span>
          <p>${pastCase ? `<button class="text-link-button" data-case-id="${pastCase.id}" type="button">${pastCase.title}</button>` : '関連する過去事例は未設定です。'}</p>
        </article>
      </div>
      <div class="detail-grid">
        ${works.map(item => `
          <article class="${item.id === work.id ? 'is-selected' : ''}">
            <span>${item.site} ${item.process}</span>
            <p>${item.work}</p>
            <p>次にやること：${item.nextAction}</p>
            <p>上司確認：${item.supervisorCheck}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function pastCasesScreen() {
  const results = filteredPastCases();
  const active = activePastCase(results);

  return `
    <div class="screen-header">
      <div>
        <p class="eyebrow">Case search</p>
        <h2>過去事例検索</h2>
      </div>
    </div>
    <p class="lead">社内で行った似た工事記録から、対応方法、注意点、写真メモ、上司確認内容を探すためのモックです。</p>
    <aside class="notice">
      この機能は過去記録を参考にするためのものです。実際の施工判断は、所属会社のルール、現場責任者、上司、有資格者の指示に従ってください。
    </aside>
    <section class="case-search-panel" aria-label="過去事例検索条件">
      <label class="case-keyword">
        <span>検索キーワード</span>
        <input type="search" value="${escapeHTML(state.caseFilters.keyword)}" data-case-filter="keyword" placeholder="例：梁まわり、器具位置、写真整理">
      </label>
      <div class="case-filter-grid">
        ${caseFilterSelect('工事種別', 'type', caseTypeOptions)}
        ${caseFilterSelect('工程', 'process', caseProcessOptions)}
        ${caseFilterSelect('担当者', 'assignee', ['すべて', ...peopleNames()])}
        ${caseFilterSelect('状態', 'status', caseStatusOptions)}
      </div>
      <button class="primary-button" data-action="apply-case-search" type="button">検索</button>
    </section>
    <div class="case-result-summary">
      <strong>${results.length}件</strong>
      <span>サンプル過去事例から絞り込み</span>
    </div>
    <div class="case-results-area">
      <div class="case-results">
        ${results.length ? results.map(item => pastCaseCard(item)).join('') : emptyCaseResult()}
      </div>
      ${results.length ? pastCaseDetail(active) : ''}
    </div>
  `;
}

function caseFilterSelect(label, field, options) {
  return `
    <label>
      <span>${label}</span>
      <select data-case-filter="${field}">
        ${options.map(option => `
          <option value="${option}" ${state.caseFilters[field] === option ? 'selected' : ''}>${option}</option>
        `).join('')}
      </select>
    </label>
  `;
}

function pastCaseCard(item) {
  const relatedPhotos = photosForCase(item.id);
  const needsReview = relatedPhotos.filter(photo => photo.status === '要相談' || photo.reviewStatus === '要修正').length;

  return `
    <button class="past-case-card ${item.id === state.activeCaseId ? 'is-selected' : ''}" data-case-id="${item.id}" type="button">
      <div class="daily-work-head">
        <div>
          <span class="case-type">${item.type} / ${item.process}</span>
          <strong>過去事例：${item.title}</strong>
        </div>
        <span class="case-status case-status-${caseStatusClass(item.status)}">${item.status}</span>
      </div>
      <dl class="case-card-details">
        <div>
          <dt>状況</dt>
          <dd>${item.situation}</dd>
        </div>
        <div>
          <dt>対応</dt>
          <dd>${item.response}</dd>
        </div>
        <div>
          <dt>注意点</dt>
          <dd>${item.caution}</dd>
        </div>
        <div>
          <dt>関連写真メモ</dt>
          <dd>${item.photoMemo}</dd>
        </div>
      </dl>
      <div class="assignee-summary">
        <span>担当者：${item.assignee}</span>
        <span>確認者：${item.reviewer}</span>
        <span>関連写真：${relatedPhotos.length}件</span>
        ${needsReview ? `<span>要確認写真：${needsReview}件</span>` : ''}
      </div>
    </button>
  `;
}

function emptyCaseResult() {
  return `
    <article class="empty-case">
      <strong>該当する過去事例はありません</strong>
      <p>キーワードや絞り込み条件を広げて確認してください。</p>
    </article>
  `;
}

function pastCaseDetail(item) {
  if (!item) return '';
  const relatedPhotos = photosForCase(item.id);

  return `
    <section class="case-detail" id="case-detail" aria-label="${item.title}の詳細">
      <div class="screen-header">
        <div>
          <p class="eyebrow">Selected case</p>
          <h2>${item.title}</h2>
        </div>
        <span class="case-status case-status-${caseStatusClass(item.status)}">${item.status}</span>
      </div>
      ${recordMeta(item)}
      <div class="detail-grid">
        <article>
          <span>工事種別</span>
          <p>${item.type}</p>
        </article>
        <article>
          <span>工程</span>
          <p>${item.process}</p>
        </article>
        <article>
          <span>状況</span>
          <p>${item.situation}</p>
        </article>
        <article>
          <span>参考になった対応</span>
          <p>${item.referenceAction}</p>
        </article>
        <article>
          <span>関連写真メモ</span>
          <p>${item.photoMemo}</p>
        </article>
        <article>
          <span>上司コメント</span>
          <p>${item.supervisorComment}</p>
        </article>
        <article>
          <span>注意点</span>
          <p>${item.caution}</p>
        </article>
        <article>
          <span>確認者</span>
          <p>${item.reviewer}</p>
        </article>
      </div>
      ${caseRelatedPhotos(relatedPhotos)}
    </section>
  `;
}

function caseRelatedPhotos(photos) {
  return `
    <section class="photo-section" aria-label="過去事例に関連する写真メモ">
      <div class="section-title">
        <div>
          <p class="eyebrow">Photo memo</p>
          <h3>関連する写真メモ</h3>
        </div>
        <span>${photos.length}枚</span>
      </div>
      <div class="photo-grid">
        ${photos.length ? photos.map(photo => photoCard(photo)).join('') : '<article class="empty-case"><strong>関連写真メモはまだありません</strong><p>工程詳細の写真追加エリアからモック登録できます。</p></article>'}
      </div>
    </section>
  `;
}

function scheduleItem(item) {
  const pastCase = primaryCaseForSchedule(item.id);

  return `
    <button class="schedule-item ${item.id === state.activeScheduleId ? 'is-selected' : ''}" data-schedule-id="${item.id}" type="button">
      <div class="schedule-title">
        <div>
          <time>${item.date}</time>
          <h3>${item.name}</h3>
        </div>
        <span class="status-badge status-${statusClass(item.status)}">${item.status}</span>
      </div>
      <p>${item.work}</p>
      ${recordMeta(item)}
      ${photoSummaryBadges(item.id)}
      ${pastCase ? `<div class="inline-links"><span data-case-id="${pastCase.id}">関連する過去事例：${pastCase.title}</span></div>` : ''}
      <div class="item-progress">
        <span>進捗 ${item.progress}%</span>
        <div class="meter" aria-label="${item.name}の進捗 ${item.progress}%">
          <span style="width: ${item.progress}%"></span>
        </div>
      </div>
      <dl class="schedule-details">
        <div>
          <dt>次にやること</dt>
          <dd>${item.nextAction}</dd>
        </div>
        <div>
          <dt>上司に確認すること</dt>
          <dd>${item.askSupervisor}</dd>
        </div>
        <div>
          <dt>残作業</dt>
          <dd>${item.remaining}</dd>
        </div>
        <div>
          <dt>関連写真メモ</dt>
          <dd>${item.photoMemo}</dd>
        </div>
      </dl>
    </button>
  `;
}

function scheduleDetail(item) {
  const photos = photosForSchedule(item.id);
  const pastCase = primaryCaseForSchedule(item.id);

  return `
    <section class="schedule-detail" id="schedule-detail" aria-label="${item.name}の詳細">
      <div class="screen-header">
        <div>
          <p class="eyebrow">Selected process</p>
          <h2>${item.date} ${item.name}</h2>
        </div>
        <span class="status-badge status-${statusClass(item.status)}">${item.status}</span>
      </div>
      <p class="lead">${item.work}</p>
      <div class="selected-detail-summary">
        <article>
          <span>日付</span>
          <strong>${item.date}</strong>
        </article>
        <article>
          <span>案件名</span>
          <strong>${state.project.title}</strong>
        </article>
        <article>
          <span>工程名</span>
          <strong>${item.name}</strong>
        </article>
        <article>
          <span>担当者</span>
          <strong>${item.assignee || state.project.assignee}</strong>
        </article>
        <article>
          <span>進捗率</span>
          <strong>${item.progress}%</strong>
        </article>
        <article>
          <span>ステータス</span>
          <strong>${item.status}</strong>
        </article>
      </div>
      ${detailActionButtons({ scheduleId: item.id, caseId: pastCase?.id })}
      ${recordMeta(item)}
      ${schedulePersonControls(item)}
      <div class="detail-grid">
        <article>
          <span>次にやること</span>
          <p>${item.nextAction}</p>
        </article>
        <article>
          <span>上司に確認すること</span>
          <p>${item.askSupervisor}</p>
        </article>
        <article>
          <span>残作業</span>
          <p>${item.remaining}</p>
        </article>
        <article>
          <span>関連写真メモ</span>
          <p>${item.photoMemo}</p>
        </article>
        <article>
          <span>関連する過去事例</span>
          <p>${pastCase ? `<button class="text-link-button" data-case-id="${pastCase.id}" type="button">${pastCase.title}</button>` : '関連する過去事例は未設定です。'}</p>
        </article>
      </div>
      ${internalSharePanel(item)}
      ${photoUploadPanel(item)}
      ${photoCards(photos, item)}
    </section>
  `;
}

function schedulePersonControls(item) {
  return `
    <section class="schedule-person-controls" aria-label="${item.name}の担当者選択">
      <label>
        <span>担当者</span>
        <select data-action="set-schedule-person" data-schedule-id="${item.id}" data-field="assignee">
          ${peopleOptions(item.assignee || state.project.assignee)}
        </select>
      </label>
      <label>
        <span>補助</span>
        <select data-action="set-schedule-person" data-schedule-id="${item.id}" data-field="assistant">
          ${peopleOptions(item.assistant || state.project.assistant)}
        </select>
      </label>
      <label>
        <span>確認者</span>
        <select data-action="set-schedule-person" data-schedule-id="${item.id}" data-field="reviewer">
          ${peopleOptions(item.reviewer || state.project.reviewer)}
        </select>
      </label>
    </section>
  `;
}

function photoUploadPanel(item) {
  return `
    <details class="photo-form mobile-disclosure" aria-label="写真追加" open>
      <summary class="photo-form-summary">
        <div>
        <p class="eyebrow">Photo memo</p>
        <h3>写真追加・写真メモ</h3>
        <p>画像を選択すると、このブラウザ上だけで写真プレビューを追加します。本番アップロードやクラウド保存はまだ行いません。</p>
        </div>
        <span class="disclosure-hint">写真追加フォームを開閉</span>
      </summary>
      <div class="photo-form-content">
      <aside class="notice photo-notice">
        この写真機能は、現場記録・上司確認・過去事例整理のためのものです。実際の施工判断は、所属会社のルール、現場責任者、上司、有資格者の指示に従ってください。
      </aside>
      <div class="photo-form-grid">
        <label>
          <span>案件</span>
          <input type="text" value="${state.project.title}" data-photo-project readonly>
        </label>
        <label>
          <span>訪問日</span>
          <input type="date" value="${item.date.replaceAll('/', '-')}" data-photo-date>
        </label>
        <label>
          <span>関連工程</span>
          <select data-photo-schedule>
            ${state.schedule.map(schedule => `
              <option value="${schedule.id}" ${schedule.id === item.id ? 'selected' : ''}>${schedule.date} ${schedule.name}</option>
            `).join('')}
          </select>
        </label>
        <label>
          <span>担当者</span>
          <select data-photo-assignee>
            ${peopleOptions(item.assignee || state.project.assignee)}
          </select>
        </label>
        <label>
          <span>撮影者</span>
          <select data-photo-photographer>
            ${peopleOptions('新人Aさん')}
          </select>
        </label>
        <label>
          <span>状態</span>
          <select data-photo-status>
            <option value="確認前">確認前</option>
            <option value="確認済み">確認済み</option>
            <option value="要相談" ${item.status === '要確認' ? 'selected' : ''}>要相談</option>
          </select>
        </label>
        <label>
          <span>関連する過去事例</span>
          <select data-photo-case>
            ${state.pastCases.map(pastCase => `
              <option value="${pastCase.id}" ${pastCase.process === processNameForSchedule(item.id) ? 'selected' : ''}>${pastCase.title}</option>
            `).join('')}
          </select>
        </label>
      </div>
      <label class="field">
        <span>メモ</span>
        <textarea rows="3" data-photo-memo placeholder="写真を見て確認したいこと、上司に相談したいこと"></textarea>
      </label>
      <label class="file-field">
        <span>写真（複数選択可）</span>
        <strong class="photo-add-button">写真を選択して追加</strong>
        <small>選択すると、この画面内にプレビュー付き写真メモカードを追加します。</small>
        <input type="file" accept="image/*" multiple data-action="add-photo">
      </label>
      </div>
    </details>
  `;
}

function photoCards(photos, item) {
  const cards = photos.length ? photos : [{
    id: `placeholder-${item.id}`,
    scheduleId: item.id,
    projectTitle: state.project.title,
    relatedCaseId: pastCasesForSchedule(item.id)[0]?.id,
    date: item.date,
    status: '確認前',
    assignee: item.assignee,
    photographer: '新人Aさん',
    memo: item.photoMemo,
    src: ''
  }];

  return `
    <section class="photo-section" aria-label="${item.name}の関連写真">
      <div class="section-title">
        <div>
          <p class="eyebrow">Related photos</p>
          <h3>関連写真</h3>
        </div>
        <span>${photos.length}枚</span>
      </div>
      <div class="photo-grid">
        ${cards.map(photo => photoCard(photo)).join('')}
      </div>
    </section>
  `;
}

function photoCard(photo) {
  const projectTitle = photo.projectTitle || state.project.title;
  const photographer = photo.photographer || photo.author || '新人Aさん';
  const relatedCase = photo.relatedCaseId ? caseName(photo.relatedCaseId) : '未設定';

  return `
    <article class="photo-card" data-photo-card-id="${photo.id}">
      <div class="photo-frame">
        ${photo.src ? `<img src="${photo.src}" alt="${scheduleName(photo.scheduleId)}の写真">` : '<span class="photo-placeholder">写真</span>'}
      </div>
      <div class="photo-card-body">
        <div class="photo-meta">
          <time>${formatDate(photo.date)}</time>
          <span class="photo-status photo-status-${photoStatusClass(photo.status)}">${photo.status}</span>
        </div>
        <strong>写真メモ</strong>
        <dl class="photo-details">
          <div>
            <dt>撮影日</dt>
            <dd>${formatDate(photo.date)}</dd>
          </div>
          <div>
            <dt>関連案件</dt>
            <dd>${projectTitle}</dd>
          </div>
          <div>
            <dt>関連工程</dt>
            <dd>${scheduleName(photo.scheduleId)}</dd>
          </div>
          <div>
            <dt>担当者</dt>
            <dd>${photo.assignee || state.project.assignee}</dd>
          </div>
          <div>
            <dt>撮影者</dt>
            <dd>${photographer}</dd>
          </div>
          <div>
            <dt>状態</dt>
            <dd>${photo.status}</dd>
          </div>
          <div>
            <dt>メモ</dt>
            <dd>${escapeHTML(photo.memo)}</dd>
          </div>
          <div>
            <dt>上司コメント</dt>
            <dd>${escapeHTML(photo.supervisorComment || '上司確認後にコメントを残す。')}</dd>
          </div>
          <div>
            <dt>関連する過去事例</dt>
            <dd>${photo.relatedCaseId ? `<button class="text-link-button" data-case-id="${photo.relatedCaseId}" type="button">${relatedCase}</button>` : relatedCase}</dd>
          </div>
        </dl>
        ${recordMeta(photo)}
        <button class="photo-delete" data-photo-delete-id="${photo.id}" type="button">写真削除</button>
      </div>
    </article>
  `;
}

function photoStatusClass(status) {
  return {
    '確認前': 'pending',
    '確認済み': 'checked',
    '要相談': 'review'
  }[status] || 'pending';
}

function caseStatusClass(status) {
  return {
    '解決済み': 'solved',
    '要確認': 'review',
    '上司確認済み': 'checked'
  }[status] || 'review';
}

function formatDate(date) {
  return date.replaceAll('-', '/');
}

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function statusClass(status) {
  return {
    '予定': 'planned',
    '作業中': 'active',
    '完了': 'done',
    '延期': 'delayed',
    '要確認': 'review'
  }[status] || 'planned';
}

function checklistScreen(title, description, items, key) {
  const done = items.filter(item => item.checked).length;
  const percent = Math.round((done / items.length) * 100);

  return `
    <div class="screen-header">
      <div>
        <p class="eyebrow">${done}/${items.length} done</p>
        <h2>${title}</h2>
      </div>
      <div class="progress-ring" aria-label="完了率 ${percent}%">${percent}%</div>
    </div>
    <p class="lead">${description}</p>
    <div class="checklist">
      ${items.map((item, index) => `
        <label class="check-item">
          <input type="checkbox" ${item.checked ? 'checked' : ''} data-list="${key}" data-index="${index}">
          <span>${item.label}</span>
          ${recordMeta(item)}
        </label>
      `).join('')}
    </div>
    ${state.premium ? premiumChecklistTools(key) : premiumPanel('有料版でできること', [
      '工程別チェックリストの保存',
      '上司への確認事項テンプレート',
      '次回予習リマインド表示'
    ])}
  `;
}

function betaTestScreen() {
  const checks = state.betaTest.checks;
  const done = checks.filter(item => item.checked).length;
  const percent = Math.round((done / checks.length) * 100);
  const comments = state.betaTest.comments;

  return `
    <div class="screen-header">
      <div>
        <p class="eyebrow">Beta test</p>
        <h2>βテスト用チェック表</h2>
      </div>
      <div class="progress-ring" aria-label="βテスト確認率 ${percent}%">${percent}%</div>
    </div>
    <p class="lead">βテスターや新人電気工事士さんが、1案件だけ実際に触って確認するためのチェック表です。入力内容はこのブラウザのlocalStorageに保存します。</p>
    <aside class="notice">
      βテスト用チェック表は、本番ログイン、本番DB、クラウド保存、決済なしの画面モックです。実際の施工判断は、所属会社のルール、現場責任者、上司、有資格者の指示に従ってください。
    </aside>
    <section class="beta-status-panel" aria-label="βテスト状態">
      <div>
        <span>βテスト状態</span>
        <strong class="beta-status beta-status-${betaStatusClass(state.betaTest.status)}">${state.betaTest.status}</strong>
      </div>
      <label>
        <span>状態を選択</span>
        <select data-action="set-beta-status">
          ${betaStatusOptions.map(status => `<option value="${status}" ${status === state.betaTest.status ? 'selected' : ''}>${status}</option>`).join('')}
        </select>
      </label>
    </section>
    <section class="beta-test-panel" aria-label="βテストチェック項目">
      <div class="section-title">
        <div>
          <p class="eyebrow">${done}/${checks.length} checked</p>
          <h3>触って確認する項目</h3>
        </div>
        <span>${percent}%</span>
      </div>
      <div class="beta-check-list">
        ${checks.map((item, index) => `
          <label class="beta-check-item">
            <input type="checkbox" ${item.checked ? 'checked' : ''} data-beta-check-index="${index}">
            <span>${item.label}</span>
          </label>
        `).join('')}
      </div>
    </section>
    <section class="beta-comment-panel" aria-label="βテストコメント">
      <div class="section-title">
        <div>
          <p class="eyebrow">Feedback</p>
          <h3>コメント欄</h3>
        </div>
        <span>自動保存</span>
      </div>
      ${betaCommentField('good', '良かった点', comments.good, '使いやすかった画面、助かった表示など')}
      ${betaCommentField('unclear', 'わかりにくかった点', comments.unclear, '迷った操作、言葉が難しかった場所など')}
      ${betaCommentField('request', '追加してほしい機能', comments.request, 'β後に欲しい機能や入力欄など')}
      ${betaCommentField('scene', '現場で使えそうな場面', comments.scene, '現場前、自宅整理、上司確認など')}
      ${betaCommentField('unnecessary', '不要だと思う機能', comments.unnecessary, '使わなそうな表示や減らしたい項目など')}
    </section>
  `;
}

function betaCommentField(field, label, value, placeholder) {
  return `
    <label class="beta-comment-field">
      <span>${label}</span>
      <textarea rows="3" data-beta-comment="${field}" placeholder="${placeholder}">${escapeHTML(value)}</textarea>
    </label>
  `;
}

function betaStatusClass(status) {
  return {
    '未確認': 'pending',
    '確認中': 'active',
    '改善必要': 'review',
    'OK': 'ok'
  }[status] || 'pending';
}

function premiumPanel(title, items) {
  const locked = !state.premium;
  return `
    <aside class="premium-panel ${locked ? 'is-locked' : ''}">
      <div>
        <p class="eyebrow">${locked ? 'premium preview' : 'premium active'}</p>
        <h3>${title}</h3>
      </div>
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </aside>
  `;
}

function premiumChecklistTools(key) {
  const label = key === 'before' ? '仕事前テンプレート' : '自宅整理テンプレート';
  return `
    <aside class="premium-panel">
      <div>
        <p class="eyebrow">premium active</p>
        <h3>${label}</h3>
      </div>
      <div class="action-grid">
        <button type="button">この工程用に保存</button>
        <button type="button">次回へ引き継ぐ</button>
      </div>
    </aside>
  `;
}

function readPersonForm() {
  return {
    name: document.querySelector('[data-person-name]')?.value.trim() || '新規担当者',
    role: document.querySelector('[data-person-role]')?.value || '新人',
    duty: document.querySelector('[data-person-duty]')?.value || '担当者'
  };
}

function readProjectForm() {
  const value = field => document.querySelector(`[data-project-field="${field}"]`)?.value.trim() || '';
  const assignee = value('assignee') || state.project.assignee || '担当者Aさん';
  const assistant = value('assistant') || state.project.assistant || '新人Aさん';
  const reviewer = value('reviewer') || state.project.reviewer || '確認者Bさん';
  const type = value('type') || '新築';
  const address = value('address');
  const startDate = formatDate(value('startDate'));
  const endDate = formatDate(value('endDate'));
  const contractor = value('contractor');

  return {
    title: value('title') || '新規現場案件',
    client: contractor || '担当会社未設定',
    schedule: startDate && endDate ? `${startDate} - ${endDate}` : '日程未設定',
    location: [address, type].filter(Boolean).join(' / ') || type,
    address,
    type,
    contractor,
    startDate,
    endDate,
    status: state.project.status || '新規作成',
    supervisor: reviewer,
    overallProgress: Number(state.project.overallProgress) || 0,
    assignee,
    assistant,
    reviewer,
    updatedBy: assignee,
    memo: value('memo'),
    supervisorQuestion: value('supervisorQuestion'),
    nextProcess: state.project.nextProcess || nextScheduleItem().name
  };
}

document.addEventListener('input', (event) => {
  const target = event.target;

  if (target.matches('[data-calendar-search]')) {
    state.calendarSearch = target.value;
    persistState('検索条件を保存しました');
    return;
  }

  if (target.matches('[data-tool-filter="keyword"]')) {
    const cursor = target.selectionStart;
    state.toolFilters.keyword = target.value;
    render();
    requestAnimationFrame(() => {
      const input = document.querySelector('[data-tool-filter="keyword"]');
      input?.focus();
      if (input && cursor !== null) input.setSelectionRange(cursor, cursor);
    });
    return;
  }

  if (target.matches('[data-project-field]')) {
    setSaveStatus('未保存', 'unsaved', '案件フォームの変更は追加または更新で保存されます');
    return;
  }

  if (target.matches('[data-case-filter="keyword"]')) {
    state.caseFilters.keyword = target.value;
    persistState('自動保存しました');
  }

  if (target.matches('[data-beta-comment]')) {
    state.betaTest.comments[target.dataset.betaComment] = target.value;
    persistState('自動保存しました');
  }
});

document.addEventListener('change', async (event) => {
  const target = event.target;

  if (target.matches('[data-calendar-search]')) {
    state.calendarSearch = target.value;
    render();
    return;
  }

  if (target.matches('[data-action="set-calendar-person"]')) {
    state.calendarPerson = target.value;
    render();
    return;
  }

  if (target.matches('[data-tool-filter="category"], [data-tool-filter="process"]')) {
    state.toolFilters[target.dataset.toolFilter] = target.value;
    render();
    return;
  }

  if (target.matches('[data-tool-packing]')) {
    const tool = state.tools.find(item => item.id === target.dataset.toolPacking);
    if (tool) tool.packingChecked = target.checked;
    render();
    return;
  }

  if (target.matches('[data-case-filter]')) {
    readCaseFiltersFromDOM();
    syncActiveCaseWithFilters();
    render();
    return;
  }

  if (target.matches('[data-action="set-project-person"]')) {
    state.project[target.dataset.field] = target.value;
    if (target.dataset.field === 'reviewer') {
      state.project.supervisor = target.value;
    }
    if (target.dataset.field === 'assignee') {
      state.activeAssignee = target.value;
    }
    syncActiveProjectFromProject();
    render();
    return;
  }

  if (target.matches('[data-action="set-schedule-person"]')) {
    const item = state.schedule.find(schedule => schedule.id === target.dataset.scheduleId);
    if (item) {
      item[target.dataset.field] = target.value;
      if (target.dataset.field === 'assignee') {
        state.activeAssignee = target.value;
      }
    }
    render();
    return;
  }

  if (target.matches('[data-action="set-active-assignee"]')) {
    state.activeAssignee = target.value;
    state.activeWorkId = worksForDate(state.selectedWorkDate).find(work => work.assignee === state.activeAssignee)?.id || state.activeWorkId;
    render();
    scrollToAssigneeDetail();
    return;
  }

  if (target.matches('[data-action="set-beta-status"]')) {
    state.betaTest.status = target.value;
    render();
    return;
  }

  if (target.matches('[data-action="add-photo"]')) {
    const files = Array.from(target.files || []);
    if (!files.length) return;

    const addingFromPhotoTab = state.activeTab === 'photos';
    const form = target.closest('.photo-form');
    const scheduleId = form.querySelector('[data-photo-schedule]').value;
    const date = form.querySelector('[data-photo-date]').value;
    const status = form.querySelector('[data-photo-status]').value;
    const memo = form.querySelector('[data-photo-memo]').value.trim() || `${scheduleName(scheduleId)}の確認用写真`;
    const assignee = form.querySelector('[data-photo-assignee]')?.value || state.project.assignee;
    const photographer = form.querySelector('[data-photo-photographer]')?.value || '新人Aさん';
    const projectTitle = form.querySelector('[data-photo-project]')?.value || state.project.title;
    const relatedCaseId = form.querySelector('[data-photo-case]')?.value || pastCasesForSchedule(scheduleId)[0]?.id || '';
    const updatedAt = new Date().toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    const fileSources = await Promise.all(files.map(file => fileToDataURL(file)));

    const newPhotos = files.map((file, index) => ({
      id: `photo-${Date.now()}-${index}`,
      scheduleId,
      projectTitle,
      relatedCaseId,
      date,
      status,
      assignee,
      assistant: state.project.assistant,
      photographer,
      memo: files.length > 1 ? `${memo}（${file.name}）` : memo,
      src: fileSources[index],
      author: photographer,
      updatedAt,
      updatedBy: photographer,
      reviewer: state.project.reviewer,
      reviewStatus: status === '要相談' ? '要修正' : '未確認',
      internalMemo: '追加写真の確認待ち。',
      supervisorComment: status === '要相談' ? '現場判断せず、上司確認後に対応する。' : '写真確認後にコメントを入れる。',
      nextInstruction: '必要に応じて別角度の写真を追加する。'
    }));

    state.photos.unshift(...newPhotos);
    state.activeScheduleId = scheduleId;
    state.activeTab = addingFromPhotoTab ? 'photos' : 'schedule';
    render();
    if (addingFromPhotoTab) {
      scrollToPhotoCard(newPhotos[0].id);
    } else {
      scrollToScheduleDetail();
    }
    return;
  }

  if (target.matches('[data-action="toggle-premium"]')) {
    state.premium = target.checked;
    render();
  }

  if (target.matches('[data-list]')) {
    const list = target.dataset.list;
    const index = Number(target.dataset.index);
    state[list][index].checked = target.checked;
    render();
    return;
  }

  if (target.matches('[data-beta-check-index]')) {
    const index = Number(target.dataset.betaCheckIndex);
    state.betaTest.checks[index].checked = target.checked;
    if (state.betaTest.status === '未確認') {
      state.betaTest.status = '確認中';
    }
    render();
  }
});

document.addEventListener('click', (event) => {
  const resetSampleTarget = event.target.closest('[data-action="reset-sample"]');
  if (resetSampleTarget) {
    resetToSampleState();
    return;
  }

  const toggleToolFavoritesTarget = event.target.closest('[data-action="toggle-tool-favorites"]');
  if (toggleToolFavoritesTarget) {
    state.toolFilters.favoriteOnly = !state.toolFilters.favoriteOnly;
    render();
    return;
  }

  const clearToolFiltersTarget = event.target.closest('[data-action="clear-tool-filters"]');
  if (clearToolFiltersTarget) {
    state.toolFilters = { keyword: '', category: 'すべて', process: 'すべて', favoriteOnly: false };
    render();
    return;
  }

  const toolFavoriteTarget = event.target.closest('[data-tool-favorite]');
  if (toolFavoriteTarget) {
    const tool = state.tools.find(item => item.id === toolFavoriteTarget.dataset.toolFavorite);
    if (tool) tool.favorite = !tool.favorite;
    render();
    return;
  }

  const toolSelectTarget = event.target.closest('[data-tool-select]');
  if (toolSelectTarget) {
    const nextToolId = toolSelectTarget.dataset.toolSelect;
    const compactViewport = isCompactToolViewport();
    if (compactViewport && state.activeToolId === nextToolId) {
      toolDetailExpanded = !toolDetailExpanded;
    } else {
      state.activeToolId = nextToolId;
      toolDetailExpanded = true;
    }
    render();
    if (compactViewport && toolDetailExpanded) scrollToToolCard(nextToolId);
    return;
  }

  const homeWorkDateTarget = event.target.closest('[data-home-work-date]');
  if (homeWorkDateTarget) {
    state.homeListDate = homeWorkDateTarget.dataset.homeWorkDate;
    state.selectedWorkDate = state.homeListDate;
    const firstWork = worksForDate(state.homeListDate)[0];
    if (firstWork) {
      state.activeWorkId = firstWork.id;
      state.activeAssignee = firstWork.assignee;
      state.activeScheduleId = firstWork.scheduleId;
    }
    render();
    scrollToHomeWorkList();
    return;
  }

  const calendarModeTarget = event.target.closest('[data-calendar-mode]');
  if (calendarModeTarget) {
    state.calendarMode = calendarModeTarget.dataset.calendarMode;
    render();
    return;
  }

  const calendarMonthTarget = event.target.closest('[data-calendar-month]');
  if (calendarMonthTarget) {
    const month = monthStart();
    month.setMonth(month.getMonth() + Number(calendarMonthTarget.dataset.calendarMonth));
    state.calendarMonth = monthKey(month);
    state.selectedWorkDate = dateKey(month);
    const firstWork = filteredCalendarWorks().find(work => work.date.startsWith(state.calendarMonth));
    if (firstWork) {
      state.selectedWorkDate = firstWork.date;
      state.activeWorkId = firstWork.id;
    }
    render();
    return;
  }

  const calendarTodayTarget = event.target.closest('[data-action="calendar-today"]');
  if (calendarTodayTarget) {
    state.calendarMonth = state.homeDate.slice(0, 7);
    state.selectedWorkDate = state.homeDate;
    const firstWork = filteredCalendarWorks().find(work => work.date === state.selectedWorkDate);
    if (firstWork) state.activeWorkId = firstWork.id;
    render();
    scrollToCalendarDayDetail();
    return;
  }

  const calendarDayTarget = event.target.closest('[data-calendar-day]');
  if (calendarDayTarget) {
    state.selectedWorkDate = calendarDayTarget.dataset.calendarDay;
    state.calendarMonth = state.selectedWorkDate.slice(0, 7);
    const firstWork = filteredCalendarWorks().find(work => work.date === state.selectedWorkDate);
    if (firstWork) {
      state.activeWorkId = firstWork.id;
      state.activeAssignee = firstWork.assignee;
      state.activeScheduleId = firstWork.scheduleId;
    }
    render();
    scrollToCalendarDayDetail();
    return;
  }

  const showCalendarFilterTarget = event.target.closest('[data-action="show-calendar-filter"]');
  if (showCalendarFilterTarget) {
    state.calendarMode = 'person';
    render();
    requestAnimationFrame(() => document.querySelector('[data-action="set-calendar-person"]')?.focus());
    return;
  }

  const focusCalendarSearchTarget = event.target.closest('[data-action="focus-calendar-search"]');
  if (focusCalendarSearchTarget) {
    document.querySelector('[data-calendar-search]')?.focus();
    return;
  }

  const clearCalendarSearchTarget = event.target.closest('[data-action="clear-calendar-search"]');
  if (clearCalendarSearchTarget) {
    state.calendarSearch = '';
    render();
    return;
  }

  const noticeTarget = event.target.closest('[data-notice-id]');
  if (noticeTarget) {
    const notice = state.notices.find(item => item.id === noticeTarget.dataset.noticeId);
    if (notice) notice.read = true;
    render();
    return;
  }

  const openProjectCreateTarget = event.target.closest('[data-action="open-project-create"]');
  if (openProjectCreateTarget) {
    state.activeTab = 'projects';
    render();
    requestAnimationFrame(() => {
      const projectFormElement = document.querySelector('.project-form');
      if (projectFormElement) {
        projectFormElement.open = true;
        projectFormElement.classList.add('is-open');
    projectFormElement.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
        projectFormElement.querySelector('input')?.focus({ preventScroll: true });
      }
    });
    return;
  }

  const focusProjectFormTarget = event.target.closest('[data-action="focus-project-form"]');
  if (focusProjectFormTarget) {
    const projectFormElement = document.querySelector('.project-form');
    if (projectFormElement) {
      projectFormElement.open = true;
      projectFormElement.classList.add('is-open');
    projectFormElement.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' });
      projectFormElement.querySelector('input')?.focus({ preventScroll: true });
    }
    return;
  }

  const photoDeleteTarget = event.target.closest('[data-photo-delete-id]');
  if (photoDeleteTarget) {
    state.photos = state.photos.filter(photo => photo.id !== photoDeleteTarget.dataset.photoDeleteId);
    render();
    if (state.activeTab === 'photos') {
      scrollToPhotoList();
    } else if (state.activeTab === 'schedule') {
      scrollToScheduleDetail();
    }
    return;
  }

  const photoTarget = event.target.closest('[data-photo-id]');
  if (photoTarget) {
    const photo = state.photos.find(item => item.id === photoTarget.dataset.photoId);
    if (photo) {
      state.activeScheduleId = photo.scheduleId;
      state.selectedWorkDate = formatDate(photo.date);
      state.activeTab = 'photos';
      render();
      scrollToPhotoCard(photo.id);
    }
    return;
  }

  const photoSummaryTarget = event.target.closest('[data-photo-summary-schedule-id]');
  if (photoSummaryTarget) {
    const scheduleId = photoSummaryTarget.dataset.photoSummaryScheduleId;
    const photos = photosForSchedule(scheduleId);
    state.activeScheduleId = scheduleId;
    state.selectedWorkDate = scheduleById(scheduleId)?.date || state.selectedWorkDate;
    state.activeTab = 'photos';
    render();
    if (photos.length) {
      scrollToPhotoCard(photos[0].id);
    } else {
      scrollToPhotoList();
    }
    return;
  }

  const projectTarget = event.target.closest('[data-project-id]');
  if (projectTarget) {
    const project = state.projects.find(item => item.id === projectTarget.dataset.projectId);
    if (project) {
      applyActiveProject(project);
      state.activeTab = 'projects';
      render();
      scrollToProjectDetail();
    }
    return;
  }

  const personTarget = event.target.closest('[data-person-id]');
  if (personTarget) {
    state.activePersonId = personTarget.dataset.personId;
    state.activeTab = 'people';
    render();
    return;
  }

  const createProjectTarget = event.target.closest('[data-action="create-project"]');
  if (createProjectTarget) {
    const form = readProjectForm();
    const project = {
      ...form,
      id: `project-${Date.now()}`,
      status: '新規作成',
      overallProgress: 0,
      nextProcess: '図面確認'
    };
    state.projects.unshift(project);
    applyActiveProject(project);
    state.activeTab = 'projects';
    render();
    scrollToProjectDetail();
    return;
  }

  const updateProjectTarget = event.target.closest('[data-action="update-project"]');
  if (updateProjectTarget) {
    const form = readProjectForm();
    const current = activeProject();
    const updated = {
      ...current,
      ...form,
      id: current.id,
      status: current.status,
      overallProgress: current.overallProgress,
      nextProcess: current.nextProcess || form.nextProcess
    };
    const index = state.projects.findIndex(project => project.id === current.id);
    if (index >= 0) {
      state.projects[index] = updated;
    }
    applyActiveProject(updated);
    state.activeTab = 'projects';
    render();
    scrollToProjectDetail();
    return;
  }

  const addPersonTarget = event.target.closest('[data-action="add-person"]');
  if (addPersonTarget) {
    const form = readPersonForm();
    const person = {
      id: `person-${Date.now()}`,
      name: form.name,
      role: form.role,
      duty: form.duty
    };
    state.people.push(person);
    state.activePersonId = person.id;
    render();
    return;
  }

  const updatePersonTarget = event.target.closest('[data-action="update-person"]');
  if (updatePersonTarget) {
    const person = activePerson();
    const form = readPersonForm();
    const oldName = person.name;
    person.name = form.name;
    person.role = form.role;
    person.duty = form.duty;
    replacePersonReferences(oldName, person.name);
    render();
    return;
  }

  const deletePersonTarget = event.target.closest('[data-action="delete-person"]');
  if (deletePersonTarget) {
    if (state.people.length <= 1) return;
    const person = activePerson();
    state.people = state.people.filter(personItem => personItem.id !== person.id);
    const fallback = state.people[0];
    replacePersonReferences(person.name, fallback.name);
    state.activePersonId = fallback.id;
    render();
    return;
  }

  const caseSearchTarget = event.target.closest('[data-action="apply-case-search"]');
  if (caseSearchTarget) {
    readCaseFiltersFromDOM();
    syncActiveCaseWithFilters();
    state.activeTab = 'cases';
    render();
    return;
  }

  const caseTarget = event.target.closest('[data-case-id]');
  if (caseTarget) {
    state.activeCaseId = caseTarget.dataset.caseId;
    clearCaseFilters();
    state.activeTab = 'cases';
    render();
    scrollToCaseDetail();
    return;
  }

  const calendarDateTarget = event.target.closest('[data-calendar-date]');
  if (calendarDateTarget) {
    const date = calendarDateTarget.dataset.calendarDate;
    const firstWork = worksForDate(date)[0];
    const firstSchedule = schedulesForDate(date)[0];

    state.selectedWorkDate = date;
    if (firstWork) {
      state.activeWorkId = firstWork.id;
      state.activeAssignee = firstWork.assignee;
      state.activeScheduleId = firstWork.scheduleId;
    } else if (firstSchedule) {
      state.activeScheduleId = firstSchedule.id;
    }
    render();
    scrollToCalendarDayDetail();
    return;
  }

  const workDateTarget = event.target.closest('[data-work-date]');
  if (workDateTarget) {
    const date = workDateTarget.dataset.workDate;
    const firstWork = worksForDate(date)[0];
    const firstSchedule = schedulesForDate(date)[0];

    state.selectedWorkDate = date;
    if (firstWork) {
      state.activeWorkId = firstWork.id;
      state.activeAssignee = firstWork.assignee;
      state.activeScheduleId = firstWork.scheduleId;
    } else if (firstSchedule) {
      state.activeScheduleId = firstSchedule.id;
    }
    state.activeTab = 'assignments';
    render();
    scrollToAssigneeDetail();
    return;
  }

  const assigneeTarget = event.target.closest('[data-assignee-name]');
  if (assigneeTarget) {
    state.activeAssignee = assigneeTarget.dataset.assigneeName;
    state.activeWorkId = worksForDate(state.selectedWorkDate).find(work => work.assignee === state.activeAssignee)?.id || state.activeWorkId;
    state.activeTab = 'assignments';
    render();
    scrollToAssigneeDetail();
    return;
  }

  const workTarget = event.target.closest('[data-work-id]');
  if (workTarget) {
    const work = state.dailyWorks.find(item => item.id === workTarget.dataset.workId);
    if (work) {
      state.selectedWorkDate = work.date;
      state.activeAssignee = work.assignee;
      state.activeScheduleId = work.scheduleId;
      state.activeWorkId = work.id;
      state.activeTab = 'assignments';
      render();
      scrollToAssigneeDetail();
    }
    return;
  }

  const scheduleTarget = event.target.closest('[data-schedule-id]');
  if (scheduleTarget) {
    const schedule = scheduleById(scheduleTarget.dataset.scheduleId);
    state.activeScheduleId = scheduleTarget.dataset.scheduleId;
    if (schedule) {
      state.selectedWorkDate = schedule.date;
    }
    state.activeTab = 'schedule';
    render();
    scrollToScheduleDetail();
    return;
  }

  const tab = event.target.closest('[data-tab]');
  if (!tab) return;
  state.activeTab = tab.dataset.tab;
  render();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target.matches('[data-calendar-search]')) {
    event.preventDefault();
    state.calendarSearch = event.target.value;
    render();
  }
});

function scrollToHomeWorkList() {
  requestAnimationFrame(() => {
    document.querySelector('#home-work-list')?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'start'
    });
  });
}

function scrollToScheduleDetail() {
  requestAnimationFrame(() => {
    document.querySelector('#schedule-detail')?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'start'
    });
  });
}

function scrollToCaseDetail() {
  requestAnimationFrame(() => {
    document.querySelector('#case-detail')?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'start'
    });
  });
}

function scrollToProjectDetail() {
  requestAnimationFrame(() => {
    document.querySelector('#project-detail')?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'start'
    });
  });
}

function scrollToAssigneeDetail() {
  requestAnimationFrame(() => {
    document.querySelector('#assignee-detail')?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'start'
    });
  });
}

function scrollToCalendarDayDetail() {
  requestAnimationFrame(() => {
    document.querySelector('#calendar-day-detail')?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'start'
    });
  });
}

function scrollToPhotoCard(photoId) {
  requestAnimationFrame(() => {
    document.querySelector(`[data-photo-card-id="${photoId}"]`)?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'start'
    });
  });
}

function scrollToPhotoList() {
  requestAnimationFrame(() => {
    document.querySelector('.photo-section')?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'start'
    });
  });
}

function getScrollBehavior() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion ? 'auto' : 'smooth';
}

function isCompactToolViewport() {
  return window.matchMedia('(max-width: 719px)').matches;
}

function scrollToToolCard(toolId) {
  requestAnimationFrame(() => {
    [...document.querySelectorAll('[data-tool-id]')].find((card) => card.dataset.toolId === toolId)?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'start'
    });
  });
}

render();
