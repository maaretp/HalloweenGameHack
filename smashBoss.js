//canvas Element
 Crafty.init(750,500, document.getElementById('game'));


//Crafty.sprite("pumpkin.png", {bossImage:[10,390,100,100]});
//var boss_entity = Crafty.e("2D, DOM, bossImage");

//Score Box
var scoreBox = Crafty.e("2D, DOM, Canvas, Color, Text")
.color('white')
.textFont({ size: '20px', weight: 'bold' })
.attr({ x: 600, y: 50})
.text("Score: 00");

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

var wallRight = Crafty.e('wallRight, 2D, Canvas, Color, Image')
     .attr({x: 740, y: 0, w: 10, h: 500})
     .color('yellow');
     .image('1wall.png');

//Character Element moves Fourway
 var boss = Crafty.e('2D, DOM, Color, Fourway, Collision, Image')
   .attr({x: 10, y: 390, w: 100, h: 100})
   .color('red')
   .fourway(4)
   .image('pic.png');


   /* Collision Code */
  boss.addComponent("Collision").bind('Moved', function(from) {
    if(this.hit('2D')) {
       this.attr({x: from.x, y:from.y});
    }
  });
