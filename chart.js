(function (CRM) {
  'use strict';
  var dom = CRM.dom;

  var state = { series: 'revenue' };
  var NS = 'http://www.w3.org/2000/svg';

  function svgEl(tag, attrs) {
    var node = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    }
    return node;
  }

  function build(host, data) {
    var W = 720, H = 260;
    var P = { t: 16, r: 16, b: 30, l: 50 };
    var iw = W - P.l - P.r, ih = H - P.t - P.b;

    var values = data.series[state.series];
    var min = Math.min.apply(null, values);
    var max = Math.max.apply(null, values);
    var pad = (max - min) * 0.15 || 1;
    var lo = Math.max(0, min - pad), hi = max + pad;

    function x(i) { return P.l + (iw * i) / (values.length - 1); }
    function y(v) { return P.t + ih - ((v - lo) / (hi - lo)) * ih; }

    var svg = svgEl('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      preserveAspectRatio: 'none',
      class: 'chart',
      role: 'img',
      'aria-label': 'Performance chart for ' + state.series
    });

    for (var g = 0; g <= 4; g++) {
      var gv = lo + ((hi - lo) * g) / 4;
      var gy = y(gv);

      svg.appendChild(svgEl('line', {
        x1: P.l, x2: W - P.r, y1: gy, y2: gy, class: 'chart__grid'
      }));

      var label = state.series === 'revenue'
        ? '$' + Math.round(gv / 1000) + 'k'
        : (state.series === 'attendance' ? Math.round(gv) + '%' : String(Math.round(gv)));

      var lbl = svgEl('text', {
        x: P.l - 8, y: gy + 4, 'text-anchor': 'end', class: 'chart__ylabel'
      });
      lbl.textContent = label;
      svg.appendChild(lbl);
    }

    var areaD = 'M ' + x(0) + ' ' + y(values[0]);
    for (var i = 1; i < values.length; i++) areaD += ' L ' + x(i) + ' ' + y(values[i]);
    areaD += ' L ' + x(values.length - 1) + ' ' + (P.t + ih) +
             ' L ' + x(0) + ' ' + (P.t + ih) + ' Z';
    svg.appendChild(svgEl('path', { d: areaD, class: 'chart__area' }));

    var lineD = 'M ' + x(0) + ' ' + y(values[0]);
    for (var j = 1; j < values.length; j++) lineD += ' L ' + x(j) + ' ' + y(values[j]);
    svg.appendChild(svgEl('path', { d: lineD, class: 'chart__line' }));

    values.forEach(function (v, idx) {
      var cx = x(idx), cy = y(v);
      svg.appendChild(svgEl('circle', { cx: cx, cy: cy, r: 3.5, class: 'chart__dot' }));

      var xl = svgEl('text', {
        x: cx, y: H - 8, 'text-anchor': 'middle', class: 'chart__xlabel'
      });
      xl.textContent = data.months[idx];
      svg.appendChild(xl);
    });

    dom.clear(host);
    host.appendChild(svg);
  }

  function init() {
    var host = dom.qs('[data-widget="chart"]');
    if (!host || !CRM.data) return;

    build(host, CRM.data);

    var sw = dom.qs('[data-widget="chart-switch"]');
    if (sw) {
      sw.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-series]');
        if (!btn) return;
        state.series = btn.dataset.series;
        dom.qsa('[data-series]', sw).forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        build(host, CRM.data);
      });
    }
  }

  CRM.chart = { init: init };
})(window.CRM);