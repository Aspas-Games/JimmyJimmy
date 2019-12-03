var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 480,
  // backgroundColor: 0x63b4cf,
  backgroundColor: 0x000000,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [Menu, JimmyJimmy],
  pixelArt: true
}

var score = 0;
var scoreText;
var timer;
var textoTimer;
var timerEvents = [];
var totalTempo = 0;
var graphics;
var hsv;
var fundo;
var flr;
var items;
var colisao;
var itemTocandoChao;
var somDePulo;
var somDoItem;
var move;
var musica1;
var musica2;
var musica3;
var musica4;
var musica5;
var musica6;
var musica7;
var buttonSound;

var game = new Phaser.Game(config);
