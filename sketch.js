var ufoGroup,bulletGroup 
var score = 0 


function preload()
{
bgImg = loadImage("space.jpeg")
rocketImg = loadImage("rocket1.png")
ufoImg = loadAnimation("ufo .png")
asteroidImg = loadImage("asteroid.png")
bulletImg = loadImage("bullet.png")
blastImg = loadAnimation("blast.png")
}


function setup() {
  createCanvas(700,800);
  bg = createSprite (0,0,800,400)
 bg.addImage (bgImg) 
 bg.scale =2
 bg.velocityY = 2
 //rocket
 rocket = createSprite (350,700,10,10)
 rocket.addImage (rocketImg)
 rocket.scale = 0.2
 edges = createEdgeSprites()
 //ufo group
ufoGroup = new Group()
//bullet group
bulletGroup = new Group()
//asteroid group
asteroidGroup = new Group ()

}

function draw() {
  background("black");
  textSize (20)
  fill ("white")  
  text("score="+ score,600,50)
  
  if (bg.y > 700)
  {
  bg.y = height / 2
  }

  if(keyDown(RIGHT_ARROW))
{
rocket.x = rocket.x + 4
}

if (keyDown(LEFT_ARROW))
{
rocket.x = rocket.x - 4
}

if (keyDown(UP_ARROW))
{
  rocket.y = rocket.y - 4
}

if (keyDown(DOWN_ARROW))
{
rocket.y = rocket.y + 4
}
// restricting the movement of the rocket

if(rocket.y <= 500 )
{
rocket.y = 500
}
rocket.collide(edges)
  spawnufo()

 if(keyDown("space"))
 {
  shootbullets ()

 } 
 spawnasteroid()


bulletGroup.collide(ufoGroup,destroyufo)
asteroidGroup.collide(rocket,destroyRocket)



  drawSprites();


}

function spawnufo ()
{
if(frameCount%100===0)
{
ufo = createSprite(200,-50,10,10)
ufo.addAnimation("ufo",ufoImg)
ufo.addAnimation("blast",blastImg)
ufo.scale = 0.1
ufo.velocityY = 3
ufo.x = Math.round (random(50,650))
ufoGroup.add(ufo)
ufo.lifetime = 350

}
}

function spawnasteroid ()
{
if(frameCount%200===0 ) 
{
  asteroid = createSprite(-50,-50,10,10)
  asteroid.addImage(asteroidImg)
  asteroid.scale = 0.1
  asteroid.velocityY = 5
  asteroid.velocityX = 3
  asteroid.y = Math.round (random(0,250))
  asteroid.lifetime = 200
  asteroidGroup.add (asteroid)
  asteroid.debug = true
}
}

function shootbullets ()
{
  bullet = createSprite(300,700,10,10)
  bullet.addImage(bulletImg)
  bullet.velocityY = -2
  bullet.scale = 0.5
  bullet.x = rocket.x + 55
  bullet.y = rocket.y + 50
  bullet.depth = rocket.depth
  rocket.depth = bullet.depth + 1
  bulletGroup.add(bullet)
  bullet.setCollider("circle",-120,-90,20)
  bullet.lifetime = 350
}

function destroyufo(bullet,ufo)
{
ufo.changeAnimation("blast",blastImg)
bullet.destroy()
//ufo.destroy ()
ufo.lifetime = 10
}

function destroyRocket (asteroid,rocket)
{
asteroid.destroy()
rocket.destroy()

}
