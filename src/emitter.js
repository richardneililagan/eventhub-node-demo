'use strict'

var assign = require('lodash/assign')

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
    console.log('test')
    this.emit()
    return this
  }
}

module.exports = Emitter
