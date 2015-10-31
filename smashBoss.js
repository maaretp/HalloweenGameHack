//canvas Element
Crafty.init(750,500, document.getElementById('game'));
Crafty.background('url(img/bg.png)');
//placeholder for resizing images
//Crafty.sprite("pumpkin.png", {bossImage:[10,390,100,100]});
//var boss_entity = Crafty.e("2D, DOM, bossImage");

var seconds_left = 21;
var score = 0;

Crafty.e("2D, DOM, Canvas, Text")
  .attr({x: 40, y: 450})
  .text("Press X to start")
  .textColor('white')
  .textFont({size: '20px', weight:'bold'})
  .bind('KeyDown', function(e) {
    if(e.key == 88) {
      setTimer();
      console.log("start perssed");
    }
  });



function setTimer() {
  var interval = setInterval(function() {
    //document.getElementById('timer_div').innerHTML = --seconds_left;
    var timer = Crafty.e("2D, DOM, Canvas, Color, Text")
    .textFont({ size: '20px', weight: 'bold' })
    .textColor('white')
    .attr({ x: 400, y: 450})
    .color('#1A1A1A')
    .text("Timer: " + --seconds_left + "  ");

  //  console.log(--seconds_left);

    if (seconds_left <= 0)
    {
      //document.getElementById('timer_div').innerHTML = "You are Ready!";
      //console.log(--seconds_left);
      clearInterval(interval);
      Crafty.stop();
    }
  }, 1000);
};

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

var wallTop = Crafty.e('wallTop, 2D, Canvas, Collision, wall')
   .attr({x: 0, y: 0, w: 750, h: 10})
   .collision();

var wallLeft = Crafty.e('wallLeft, 2D, Canvas, Color, wall')
    .attr({x: 0, y: 0, w: 10, h: 500})
    .color('#1A1A1A');

var wallRight = Crafty.e('wallRight, 2D, Canvas, Color, wall')
     .attr({x: 740, y: 0, w: 10, h: 500})
     .color('#1A1A1A')

var wallMiddle = Crafty.e('wallMiddle, 2D, Canvas, Color, wall')
      .attr({x: 570, y: 250, w: 10, h: 50})
      .color('yellow')

var wallMiddle2 = Crafty.e('wallMiddle, 2D, Canvas, Color, wall')
      .attr({x: 60, y: 40, w: 10, h: 50})
      .color('yellow')

var spikeWallRight = Crafty.e('spikeWallRight, 2D, Canvas, Color, Image, spikeWall')
      .attr({x: 730, y: 0, w: 10, h: 500})
      .image('img/1wall_a.png');

var spikeWallLeft = Crafty.e('spikeWallLeft, 2D, Canvas, Color, Image, spikeWall')
      .attr({x: 10, y: 0, w: 10, h: 500})
      .image('img/2wall_a.png');

// Character Element moves Fourway
 var boss = Crafty.e('boss, 2D, DOM, Fourway, Collision, Image')
   .attr({x: 275, y: 250, w: 122, h: 100})
   .fourway(4)
   .image('img/witch.png');

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
