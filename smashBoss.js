//canvas Element
Crafty.init(750,500, document.getElementById('game'));
Crafty.background('url(img/bg.png)');

var seconds_left = 21;
var score = 0;
var boss = {};

Crafty.e("2D, DOM, Canvas, Text")
  .attr({x: 40, y: 450})
  .text("Press X to start")
  .textColor('white')
  .textFont({size: '20px', weight:'bold'})
  .bind('KeyDown', function(e) {
    if(e.key == 88) {
      setTimer();
      createBoss();
    }
  });

function setTimer() {
  var interval = setInterval(function() {
    --seconds_left;

    var timer = timerDisplay(seconds_left);

    if (seconds_left <= -1)
    {
      clearInterval(interval);
      Crafty.stop();
    }
  }, 1000);
};

function timerDisplay(seconds_left){
  var timer = Crafty.e("2D, DOM, Canvas, Color, Text")
  .textFont({ size: '20px', weight: 'bold' })
  .textColor('white')
  .attr({ x: 400, y: 450})
  .color('#1A1A1A')
  .text("Timer: " + seconds_left + "  ");

  return timer;
}

// Score Box
var scoreBox = Crafty.e("2D, DOM, Canvas, Color, Text")
.textFont({ size: '20px', weight: 'bold' })
.textColor('white')
.attr({ x: 600, y: 450})
.color('#1A1A1A')
.text("Score: " + score);

/* Names
var names = Crafty.e("2D, DOM, Canvas, Text")
.textFont({ size: '10px', weight: 'bold' })
.textColor('white')
.attr({ x: 40, y: 490})
.text("Amritha Govindarajan, Tatiana Iovich, Mirya Nezvitskaya, Maaret Pyhäjärvi 2015 Halloween Game Hack Hackathon");*/

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
      .color('#1A1A1A')

var wallMiddle2 = Crafty.e('wallMiddle, 2D, Canvas, Color, wall')
      .attr({x: 60, y: 40, w: 10, h: 50})
      .color('#1A1A1A')

/*var wallMiddle3 = Crafty.e('wallMiddle, 2D, Canvas, Color, wall')
        .attr({x: 240, y: 100, w: 10, h: 50})
        .color('#1A1A1A')*/

var spikeWallRight = Crafty.e('spikeWallRight, 2D, Canvas, Color, Image, spikeWall')
      .attr({x: 730, y: 0, w: 10, h: 500})
      .image('img/1wall.png');

var spikeWallLeft = Crafty.e('spikeWallLeft, 2D, Canvas, Color, Image, spikeWall')
      .attr({x: 10, y: 0, w: 10, h: 500})
      .image('img/2wall.png');

var candy1 = Crafty.e('candy1, 2D, Canvas, Image, candy')
            .attr({x: 100, y: 270, w: 40, h: 40})
            .image('img/pink-candy2.png');

var candy2 = Crafty.e('candy2, 2D, Canvas, Image, candy')
            .attr({x: 670, y: 370, w: 20, h: 20})
            .image('img/candy_stick2.png');

var candy3 = Crafty.e('candy3, 2D, Canvas, Image, candy')
            .attr({x: 350, y: 100, w: 40, h: 40})
            .image('img/pink-candy.png');

var candy4 = Crafty.e('candy4, 2D, Canvas, Image, candy')
            .attr({x: 150, y: 120, w: 30, h: 30})
            .image('img/lollipops.png');

var candy5 = Crafty.e('candy5, 2D, Canvas, Image,candy')
            .attr({x: 660, y: 70, w: 20, h: 20})
            .image('img/candy_stick.png');

// Character Element moves Fourway
function createBoss(){
  var boss = Crafty.e('boss, 2D, DOM, Fourway, Collision, Image')
    .attr({x: 380, y: 220, w: 122, h: 100})
    .fourway(4)
    .image('img/witch.png');

    boss.addComponent("Collision")
    .bind('Moved', function(from) {
      if(this.hit('wall')) {
         this.attr({x: from.x, y:from.y});
      }
    });

    boss.checkHits('spikeWall') // check for collisions with entities that have the Solid component in each frame
    .bind("HitOn", function(hitData) {

       if (hitData[0].obj.__c.spikeWall) {
         score = scoreCalculation(10);
       }

       scoreBox.text("Score: " + score);
    });

    boss.checkHits('candy')
    .bind("HitOn", function(hitData) {

       if (hitData[0].obj.__c.candy) {
         score = scoreCalculation(-1);
       }
       scoreBox.text("Score: " + score + "  ");
    });

}
function scoreCalculation(example){
  return score = score + example;
}
