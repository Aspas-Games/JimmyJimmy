var speedBackgroundX = 1.3;
var jimmyFall;

class Menu extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
      //Carrega imagens
      this.load.image('backgroundClouds', 'media/sprites/Menu/000_menu_background.png');
      this.load.image('jimmyLogo', 'media/sprites/Menu/000_menu_logo.png');
      this.load.image('jogar', 'media/sprites/Menu/000_menu_jogar.png');
      this.load.image('aspas', 'media/sprites/Menu/000_menu_aspas.png');
      this.load.spritesheet('jimmy', 'media/sprites/Menu/000_menu_jimmy.png',{
        frameWidth: 26,
        frameHeight: 30
      });
      //Carrega trilha
      this.load.audio('trilha', 'media/audio/musica_inicio.mp3');
  }

  create() {
    this.background = this.add.tileSprite(300, 240, config.width, config.height, 'backgroundClouds');
    this.add.image(170, 110, 'jimmyLogo').setScale(.35);
    this.add.image(300, 460, 'aspas').setScale(0.5);
    jimmyFall = this.add.sprite(450, 240, 'jimmy');
    this.anims.create({
      key: 'jimmyFalling',
      frames: this.anims.generateFrameNumbers('jimmy'),
      frameRate: 6,
      repeat: -1
    });
    jimmyFall.play('jimmyFalling');

    this.sound.play('trilha', {
      loop: true
    })
  }

  update() {
    this.background.tilePositionY += 8.5;
    this.background.tilePositionX += speedBackgroundX;
    if (this.background.tilePositionX >= 200 || this.background.tilePositionX <= -200) {
      speedBackgroundX *= -1
    }
  }
}
