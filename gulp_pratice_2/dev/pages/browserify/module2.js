(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(a, b) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkU6XFxjaGVuanNoMzZcXG15ZGV2ZWxvcFxcZ3VscFxcZ3VscF9wcmF0aWNlXzJcXG5vZGVfbW9kdWxlc1xcZ3VscC1icm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkU6XFxjaGVuanNoMzZcXG15ZGV2ZWxvcFxcZ3VscFxcZ3VscF9wcmF0aWNlXzJcXHNyY1xcb3duX21vZHVsZVxcbWF0aFxcbXVsdGlwbHkuY29mZmVlIiwiRTpcXGNoZW5qc2gzNlxcbXlkZXZlbG9wXFxndWxwXFxndWxwX3ByYXRpY2VfMlxcc3JjXFxvd25fbW9kdWxlXFxtYXRoXFxzcXVhcmUuY29mZmVlIiwiRTpcXGNoZW5qc2gzNlxcbXlkZXZlbG9wXFxndWxwXFxndWxwX3ByYXRpY2VfMlxcc3JjXFxwYWdlc1xcYnJvd3NlcmlmeVxcbW9kdWxlMS5jb2ZmZWUiLCJFOlxcY2hlbmpzaDM2XFxteWRldmVsb3BcXGd1bHBcXGd1bHBfcHJhdGljZV8yXFxzcmNcXHBhZ2VzXFxicm93c2VyaWZ5XFxtb2R1bGUyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsQ0FBRCxFQUFJLENBQUo7QUFDZixTQUFPLENBQUEsR0FBSTtBQURJOztBQUdqQixPQUFPLENBQUMsR0FBUixDQUFZLFFBQVo7Ozs7O0FDSEEsSUFBQTs7QUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFlBQVI7O0FBQ04sTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxDQUFEO0FBQ2hCLFNBQU8sR0FBQSxDQUFJLENBQUosRUFBTyxDQUFQO0FBRFM7Ozs7O0FDRGpCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsQ0FBRCxFQUFJLENBQUo7RUFDaEIsQ0FBQSxHQUFJLENBQUEsR0FBSTtFQUNSLENBQUEsR0FBSSxDQUFBLEdBQUk7U0FDUixDQUFBLEdBQUk7QUFIWTs7Ozs7QUNBakIsSUFBQTs7QUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFdBQVI7O0FBQ1gsTUFBQSxHQUFTLE9BQUEsQ0FBUSxnQ0FBUjs7QUFDVCxPQUFPLENBQUMsR0FBUixDQUFZLFFBQUEsQ0FBUyxDQUFULEVBQVcsQ0FBWCxDQUFaOztBQUVBLE9BQU8sQ0FBQyxHQUFSLENBQVksY0FBWjs7QUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLE1BQUEsQ0FBTyxDQUFQLENBQVoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSAoYSwgYiktPlxyXG4gIHJldHVybiBhICogYlxyXG5cclxuY29uc29sZS5sb2cgJ29rYXNkZiciLCJtdWwgPSByZXF1aXJlKCcuL211bHRpcGx5JylcclxubW9kdWxlLmV4cG9ydHMgPSAobiktPlxyXG5cdHJldHVybiBtdWwobiwgbilcclxuIiwibW9kdWxlLmV4cG9ydHMgPSAoYSwgYiktPlxyXG5cdGEgPSBhICsgMVxyXG5cdGIgPSBiICsgMVxyXG5cdGEgKiBiXHJcbiIsIm11bHRpcGx5ID0gcmVxdWlyZSgnLi9tb2R1bGUxJylcclxuc3F1YXJlID0gcmVxdWlyZSgnLi8uLi8uLi9vd25fbW9kdWxlL21hdGgvc3F1YXJlJylcclxuY29uc29sZS5sb2cobXVsdGlwbHkoMiwzKSlcclxuXHJcbmNvbnNvbGUubG9nICdjaGFuZ2Vhc2RmZmEnXHJcbmNvbnNvbGUubG9nKHNxdWFyZSgzKSkiXX0=
