(function (CRM) {
  'use strict';
  var dom = CRM.dom, fmt = CRM.format;

  var STATUS = {
    active:  { label: 'Active',  cls: 'badge--success' },
    pending: { label: 'Pending', cls: 'badge--warning' },
    paused:  { label: 'Paused',  cls: 'badge--muted' }
  };

  function init() {
    var tb = dom.qs('[data-widget="recent-students"]');
    if (!tb || !CRM.data) return;
    dom.clear(tb);

    CRM.data.recentStudents.forEach(function (s) {
      var st = STATUS[s.status] || STATUS.active;
      tb.appendChild(dom.el('tr', null, [
        dom.el('td', { 'data-label': 'Student' }, [
          dom.el('div', { class: 'cell-user' }, [
            dom.el('span', { class: 'avatar avatar--sm', text: fmt.initials(s.name) }),
            dom.el('span', { class: 'cell-user__name', text: s.name })
          ])
        ]),
        dom.el('td', { 'data-label': 'Group' }, [ dom.el('code', { text: s.group }) ]),
        dom.el('td', { 'data-label': 'Course', text: s.course }),
        dom.el('td', { 'data-label': 'Status' }, [
          dom.el('span', { class: 'badge ' + st.cls, text: st.label })
        ]),
        dom.el('td', { 'data-label': 'Joined', class: 'text-end', text: fmt.shortDate(s.joined) })
      ]));
    });
  }

  CRM.recentStudents = { init: init };
})(window.CRM);