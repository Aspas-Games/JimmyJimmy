var jimmyJimmy;
var chao;
var itemTocandoChao;
var colisao;
var timer;
var initialDefeatTime = 10;
var maxDefeatTime = initialDefeatTime;
var defeatTime = maxDefeatTime;
var gameOverScreen;
var gameOverContinue;
var gameOverExit;
var finalScore;
var backgroundIt;
var backgroundRedDead;
var rightSprite;
var rightJumpSprite;
var leftSprite;
var leftJumpSprite;
var direction = 0;
var playerSpeed = 150;
var itemHeight = 0;
var keys;

class JimmyJimmy extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  preload () {

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
    musicas = {
      m1: 'musica1',
      m2: 'musica2',
      m3: 'musica3',
      m4: 'musica4',
      m5: 'musica5',
      m6: 'musica6'
    };
    musicaAtual = this.sound.add(musicas.m1);
    musicaAtual.play({
      loop: true
    });

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
    scoreText = this.add.text(16, 16, 'Score: 0', {
      fontFamily: 'Roboto Condensed',
      fontSize: '24px',
      fill: '#FFF',
      backgroundColor: 'rgba(0, 0, 0, .35)'
    });
    scoreText.updateText();

    //Adiciona Temporizador
    textoTimer = this.add.text(16, 36, 'Derrota em: ', {
      fontFamily: 'Roboto Condensed',
      fontSize: '24px',
      fill: '#FFF',
      backgroundColor: 'rgba(0, 0, 0, .35)'
    });
    textoTimer.updateText();
    timer = this.time.addEvent({
      delay: 500,
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
    gameOverExit.setInteractive();
    gameOverExit.on('pointerdown', ()=>{
      musicaAtual.stop();
      this.scene.start('bootGame');
    });
    //Adiciona Botão "Continuar"
    gameOverContinue = this.add.image(300, 300, 'continue');
    gameOverContinue.setVisible(false);
    gameOverContinue.setInteractive();
    gameOverContinue.on('pointerdown', ()=>{
      reset();
      this.scene.start('playGame');
    })
    finalScore = this.add.text(255, 200, 'Score: ', {
      fontFamily: 'Roboto Condensed',
      fontSize: '30px',
      fill: '#FFF'
    });
    finalScore.setVisible(false);

    //Armazena keys em array
    keys = {
      //Cenário 2
      bGround2: 'fundo2',
      ground2: 'chao2',
      icon2: 'item2',
      rSprite2: 'jason1',
      rJSprite2: 'jason2',
      lSprite2: 'jason3',
      lJSprite2: 'jason4',
      pSpeed2: 200,
      iHeight2: 100,
      mDTime2: 8,
      //Cenário 3
      bGround3: 'fundo3',
      ground3: 'chao3',
      icon3: 'item3',
      rSprite3: 'indi1',
      rJSprite3: 'indi2',
      lSprite3: 'indi3',
      lJSprite3: 'indi4',
      pSpeed3: 250,
      iHeight3: 150,
      mDTime3: 6,
      //Cenário 4
      bGround4: '',
      ground4: 'chao4',
      icon4: 'item4',
      rSprite4: 'it1',
      rJSprite4: 'it2',
      lSprite4: 'it3',
      lJSprite4: 'it4',
      pSpeed4: 300,
      iHeight4: 200,
      mDTime4: 4,
      //Cenário 5
      bGround5: 'fundo5',
      ground5: 'chao5',
      icon5: 'item5',
      rSprite5: 'darth1',
      rJSprite5: 'darth2',
      lSprite5: 'darth3',
      lJSprite5: 'darth4',
      pSpeed5: 350,
      iHeight5: 250,
      mDTime5: 3,
      //Cenário 6
      bGround6: '',
      ground6: 'chao6',
      icon6: 'item6',
      rSprite6: 'red1',
      rJSprite6: 'red2',
      lSprite6: 'red3',
      lJSprite6: 'red4',
      pSpeed6: 450,
      iHeight6: 300,
      mDTime6: 2.5
    };
  }

  update () {
    //Movimenta personagem
    if (move.left.isDown) {
      jimmyJimmy.setVelocityX(-playerSpeed);
      direction = 1;
    } else if (move.right.isDown) {
      jimmyJimmy.setVelocityX(playerSpeed);
      direction = 0;
    }

    //Pulo do Personagem
    if (jimmyJimmy.body.touching.down) {
      jimmyJimmy.setVelocityY(-500);
      somDePulo.play();
    }

    //Animação do Personagem
    if (jimmyJimmy.y >= 261 && direction == 1) {
      jimmyJimmy.setTexture(leftSprite);
    }
    if (jimmyJimmy.y >= 261 && direction == 0) {
      jimmyJimmy.setTexture(rightSprite);
    }
    if (jimmyJimmy.y <= 260 && direction == 1) {
      jimmyJimmy.setTexture(leftJumpSprite);
    }
    if (jimmyJimmy.y <= 260 && direction == 0) {
      jimmyJimmy.setTexture(rightJumpSprite);
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
      changeScenary (keys.bGround2, keys.ground2, keys.icon2, keys.rSprite2, keys.rJSprite2, keys.lSprite2, keys.lJSprite2, keys.pSpeed2, keys.iHeight2, keys.mDTime2);
      musicaAtual.stop();
      musicaAtual.key = musicas.m2;
      musicaAtual.play({
        loop: true
      });
    }
    if (score == 10) {
      changeScenary (keys.bGround3, keys.ground3, keys.icon3, keys.rSprite3, keys.rJSprite3, keys.lSprite3, keys.lJSprite3, keys.pSpeed3, keys.iHeight3, keys.mDTime3);
      musicaAtual.stop();
      musicaAtual.key = musicas.m3;
      musicaAtual.play({
        loop: true
      });
    }
    if (score == 15) {
      backgroundIt.setVisible(true);
      changeScenary (keys.bGround4, keys.ground4, keys.icon4, keys.rSprite4, keys.rJSprite4, keys.lSprite4, keys.lJSprite4, keys.pSpeed4, keys.iHeight4, keys.mDTime4);
      musicaAtual.stop();
      musicaAtual.key = musicas.m4;
      musicaAtual.play({
        loop: true
      });
    }
    if (score == 20) {
      backgroundIt.setVisible(false);
      changeScenary (keys.bGround5, keys.ground5, keys.icon5, keys.rSprite5, keys.rJSprite5, keys.lSprite5, keys.lJSprite5, keys.pSpeed5, keys.iHeight5, keys.mDTime5);
      musicaAtual.stop();
      musicaAtual.key = musicas.m5;
      musicaAtual.play({
        loop: true
      });
    }
    if (score == 25) {
      backgroundRedDead.setVisible(true);
      changeScenary (keys.bGround6, keys.ground6, keys.icon6, keys.rSprite6, keys.rJSprite6, keys.lSprite6, keys.lJSprite6, keys.pSpeed6, keys.iHeight6, keys.mDTime6);
      musicaAtual.stop();
      musicaAtual.key = musicas.m6;
      musicaAtual.play({
        loop: true
      });
    }
  }
}

function coletaItem (player, item) {
  score += 1;
  scoreText.setText('Score: ' + score);
  somDoItem.play();
  defeatTime = maxDefeatTime;
  if (colisao) {
      var x = (jimmyJimmy.x < 300) ? Phaser.Math.Between(300, 600) : Phaser.Math.Between(0, 300);
      items.setX(x);
      items.setY(itemHeight);
  }
}

function onTick () {
  if (defeatTime > 0) {
    defeatTime = defeatTime - 0.5;
  }
  if (defeatTime == 0) {
    defeatTime = initialDefeatTime;
    fundo.destroy();
    flr.destroy();
    items.destroy();
    timer.remove(false);
    gameOverScreen.setVisible(true);
    gameOverContinue.setVisible(true);
    gameOverExit.setVisible(true);
    finalScore.setText('Score: ' + score);
    finalScore.setVisible(true);
    musicaAtual.stop();
  }
}

function changeScenary (bGround, ground, icon, rSprite, rJSprite, lSprite, lJSprite, pSpeed, iHeight, mDTime) {
  fundo.setTexture(bGround);
  flr.setTexture(ground);
  items.setTexture(icon);
  rightSprite = rSprite;
  rightJumpSprite = rJSprite;
  leftSprite = lSprite;
  leftJumpSprite = lJSprite;
  playerSpeed = pSpeed;
  itemHeight = iHeight;
  maxDefeatTime = mDTime;
}

function reset () {
  maxDefeatTime = initialDefeatTime;
  playerSpeed = 150;
  jimmyJimmy.x = 100;
  jimmyJimmy.y = 150;
  score = 0;
  musicaAtual.stop();
}
