# Denki Coach Beta - Developer Documentation

## Project Overview

**Project Name:** 現場でんき探偵 Pro (Field Electricity Detective Pro)  
**Version:** Beta (Share 6)  
**Purpose:** A Japanese mobile-first web application for recording, tracking, and managing electrical construction work (電気工事).

### Key Features
- **Calendar/Schedule Management:** Track electrical construction projects across multiple sites
- **Work Progress Tracking:** Monitor status, assignments, and completion of work tasks
- **Tool Catalog:** Comprehensive database of electrical tools with safety notes, usage guides, and beginner tips
- **Project Management:** Organize work by project (new construction, renovation, AC installation, etc.)
- **Photo Documentation:** Capture and organize photos for work records and case management
- **Safety & Compliance:** Supervisor confirmations, pre-checks, and company approval tracking
- **People Management:** Track team members, roles, and assignments
- **Case Tracking:** Manage issues, corrections, and follow-ups
- **Beta Feature Tracking:** Monitor beta feedback and improvements

### Target Users
Primarily Japanese electrical contractors and construction teams who need field-based work tracking and training support.

---

## Architecture Overview

### Technology Stack
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Storage:** Browser LocalStorage (key: `denki-coach-beta-state-v1`)
- **Deployment:** Static web application (PWA-capable with manifest.webmanifest)
- **Build:** No build tools required (runs directly in browser)

### Application Type
Single-Page Application (SPA) with client-side state management and localStorage persistence.

### File Structure
```
denki-coach-beta/
├── index.html                 # Entry point with app container
├── manifest.webmanifest       # PWA manifest for mobile installation
├── src/
│   ├── app.js                # Main application logic (~4600 lines)
│   └── styles.css            # Complete styling (~13400 lines)
└── assets/
    └── characters/           # Character/icon images for UI
```

---

## State Management

### State Architecture
The application uses a centralized global state object managed in-memory and persisted to localStorage.

### Default State Shape
Located in `app.js` at the `defaultState` constant:

```javascript
{
  // Project and schedule data
  projects: [{
    id, name, type, location, description,
    status, startDate, endDate,
    contractor, client, supervisor
  }],
  
  schedules: [{
    id, projectId, date, timeStart, timeEnd,
    location, category, assignee, status
  }],
  
  // Work records and documentation
  works: [{
    id, scheduleId, status, progress,
    author, updatedAt, updatedBy,
    reviewStatus, details
  }],
  
  // Tool management
  tools: [{
    id, name, reading, aliases, category,
    processes, purpose, beginnerNote,
    preCheck, safetyNote, askSupervisor,
    companyApproved, searchKeyword
  }],
  
  // Photo records
  photos: [{
    id, scheduleId, caseId, date,
    file, caption, dataURL
  }],
  
  // Case/Issue tracking
  cases: [{
    id, type, status, process,
    description, resolution, reporter
  }],
  
  // Team members
  people: [{
    id, name, reading, role,
    duty, assignedProjects
  }],
  
  // Beta features and feedback
  beta: [{
    id, feature, status, feedback, date
  }]
}
```

### State Persistence
- **Auto-save:** Triggered after most state changes
- **Key:** `denki-coach-beta-state-v1` in localStorage
- **Save Status:** Visual feedback via banner at top of app
- **Manual Reset:** "サンプルに戻す" button triggers `resetToSampleState()`

### Important State Functions
- `loadPersistedState()` - Load saved state from localStorage
- `persistState()` - Save current state to localStorage
- `mergeState()` - Merge saved state with defaults (handles schema evolution)
- `cloneState()` - Deep clone state objects
- `setSaveStatus()` - Update save status display

---

## Code Organization

### Major Functional Areas

#### 1. **Data Management** (lines 1-950)
- Sample data definitions (`calendarSampleWorks`, `defaultToolCatalog`)
- Default state configuration (`defaultState`)
- State persistence functions
- Data normalization for backward compatibility

#### 2. **Rendering System** (lines 950-1400)
- `render()` - Main render loop (called on every state change)
- `appHeader()` - Top navigation bar with title and save status
- `tabNavigation()` - Bottom tab bar navigation
- `quickNavigation()` - Quick access sections below header
- Component rendering functions for each tab/section

#### 3. **Tab/View Management** (lines 780-830)
Major tabs:
- **home** - Dashboard with quick navigation
- **calendar** - Schedule view and work calendar
- **record** - Work documentation and form entry
- **notices** - Alerts and important information
- **menu** - Settings and additional options

