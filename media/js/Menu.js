var jimmyFall;
var jimmyYSpeed = -0.3;
var jimmyXSpeed = -0.1;
var playButton;
var menuMusic;

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
      //Carrega Fundo
      this.load.image('fundo1', 'media/sprites/background/001_Jimmy_background.jpg');
      this.load.image('fundo2', 'media/sprites/background/002_Jason_background.jpg');
      this.load.image('fundo3', 'media/sprites/background/003_Indiana_background.jpg');
      this.load.image('fundo5', 'media/sprites/background/005_StarWars_background.jpg');
      this.load.spritesheet('fundo4', 'media/sprites/background/004_It_background.png', {
        frameWidth: 600,
        frameHeight: 480
      });
      this.load.spritesheet('fundo6', 'media/sprites/background/006_RedDead_background.png', {
        frameWidth: 600,
        frameHeight: 480
      });
      //Carrega Chão
      this.load.image('chao1', 'media/sprites/floor/001_Jimmy_floor.jpg');
      this.load.image('chao2', 'media/sprites/floor/002_Jason_floor.jpg');
      this.load.image('chao3', 'media/sprites/floor/003_Indiana_floor.jpg');
      this.load.image('chao4', 'media/sprites/floor/004_It_floor.jpg');
      this.load.image('chao5', 'media/sprites/floor/005_StarWars_floor.jpg');
      this.load.image('chao6', 'media/sprites/floor/006_RedDead_floor.jpg');
      //Carrega Personagem
      //Jimmy
      this.load.image('jimmy1', 'media/sprites/character/001_jimmy_direita.png');
      this.load.image('jimmy2', 'media/sprites/character/001_jimmy_direita_pulo.png');
      this.load.image('jimmy3', 'media/sprites/character/001_jimmy_esquerda.png');
      this.load.image('jimmy4', 'media/sprites/character/001_jimmy_esquerda_pulo.png');
      //Jason
      this.load.image('jason1', 'media/sprites/character/002_jason_direita.png');
      this.load.image('jason2', 'media/sprites/character/002_jason_direita_pulo.png');
      this.load.image('jason3', 'media/sprites/character/002_jason_esquerda.png');
      this.load.image('jason4', 'media/sprites/character/002_jason_esquerda_pulo.png');
      //Indiana Jones
      this.load.image('indi1', 'media/sprites/character/003_indiana_direita.png');
      this.load.image('indi2', 'media/sprites/character/003_indiana_direita_pulo.png');
      this.load.image('indi3', 'media/sprites/character/003_indiana_esquerda.png');
      this.load.image('indi4', 'media/sprites/character/003_indiana_esquerda_pulo.png');
      //It
      this.load.image('it1', 'media/sprites/character/004_it_direita.png');
      this.load.image('it2', 'media/sprites/character/004_it_direita_pulo.png');
      this.load.image('it3', 'media/sprites/character/004_it_esquerda.png');
      this.load.image('it4', 'media/sprites/character/004_it_esquerda_pulo.png');
      //Darth Vader
      this.load.image('darth1', 'media/sprites/character/005_darthvader_direita.png');
      this.load.image('darth2', 'media/sprites/character/005_darthvader_direita_pulo.png');
      this.load.image('darth3', 'media/sprites/character/005_darthvader_esquerda.png');
      this.load.image('darth4', 'media/sprites/character/005_darthvader_esquerda_pulo.png');
      //Red Dead
      this.load.image('red1', 'media/sprites/character/006_reddead_direita.png');
      this.load.image('red2', 'media/sprites/character/006_reddead_direita_pulo.png');
      this.load.image('red3', 'media/sprites/character/006_reddead_esquerda.png');
      this.load.image('red4', 'media/sprites/character/006_reddead_esquerda_pulo.png');

      //Carrega Item
      this.load.image('item1', 'media/sprites/item/001_jimmy_item.png');
      this.load.image('item2', 'media/sprites/item/002_jason_item.png');
      this.load.image('item3', 'media/sprites/item/003_indiana_item.png');
      this.load.image('item4', 'media/sprites/item/004_it_item.png');
      this.load.image('item5', 'media/sprites/item/005_darthvader_item.png');
      this.load.image('item6', 'media/sprites/item/006_reddead_item.png');
      //Carrega Sons
      this.load.audio('sompulo', 'media/audio/som_pulo.mp3');
      this.load.audio('somitem', 'media/audio/som_item.mp3');
      //Carrega Músicas
      this.load.audio('musica1', 'media/audio/musica_jimmy.mp3');
      this.load.audio('musica2', 'media/audio/musica_jason.mp3');
      this.load.audio('musica3', 'media/audio/musica_indiana.mp3');
      this.load.audio('musica4', 'media/audio/musica_it.mp3');
      this.load.audio('musica5', 'media/audio/musica_starwars.mp3');
      this.load.audio('musica6', 'media/audio/musica_reddead.mp3');
      //Carrega sprites do Game Over
      this.load.image('gameover', 'media/sprites/background/007_GameOver_background.jpg');
      this.load.image('continue', 'media/sprites/menu/001_gameover_continuar.png');
      this.load.image('exit', 'media/sprites/menu/001_gameover_sair.png');
      this.load.audio('musica7', 'media/audio/musica_gameover.mp3');
  }

  create() {
    this.background = this.add.tileSprite(300, 240, config.width, config.height, 'backgroundClouds');
    this.add.image(170, 110, 'jimmyLogo').setScale(.35);
    this.add.image(300, 460, 'aspas').setScale(0.5);
    playButton = this.add.image(165, 300, 'jogar');
    playButton.setInteractive();

    playButton.on('pointerdown', ()=>{
      this.scene.start('playGame');
      menuMusic.stop();
    })
    jimmyFall = this.add.sprite(450, 240, 'jimmy');
    this.anims.create({
      key: 'jimmyFalling',
      frames: this.anims.generateFrameNumbers('jimmy'),
      frameRate: 6,
      repeat: -1
    });
    jimmyFall.play('jimmyFalling');

    menuMusic = this.sound.add('trilha');
    menuMusic.play({
     loop: true
   });
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
