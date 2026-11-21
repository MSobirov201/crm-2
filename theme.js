(function (CRM) {
  'use strict';

  var KEY = 'crm-theme';
  var root = document.documentElement;

  function get() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function apply(theme) {
    var t = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', t);
    root.setAttribute('data-bs-theme', t);
    try { localStorage.setItem(KEY, t); } catch (e) { /* ignore */ }
    document.dispatchEvent(new CustomEvent('crm:themechange', { detail: { theme: t } }));
  }

  function toggle() {
    apply(get() === 'dark' ? 'light' : 'dark');
  }

  function init() {
    root.setAttribute('data-bs-theme', get());
  }

  CRM.theme = { get: get, apply: apply, toggle: toggle, init: init };
})(window.CRM);