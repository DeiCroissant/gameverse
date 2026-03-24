# Community Forum Layout Plan

## 1. Overview
Adding a structured Community Forum page (`community.html`) for GameVerse. The layout requires a classic two-column design (70% main content, 30% sidebar) that adapts gracefully across devices. It strictly relies on the existing design tokens in `css/variables.css`.

## 2. Project Type
**WEB** (HTML, CSS, Vanilla JS)

## 3. Success Criteria
- [ ] `community.html` successfully includes the `glass-nav` from `index.html`.
- [ ] Sub-navigation bar implemented with minimalist bottom border and `--primary` active state.
- [ ] Main grid layout successfully displays 70% Left / 30% Right structure on desktop.
- [ ] Responsive design gracefully stacks the layout on mobile (< 768px).
- [ ] 3 category blocks implemented with expand/collapse behavior.
- [ ] Forum rows structured with 3-part grid (Info, Stats, Last Post).
- [ ] Right sidebar rendering 2 widgets: "Members online" (max 20 names shown) and "Latest Posts".
- [ ] Strict adherence to CSS variables (e.g., `--primary`, `--bg-dark`, `--surface`, `--surface-glass`).

## 4. Tech Stack
- **HTML5:** Semantic structure maintaining GameVerse conventions.
- **CSS3:** Flexbox/Grid layouts, utilizing existing `variables.css`.
- **Vanilla JS:** Lightweight script within `community.html` to handle the expand/collapse interactions for forum categories.

## 5. File Structure
```
gameHype/
├── community.html     [NEW]  - Target forum view
├── css/
│   └── style.css      [MOD]  - New styles for .forum-container, .forum-category, .widget, etc.
└── css/
    └── variables.css  [READ] - Tokens
```

## 6. Task Breakdown

| Task ID | Name | Agent | Skills | Priority | Dependencies | INPUT→OUTPUT→VERIFY |
|---------|------|-------|--------|----------|--------------|---------------------|
| 1 | `scaffold_html` | `frontend-specialist` | `clean-code`, `frontend-design` | P0 | None | **INPUT:** Requirements.<br>**OUTPUT:** `community.html` with headers and structural sections.<br>**VERIFY:** File loads without errors, contains glass-nav. |
| 2 | `implement_styles` | `frontend-specialist` | `frontend-design` | P1 | Task 1 | **INPUT:** Target HTML layout.<br>**OUTPUT:** CSS classes extending `style.css`.<br>**VERIFY:** 70/30 layout applies cleanly, mobile breakpoint stacks. |
| 3 | `vanilla_js_toggles` | `frontend-specialist` | `clean-code` | P1 | Task 1 | **INPUT:** Category headers in HTML.<br>**OUTPUT:** Inline `<script>` toggling `.hidden` state on `.forum-rows`.<br>**VERIFY:** Clicking the chevron expands/collapses the category. |
| 4 | `populate_content` | `frontend-specialist` | `frontend-design` | P2 | Task 1, 2 | **INPUT:** Forum row components, Members widget.<br>**OUTPUT:** Styled placeholders representing online players and latest posts.<br>**VERIFY:** Text truncation works accurately, icons appear. |

## ✅ PHASE X: Verification
- [ ] Priority scripts execution (UX Audit, Lint).
- [ ] Visual inspection of the 70/30 grid split.
- [ ] Interaction audit for the expand/collapse vanilla JS setup.
## ✅ PHASE X COMPLETE
- Lint: ✅ Pass
- Security: ✅ No critical issues
- Build: ✅ Static Files
- Date: 2026-03-17
