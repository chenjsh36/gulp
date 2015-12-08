console.log 'ok'
multiply = require('./multiply')
module.exports = (n) ->
	console.log 'js:square'
	return multiply(n, n)