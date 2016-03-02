'use strict';

var random = require('lodash/random');

function* sampleGenerator(startTemp) {
  var index = 0;
  var curTemp = startTemp || 20;

  while (true) {
    curTemp = curTemp + random(-0.1, 0.2, true);

    yield {
      i: index++,
      date: +new Date(),
      temp: curTemp
    };
  }
}

module.exports = sampleGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zYW1wbGUtZGF0YS1nZW5lcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLFNBQVMsUUFBUSxlQUFSLENBQVQ7O0FBRUosVUFBVyxlQUFYLENBQTRCLFNBQTVCLEVBQXVDO0FBQ3JDLE1BQUksUUFBUSxDQUFSLENBRGlDO0FBRXJDLE1BQUksVUFBVSxhQUFhLEVBQWIsQ0FGdUI7O0FBSXJDLFNBQU8sSUFBUCxFQUFhO0FBQ1gsY0FBVSxVQUFVLE9BQU8sQ0FBQyxHQUFELEVBQU0sR0FBYixFQUFrQixJQUFsQixDQUFWLENBREM7O0FBR1gsVUFBTTtBQUNKLFNBQUcsT0FBSDtBQUNBLFlBQU0sQ0FBRSxJQUFJLElBQUosRUFBRjtBQUNOLFlBQU0sT0FBTjtLQUhGLENBSFc7R0FBYjtDQUpGOztBQWVBLE9BQU8sT0FBUCxHQUFpQixlQUFqQiIsImZpbGUiOiJzYW1wbGUtZGF0YS1nZW5lcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcmFuZG9tID0gcmVxdWlyZSgnbG9kYXNoL3JhbmRvbScpXHJcblxyXG5mdW5jdGlvbiAqIHNhbXBsZUdlbmVyYXRvciAoc3RhcnRUZW1wKSB7XHJcbiAgdmFyIGluZGV4ID0gMFxyXG4gIHZhciBjdXJUZW1wID0gc3RhcnRUZW1wIHx8IDIwXHJcblxyXG4gIHdoaWxlICh0cnVlKSB7XHJcbiAgICBjdXJUZW1wID0gY3VyVGVtcCArIHJhbmRvbSgtMC4xLCAwLjIsIHRydWUpXHJcblxyXG4gICAgeWllbGQge1xyXG4gICAgICBpOiBpbmRleCsrLFxyXG4gICAgICBkYXRlOiArKG5ldyBEYXRlKCkpLFxyXG4gICAgICB0ZW1wOiBjdXJUZW1wXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNhbXBsZUdlbmVyYXRvclxyXG4iXX0=