(function (CRM) {
  'use strict';

  var LOCALE = 'en-US';
  var CURRENCY = 'USD';

  var moneyFmt = new Intl.NumberFormat(LOCALE, {
    style: 'currency', currency: CURRENCY, maximumFractionDigits: 0
  });
  var numFmt = new Intl.NumberFormat(LOCALE);
  var dateFmt = new Intl.DateTimeFormat(LOCALE, { month: 'short', day: 'numeric' });
  var longDateFmt = new Intl.DateTimeFormat(LOCALE, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  var timeFmt = new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit' });

  function money(n) { return moneyFmt.format(n); }
  function num(n) { return numFmt.format(n); }
  function shortDate(d) { return dateFmt.format(d instanceof Date ? d : new Date(d)); }
  function longDate(d) { return longDateFmt.format(d instanceof Date ? d : new Date(d)); }
  function time(d) { return timeFmt.format(d instanceof Date ? d : new Date(d)); }

  function relative(d) {
    var then = d instanceof Date ? d : new Date(d);
    var diff = Math.round((then - Date.now()) / 1000);
    var abs = Math.abs(diff);
    var rtf = new Intl.RelativeTimeFormat(LOCALE, { numeric: 'auto' });
    if (abs < 60) return rtf.format(diff, 'second');
    if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
    if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
    if (abs < 604800) return rtf.format(Math.round(diff / 86400), 'day');
    return shortDate(then);
  }

  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2)
      .map(function (w) { return w[0].toUpperCase(); }).join('');
  }

  CRM.format = {
    money: money, num: num,
    shortDate: shortDate, longDate: longDate, time: time,
    relative: relative, initials: initials
  };
})(window.CRM);