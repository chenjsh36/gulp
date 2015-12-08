(function() {
  var multiply;

  console.log('ok');

  multiply = require('./multiply');

  module.exports = function(n) {
    console.log('js:square');
    return multiply(n, n);
  };

}).call(this);
