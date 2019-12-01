var jimmyJimmy;
var chao;
var itemTocandoChao;
var colisao;
var timer;
var defaultDefeatTime = 13;
var defeatTime = defaultDefeatTime;
var gameOverScreen;
var gameOverContinue;
var gameOverExit;
var backgroundIt;
var backgroundRedDead;
var rightSprite;
var rightJumpSprite;
var leftSprite;
var leftJumpSprite;
var playerSpeed = 150;
var itemHeight = 0;

class JimmyJimmy extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  preload () {
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
    // this.load.audio('musica1', 'media/audio/musica_jimmy.mp3');
    // this.load.audio('musica2', 'media/audio/musica_jason.mp3');
    // this.load.audio('musica3', 'media/audio/musica_indiana.mp3');
    // this.load.audio('musica4', 'media/audio/musica_it.mp3');
    // this.load.audio('musica5', 'media/audio/musica_starwars.mp3');
    // this.load.audio('musica6', 'media/audio/musica_reddead.mp3');
    //Carrega sprites do Game Over
    this.load.image('gameover', 'media/sprites/background/007_GameOver_background.jpg');
    this.load.image('continue', 'media/sprites/menu/001_gameover_continuar.png');
    this.load.image('exit', 'media/sprites/menu/001_gameover_sair.png');
  }

  create () {
    //Adiciona a imagem de fundo
    fundo = this.add.image(300, 240, 'fundo1');
    fundo.setScale(1);

    //Adiciona fundo It
    backgroundIt = this.add.sprite(300, 240, 'fundo4');
    this.anims.create({
      key: 'fundoIt',
      frames: this.anims.generateFrameNumbers('fundo4', {
        star: 0,
        end: 13
      }),
      frameRate: 6,
      repeat: -1
    });
    backgroundIt.play('fundoIt');
    backgroundIt.setVisible(false);

    //Adiciona fundo Red Dead
    backgroundRedDead = this.add.sprite(300, 240, 'fundo6');
    this.anims.create({
      key: 'fundoRedDead',
      frames: this.anims.generateFrameNumbers('fundo6', {
        star: 0,
        end: 22
      }),
      frameRate: 6,
      repeat: -1
    });
    backgroundRedDead.play('fundoRedDead');
    backgroundRedDead.setVisible(false);

    //Adiciona o chão
    chao = this.physics.add.staticGroup();
    flr = chao.create(300, 410, 'chao1');
    flr.refreshBody();

    //Adiciona jogador
    jimmyJimmy = this.physics.add.sprite(100, 150, 'jimmy1');
    jimmyJimmy.setScale(1);
    jimmyJimmy.setBounce(0);
    jimmyJimmy.setCollideWorldBounds(true);
    this.physics.add.collider(jimmyJimmy, chao);
    jimmyJimmy.body.setGravityY(700);
    rightSprite = 'jimmy1';
    rightJumpSprite = 'jimmy2';
    leftSprite = 'jimmy3';
    leftJumpSprite = 'jimmy4';

    //Adiciona sons
    somDePulo = this.sound.add('sompulo');
    somDoItem = this.sound.add('somitem');
    // musica1 = this.sound.add('musica1');
    // musica1.play({
    //   loop: true
    // });
    // musica2 = this.sound.add('musica2');
    // musica3 = this.sound.add('musica3');
    // musica4 = this.sound.add('musica4');

    //Adiciona eventos de teclado
    move = this.input.keyboard.createCursorKeys();

    //Adiciona coletável
    items = this.physics.add.sprite(300, 150, 'item1');
    items.setScale(0.5);
    items.setCollideWorldBounds(true);
    items.setBounceY(0.15);
    itemTocandoChao = this.physics.add.collider(items, chao);
    colisao = this.physics.add.overlap(jimmyJimmy, items, coletaItem, null, this);

    //Adiciona Pontuação
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '24px', fill: '#FFF' });

    //Adiciona Temporizador
    textoTimer = this.add.text(16, 36, 'Derrota em: ', { fontSize: '24px', fill: '#FFF' });
    timer = this.time.addEvent({
      delay: 1000,
      callback: onTick,
      callbackScope: this,
      loop: true
    });

    //Adiciona background de Game Over
    gameOverScreen = this.add.image(300, 240, 'gameover');
    gameOverScreen.setVisible(false);
    //Adiciona Botão "Sair"
    gameOverExit = this.add.image(300, 350, 'exit');
    gameOverExit.setVisible(false);
    //Adiciona Botão "Continuar"
    gameOverContinue = this.add.image(300, 300, 'continue');
    gameOverContinue.setVisible(false);
    gameOverContinue.setInteractive();
    gameOverContinue.on('pointerdown', ()=>{
      reset();
      this.scene.start('playGame');
    })
  }

  update () {
    //Movimenta personagem
    if (move.left.isDown) {
      jimmyJimmy.setVelocityX(-playerSpeed);
      jimmyJimmy.setTexture(leftJumpSprite);
    } else if (move.right.isDown) {
      jimmyJimmy.setVelocityX(playerSpeed);
      jimmyJimmy.setTexture(rightJumpSprite);
    }

    //Pulo do Personagem
    if (jimmyJimmy.body.touching.down) {
      jimmyJimmy.setVelocityY(-500);
      somDePulo.play();
    }

    //Sprites do personagem
    if (jimmyJimmy.velocityX < 0) {
      jimmyJimmy.setTexture(leftJumpSprite);
    }
    if (jimmyJimmy.velocityX > 0) {
      jimmyJimmy.setTexture(rightJumpSprite);
    }

    //Temporizador
    textoTimer.setText('Derrota em: ' + defeatTime);

    //Muda filme
    if (score == 5) {
      fundo.setTexture('fundo2');
      flr.setTexture('chao2');
      items.setTexture('item2');
      rightJumpSprite = 'jason2';
      leftJumpSprite = 'jason4';
      playerSpeed = 200;
      itemHeight = 100;
      defaultDefeatTime = 10;
      // if(musica1.isPlaying) {
        // musica1.stop();
      // }
      // if(!musica2.isPlaying) {
        // musica2.play({
          // loop: true
        // });
      // }
    }
    if (score == 10) {
      fundo.setTexture('fundo3');
      flr.setTexture('chao3');
      items.setTexture('item3');
      rightJumpSprite = 'indi2';
      leftJumpSprite = 'indi4';
      playerSpeed = 250;
      itemHeight = 150;
      defaultDefeatTime = 8;
      // if(musica2.isPlaying) {
        // musica2.stop();
      // }
      // if(!musica3.isPlaying) {
        // musica3.play({
          // loop: true
        // });
      // }
    }
    if (score == 15) {
      backgroundIt.setVisible(true);
      flr.setTexture('chao4');
      items.setTexture('item4');
      rightJumpSprite = 'it2';
      leftJumpSprite = 'it4';
      playerSpeed = 300;
      itemHeight = 200;
      defaultDefeatTime = 6;
      // if(musica3.isPlaying) {
        // musica3.stop();
      // }
      // if(!musica4.isPlaying) {
        // musica4.play({
      //     loop: true
      //   });
      // }
    }
    if (score == 20) {
      backgroundIt.setVisible(false);
      fundo.setTexture('fundo5');
      flr.setTexture('chao5');
      items.setTexture('item5');
      rightJumpSprite = 'darth2';
      leftJumpSprite = 'darth4';
      playerSpeed = 350;
      itemHeight = 250;
      defaultDefeatTime = 4;
      // if(musica4.isPlaying) {
        // musica4.stop();
      // }
      // if(!musica5.isPlaying) {
        // musica5.play({
      //     loop: true
      //   });
      // }
    }
    if (score == 25) {
      backgroundRedDead.setVisible(true);
      flr.setTexture('chao6');
      items.setTexture('item6');
      rightJumpSprite = 'red2';
      leftJumpSprite = 'red4';
      playerSpeed = 450;
      itemHeight = 300;
      defaultDefeatTime = 3;
      // if(musica5.isPlaying) {
        // musica5.stop();
      // }
      // if(!musica6.isPlaying) {
        // musica6.play({
      //     loop: true
      //   });
      // }
    }
  }
}

function coletaItem (player, item) {
  score += 1;
  scoreText.setText('Score: ' + score);
  somDoItem.play();
  defeatTime = defaultDefeatTime;
  if (colisao) {
      var x = (jimmyJimmy.x < 300) ? Phaser.Math.Between(300, 600) : Phaser.Math.Between(0, 300);
      items.setX(x);
      items.setY(itemHeight);
  }
}

function onTick () {
  defeatTime--;
  if (defeatTime == 0) {
    fundo.destroy();
    flr.destroy();
    items.destroy();
    timer.remove(false);
    gameOverScreen.setVisible(true);
    gameOverContinue.setVisible(true);
    gameOverExit.setVisible(true);
  }
}

function reset () {
  defeatTime = defaultDefeatTime;
  playerSpeed = 150;
  jimmyJimmy.x = 100;
  jimmyJimmy.y = 150;
}
