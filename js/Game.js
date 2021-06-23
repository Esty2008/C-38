class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    
    car1 = createSprite(300,1200);
    car2 = createSprite(600,1200);
    car3 = createSprite(900,1200);
    car4 = createSprite(1200,1200);

    //In index the number would be one less
    cars.push(car1, car2, car3, car4);
  }

  play()
  {
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    var x=0;
    var y;
    var index=0;

    if(allPlayers !== undefined)
    {
      var display_position = 130;
      for(var plr in allPlayers)
      {
        if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

          index=index+1;

        /*player1 = 0+300
          player2 = 300+300
          player3 = 600+300
          player4 = 900+300
          */
        x=x+300

        //Y position is changing acording to the players distance
        y=displayHeight - allPlayers[plr].distance;

        cars[index-1].x=x
        cars[index-1].y=y

        if(index === player.index)
        {

          cars[index-1].shapeColor='red'

          camera.position.x = displayWidth/2
          camera.position.y = cars[index-1].y
        }

        console.log(cars[index-1])
        //display_position+=20;
        // textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
      
    }

    if(keyIsDown(UP_ARROW) && player.index !== null)
    {
      player.distance +=50
      player.update();
    }
    drawSprites();
  }
}

