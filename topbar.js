(function (CRM) {
  'use strict';
  var dom = CRM.dom;

  var TITLES = {
    dashboard: 'Dashboard', students: 'Students', groups: 'Groups', courses: 'Courses',
    lessons: 'Lessons', tasks: 'Tasks', payments: 'Payments',
    notifications: 'Notifications', chat: 'Chat', reports: 'Reports', settings: 'Settings'
  };

  function render(host, opts) {
    if (!host) return;
    opts = opts || {};
    var page = opts.page || 'dashboard';
    var title = TITLES[page] || 'Dashboard';

    dom.clear(host);

    var left = dom.el('div', { class: 'topbar__left' }, [
      dom.el('button', {
        type: 'button', class: 'icon-btn topbar__nav-toggle',
        'data-action': 'toggle-sidebar', 'aria-label': 'Open navigation',
        'aria-controls': 'sidebar', 'aria-expanded': 'false'
      }, [ dom.el('i', { class: 'fa-solid fa-bars', 'aria-hidden': 'true' }) ]),
      dom.el('nav', { class: 'breadcrumb', 'aria-label': 'Breadcrumb' }, [
        dom.el('a', { href: 'index.html', text: 'Home' }),
        dom.el('i', { class: 'fa-solid fa-angle-right breadcrumb__sep', 'aria-hidden': 'true' }),
        dom.el('span', { class: 'breadcrumb__current', 'aria-current': 'page', text: title })
      ])
    ]);

    var search = dom.el('form', {
      class: 'topbar__search', role: 'search',
      onsubmit: function (e) { e.preventDefault(); }
    }, [
      dom.el('i', { class: 'fa-solid fa-magnifying-glass', 'aria-hidden': 'true' }),
      dom.el('input', {
        type: 'search', id: 'global-search',
        placeholder: 'Search students, groups, lessons…',
        'aria-label': 'Global search', autocomplete: 'off'
      }),
      dom.el('kbd', { class: 'topbar__kbd', 'aria-hidden': 'true', text: 'Ctrl K' })
    ]);

    var right = dom.el('div', { class: 'topbar__right' }, [
      dom.el('button', {
        type: 'button', class: 'icon-btn', 'data-action': 'toggle-theme',
        'aria-label': 'Toggle theme', title: 'Toggle theme'
      }, [
        dom.el('i', { class: 'fa-solid fa-moon', 'data-theme-icon': 'dark', 'aria-hidden': 'true' }),
        dom.el('i', { class: 'fa-solid fa-sun', 'data-theme-icon': 'light', 'aria-hidden': 'true' })
      ]),
      dom.el('button', {
        type: 'button', class: 'icon-btn icon-btn--dot',
        'data-action': 'toggle-notifications', 'aria-label': 'Notifications (3 unread)',
        'aria-haspopup': 'true', 'aria-expanded': 'false'
      }, [ dom.el('i', { class: 'fa-regular fa-bell', 'aria-hidden': 'true' }) ]),
      dom.el('div', { class: 'topbar__user' }, [
        dom.el('button', {
          type: 'button', class: 'topbar__user-btn icon-btn',
          'data-action': 'toggle-user', 'aria-haspopup': 'true', 'aria-expanded': 'false',
          'aria-label': 'Open profile menu'
        }, [
          dom.el('span', { class: 'avatar', text: 'DN' }),
          dom.el('span', { class: 'topbar__user-name', text: 'Dilnoza N.' }),
          dom.el('i', { class: 'fa-solid fa-chevron-down topbar__user-chev', 'aria-hidden': 'true' })
        ])
      ])
    ]);

    host.appendChild(left);
    host.appendChild(search);
    host.appendChild(right);
  }

  function init() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-action="toggle-theme"]');
      if (t && CRM.theme) CRM.theme.toggle();
    });

    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        var input = document.getElementById('global-search');
        if (input) { e.preventDefault(); input.focus(); input.select(); }
      }
    });
  }

  CRM.topbar = { render: render, init: init };
})(window.CRM);