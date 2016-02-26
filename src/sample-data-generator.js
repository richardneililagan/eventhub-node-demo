var random = require('lodash/random')

function * sampleGenerator (startTemp) {
  var index = 0
  var curTemp = startTemp || 20

  while (true) {
    curTemp = curTemp + random(-0.1, 0.2, true)

    yield {
      i: index++,
      date: +(new Date()),
      temp: curTemp
    }
  }
}

module.exports = sampleGenerator
