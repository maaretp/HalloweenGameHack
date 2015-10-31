//canvas Element
 Crafty.init(750,500, document.getElementById('game'));

// Walls
 var wallBottom = Crafty.e('wallBottom, 2D, Canvas, Color')
  .attr({x: 0, y: 490, w: 750, h: 10})
  .color('blue');

var wallTop = Crafty.e('wallTop, 2D, Canvas, Color')
   .attr({x: 0, y: 0, w: 750, h: 10})
   .color('green');

var wallLeft = Crafty.e('wallLeft, 2D, Canvas, Color')
    .attr({x: 0, y: 0, w: 10, h: 500})
    .color('brown');

var wallRight = Crafty.e('wallRight, 2D, Canvas, Color')
     .attr({x: 740, y: 0, w: 10, h: 500})
     .color('yellow');

//Character Element moves Fourway
 var boss = Crafty.e('2D, DOM, Color, Fourway, Collision')
   .attr({x: 10, y: 390, w: 100, h: 100})
   .color('red')
   .fourway(4);