Quick-access tabs:
- notes, before, schedule, assignments, cases, projects, photos, tools, people, after, beta

#### 4. **Project & Schedule Management** (lines 1190-1250)
- `activeProject()` - Get currently selected project
- `applyActiveProject()` - Set active project context
- `activeScheduleItem()` - Get current work schedule
- `scheduleById()`, `workById()` - Lookups by ID
- `nextScheduleItem()` - Get upcoming work

#### 5. **Work & Status Tracking** (lines 1300-1600)
- Work status management (予定/作業中/完了)
- Progress tracking (0-100%)
- Review status monitoring (未確認/確認済み)
- Photo documentation linking
- Assignment tracking

#### 6. **Tool Management** (lines 600-750, 1850-2200)
- Tool catalog with detailed metadata
- Tool categories (手工具, 電動工具, 測定器, etc.)
- Tool search and filtering
- Tool process mapping
- Company approval tracking
- Beginner safety notes

#### 7. **UI Component System** (lines 2200+)
Helper functions for UI elements:
- `lineIcon()` - SVG icon rendering
- `assetImage()` - Asset image with lazy loading
- `characterVisual()` - Character images for visual guidance
- Form input helpers for various field types

#### 8. **Event Handling** (Throughout)
Global event delegation using data attributes:
- `data-tab-id` - Tab navigation
- `data-action` - Form actions
- `data-record-id` - Record identification
- All handlers in main event listener on document

---

## Key Data Models

### Projects
```javascript
{
  id: string,
  name: string,                    // e.g., "A邸 新築工事"
  type: string,                    // 新築, リフォーム, エアコン, etc.
  location: string,
  description: string,
  status: string,                  // 予定, 進行中, 完了
  startDate: string,               // YYYY/MM/DD
  endDate: string,
  contractor: string,
  client: string,
  supervisor: string,
  sites: [{id, name, description}]
}
```

### Work Schedules
```javascript
{
  id: string,
  projectId: string,
  date: string,                    // YYYY/MM/DD
  timeStart: string,               // HH:MM
  timeEnd: string,
  location: string,                // e.g., "1階客席"
  category: string,                // 照明取付, 絶縁測定, etc.
  assignee: string,                // Team member name
  assistant: string,
  reviewer: string,
  status: string,                  // 予定, 作業中, 完了
  process: string                  // Process type
}
```

### Tools
Each tool includes:
- **Basic Info:** name, reading (hiragana), aliases, category, processes
- **Guidance:** purpose, beginnerNote, searchKeyword
- **Safety:** preCheck, safetyNote, askSupervisor
- **Tracking:** companyApproved, favorite, packingChecked

### Cases (Issues/Follow-ups)
```javascript
{
  id: string,
  type: string,                    // Issue type
  status: string,                  // 解決済み, 要確認, 上司確認済み
  process: string,                 // 図面確認, 配線, 取付, 検査, 手直し
  description: string,
  resolution: string,
  reporter: string,
  dateReported: string,
  dateClosed: string
}
```

### People
```javascript
{
  id: string,
  name: string,
  reading: string,                 // Hiragana for name pronunciation
  role: string,                    // 新人, 先輩, 上司, 管理者
  duty: string[],                  // 担当者, 補助・記入者, 確認者, etc.
  assignedProjects: string[],      // Project IDs
  contact: string,
  joinDate: string
}
```

---

## UI Organization

### Navigation Structure
```
┌─────────────────────────┐
│  Header with Title      │
│  Save Status Banner     │
├─────────────────────────┤
│   Quick Navigation      │
│   (notes, before,       │
│    schedule, etc.)      │
├─────────────────────────┤
│   Main Content Area     │
│   (Active Tab)          │
│                         │
├─────────────────────────┤
│  Bottom Tab Navigation  │
│ [home] [cal] [rec]...   │
└─────────────────────────┘
```

