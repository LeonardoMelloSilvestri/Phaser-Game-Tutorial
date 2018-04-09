(function(){
	var game = new Phaser.Game(800,600,Phaser.AUTO,null,{preload:preload,create:create,update:update});
	var platforms, player, keys, stars, txtScore, score = 0;

	//Carrega recursos do jogo, como imagens e sons.
	function preload(){
		game.load.image('imgSky','img/sky.png');
		game.load.image('imgPlatform', 'img/platform.png');
		game.load.image('imgStar', 'img/star.png');
		game.load.spritesheet('imgPlayer', 'img/dude.png', 32, 46);
	}

	//Os elementos carregados em preload serão criados.
	function create(){
		keys = game.input.keyboard.createCursorKeys();
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'imgSky');

		platforms = game.add.group();
		platforms.enableBody = true;


		var platform = platforms.create(0, game.world.height - 64, 'imgPlatform');
			platform.scale.setTo(2, 2);
			platform.body.immovable = true;
			platform = platforms.create(400, 400, 'imgPlatform');
			platform.body.immovable = true;
			platform = platforms.create(-150, 250, 'imgPlatform');
			platform.body.immovable = true;

		stars = game.add.group();
		stars.enableBody = true;

		for (var i = 0; i < 26; i++) {
			var star = stars.create(i * 30 + 10, 10, 'imgStar');
				game.physics.arcade.enable(star);
				star.body.gravity.y = 300;
				star.body.bounce.y = 0.5 + (Math.random()*0.2);
				star.body.collideWorldBounds = true;
		}

		player = game.add.sprite(game.world.width / 2 - 16, game.world.height - 150, 'imgPlayer');
		game.physics.arcade.enable(player);	
		player.body.gravity.y = 300;

		player.body.bounce.y = 0.1;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);

		txtScore = game.add.text(10, 10, "Score: " + score);
	}

	//Acontece toda a lógica do jogo, como movimentos e colisões.
	function update(){
		game.physics.arcade.collide(player, platforms);
		game.physics.arcade.collide(stars, platforms);
		game.physics.arcade.overlap(player, stars, collectStars);

		player.body.velocity.x = 0;
		if (keys.left.isDown) {
			player.body.velocity.x = -150;
			player.animations.play('left');
		} else if (keys.right.isDown) {
			player.body.velocity.x = 150;
			player.animations.play('right');
		} else {
			player.animations.stop();
			player.frame = 4;
		}
		if (keys.up.isDown && player.body.touching.down == true) {
			player.body.velocity.y = -300;
		}
	}

	function collectStars(player, star) {
		star.kill();
		score++;
		txtScore.text = "Score: " + score;
	}

}());