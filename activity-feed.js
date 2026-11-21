(function (CRM) {
  'use strict';
  var dom = CRM.dom, fmt = CRM.format;

  var ICONS = {
    enroll:  { icon: 'fa-solid fa-user-plus',              tone: 'indigo' },
    payment: { icon: 'fa-solid fa-circle-dollar-to-slot',  tone: 'green' },
    lesson:  { icon: 'fa-solid fa-chalkboard-user',        tone: 'blue' },
    group:   { icon: 'fa-solid fa-users-rectangle',        tone: 'cyan' },
    alert:   { icon: 'fa-solid fa-triangle-exclamation',   tone: 'amber' }
  };

  function init() {
    var host = dom.qs('[data-widget="activity"]');
    if (!host || !CRM.data) return;
    dom.clear(host);

    CRM.data.activity.forEach(function (a) {
      var meta = ICONS[a.type] || ICONS.enroll;
      host.appendChild(dom.el('li', { class: 'timeline__item' }, [
        dom.el('span', { class: 'timeline__marker timeline__marker--' + meta.tone }, [
          dom.el('i', { class: meta.icon, 'aria-hidden': 'true' })
        ]),
        dom.el('div', { class: 'timeline__body' }, [
          dom.el('p', { class: 'timeline__text', html: a.text }),
          dom.el('p', { class: 'timeline__time', text: fmt.relative(a.time) })
        ])
      ]));
    });
  }

  CRM.activityFeed = { init: init };
})(window.CRM);