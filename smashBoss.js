//canvas Element
 Crafty.init(750,500, document.getElementById('game'));
Crafty.background('url(img/bg.png)');
//placeholder for resizing images
//Crafty.sprite("pumpkin.png", {bossImage:[10,390,100,100]});
//var boss_entity = Crafty.e("2D, DOM, bossImage");

var score = 0;

// Score Box
var scoreBox = Crafty.e("2D, DOM, Canvas, Color, Text")

.textFont({ size: '20px', weight: 'bold' })
.textColor('white')
.attr({ x: 600, y: 450})
.color('#1A1A1A')
.text("Score: " + score);

// Walls
 var wallBottom = Crafty.e('wallBottom, 2D, Canvas, wall')
  .attr({x: 0, y: 490, w: 750, h: 10});

var wallTop = Crafty.e('wallTop, 2D, Canvas, Color, Collision, wall')
   .attr({x: 0, y: 0, w: 750, h: 10})
   .collision();

var wallLeft = Crafty.e('wallLeft, 2D, Canvas, Color, wall')
    .attr({x: 0, y: 0, w: 10, h: 500})
    .color('#1A1A1A');

var wallRight = Crafty.e('wallRight, 2D, Canvas, Color, wall')
     .attr({x: 740, y: 0, w: 10, h: 500})
     .color('#1A1A1A');

var spikeWallRight = Crafty.e('spikeWallRight, 2D, Canvas, Image, spikeWall')
      .attr({x: 730, y: 0, w: 10, h: 500})
      .image('img/1wall_a.png');

var spikeWallLeft = Crafty.e('spikeWallLeft, 2D, Canvas, Image, spikeWall')
      .attr({x: 10, y: 0, w: 10, h: 500})
      .image('img/2wall_a.png');

// Character Element moves Fourway
 var boss = Crafty.e('boss, 2D, DOM, Color, Fourway, Collision, Image')
   .attr({x: 300, y: 250, w: 100, h: 100})
   .color('red')
   .fourway(4)
   .image('img/pic.png');

   /*boss.addComponent("Collision").bind('Moved', function(from) {
     if(this.hit('2D')) {
        this.attr({x: from.x, y:from.y});
     }
   });*/

   /*
   .bind('Moved', function(from) {
     //console.log(this);
     console.log(from);
     if(this.hit('2D')) {
        this.attr({x: from.x, y:from.y});
     }
   })*/

   /* Collision Code */
   //now either solid object or noticing the collision, needs fixing
  /*boss.addComponent("Collision")
  .checkHits('wallTop') // check for collisions with entities that have the Solid component in each frame
  .bind("HitOn", function(hitData) {
     console.log(hitData);
     console.log(this);
     console.log("Collision with Solid entity occurred for the first time.");


 }).bind("HitOff", function(comp) {
       //this.attr({x: hitData.x, y:hitData.y});
      console.log(comp);
        console.log("Collision with Solid entity ended.");
    });
*/

boss.addComponent("Collision")
.bind('Moved', function(from) {
  if(this.hit('wall')) {
     this.attr({x: from.x, y:from.y});
  }
}).checkHits('spikeWall') // check for collisions with entities that have the Solid component in each frame
.bind("HitOn", function(hitData) {
   console.log("Collision with Solid entity occurred for the first time.");
   score = score + 10;

   console.log(score);

   scoreBox.text("Score: " + score);
});
