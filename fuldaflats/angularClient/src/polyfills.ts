// Ein Polyfill (auch Polyfiller) ist ein – meist in JavaScript geschriebener – Code-Baustein,
// der in älteren Browsern eine neuere, von diesen nicht unterstützte Funktion mittels eines 
// Workarounds nachrüsten soll. Beispielsweise sind Features von HTML5 in älteren Browsern nicht verfügbar.
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

if (process.env.ENV === 'production') {
  // Production

} else {
  // Development

  Error['stackTraceLimit'] = Infinity;

  require('zone.js/dist/long-stack-trace-zone');
}