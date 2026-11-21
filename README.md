# Nexus CRM — Frontend Foundation

Presentation-only CRM dashboard. No backend, no API, no authentication.
All data lives in `assets/js/data/sample-data.js` and is meant to be replaced later.

## Run

Option 1 — simplest:
Open `index.html` in any modern browser.

Option 2 — recommended for development:
Open the folder in VS Code and use the "Live Server" extension.

## Stack

- HTML5
- CSS3 (custom properties, no preprocessor)
- Vanilla JavaScript (ES6+, classic scripts, `window.CRM` namespace)
- Bootstrap 5 (grid + utilities only)
- Font Awesome 6 (icons)

## Structure

    index.html                    Dashboard
    placeholder.html              Shared shell for not-yet-built modules
    assets/css/
        tokens.css                Design tokens (colors, spacing, typography)
        base.css                  Reset and global element styles
        layout.css                App shell (sidebar, topbar, content)
        components.css            Buttons, cards, tables, timeline, badges
        dashboard.css             Dashboard-specific: KPIs, chart, page intro
    assets/js/
        core/
            namespace.js          window.CRM = {}
            theme-init.js         Blocking <head> script (no flash)
            theme.js              Dark/light theme (localStorage)
            dom.js                Query + element builder helpers
            format.js             Intl-based formatting helpers
        data/
            sample-data.js        Presentation-only sample data
        components/
            navigation.js         Sidebar render + mobile drawer
            topbar.js             Header render + search + theme toggle
            kpi-cards.js          Overview cards
            chart.js              SVG line chart (3 switchable series)
            activity-feed.js      Recent activity timeline
            recent-students.js    Recent students table
            upcoming-lessons.js   Upcoming lessons list
            placeholder.js        "Coming soon" page renderer
        app.js                    Bootstrap + global actions

## Team workflow

Each module is an isolated file. To build a real "Students" page:

1. Create `students.html` (copy `index.html`, change `data-page="students"`).
2. Create `assets/js/modules/students-page.js`.
3. In `app.js`, add: `if (page === 'students') { CRM.studentsPage.init(); }`.

Nothing else needs to change. The shell (sidebar + topbar) is shared.

## Known limitations

- No backend, no real API, no authentication.
- Sample data only; editing it does not persist.
- Notifications and profile menus currently show a toast placeholder.
- Light theme is functional but the dashboard is designed dark-first.

## Accessibility

- Skip link, semantic landmarks, ARIA on interactive controls.
- Keyboard support: `Ctrl/Cmd + K` focuses search, `Escape` closes the drawer.
- Respects `prefers-reduced-motion`.