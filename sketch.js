const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,world;
var ground;
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var particle;
var turn = 0;
var score = 0;
var gameState = "play";

function setup() {
  createCanvas(500,750);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(240,748,490,10);
  World.add(world,ground);
  
  for(var a = 0; a <= width; a = a + 80 ){
    divisions.push(new Division( a, height - divisionHeight/2, 10, divisionHeight));
 }

 for(var b = 75; b <= width; b = b + 50){
   plinkos.push(new Plinko(b,75));
 }

 for(var b = 50; b <= width - 10; b = b + 50){
  plinkos.push(new Plinko(b,175));
}

for(var b = 75; b <= width; b = b + 50){
  plinkos.push(new Plinko(b,275));
}

for(var b = 50; b <= width - 10; b = b + 50){
  plinkos.push(new Plinko(b,375));
}

}

function draw() {
  background(0);  

  Engine.update(engine);
  
  ground.display();

  text(mouseX +","+mouseY, mouseX, mouseY);

  for(var b = 0; b < plinkos.length; b++){
    plinkos[b].display();
  }

  for(var a = 0; a < divisions.length; a++){
    divisions[a].display();
  }
  
  text("Score"+score,450,10);

  if(particle!=null){
    particle.display();

    if(particle.body.position.y > 420){
      
      if(particle.body.position.x < 250 ){
        score= score + 100;
        particle =null;
        if(turn > 5){
          gameState = "end"
        }
      }

      else if(particle.body.position.x > 250){
        score = score + 200;
        particle = null;
        if(turn > 5){
          gameState = "end"
        }
      }

    }
  }

  drawSprites();

}

function mousePressed(){
  if(gameState!=="end"){
    particle = new Particle(mouseX,10,10,10);
    turn = turn +1;
  }
}