### Styling Strategy
- **CSS-in-HTML:** All styles in `src/styles.css` (~13,400 lines)
- **Color Scheme:** Dark green theme (#0d2818, #031610) for safety/professionalism
- **Mobile-First:** Designed for field use on smartphones/tablets
- **Responsive:** Adapts to various screen sizes
- **Icons:** Inline SVG icons via `lineIcon()` function
- **Typography:** Japanese-optimized font sizing and line-height

### Theme Colors
- **Primary:** #0d2818 (Dark Green)
- **Dark Base:** #031610
- **Accent Colors:** Used for status indicators and important elements
- **Text:** Light colors on dark background for visibility in field conditions

---

## Development Conventions

### Naming Conventions
- **Functions:** camelCase, descriptive verbs (e.g., `applyActiveProject`, `persistState`)
- **Constants:** UPPER_SNAKE_CASE for true constants (e.g., `STORAGE_KEY`)
- **Data attributes:** kebab-case (e.g., `data-tab-id`, `data-action`)
- **IDs:** lowercase-kebab-case with prefixes (e.g., `work-july08-lighting`, `tool-pliers`)
- **CSS classes:** lowercase-kebab-case (e.g., `app-shell`, `tab-navigation`)

### Code Style
- Use ES6+ features (arrow functions, template literals, destructuring)
- Prefer functional patterns over imperative
- Keep functions focused and under 50 lines when possible
- Use descriptive variable names (avoid single letters except in loops)
- Group related functions together in logical sections

### Comments
- Only add comments for non-obvious business logic
- Explain WHY, not WHAT (code should be self-explanatory)
- Update comments when logic changes

### State Mutations
- Always work with cloned state
- Use `cloneState()` for deep copies
- Apply changes via spread operator or targeted updates
- Trigger `persistState()` after state changes
- Avoid direct mutations of state object

### コミットメッセージのルール
- **必ず日本語**で書くこと
- 形式：`種別: 内容の説明`

#### 種別の例
| 種別 | 使うとき |
|------|---------|
| 機能追加 | 新しい機能を実装した |
| 修正 | バグや不具合を直した |
| 改善 | 既存機能をよくした |
| ドキュメント | ドキュメントを更新した |
| スタイル | デザイン・見た目を変えた |
| リファクタリング | コードの整理をした |

#### 例
- `機能追加: 写真アップロード機能を実装`
- `修正: スケジュール表示のバグを解消`
- `ドキュメント: CLAUDE.mdにコミットルールを追加`

---

## Common Development Tasks

### Adding a New Tool to the Catalog
1. Add object to `defaultToolCatalog` in app.js (starting around line 46)
2. Include all required fields: id, name, reading, aliases, category, processes, purpose, beginnerNote, preCheck, safetyNote, askSupervisor, companyApproved, searchKeyword, favorite, packingChecked
3. Assign proper category from `toolCategories` array
4. Map to processes from `toolProcesses` array
5. Set safety notes in Japanese with appropriate caution level

### Adding a New Project Type
1. Add to `projectTypeOptions` array (line 815)
2. Add to `caseTypeOptions` if applicable (line 816)
3. Update sample data if needed
4. Ensure database fields support the new type

### Creating a New Tab/View
1. Add tab object to `tabs` array with: id, label, category, name, description
2. Add rendering function following pattern: `render<TabName>()`
3. Add tab-specific functions in relevant section
4. Add navigation link in `tabNavigation()` if it's a primary tab
5. Add data attribute handling in main event listener

### Modifying Styling
1. Open `src/styles.css`
2. Find relevant section (organized by component)
3. Update CSS classes
4. Test on multiple screen sizes
5. Verify theme colors remain accessible

### Adding New Data Fields
1. Add to default value in `defaultState`
2. Update `normalizePersistedState()` to handle backward compatibility
3. Update affected data model sections in code
4. Update form rendering for new field
5. Update state persistence logic if special handling needed

### Debugging State Issues
1. Use browser console: `JSON.parse(localStorage.getItem('denki-coach-beta-state-v1'))`
2. Check `setSaveStatus()` for persistence errors
3. Use `resetToSampleState()` to restore sample data
4. Verify state shape matches `mergeState()` expectations

---

## Sample Data

The application includes comprehensive sample data in Japanese representing realistic construction scenarios:

### Sample Projects
- **A邸 新築工事** (A Residence - New Construction)
- **Bマンション 改修工事** (B Apartment - Renovation)
- **C店舗 内装工事** (C Store - Interior Construction)

### Sample Work Activities
- 照明取付 (Lighting Installation)
- 絶縁測定 (Insulation Testing)
- 配管工事 (Piping Work)
- 器具取付 (Equipment Installation)
- 墨出し (Layout Marking)
- 分電盤結線 (Distribution Panel Wiring)
- 通電確認 (Power Confirmation)
- 検査 (Inspection)
- 手直し (Corrections)

### Sample Tools
50+ tools including:
- 手工具 (Hand tools): ペンチ, ニッパー, VVFストリッパー, 電工ナイフ, 圧着工具
- 電動工具 (Power tools): ハンマドリル, インパクト, ジグソー, etc.
- 測定器 (Measuring tools): 検電器, テスター, 絶縁抵抗計, メジャー, 水平器
- 安全用品 (Safety): 腰袋, ヘルメット, 安全帯, etc.

---

## Browser Compatibility

### Required Features
- ES6 JavaScript (const, arrow functions, template literals)
- LocalStorage API
- Modern CSS (Flexbox, Grid)
- SVG support
- File API for photo uploads

### Tested Platforms
- Chrome/Edge (latest)
- Safari (iOS 13+)
- Firefox (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Progressive Web App
- Installable on home screen (iOS and Android)
- Works offline with cached assets
- Manifest configuration in `manifest.webmanifest`

---

## Performance Considerations

### Optimization Strategies
1. **Lazy loading:** Images use `loading="lazy"` attribute
2. **State changes:** Only trigger re-render when state actually changes
3. **LocalStorage:** Automatic debouncing via async persist with status message
4. **DOM updates:** Full virtual render on state change (not incremental)

### Known Limitations
- No database backend (data lost on browser clear)
- Single file app.js (~4600 lines) - no module splitting
- Full re-render on every state change (not optimized for very large datasets)

---

## Testing & Quality

### Manual Testing Checklist
- [ ] Sample data loads on fresh install
- [ ] State persists after browser refresh
- [ ] All tabs navigate and render correctly
- [ ] Mobile responsiveness on various screen sizes
- [ ] Work assignment and status updates
- [ ] Photo upload and capture
- [ ] Tool search and filtering
- [ ] Case creation and tracking
- [ ] Save status messages appear and clear appropriately

### Sample Data Reset
Users can reset to sample state using "サンプルに戻す" button in menu, which calls `resetToSampleState()`.

---

## Future Enhancement Areas

### Potential Improvements
1. **Data Export:** CSV/PDF export for reports
2. **Offline Sync:** Service worker for offline work tracking
3. **Photo Organization:** Better gallery UI and organization
4. **Analytics:** Work completion statistics and team performance
5. **Notifications:** Due date reminders and status alerts
6. **Collaboration:** Real-time sync with backend (currently local-only)
7. **Mobile Apps:** Native wrappers for iOS/Android
8. **Accessibility:** Enhanced WCAG compliance for field workers
9. **Localization:** Support for other languages
10. **Audit Logs:** Track all changes for compliance

---

## Useful Resources for AI Assistants

### Where to Find Things
- **Main logic:** `/src/app.js` (sections marked by function groups)
- **Styling:** `/src/styles.css` (organized by component)
- **Sample data:** Top of `app.js` (lines 1-750)
- **State shape:** `defaultState` constant around line 149
- **Navigation:** `tabNavigation()` and related functions around line 1135
- **Tools:** Tool rendering starts around line 2000+

### Common Grep Patterns
```bash
# Find function definitions
grep -n "^function\|^const.*function" src/app.js

# Find state references
grep -n "state\." src/app.js | head -20

# Find event handlers
grep -n "data-action\|addEventListener" src/app.js

# Find style classes
grep -n "className\|class=" src/app.js
```

### Understanding Flow
1. **Initialization:** Page load → HTML renders → app.js loads → state loads → render() called
2. **User interaction:** Click/input → event handler triggered → state modified → persistState() → render() called
3. **State changes:** Visible immediately in UI after render()
4. **Persistence:** Auto-save to localStorage with status display

---

## Recent Changes (Latest Commits)
- **5425d88:** Fix beta notice routing and timeline markers
- **36510e1:** Fix beta home mobile interactions
- **0b76fe4:** Align beta with NEO FIELD TECH design
- **ffaaed5:** Refresh beta project workspace
- **6afab6d:** Refresh beta information architecture
- **4e09c2f:** Apply NEO FIELD TECH 3.0 beta UI
- **c38f00a:** Add tool search and mobile UI improvements
- **eb34180:** Update beta home and calendar UI
- **f9ec808:** Publish beta build

---

## Contact & Questions

For questions about specific functionality, refer to the code comments in `app.js` or check the tab rendering functions for implementation details. The application is primarily English-documented here, but the UI itself is in Japanese for the target user base.
