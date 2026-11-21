(function (CRM) {
  'use strict';
  var dom = CRM.dom, fmt = CRM.format;

  function init() {
    var host = dom.qs('[data-widget="upcoming-lessons"]');
    if (!host || !CRM.data) return;
    dom.clear(host);

    CRM.data.upcomingLessons.forEach(function (l) {
      var start = new Date(l.start);

      host.appendChild(dom.el('li', { class: 'lesson' }, [
        dom.el('div', { class: 'lesson__time' }, [
          dom.el('span', { class: 'lesson__time-h', text: fmt.time(start) }),
          dom.el('span', { class: 'lesson__time-d', text: fmt.shortDate(start) })
        ]),
        dom.el('div', { class: 'lesson__body' }, [
          dom.el('p', { class: 'lesson__title', text: l.title }),
          dom.el('p', { class: 'lesson__meta' }, [
            dom.el('span', null, [
              dom.el('i', { class: 'fa-solid fa-users', 'aria-hidden': 'true' }),
              document.createTextNode(' ' + l.group)
            ]),
            dom.el('span', null, [
              dom.el('i', { class: 'fa-solid fa-location-dot', 'aria-hidden': 'true' }),
              document.createTextNode(' ' + l.room)
            ]),
            dom.el('span', null, [
              dom.el('i', { class: 'fa-solid fa-user', 'aria-hidden': 'true' }),
              document.createTextNode(' ' + l.teacher)
            ])
          ])
        ]),
        dom.el('span', { class: 'lesson__duration', text: l.duration + 'm' })
      ]));
    });
  }

  CRM.upcomingLessons = { init: init };
})(window.CRM);