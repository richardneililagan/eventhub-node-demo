#!/usr/bin/env node
'use strict';

var meow = require('meow');
var chalk = require('chalk');

var title = chalk.green.bold;
var header = chalk.yellow.bold;
var emphasis = chalk.cyan;

var cmd = require('./');
var pkg = require('../package.json');

function ensureInteger(obj, prop, def) {
  if (!Number.isInteger(obj[prop])) {
    obj[prop] = def[prop];
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
};

var meowOptions = {
  description: `${ title(pkg.name) }

  ${ pkg.description }
  `,
  help: `
    ${ header('Usage') }

      ${ chalk.gray('$') } ${ chalk.bold.white('eventhub-node-demo') } ${ chalk.cyan('<input>') }

      where ${ chalk.cyan('<input>') } is a path to a file used to generate the telemetry sent by the emitter nodes.

      The file can be contain ${ emphasis('a plaintext string') }, ${ emphasis('JSON') }, or ${ emphasis('a generator function') }.

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
      -i, --interval    Length of time between event messages in ms. ${ emphasis('Default is 5000 ') }
      -l, --limit       Number of event messages to emit. ${ emphasis('Default is 20.') }
  `
};

var cli = meow(meowOptions, minimistOptions);

ensureInteger(cli.flags, 'interval', minimistOptions.default);
ensureInteger(cli.flags, 'nodes', minimistOptions.default);
ensureInteger(cli.flags, 'limit', minimistOptions.default);

cmd(cli.input, cli.flags);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFJLE9BQU8sUUFBUSxNQUFSLENBQVA7QUFDSixJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxRQUFRLE1BQU0sS0FBTixDQUFZLElBQVo7QUFDWixJQUFJLFNBQVMsTUFBTSxNQUFOLENBQWEsSUFBYjtBQUNiLElBQUksV0FBVyxNQUFNLElBQU47O0FBRWYsSUFBSSxNQUFNLFFBQVEsSUFBUixDQUFOO0FBQ0osSUFBSSxNQUFNLFFBQVEsaUJBQVIsQ0FBTjs7QUFFSixTQUFTLGFBQVQsQ0FBd0IsR0FBeEIsRUFBNkIsSUFBN0IsRUFBbUMsR0FBbkMsRUFBd0M7QUFDdEMsTUFBSSxDQUFDLE9BQU8sU0FBUCxDQUFpQixJQUFJLElBQUosQ0FBakIsQ0FBRCxFQUE4QjtBQUNoQyxRQUFJLElBQUosSUFBWSxJQUFJLElBQUosQ0FBWixDQURnQztHQUFsQztDQURGOztBQU1BLElBQUksa0JBQWtCO0FBQ3BCLFNBQU87QUFDTCxPQUFHLE1BQUg7QUFDQSxPQUFHLFNBQUg7QUFDQSxPQUFHLE9BQUg7QUFDQSxPQUFHLFVBQUg7QUFDQSxPQUFHLE9BQUg7R0FMRjtBQU9BLFdBQVM7QUFDUCxXQUFPLENBQVA7QUFDQSxjQUFVLElBQVY7QUFDQSxXQUFPLEVBQVA7R0FIRjtDQVJFOztBQWVKLElBQUksY0FBYztBQUNoQixlQUFhLENBQUMsR0FBRyxNQUFNLElBQUksSUFBSixDQUFWLEVBQXFCOztFQUFyQixHQUVWLElBQUksV0FBSixFQUFpQjtFQUZQLENBQWI7QUFJQSxRQUFNLENBQUM7SUFBRCxHQUNELE9BQU8sT0FBUCxDQURDLEVBQ2dCOztNQURoQixHQUdDLE1BQU0sSUFBTixDQUFXLEdBQVgsQ0FIRCxFQUdrQixDQUhsQixHQUdzQixNQUFNLElBQU4sQ0FBVyxLQUFYLENBQWlCLG9CQUFqQixDQUh0QixFQUc4RCxDQUg5RCxHQUdrRSxNQUFNLElBQU4sQ0FBVyxTQUFYLENBSGxFLEVBR3lGOztZQUh6RixHQUtPLE1BQU0sSUFBTixDQUFXLFNBQVgsQ0FMUCxFQUs4Qjs7OEJBTDlCLEdBT3lCLFNBQVMsb0JBQVQsQ0FQekIsRUFPeUQsRUFQekQsR0FPOEQsU0FBUyxNQUFULENBUDlELEVBTytFLEtBUC9FLEdBT3VGLFNBQVMsc0JBQVQsQ0FQdkYsRUFPeUg7Ozs7aURBUHpILEdBVzRDLFNBQVMscUJBQVQsQ0FYNUMsRUFXNkU7Ozs4QkFYN0UsR0FjeUIsU0FBUyx1QkFBVCxDQWR6QixFQWM0RDs7VUFkNUQsR0FnQkssU0FBUyw0QkFBVCxDQWhCTCxFQWdCNkM7VUFoQjdDLEdBaUJLLFNBQVMsMEJBQVQsQ0FqQkwsRUFpQjJDO1VBakIzQyxHQWtCSyxTQUFTLDBCQUFULENBbEJMLEVBa0IyQztVQWxCM0MsR0FtQkssU0FBUywyQkFBVCxDQW5CTCxFQW1CNEM7O0lBbkI1QyxHQXFCRCxPQUFPLFNBQVAsQ0FyQkMsRUFxQmtCOzs7O3VFQXJCbEIsR0F5QmtFLFNBQVMsZUFBVCxDQXpCbEUsRUF5QjZGO3FFQXpCN0YsR0EwQmdFLFNBQVMsa0JBQVQsQ0ExQmhFLEVBMEI2RjswREExQjdGLEdBMkJxRCxTQUFTLGdCQUFULENBM0JyRCxFQTJCaUY7RUEzQmpGLENBQU47Q0FMRTs7QUFvQ0osSUFBSSxNQUFNLEtBQUssV0FBTCxFQUFrQixlQUFsQixDQUFOOztBQUVKLGNBQWMsSUFBSSxLQUFKLEVBQVcsVUFBekIsRUFBcUMsZ0JBQWdCLE9BQWhCLENBQXJDO0FBQ0EsY0FBYyxJQUFJLEtBQUosRUFBVyxPQUF6QixFQUFrQyxnQkFBZ0IsT0FBaEIsQ0FBbEM7QUFDQSxjQUFjLElBQUksS0FBSixFQUFXLE9BQXpCLEVBQWtDLGdCQUFnQixPQUFoQixDQUFsQzs7QUFFQSxJQUFJLElBQUksS0FBSixFQUFXLElBQUksS0FBSixDQUFmIiwiZmlsZSI6ImNtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG52YXIgbWVvdyA9IHJlcXVpcmUoJ21lb3cnKVxudmFyIGNoYWxrID0gcmVxdWlyZSgnY2hhbGsnKVxuXG52YXIgdGl0bGUgPSBjaGFsay5ncmVlbi5ib2xkXG52YXIgaGVhZGVyID0gY2hhbGsueWVsbG93LmJvbGRcbnZhciBlbXBoYXNpcyA9IGNoYWxrLmN5YW5cblxudmFyIGNtZCA9IHJlcXVpcmUoJy4vJylcbnZhciBwa2cgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKVxuXG5mdW5jdGlvbiBlbnN1cmVJbnRlZ2VyIChvYmosIHByb3AsIGRlZikge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIob2JqW3Byb3BdKSkge1xuICAgIG9ialtwcm9wXSA9IGRlZltwcm9wXVxuICB9XG59XG5cbnZhciBtaW5pbWlzdE9wdGlvbnMgPSB7XG4gIGFsaWFzOiB7XG4gICAgaDogJ2hlbHAnLFxuICAgIHY6ICd2ZXJzaW9uJyxcbiAgICBuOiAnbm9kZXMnLFxuICAgIGk6ICdpbnRlcnZhbCcsXG4gICAgbDogJ2xpbWl0J1xuICB9LFxuICBkZWZhdWx0OiB7XG4gICAgbm9kZXM6IDUsXG4gICAgaW50ZXJ2YWw6IDUwMDAsXG4gICAgbGltaXQ6IDIwXG4gIH1cbn1cblxudmFyIG1lb3dPcHRpb25zID0ge1xuICBkZXNjcmlwdGlvbjogYCR7IHRpdGxlKHBrZy5uYW1lKSB9XG5cbiAgJHsgcGtnLmRlc2NyaXB0aW9uIH1cbiAgYCxcbiAgaGVscDogYFxuICAgICR7IGhlYWRlcignVXNhZ2UnKSB9XG5cbiAgICAgICR7IGNoYWxrLmdyYXkoJyQnKSB9ICR7IGNoYWxrLmJvbGQud2hpdGUoJ2V2ZW50aHViLW5vZGUtZGVtbycpIH0gJHsgY2hhbGsuY3lhbignPGlucHV0PicpIH1cblxuICAgICAgd2hlcmUgJHsgY2hhbGsuY3lhbignPGlucHV0PicpIH0gaXMgYSBwYXRoIHRvIGEgZmlsZSB1c2VkIHRvIGdlbmVyYXRlIHRoZSB0ZWxlbWV0cnkgc2VudCBieSB0aGUgZW1pdHRlciBub2Rlcy5cblxuICAgICAgVGhlIGZpbGUgY2FuIGJlIGNvbnRhaW4gJHsgZW1waGFzaXMoJ2EgcGxhaW50ZXh0IHN0cmluZycpIH0sICR7IGVtcGhhc2lzKCdKU09OJyl9LCBvciAkeyBlbXBoYXNpcygnYSBnZW5lcmF0b3IgZnVuY3Rpb24nKSB9LlxuXG4gICAgICBTdHJpbmdzIGFuZCBKU09OIHdpbGwgYmUgc2VudCBieSB0aGUgZW1pdHRlciBub2RlcyBhcyBpcy5cblxuICAgICAgR2VuZXJhdG9yIGZ1bmN0aW9ucyBhcmUgZXhwZWN0ZWQgdG8gcmV0dXJuICR7IGVtcGhhc2lzKCdhIGNvbXBvc2VkIGZ1bmN0aW9uJykgfSxcbiAgICAgIHdoaWNoIGluIHR1cm4gZ2VuZXJhdGUgdGhlIGRhdGEgdG8gYmUgc2VudCBvbiBlYWNoIGNhbGwuXG5cbiAgICAgIE1ha2Ugc3VyZSB0aGUgZm9sbG93aW5nICR7IGVtcGhhc2lzKCdlbnZpcm9ubWVudCB2YXJpYWJsZXMnKSB9IGFyZSBzZXQ6XG5cbiAgICAgICAgLSAkeyBlbXBoYXNpcygnRVZFTlRIVUJCT0RFREVNT19OQU1FU1BBQ0UnKSB9ICAgIDo6IHlvdXIgQXp1cmUgRXZlbnQgSHViIG5hbWVzcGFjZSBVUkwgKGUuZy4gZm9vLnNlcnZpY2VidXMud2luZG93cy5uZXQpXG4gICAgICAgIC0gJHsgZW1waGFzaXMoJ0VWRU5USFVCQk9ERURFTU9fSFVCTkFNRScpIH0gICAgICA6OiB5b3VyIEF6dXJlIEV2ZW50IEh1YiBuYW1lIChlLmcuIG15ZXZlbnRodWIpXG4gICAgICAgIC0gJHsgZW1waGFzaXMoJ0VWRU5USFVCQk9ERURFTU9fS0VZTkFNRScpIH0gICAgICA6OiB0aGUgU2hhcmVkIEFjY2VzcyBLZXkgbmFtZSB0aGF0IHRoaXMgd2lsbCB1c2VcbiAgICAgICAgLSAkeyBlbXBoYXNpcygnRVZFTlRIVUJCT0RFREVNT19LRVlWQUxVRScpIH0gICAgIDo6IHRoZSB2YWx1ZSBvZiBzYWlkIFNoYXJlZCBBY2Nlc3MgS2V5XG5cbiAgICAkeyBoZWFkZXIoJ09wdGlvbnMnKSB9XG5cbiAgICAgIC0taGVscCAgICAgICAgICAgIFNob3cgdGhpcyBoZWxwIHRleHRcbiAgICAgIC12LCAtLXZlcnNpb24gICAgIFNob3cgdmVyc2lvbiBpbmZvcm1hdGlvblxuICAgICAgLW4sIC0tbm9kZXMgICAgICAgU3BlY2lmeSB0aGUgbnVtYmVyIG9mIGVtaXR0ZXIgbm9kZXMgdG8gY3JlYXRlLiAkeyBlbXBoYXNpcygnRGVmYXVsdCBpcyA1LicpIH1cbiAgICAgIC1pLCAtLWludGVydmFsICAgIExlbmd0aCBvZiB0aW1lIGJldHdlZW4gZXZlbnQgbWVzc2FnZXMgaW4gbXMuICR7IGVtcGhhc2lzKCdEZWZhdWx0IGlzIDUwMDAgJyl9XG4gICAgICAtbCwgLS1saW1pdCAgICAgICBOdW1iZXIgb2YgZXZlbnQgbWVzc2FnZXMgdG8gZW1pdC4gJHsgZW1waGFzaXMoJ0RlZmF1bHQgaXMgMjAuJykgfVxuICBgXG59XG5cbnZhciBjbGkgPSBtZW93KG1lb3dPcHRpb25zLCBtaW5pbWlzdE9wdGlvbnMpXG5cbmVuc3VyZUludGVnZXIoY2xpLmZsYWdzLCAnaW50ZXJ2YWwnLCBtaW5pbWlzdE9wdGlvbnMuZGVmYXVsdClcbmVuc3VyZUludGVnZXIoY2xpLmZsYWdzLCAnbm9kZXMnLCBtaW5pbWlzdE9wdGlvbnMuZGVmYXVsdClcbmVuc3VyZUludGVnZXIoY2xpLmZsYWdzLCAnbGltaXQnLCBtaW5pbWlzdE9wdGlvbnMuZGVmYXVsdClcblxuY21kKGNsaS5pbnB1dCwgY2xpLmZsYWdzKVxuIl19