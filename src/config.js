var chalk = require('chalk')

var isNull = require('lodash/isNull')
var isUndefined = require('lodash/isUndefined')

function requireEnv (name) {
  var val = process.env[name]
  if (isUndefined(val) || isNull(val)) {
    throw new Error(chalk.bold.red(`ERROR : Required environment variable ${ chalk.bold.yellow(name) } is not set.`))
  }

  return val
}

var config = {}

// :: the complete Azure namespace where your Event Hub is located
config.namespace = requireEnv('EVENTHUBNODEDEMO_NAMESPACE')

// :: the URL-qualified name of your Event Hub
config.eventhubname = requireEnv('EVENTHUBNODEDEMO_HUBNAME')

// :: the name of the shared access key (SAK) you've created for the emitters,
//    as well as the actual key value
config.sak_name = requireEnv('EVENTHUBNODEDEMO_KEYNAME')
config.sak_value = requireEnv('EVENTHUBNODEDEMO_KEYVALUE')

module.exports = config
