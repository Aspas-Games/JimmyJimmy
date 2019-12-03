var config = {
  type: Phaser.AUTO,
  width: 600,
  height: 480,
  backgroundColor: 0x63b4cf,
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
var musicaAtual;
var musicas;

var game = new Phaser.Game(config);
