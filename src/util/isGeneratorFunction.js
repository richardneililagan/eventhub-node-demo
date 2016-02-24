var isFunction = require('lodash/isFunction')

function isGeneratorFunction (fn) {
  return isFunction(fn) && fn.constructor.name === 'GeneratorFunction'
}

module.exports = isGeneratorFunction
