'use strict'

var assign = require('lodash/assign')

var config = require('./config')

var cache = new WeakMap()

class Emitter {
  constructor(opts) {
    var cachebag = assign({}, opts)
    cache.set(this, cachebag)
  }

  emit() {
    var record = cache.get(this).iterator.next().value
    console.log(record)
  }

  start() {
    var count = 0
    var timing = setInterval(_ => {

      this.emit()
      if (++count === cache.get(this).limit) {
        clearInterval(timing)
      }

    }, cache.get(this).interval)

    return this
  }
}

module.exports = Emitter
