const STORAGE_KEY = 'denki-coach-beta-state-v1';

const defaultState = {
  premium: false,
  activeTab: 'notes',
  activeProjectId: 'project-training-house',
  activeScheduleId: 'wiring',
  selectedWorkDate: '2026/07/04',
  activeWorkId: 'work-a-wiring',
  activeAssignee: '担当者Aさん',
  activeCaseId: 'case-a-renovation-wiring',
  caseFilters: {
    keyword: '',
    type: 'すべて',
    process: 'すべて',
    assignee: 'すべて',
    status: 'すべて'
  },
  activePersonId: 'person-yamada',
  people: [
    { id: 'person-yamada', name: '担当者Aさん', role: '先輩', duty: '担当者' },
    { id: 'person-rookie-a', name: '新人Aさん', role: '新人', duty: '補助・記入者' },
    { id: 'person-tanaka', name: '確認者Bさん', role: '先輩', duty: '確認者' },
    { id: 'person-sato', name: '主任Cさん', role: '上司', duty: '現場責任者' },
    { id: 'person-admin', name: '管理者', role: '管理者', duty: '案件管理' }
  ],
  project: {
    id: 'project-training-house',
    title: '新築戸建 電気工事予習',
    client: '社内研修案件',
    schedule: '2026/07/03 現場前予習',
    location: '木造2階建て / 新築',
    address: 'サンプル県 デモ市 1-2-3',
    type: '新築',
    contractor: 'サンプル電設 株式会社',
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
      address: 'サンプル県 デモ市 1-2-3',
      type: '新築',
      contractor: 'サンプル電設 株式会社',
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
      address: 'サンプル県 デモ市 2-8-5',
      type: 'リフォーム',
      contractor: 'サンプル工務店',
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
      address: 'サンプル県 デモ市 3-4-12',
      type: '器具取付',
      contractor: 'サンプル設備サービス',
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
    }
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
let saveStatus = {
  label: '保存済み',
  detail: 'ブラウザ内に保存済み',
  tone: 'saved'
};
let hasRendered = false;
let pendingSaveMessage = '';

const tabs = [
  { id: 'projects', label: '案件', icon: 'site' },
  { id: 'notes', label: '予習ノート', icon: 'memo' },
  { id: 'before', label: '仕事前', icon: 'prep' },
  { id: 'schedule', label: '工程表', icon: 'flow' },
  { id: 'assignments', label: '担当別', icon: 'team' },
  { id: 'cases', label: '過去事例', icon: 'case' },
  { id: 'photos', label: '写真メモ', icon: 'photo' },
  { id: 'people', label: '担当者', icon: 'user' },
  { id: 'after', label: '自宅整理', icon: 'home' },
  { id: 'beta', label: 'βテスト', icon: 'beta' }
];

const primaryTabIds = ['notes', 'projects', 'cases', 'photos', 'people'];
const quickTabIds = ['notes', 'before', 'schedule', 'assignments', 'cases', 'projects', 'photos', 'people', 'after', 'beta'];

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

  if (!merged.activeProjectId || !merged.projects.find(project => project.id === merged.activeProjectId)) {
    merged.activeProjectId = merged.projects[0].id;
  }

  const project = merged.projects.find(item => item.id === merged.activeProjectId) || merged.projects[0];
  merged.project = { ...defaultState.project, ...project };

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
    <header class="topbar">
      <div class="brand-lockup">
        <span class="brand-symbol" aria-hidden="true"><img src="./assets/characters/09_app_icon.png" alt=""></span>
        <div>
          <p class="eyebrow">新人電気工事士向け</p>
          <h1>現場でんき探偵 <span>Pro</span></h1>
        </div>
      </div>
      <div class="top-actions">
        <label class="premium-switch">
          <span>${state.premium ? '有料版' : '無料版'}</span>
          <input type="checkbox" ${state.premium ? 'checked' : ''} data-action="toggle-premium" aria-label="有料版表示を切り替え">
        </label>
        <div class="save-status save-status-${saveStatus.tone}" aria-live="polite">
          <span>${saveStatus.label}</span>
          <small>${saveStatus.detail}</small>
        </div>
        <button class="reset-sample-button" data-action="reset-sample" type="button" aria-label="サンプルデータに戻す" title="サンプルデータに戻す">${lineIcon('reset')}</button>
      </div>
    </header>

    <main>
      ${quickNavigation()}
      ${state.activeTab === 'notes' ? projectSummary() : ''}
      ${safetyNotice()}
      <section class="screen">
        ${screenCharacterVisual()}
        ${activeScreen()}
      </section>
      ${tabNavigation()}
    </main>
  `;
}

function lineIcon(name) {
  const paths = {
    bolt: '<path d="m13 2-8 11h6l-1 9 8-12h-6z" />',
    reset: '<path d="M4 8V4h4" /><path d="M4.5 4.5A8 8 0 1 1 4 14" />',
    site: '<path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" />',
    memo: '<rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3h6v3H9z" /><path d="M8 10h8M8 14h8M8 18h5" />',
    prep: '<rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 3h8v3H8z" /><path d="m8 12 2 2 4-4M8 18h7" />',
    flow: '<path d="M5 4h14M5 10h14M5 16h14M5 20h7" />',
    team: '<circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c.6-3.3 2.8-5 6-5s5.4 1.7 6 5M14 15c3.5-.3 6 1.4 6 4" />',
    case: '<circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" />',
    photo: '<path d="M4 8h3l2-3h6l2 3h5v11H4z" /><circle cx="12" cy="13" r="3.5" />',
    user: '<circle cx="12" cy="8" r="3.5" /><path d="M5 20c.6-3.3 2.8-5 7-5s6.4 1.7 7 5" />',
    home: '<path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" />',
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
      ${quickTabIds.map(tabId => tabs.find(tab => tab.id === tabId)).filter(Boolean).map(tab => `
        <button class="quick-nav-item ${state.activeTab === tab.id ? 'is-active' : ''}" data-tab="${tab.id}" type="button">
          <span class="tab-icon tab-icon-${tab.icon}" aria-hidden="true">${lineIcon(tab.icon)}</span>
          <span>${tab.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

function tabNavigation() {
  return `
    <nav class="tabs bottom-nav" aria-label="画面切り替え">
      ${primaryTabIds.map(tabId => tabs.find(tab => tab.id === tabId)).filter(Boolean).map(tab => `
        <button class="tab ${state.activeTab === tab.id ? 'is-active' : ''}" data-tab="${tab.id}" type="button">
          <span class="tab-icon tab-icon-${tab.icon}" aria-hidden="true">${lineIcon(tab.icon)}</span>
          <span class="tab-label">${tab.id === 'notes' ? 'ホーム' : tab.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
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

function safetyNotice() {
  return `
    <aside class="notice">
      このアプリは、第二種電気工事士の新人社員向けの予習・記録・確認支援ツールです。実際の施工判断は、所属会社のルール、現場責任者、上司、有資格者の指示に従ってください。
    </aside>
  `;
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

function projectsScreen() {
  const project = activeProject();

  return `
    <div class="screen-header">
      <div>
        <p class="eyebrow">Project manager</p>
        <h2>案件作成・編集</h2>
      </div>
      <div class="progress-ring" aria-label="案件数 ${state.projects.length}件">${state.projects.length}</div>
    </div>
    <p class="lead">新人電気工事士さんが、現場案件を新しく作成し、後から内容を編集できる画面モックです。本番データベース保存はまだ行いません。</p>
    <aside class="notice">
      案件作成・編集は、このブラウザ上の画面状態だけに反映します。本番ログイン、本番データベース、クラウド保存、決済はまだ入れていません。
    </aside>
    <div class="project-manager-layout">
      <section class="project-list" aria-label="案件一覧">
        <div class="section-title">
          <div>
            <p class="eyebrow">Projects</p>
            <h3>案件一覧</h3>
          </div>
          <span>${state.projects.length}件</span>
        </div>
        ${state.projects.map(item => projectCard(item)).join('')}
      </section>
      ${projectDetail(project)}
      ${projectForm(project)}
    </div>
  `;
}

function projectCard(project) {
  return `
    <button class="project-card ${project.id === state.activeProjectId ? 'is-selected' : ''}" data-project-id="${project.id}" type="button">
      <div>
        <span>${project.type}</span>
        <strong>${project.title}</strong>
        <small>${project.address || project.location}</small>
      </div>
      <div class="project-card-meta">
        <span>担当者：${project.assignee}</span>
        <span>進捗 ${project.overallProgress}%</span>
        <span>${project.status}</span>
      </div>
      <p>次の工程：${project.nextProcess || nextScheduleItem().name}</p>
    </button>
  `;
}

function projectDetail(project) {
  return `
    <section class="project-detail" id="project-detail" aria-label="${project.title}の詳細">
      <div class="screen-header">
        <div>
          <p class="eyebrow">Selected project</p>
          <h2>${project.title}</h2>
        </div>
        <span class="status-badge status-${statusClass(project.status)}">${project.status}</span>
      </div>
      <div class="selected-detail-summary">
        <article>
          <span>案件名</span>
          <strong>${project.title}</strong>
        </article>
        <article>
          <span>工事種別</span>
          <strong>${project.type}</strong>
        </article>
        <article>
          <span>担当者</span>
          <strong>${project.assignee}</strong>
        </article>
        <article>
          <span>確認者</span>
          <strong>${project.reviewer}</strong>
        </article>
        <article>
          <span>工程</span>
          <strong>${project.nextProcess || nextScheduleItem().name}</strong>
        </article>
        <article class="detail-progress-card">
          <span>進捗率</span>
          <strong>${project.overallProgress}%</strong>
          <div class="detail-progress-bar" aria-label="案件の進捗率 ${project.overallProgress}%">
            <span style="width: ${project.overallProgress}%"></span>
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
      <div class="detail-actions">
        <button class="detail-edit-button" data-action="focus-project-form" type="button">編集する</button>
        <button data-tab="schedule" type="button">工程表</button>
        <button data-tab="assignments" type="button">担当者別工事</button>
        <button data-tab="photos" type="button">写真メモ</button>
        <button data-tab="cases" type="button">過去事例</button>
      </div>
    </section>
  `;
}

function projectForm(project) {
  return `
    <section class="project-form" aria-label="案件作成フォーム">
      <div>
        <p class="eyebrow">Create / Edit</p>
        <h3>案件作成フォーム</h3>
        <p>入力内容は、案件一覧・トップ概要・工程表・担当者別工事・写真メモの案件名表示へ画面上で反映されます。</p>
      </div>
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
      <label class="field">
        <span>現場メモ</span>
        <textarea rows="3" data-project-field="memo">${escapeHTML(project.memo || '')}</textarea>
      </label>
      <label class="field">
        <span>上司に確認すること</span>
        <textarea rows="3" data-project-field="supervisorQuestion">${escapeHTML(project.supervisorQuestion || '')}</textarea>
      </label>
      <div class="project-form-actions">
        <button class="primary-button" data-action="create-project" type="button">新規案件として追加</button>
        <button data-action="update-project" type="button">選択中の案件を更新</button>
      </div>
    </section>
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
      <section class="person-editor" aria-label="担当者編集">
        <div>
          <p class="eyebrow">Edit person</p>
          <h3>${person.name}</h3>
        </div>
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
      </section>
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
    <section class="photo-form" aria-label="写真追加">
      <div>
        <p class="eyebrow">Photo memo</p>
        <h3>写真追加・写真メモ</h3>
        <p>画像を選択すると、このブラウザ上だけで写真プレビューを追加します。本番アップロードやクラウド保存はまだ行いません。</p>
      </div>
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
    </section>
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
    <p class="lead">Sawakoちゃんや新人電気工事士さんが、1案件だけ実際に触って確認するためのチェック表です。入力内容はこのブラウザのlocalStorageに保存します。</p>
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

  const focusProjectFormTarget = event.target.closest('[data-action="focus-project-form"]');
  if (focusProjectFormTarget) {
    document.querySelector('.project-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelector('.project-form input')?.focus({ preventScroll: true });
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

function scrollToScheduleDetail() {
  requestAnimationFrame(() => {
    document.querySelector('#schedule-detail')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function scrollToCaseDetail() {
  requestAnimationFrame(() => {
    document.querySelector('#case-detail')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function scrollToProjectDetail() {
  requestAnimationFrame(() => {
    document.querySelector('#project-detail')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function scrollToAssigneeDetail() {
  requestAnimationFrame(() => {
    document.querySelector('#assignee-detail')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function scrollToCalendarDayDetail() {
  requestAnimationFrame(() => {
    document.querySelector('#calendar-day-detail')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function scrollToPhotoCard(photoId) {
  requestAnimationFrame(() => {
    document.querySelector(`[data-photo-card-id="${photoId}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function scrollToPhotoList() {
  requestAnimationFrame(() => {
    document.querySelector('.photo-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

render();
