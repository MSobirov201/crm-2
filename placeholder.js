(function (CRM) {
  'use strict';
  var dom = CRM.dom;

  var PAGES = {
    students:      { title: 'Students',      icon: 'fa-solid fa-user-graduate',   desc: 'Manage learner profiles, contact details, enrollment history, and attendance.' },
    groups:        { title: 'Groups',        icon: 'fa-solid fa-users-rectangle', desc: 'Create class groups, assign teachers, and track schedules.' },
    courses:       { title: 'Courses',       icon: 'fa-solid fa-book-open',       desc: 'Define curriculum, levels, and pricing for each course.' },
    lessons:       { title: 'Lessons',       icon: 'fa-solid fa-chalkboard-user', desc: 'Plan, schedule, and record lesson outcomes.' },
    tasks:         { title: 'Tasks',         icon: 'fa-solid fa-list-check',      desc: 'Assign follow-ups for teachers and administrators.' },
    payments:      { title: 'Payments',      icon: 'fa-solid fa-credit-card',     desc: 'Track invoices, receipts, and outstanding balances.' },
    notifications: { title: 'Notifications', icon: 'fa-solid fa-bell',            desc: 'Review system alerts and announcements.' },
    chat:          { title: 'Chat',          icon: 'fa-solid fa-comments',        desc: 'Internal messaging between staff and groups.' },
    reports:       { title: 'Reports',       icon: 'fa-solid fa-chart-line',      desc: 'Analyze enrollment, revenue, and performance trends.' },
    settings:      { title: 'Settings',      icon: 'fa-solid fa-gear',            desc: 'Configure organization, roles, integrations, and preferences.' }
  };

  function render(page) {
    var main = dom.qs('#main-content');
    if (!main) return;
    var meta = PAGES[page] || { title: 'Module', icon: 'fa-solid fa-cube', desc: 'This module is under construction.' };

    dom.clear(main);
    main.appendChild(
      dom.el('section', { class: 'placeholder' }, [
        dom.el('div', { class: 'placeholder__icon' }, [
          dom.el('i', { class: meta.icon, 'aria-hidden': 'true' })
        ]),
        dom.el('h1', { class: 'placeholder__title', text: meta.title }),
        dom.el('p', { class: 'placeholder__desc', text: meta.desc }),
        dom.el('p', { class: 'placeholder__badge' }, [
          dom.el('i', { class: 'fa-solid fa-hammer', 'aria-hidden': 'true' }),
          document.createTextNode(' Coming soon')
        ]),
        dom.el('div', { class: 'placeholder__actions' }, [
          dom.el('a', { class: 'btn btn--primary', href: 'index.html' }, [
            dom.el('i', { class: 'fa-solid fa-arrow-left', 'aria-hidden': 'true' }),
            document.createTextNode(' Back to dashboard')
          ])
        ])
      ])
    );
  }

  CRM.placeholder = { render: render };
})(window.CRM);