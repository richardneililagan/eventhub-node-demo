#!/usr/bin/env node

var meow = require('meow')
var chalk = require('chalk')

var title = chalk.green.bold
var header = chalk.yellow.bold
var emphasis = chalk.cyan

var cmd = require('./')
var pkg = require('../package.json')

function ensureInteger (obj, prop, def) {
  if (!Number.isInteger(obj[prop])) {
    obj[prop] = def[prop]
  }
}

var minimistOptions = {
  alias: {
    h: 'help',
    v: 'version',
    n: 'nodes',
    i: 'interval',
    l: 'limit'
  },
  default: {
    nodes: 5,
    interval: 5000,
    limit: 20
  }
}

var meowOptions = {
  description: `${ title(pkg.name) }

  ${ pkg.description }
  `,
  help: `
    ${ header('Usage') }

      ${ chalk.gray('$') } ${ chalk.bold.white('eventhub-node-demo') } ${ chalk.cyan('<input>') }

      where ${ chalk.cyan('<input>') } is a path to a file used to generate the telemetry sent by the emitter nodes.

      The file can be contain ${ emphasis('a plaintext string') }, ${ emphasis('JSON')}, or ${ emphasis('a generator function') }.

      Strings and JSON will be sent by the emitter nodes as is.

      Generator functions are expected to return ${ emphasis('a composed function') },
      which in turn generate the data to be sent on each call.

      Make sure the following ${ emphasis('environment variables') } are set:

        - ${ emphasis('EVENTHUBBODEDEMO_NAMESPACE') }    :: your Azure Event Hub namespace URL (e.g. foo.servicebus.windows.net)
        - ${ emphasis('EVENTHUBBODEDEMO_HUBNAME') }      :: your Azure Event Hub name (e.g. myeventhub)
        - ${ emphasis('EVENTHUBBODEDEMO_KEYNAME') }      :: the Shared Access Key name that this will use
        - ${ emphasis('EVENTHUBBODEDEMO_KEYVALUE') }     :: the value of said Shared Access Key


    ${ header('Options') }

      --help            Show this help text
      -v, --version     Show version information
      -n, --nodes       Specify the number of emitter nodes to create. ${ emphasis('Default is 5.') }
      -i, --interval    Length of time between event messages in ms. ${ emphasis('Default is 5000 ')}
      -l, --limit       Number of event messages to emit. ${ emphasis('Default is 20.') }
  `
}

var cli = meow(meowOptions, minimistOptions)

ensureInteger(cli.flags, 'interval', minimistOptions.default)
ensureInteger(cli.flags, 'nodes', minimistOptions.default)
ensureInteger(cli.flags, 'limit', minimistOptions.default)

cmd(cli.input, cli.flags)
