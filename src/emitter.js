'use strict'

var crypto = require('crypto')
var uuid = require('uuid')
var got = require('got')
var assign = require('lodash/assign')

var config = require('./config')

var cache = new WeakMap()

function createToken (url, keyname, keyvalue) {
  var hmac = crypto.createHmac('sha256', keyvalue)

  // :: give this token 24 hours before it expires
  var expiry = (~~(+new Date() / 1000)) + (60 * 60 * 24)

  hmac.update(`${ encodeURIComponent(url) }\n${ expiry }`)
  var signature = hmac.digest('base64')

  return `SharedAccessSignature sr=${ encodeURIComponent(url) }&sig=${ encodeURIComponent(signature) }&se=${ expiry }&skn=${ keyname }`
}

class Emitter {
  constructor (opts) {
    var cachebag = assign({}, opts)

    this.name = uuid.v4()
    cachebag.__hubUrl = `https://${ config.namespace }/${ config.eventhubname }/publishers/${ this.name }/messages`
    cachebag.__sasToken = createToken(cachebag.__hubUrl, config.sak_name, config.sak_value)

    cache.set(this, cachebag)
  }

  emit () {
    var cachebag = cache.get(this)
    var record = cachebag.iterator.next().value

    got(cachebag.__hubUrl, {
      method: 'POST',
      body: record,
      headers: {
        'Authorization': cachebag.__sasToken
      }
    })
      .then(_ => {
        console.log(`Event sent from ${ this.name }`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  start () {
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
