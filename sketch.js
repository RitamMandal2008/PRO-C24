var grid = 50;
var width = 1366;
var carGroup1,logGroup1;
var grassHeight = 100;
var carAnimation1, carAnimation2, logAnimation, playerAnimation;
var school, city, cityAnimation;
var gameWin = false;
function preload()
{
  carAnimation1=loadAnimation("car1.png");
  carAnimation2=loadAnimation("car2.png");
  playerAnimation=loadAnimation("Player-03.png");
  logAnimation=loadAnimation("log2.png");
  cityAnimation = loadAnimation("city1.png");
}

function setup() {
  createCanvas(1366,700);
  carGroup1 = new Group();
  logGroup1 = new Group();
  city = createSprite(width/2, -1650);
  city.addAnimation("uyjr", cityAnimation);

  //Grasses where player can rest
  for(var i=0;i<6;i++){
    var bottomGrass1 = createSprite(683,height-50-(i*400),width,grassHeight);
    if(i%2===0)//adding road
    {
     var road= createSprite(683,height-150-(i*400)-grassHeight,width,300,)
      road.shapeColor="black";
    }
    bottomGrass1.shapeColor = "green";
  }
  //To create rows of car
   for(var i = 0; i < 40; i++){
     cars = new Car(2);
     carGroup1.add(cars.spt);
     var rand = random([1,2]);
     if(rand == 1){cars.spt.addAnimation("car1", carAnimation1)}
     if(rand == 2){cars.spt.addAnimation("car2", carAnimation2)}
   }
  //To create rows of Logs
    for(var i = 0; i < 40; i++){
      log = new Log(-3);
      logGroup1.add(log.spt);
    }

   //create player
   player = new Player(width/2,height-75);
   player.spt.addAnimation("player", playerAnimation);
 }

function draw() {
  background("skyblue");
  //move the screen to location of player.
  translate(0,-player.spt.y+height-150);

  if(gameWin == false){

    //Making the cars re-apper
   for(i=1;i<carGroup1.length;i++) {
     if(carGroup1[i].x>width)
      {
       carGroup1[i].x=0;
      }
     if(carGroup1[i].x<0)
     {
       carGroup1[i].x=width;
     }
    }

    //making the logs re-apper
    for(i=1;i<logGroup1.length;i++){
      if(logGroup1[i].x<0)
      {
       logGroup1[i].x=width;
      }
    }

    //to make the player go to the starting position if he will touch car
    if(carGroup1.isTouching(player.spt)){
      player.spt.x = width/2;
      player.spt.y = height-75;
    } 

    //to make the player float on the logs and if he will touch the river then he will again start 
    if(logGroup1.isTouching(player.spt)){  
      player.spt.x= player.spt.x-3;
    }
    else if((player.spt.y > height-1550 && player.spt.y < height-1300) ||
        (player.spt.y < height-500 && player.spt.y > height-850)|| 
        (player.spt.y>height)||
        (player.spt.x<0)||
        (player.spt.x>width)){

          player.spt.x = width/2;
          player.spt.y = height-75;
    }
  }
 

  if(city.isTouching(player.spt)){
    gameWin = true;
  }
  
  if(gameWin == true){
    logGroup1.destroyEach();
    carGroup1.destroyEach();
  }

  drawSprites();
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    player.move(0,-2);
  }else if(keyCode == DOWN_ARROW){
    player.move(0,2);
  }else if(keyCode == LEFT_ARROW){
    player.move(-2,0);
  }else if(keyCode == RIGHT_ARROW){
    player.move(2,0);
  }
}
