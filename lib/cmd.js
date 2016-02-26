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

      Generator functions are expected to return ${ emphasis('an composed function') },
      which in turn generate the data to be sent on each call.

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxJQUFJLE9BQU8sUUFBUSxNQUFSLENBQVA7QUFDSixJQUFJLFFBQVEsUUFBUSxPQUFSLENBQVI7O0FBRUosSUFBSSxRQUFRLE1BQU0sS0FBTixDQUFZLElBQVo7QUFDWixJQUFJLFNBQVMsTUFBTSxNQUFOLENBQWEsSUFBYjtBQUNiLElBQUksV0FBVyxNQUFNLElBQU47O0FBRWYsSUFBSSxNQUFNLFFBQVEsSUFBUixDQUFOO0FBQ0osSUFBSSxNQUFNLFFBQVEsaUJBQVIsQ0FBTjs7QUFFSixTQUFTLGFBQVQsQ0FBd0IsR0FBeEIsRUFBNkIsSUFBN0IsRUFBbUMsR0FBbkMsRUFBd0M7QUFDdEMsTUFBSSxDQUFDLE9BQU8sU0FBUCxDQUFpQixJQUFJLElBQUosQ0FBakIsQ0FBRCxFQUE4QjtBQUNoQyxRQUFJLElBQUosSUFBWSxJQUFJLElBQUosQ0FBWixDQURnQztHQUFsQztDQURGOztBQU1BLElBQUksa0JBQWtCO0FBQ3BCLFNBQU87QUFDTCxPQUFHLE1BQUg7QUFDQSxPQUFHLFNBQUg7QUFDQSxPQUFHLE9BQUg7QUFDQSxPQUFHLFVBQUg7QUFDQSxPQUFHLE9BQUg7R0FMRjtBQU9BLFdBQVM7QUFDUCxXQUFPLENBQVA7QUFDQSxjQUFVLElBQVY7QUFDQSxXQUFPLEVBQVA7R0FIRjtDQVJFOztBQWVKLElBQUksY0FBYztBQUNoQixlQUFhLENBQUMsR0FBRyxNQUFNLElBQUksSUFBSixDQUFWLEVBQXFCOztFQUFyQixHQUVWLElBQUksV0FBSixFQUFpQjtFQUZQLENBQWI7QUFJQSxRQUFNLENBQUM7SUFBRCxHQUNELE9BQU8sT0FBUCxDQURDLEVBQ2dCOztNQURoQixHQUdDLE1BQU0sSUFBTixDQUFXLEdBQVgsQ0FIRCxFQUdrQixDQUhsQixHQUdzQixNQUFNLElBQU4sQ0FBVyxLQUFYLENBQWlCLG9CQUFqQixDQUh0QixFQUc4RCxDQUg5RCxHQUdrRSxNQUFNLElBQU4sQ0FBVyxTQUFYLENBSGxFLEVBR3lGOztZQUh6RixHQUtPLE1BQU0sSUFBTixDQUFXLFNBQVgsQ0FMUCxFQUs4Qjs7OEJBTDlCLEdBT3lCLFNBQVMsb0JBQVQsQ0FQekIsRUFPeUQsRUFQekQsR0FPOEQsU0FBUyxNQUFULENBUDlELEVBTytFLEtBUC9FLEdBT3VGLFNBQVMsc0JBQVQsQ0FQdkYsRUFPeUg7Ozs7aURBUHpILEdBVzRDLFNBQVMsc0JBQVQsQ0FYNUMsRUFXOEU7OztJQVg5RSxHQWNELE9BQU8sU0FBUCxDQWRDLEVBY2tCOzs7O3VFQWRsQixHQWtCa0UsU0FBUyxlQUFULENBbEJsRSxFQWtCNkY7cUVBbEI3RixHQW1CZ0UsU0FBUyxrQkFBVCxDQW5CaEUsRUFtQjZGOzBEQW5CN0YsR0FvQnFELFNBQVMsZ0JBQVQsQ0FwQnJELEVBb0JpRjtFQXBCakYsQ0FBTjtDQUxFOztBQTZCSixJQUFJLE1BQU0sS0FBSyxXQUFMLEVBQWtCLGVBQWxCLENBQU47O0FBRUosY0FBYyxJQUFJLEtBQUosRUFBVyxVQUF6QixFQUFxQyxnQkFBZ0IsT0FBaEIsQ0FBckM7QUFDQSxjQUFjLElBQUksS0FBSixFQUFXLE9BQXpCLEVBQWtDLGdCQUFnQixPQUFoQixDQUFsQztBQUNBLGNBQWMsSUFBSSxLQUFKLEVBQVcsT0FBekIsRUFBa0MsZ0JBQWdCLE9BQWhCLENBQWxDOztBQUVBLElBQUksSUFBSSxLQUFKLEVBQVcsSUFBSSxLQUFKLENBQWYiLCJmaWxlIjoiY21kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG52YXIgbWVvdyA9IHJlcXVpcmUoJ21lb3cnKVxyXG52YXIgY2hhbGsgPSByZXF1aXJlKCdjaGFsaycpXHJcblxyXG52YXIgdGl0bGUgPSBjaGFsay5ncmVlbi5ib2xkXHJcbnZhciBoZWFkZXIgPSBjaGFsay55ZWxsb3cuYm9sZFxyXG52YXIgZW1waGFzaXMgPSBjaGFsay5jeWFuXHJcblxyXG52YXIgY21kID0gcmVxdWlyZSgnLi8nKVxyXG52YXIgcGtnID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJylcclxuXHJcbmZ1bmN0aW9uIGVuc3VyZUludGVnZXIgKG9iaiwgcHJvcCwgZGVmKSB7XHJcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG9ialtwcm9wXSkpIHtcclxuICAgIG9ialtwcm9wXSA9IGRlZltwcm9wXVxyXG4gIH1cclxufVxyXG5cclxudmFyIG1pbmltaXN0T3B0aW9ucyA9IHtcclxuICBhbGlhczoge1xyXG4gICAgaDogJ2hlbHAnLFxyXG4gICAgdjogJ3ZlcnNpb24nLFxyXG4gICAgbjogJ25vZGVzJyxcclxuICAgIGk6ICdpbnRlcnZhbCcsXHJcbiAgICBsOiAnbGltaXQnXHJcbiAgfSxcclxuICBkZWZhdWx0OiB7XHJcbiAgICBub2RlczogNSxcclxuICAgIGludGVydmFsOiA1MDAwLFxyXG4gICAgbGltaXQ6IDIwXHJcbiAgfVxyXG59XHJcblxyXG52YXIgbWVvd09wdGlvbnMgPSB7XHJcbiAgZGVzY3JpcHRpb246IGAkeyB0aXRsZShwa2cubmFtZSkgfVxyXG5cclxuICAkeyBwa2cuZGVzY3JpcHRpb24gfVxyXG4gIGAsXHJcbiAgaGVscDogYFxyXG4gICAgJHsgaGVhZGVyKCdVc2FnZScpIH1cclxuXHJcbiAgICAgICR7IGNoYWxrLmdyYXkoJyQnKSB9ICR7IGNoYWxrLmJvbGQud2hpdGUoJ2V2ZW50aHViLW5vZGUtZGVtbycpIH0gJHsgY2hhbGsuY3lhbignPGlucHV0PicpIH1cclxuXHJcbiAgICAgIHdoZXJlICR7IGNoYWxrLmN5YW4oJzxpbnB1dD4nKSB9IGlzIGEgcGF0aCB0byBhIGZpbGUgdXNlZCB0byBnZW5lcmF0ZSB0aGUgdGVsZW1ldHJ5IHNlbnQgYnkgdGhlIGVtaXR0ZXIgbm9kZXMuXHJcblxyXG4gICAgICBUaGUgZmlsZSBjYW4gYmUgY29udGFpbiAkeyBlbXBoYXNpcygnYSBwbGFpbnRleHQgc3RyaW5nJykgfSwgJHsgZW1waGFzaXMoJ0pTT04nKX0sIG9yICR7IGVtcGhhc2lzKCdhIGdlbmVyYXRvciBmdW5jdGlvbicpIH0uXHJcblxyXG4gICAgICBTdHJpbmdzIGFuZCBKU09OIHdpbGwgYmUgc2VudCBieSB0aGUgZW1pdHRlciBub2RlcyBhcyBpcy5cclxuXHJcbiAgICAgIEdlbmVyYXRvciBmdW5jdGlvbnMgYXJlIGV4cGVjdGVkIHRvIHJldHVybiAkeyBlbXBoYXNpcygnYW4gY29tcG9zZWQgZnVuY3Rpb24nKSB9LFxyXG4gICAgICB3aGljaCBpbiB0dXJuIGdlbmVyYXRlIHRoZSBkYXRhIHRvIGJlIHNlbnQgb24gZWFjaCBjYWxsLlxyXG5cclxuICAgICR7IGhlYWRlcignT3B0aW9ucycpIH1cclxuXHJcbiAgICAgIC0taGVscCAgICAgICAgICAgIFNob3cgdGhpcyBoZWxwIHRleHRcclxuICAgICAgLXYsIC0tdmVyc2lvbiAgICAgU2hvdyB2ZXJzaW9uIGluZm9ybWF0aW9uXHJcbiAgICAgIC1uLCAtLW5vZGVzICAgICAgIFNwZWNpZnkgdGhlIG51bWJlciBvZiBlbWl0dGVyIG5vZGVzIHRvIGNyZWF0ZS4gJHsgZW1waGFzaXMoJ0RlZmF1bHQgaXMgNS4nKSB9XHJcbiAgICAgIC1pLCAtLWludGVydmFsICAgIExlbmd0aCBvZiB0aW1lIGJldHdlZW4gZXZlbnQgbWVzc2FnZXMgaW4gbXMuICR7IGVtcGhhc2lzKCdEZWZhdWx0IGlzIDUwMDAgJyl9XHJcbiAgICAgIC1sLCAtLWxpbWl0ICAgICAgIE51bWJlciBvZiBldmVudCBtZXNzYWdlcyB0byBlbWl0LiAkeyBlbXBoYXNpcygnRGVmYXVsdCBpcyAyMC4nKSB9XHJcbiAgYFxyXG59XHJcblxyXG52YXIgY2xpID0gbWVvdyhtZW93T3B0aW9ucywgbWluaW1pc3RPcHRpb25zKVxyXG5cclxuZW5zdXJlSW50ZWdlcihjbGkuZmxhZ3MsICdpbnRlcnZhbCcsIG1pbmltaXN0T3B0aW9ucy5kZWZhdWx0KVxyXG5lbnN1cmVJbnRlZ2VyKGNsaS5mbGFncywgJ25vZGVzJywgbWluaW1pc3RPcHRpb25zLmRlZmF1bHQpXHJcbmVuc3VyZUludGVnZXIoY2xpLmZsYWdzLCAnbGltaXQnLCBtaW5pbWlzdE9wdGlvbnMuZGVmYXVsdClcclxuXHJcbmNtZChjbGkuaW5wdXQsIGNsaS5mbGFncylcclxuIl19