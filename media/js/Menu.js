var jimmyFall;
var jimmyYSpeed = -0.3;
var jimmyXSpeed = -0.1;
var playButton;

class Menu extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
      //Carrega imagens
      this.load.image('backgroundClouds', 'media/sprites/Menu/000_menu_background.png');
      this.load.image('jimmyLogo', 'media/sprites/Menu/000_menu_logo.png');
      this.load.image('jogar', 'media/sprites/Menu/000_menu_botao_jogar.png');
      this.load.image('aspas', 'media/sprites/Menu/000_menu_aspas.png');
      this.load.spritesheet('jimmy', 'media/sprites/Menu/000_menu_jimmy.png',{
        frameWidth: 180,
        frameHeight: 233
      });
      //Carrega trilha
      this.load.audio('trilha', 'media/audio/musica_inicio.mp3');
  }

  create() {
    this.background = this.add.tileSprite(300, 240, config.width, config.height, 'backgroundClouds');
    this.add.image(170, 110, 'jimmyLogo').setScale(.35);
    this.add.image(300, 460, 'aspas').setScale(0.5);
    playButton = this.add.image(165, 300, 'jogar');
    playButton.setInteractive();

    playButton.on('pointerdown', ()=>{
      this.scene.start('playGame');
    })
    jimmyFall = this.add.sprite(450, 240, 'jimmy');
    this.anims.create({
      key: 'jimmyFalling',
      frames: this.anims.generateFrameNumbers('jimmy'),
      frameRate: 6,
      repeat: -1
    });
    jimmyFall.play('jimmyFalling');

    // this.sound.play('trilha', {
    //   loop: true
    // })
  }

  update() {
    this.background.tilePositionY += 8.5;
    this.background.tilePositionX += 1.3;
    jimmyFall.y += jimmyYSpeed;
    jimmyFall.x += jimmyXSpeed;
    if (jimmyFall.y <= 220 || jimmyFall.y >= 260) {
      jimmyYSpeed *= -1;
    }
    if (jimmyFall.x <= 440 || jimmyFall.x >= 460) {
      jimmyXSpeed *= -1;
    }
  }
}
