var fs = require('fs')
var path = require('path')
var chalk = require('chalk')

var isFunction = require('lodash/isFunction')

var config = require('./config')
var emitter = require('./iotemitter')

function isGeneratorFunction (fn) {
  return isFunction(fn) && fn.constructor.name === 'GeneratorFunction'
}

function composeGenerator (file) {
  // :: establish where data is coming from
  var datatarget = path.resolve(file || path.resolve(__dirname, './sample-data-text.txt'))

  try {
    var datatarget_stats = fs.statSync(datatarget)
    if (!datatarget_stats.isFile()) {
      console.log(chalk.red('ERROR : Specified input is not a valid file.'))
      return
    }
  } catch (err) {
    console.log(chalk.red('ERROR : Specified file does not exist.'))
    return
  }

  var datasource
  try {
    datasource = require(datatarget)
  } catch (err) {
    // :: file is not JSON or Javascript
    datasource = fs.readFileSync(datatarget).toString()
  }
  return isGeneratorFunction(datasource)
    ? datasource
    : function* genericGenerator () {
      while (true) {
        yield isFunction(datasource) ? datasource() : datasource
      }
    }
}

function main (inputs, flags) {
  var generator = composeGenerator(inputs[0])
  if (!generator) {
    process.exit(-1)
  }

  var iterator = generator()
  for (var i = 0; i < 10; i++) {
    console.log(iterator.next().value)
  }
}

module.exports = main
