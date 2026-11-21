(function (CRM) {
  'use strict';
  var dom = CRM.dom;

  var NAV = [
    { section: 'Workspace', items: [
      { id: 'dashboard', label: 'Dashboard',  icon: 'fa-solid fa-gauge-high',      href: 'index.html' },
      { id: 'students',  label: 'Students',   icon: 'fa-solid fa-user-graduate',   href: 'placeholder.html?page=students' },
      { id: 'groups',    label: 'Groups',     icon: 'fa-solid fa-users-rectangle', href: 'placeholder.html?page=groups' },
      { id: 'courses',   label: 'Courses',    icon: 'fa-solid fa-book-open',       href: 'placeholder.html?page=courses' },
      { id: 'lessons',   label: 'Lessons',    icon: 'fa-solid fa-chalkboard-user', href: 'placeholder.html?page=lessons' }
    ]},
    { section: 'Operations', items: [
      { id: 'tasks',         label: 'Tasks',         icon: 'fa-solid fa-list-check',  href: 'placeholder.html?page=tasks', badge: 6 },
      { id: 'payments',      label: 'Payments',      icon: 'fa-solid fa-credit-card', href: 'placeholder.html?page=payments' },
      { id: 'notifications', label: 'Notifications', icon: 'fa-solid fa-bell',        href: 'placeholder.html?page=notifications', badge: 3 },
      { id: 'chat',          label: 'Chat',          icon: 'fa-solid fa-comments',    href: 'placeholder.html?page=chat' }
    ]},
    { section: 'Insights', items: [
      { id: 'reports',  label: 'Reports',  icon: 'fa-solid fa-chart-line', href: 'placeholder.html?page=reports' },
      { id: 'settings', label: 'Settings', icon: 'fa-solid fa-gear',       href: 'placeholder.html?page=settings' }
    ]}
  ];

  function render(host) {
    if (!host) return;
    dom.clear(host);

    var brand = dom.el('a', { class: 'sidebar__brand', href: 'index.html', 'aria-label': 'Nexus CRM home' }, [
      dom.el('span', { class: 'sidebar__brand-mark', 'aria-hidden': 'true' },
        [ dom.el('i', { class: 'fa-solid fa-layer-group' }) ]),
      dom.el('span', { class: 'sidebar__brand-text' }, [
        dom.el('span', { class: 'sidebar__brand-name', text: 'Nexus' }),
        dom.el('span', { class: 'sidebar__brand-sub', text: 'CRM Suite' })
      ])
    ]);
    host.appendChild(brand);

    var nav = dom.el('nav', { class: 'sidebar__nav', 'aria-label': 'Primary' });
    NAV.forEach(function (group) {
      nav.appendChild(dom.el('p', { class: 'sidebar__section', text: group.section }));
      var ul = dom.el('ul', { class: 'sidebar__list' });
      group.items.forEach(function (item) {
        var link = dom.el('a', {
          class: 'sidebar__link', href: item.href, 'data-nav-id': item.id
        }, [
          dom.el('i', { class: item.icon + ' sidebar__icon', 'aria-hidden': 'true' }),
          dom.el('span', { class: 'sidebar__label', text: item.label })
        ]);
        if (item.badge) {
          link.appendChild(dom.el('span', { class: 'sidebar__badge', text: String(item.badge) }));
        }
        ul.appendChild(dom.el('li', null, link));
      });
      nav.appendChild(ul);
    });
    host.appendChild(nav);

    host.appendChild(dom.el('div', { class: 'sidebar__footer' }, [
      dom.el('button', {
        type: 'button', class: 'sidebar__user', 'aria-label': 'Open account menu'
      }, [
        dom.el('span', { class: 'avatar avatar--sm', text: 'DN' }),
        dom.el('span', { class: 'sidebar__user-text' }, [
          dom.el('span', { class: 'sidebar__user-name', text: 'Dilnoza N.' }),
          dom.el('span', { class: 'sidebar__user-role', text: 'Administrator' })
        ]),
        dom.el('i', { class: 'fa-solid fa-chevron-right sidebar__user-chev', 'aria-hidden': 'true' })
      ])
    ]));
  }

  function setActive(id) {
    dom.qsa('.sidebar__link').forEach(function (a) {
      var on = a.dataset.navId === id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function initMobile() {
    var sidebar = document.getElementById('sidebar');
    var toggle = document.querySelector('[data-action="toggle-sidebar"]');
    var backdrop = document.querySelector('.sidebar-backdrop');
    if (!sidebar || !toggle) return;

    function open() {
      sidebar.classList.add('is-open');
      document.body.classList.add('is-nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      var first = sidebar.querySelector('a, button');
      if (first) first.focus();
    }
    function close() {
      sidebar.classList.remove('is-open');
      document.body.classList.remove('is-nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function isOpen() { return sidebar.classList.contains('is-open'); }

    toggle.addEventListener('click', function () { isOpen() ? close() : open(); });
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { close(); toggle.focus(); }
    });
    dom.on(sidebar, 'click', 'a', close);

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 992 && isOpen()) close();
    });
  }

  CRM.navigation = { render: render, setActive: setActive, initMobile: initMobile };
})(window.CRM);