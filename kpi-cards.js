(function (CRM) {
  'use strict';
  var dom = CRM.dom, fmt = CRM.format;

  function render(host, items) {
    if (!host) return;
    dom.clear(host);

    items.forEach(function (k) {
      var deltaUp = k.delta >= 0;
      var value = k.money ? fmt.money(k.value) : fmt.num(k.value);

      var card = dom.el('div', { class: 'col-12 col-sm-6 col-xl-3' }, [
        dom.el('article', { class: 'kpi kpi--' + k.tone }, [
          dom.el('div', { class: 'kpi__icon' }, [
            dom.el('i', { class: k.icon, 'aria-hidden': 'true' })
          ]),
          dom.el('div', { class: 'kpi__body' }, [
            dom.el('p', { class: 'kpi__label', text: k.label }),
            dom.el('p', { class: 'kpi__value', text: value }),
            dom.el('p', { class: 'kpi__hint' }, [
              dom.el('span', { class: 'kpi__delta ' + (deltaUp ? 'is-up' : 'is-down') }, [
                dom.el('i', {
                  class: deltaUp ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down',
                  'aria-hidden': 'true'
                }),
                document.createTextNode(' ' + Math.abs(k.delta).toFixed(1) + '%')
              ]),
              dom.el('span', { text: ' ' + k.hint })
            ])
          ])
        ])
      ]);
      host.appendChild(card);
    });
  }

  CRM.kpiCards = { render: render };
})(window.CRM);