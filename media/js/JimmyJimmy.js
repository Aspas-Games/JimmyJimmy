class JimmyJimmy extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  preload () {
    //Carrega Fundo
    this.load.image('fundo1', 'media/sprites/background/001_MonsterNess_background.jpg');
    this.load.image('fundo2', 'media/sprites/background/002_Friday13_background.jpg');
    this.load.image('fundo3', 'media/sprites/background/003_RedDead_background.jpg');
    this.load.image('fundo4', 'media/sprites/background/004_IT_background.png');
    //Carrega Chão
    this.load.image('chao1', 'media/sprites/floor/001_MonsterNess_floor.jpg');
    this.load.image('chao2', 'media/sprites/floor/002_Friday13_floor.jpg');
    this.load.image('chao3', 'media/sprites/floor/003_RedDead_floor.jpg');
    this.load.image('chao4', 'media/sprites/floor/004_IT_floor.png');
    //Carrega Personagem
    this.load.image('jimmy1', 'media/sprites/character/001_MonsterNess_ness.png');
    this.load.image('jimmy2', 'media/sprites/character/002_Jeizu.png');
    this.load.image('jimmy3', 'media/sprites/character/003_Jimmy.png');
    this.load.image('jimmy4', 'media/sprites/character/004_Pennywise.png');
    //Carrega Item
    this.load.image('item1', 'media/sprites/item/001_MonsterNess_Item.png');
    this.load.image('item2', 'media/sprites/item/002_Friday13_Item.png');
    this.load.image('item3', 'media/sprites/item/003_RedDead_Item.png');
    this.load.image('item4', 'media/sprites/item/004_IT_Item.png');
    //Carrega Sons
    this.load.audio('sompulo', 'media/audio/som_pulo.mp3');
    this.load.audio('somitem', 'media/audio/som_item.mp3');
    //Carrega Músicas
    this.load.audio('musica1', 'media/audio/musica_lagoness.mp3');
    this.load.audio('musica2', 'media/audio/musica_jason.mp3');
    this.load.audio('musica3', 'media/audio/musica_redead.mp3');
    this.load.audio('musica4', 'media/audio/musica_it.mp3');
  }

  create () {
    //Adiciona a imagem de fundo
    fundo = this.add.image(320, 175, 'fundo1');
    fundo.setScale(0.5);

    //Adiciona o chão
    chao = this.physics.add.staticGroup();
    flr = chao.create(320, 410, 'chao1');
    // flr.scaleX = 3;
    flr.refreshBody();

    //Adiciona jogador
    jimmyJimmy = this.physics.add.sprite(100, 150, 'jimmy1');
    jimmyJimmy.setScale(0.5);

    jimmyJimmy.setBounce(0);
    jimmyJimmy.setCollideWorldBounds(true);

    this.physics.add.collider(jimmyJimmy, chao);

    jimmyJimmy.body.setGravityY(700);

    //Adiciona sons
    somDePulo = this.sound.add('sompulo');
    somDoItem = this.sound.add('somitem');
    musica1 = this.sound.add('musica1');
    musica1.play();
    musica2 = this.sound.add('musica2');
    musica3 = this.sound.add('musica3');
    musica4 = this.sound.add('musica4');

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
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '16px', fill: '#FFF' });

    //Adiciona Temporizador
    textoTimer = this.add.text(16, 36, 'Tempo: 0', { fontSize: '16px', fill: '#FFF' });

    timerEvents.push(this.time.addEvent({
      delay: 6000,
      loop: true
    }));

    hsv = Phaser.Display.Color.HSVColorWheel();
    graphics = this.add.graphics({ x: 240, y: 36});
  }

  update () {
    //Movimenta personagem
    if (move.left.isDown) {
      jimmyJimmy.setVelocityX(-300);
    } else if (move.right.isDown) {
      jimmyJimmy.setVelocityX(300);
    }

    //Pulo do Personagem
    if (jimmyJimmy.body.touching.down) {
      jimmyJimmy.setVelocityY(-500);
      somDePulo.play();
    }

    //Temporizador
    var output = [];

    graphics.clear();

    for (var i = 0; i < timerEvents.length; i++) {
      output.push('Tempo: ' + timerEvents[i].getProgress().toString().substr(0, 3));

      graphics.fillStyle(hsv[i * 8].color, 1);
      graphics.fillRect(0, i*16, 300*timerEvents[i].getProgress(), 8);
    }
    textoTimer.setText(output);

    //Muda filme
    if (score >= 5) {
      fundo.setTexture('fundo2');
      jimmyJimmy.setTexture('jimmy2');
      flr.setTexture('chao2');
      items.setTexture('item2');
      if(musica1.isPlaying) {
        musica1.stop();
      }
      if(!musica2.isPlaying) {
        musica2.play();
      }
      if (score >= 10) {
        fundo.setTexture('fundo3');
        jimmyJimmy.setTexture('jimmy3');
        flr.setTexture('chao3');
        items.setTexture('item3');
        if(musica2.isPlaying) {
          musica2.stop();
        }
        if(!musica3.isPlaying) {
          musica3.play();
        }
        if (score >= 15) {
          fundo.setTexture('fundo4');
          jimmyJimmy.setTexture('jimmy4');
          flr.setTexture('chao4');
          items.setTexture('item4');
          if(musica3.isPlaying) {
            musica3.stop();
          }
          if(!musica4.isPlaying) {
            musica4.play();
          }
        }
      }
    }
  }

}

function coletaItem (player, item) {
  score += 1;
  scoreText.setText('Score: ' + score);
  somDoItem.play();

  if (colisao) {
      var x = (jimmyJimmy.x < 300) ? Phaser.Math.Between(300, 600) : Phaser.Math.Between(0, 300);

      items.setX(x);
      items.setY(0);
  }
}
