(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(a, b) {
  console.log(a, b);
  return a * b;
};

console.log('okasdf');


},{}],2:[function(require,module,exports){
var mul;

mul = require('./multiply');

module.exports = function(n) {
  return mul(n, n);
};


},{"./multiply":1}],3:[function(require,module,exports){
module.exports = function(a, b) {
  a = a + 1;
  b = b + 1;
  return a * b;
};


},{}],4:[function(require,module,exports){
var multiply, square;

multiply = require('./module1');

square = require('./../../own_module/math/square');

console.log(multiply(2, 3));

console.log('changeasdffa');

console.log(square(3));


},{"./../../own_module/math/square":2,"./module1":3}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImU6XFxNWV9EZXZlbG9wXFxnaXRcXGd1bHBcXGd1bHBcXGd1bHBfcHJhdGljZV8yXFxub2RlX21vZHVsZXNcXGd1bHAtYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJlOi9NWV9EZXZlbG9wL2dpdC9ndWxwL2d1bHAvZ3VscF9wcmF0aWNlXzIvc3JjL293bl9tb2R1bGUvbWF0aC9tdWx0aXBseS5jb2ZmZWUiLCJlOi9NWV9EZXZlbG9wL2dpdC9ndWxwL2d1bHAvZ3VscF9wcmF0aWNlXzIvc3JjL293bl9tb2R1bGUvbWF0aC9zcXVhcmUuY29mZmVlIiwiZTovTVlfRGV2ZWxvcC9naXQvZ3VscC9ndWxwL2d1bHBfcHJhdGljZV8yL3NyYy9wYWdlcy9icm93c2VyaWZ5L21vZHVsZTEuY29mZmVlIiwiZTovTVlfRGV2ZWxvcC9naXQvZ3VscC9ndWxwL2d1bHBfcHJhdGljZV8yL3NyYy9wYWdlcy9icm93c2VyaWZ5L21vZHVsZTIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhLCBiKSB7XG4gIGNvbnNvbGUubG9nKGEsIGIpO1xuICByZXR1cm4gYSAqIGI7XG59O1xuXG5jb25zb2xlLmxvZygnb2thc2RmJyk7XG5cbiIsInZhciBtdWw7XG5cbm11bCA9IHJlcXVpcmUoJy4vbXVsdGlwbHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuKSB7XG4gIHJldHVybiBtdWwobiwgbik7XG59O1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgYSA9IGEgKyAxO1xuICBiID0gYiArIDE7XG4gIHJldHVybiBhICogYjtcbn07XG5cbiIsInZhciBtdWx0aXBseSwgc3F1YXJlO1xuXG5tdWx0aXBseSA9IHJlcXVpcmUoJy4vbW9kdWxlMScpO1xuXG5zcXVhcmUgPSByZXF1aXJlKCcuLy4uLy4uL293bl9tb2R1bGUvbWF0aC9zcXVhcmUnKTtcblxuY29uc29sZS5sb2cobXVsdGlwbHkoMiwgMykpO1xuXG5jb25zb2xlLmxvZygnY2hhbmdlYXNkZmZhJyk7XG5cbmNvbnNvbGUubG9nKHNxdWFyZSgzKSk7XG5cbiJdfQ==
