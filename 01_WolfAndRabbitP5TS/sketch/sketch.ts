let wolfImg: p5.Image
let rabbitImg: p5.Image
let backgroundImg: p5.Image
let fireImg: p5.Image

let size: number = 100

let wolf: Entity
let rabbit: Entity
let board: Board
let fire: Obstacle

class Obstacle {
  x: number
  y: number
  step: number
  width: number
  height: number
  img: p5.Image

  constructor(x: number, y: number, step: number, width: number, height: number, img: p5.Image) {
    this.x = x
    this.y = y
    this.step = step
    this.width = width
    this.height = height
    this.img = img
  }

  draw(): void{
    image(this.img, this.x * this.step, this.y * this.step, this.width * this.step, this.height * this.step)
  }

  colision(animal: Entity): boolean{
    if(
        animal.x >= this.x && 
        animal.x <= (this.x - 1) + this.width &&
        animal.y <= (this.y - 1) + this.height &&
        animal.y >= this.y
      ){
      return true
    }
  }
}

class Entity {
  x: number
  y: number
  step: number
  image: p5.Image
  isDead: boolean

  constructor(x: number, y: number, step: number, image: p5.Image){
    this.x = x
    this.y = y
    this.step = step
    this.image = image
    this.isDead = false
  }

  draw(){
    if(!this.isDead){
      image(this.image, this.x * this.step, this.y * this.step, this.step, this.step)
    }
  }
}

class Board {
  nc: number
  nl: number
  step: number
  background: p5.Image

  constructor(nc: number, nl: number, step: number, background: p5.Image){
    this.nc = nc
    this.nl = nl
    this.step = step
    this.background = background
  }

  draw(): void{
    image(this.background, 0, 0, this.nc * this.step, this.nl * this.step)
    
    for(let x = 0; x < this.nc; x++){
      for(let y = 0; y < this.nl; y++){
        noFill()
        stroke(0)
        strokeWeight(2)
        rect(x * this.step, y * this.step, this.step, this.step)
      }
    }
  }
}

function loadImg(path: string): p5.Image{
  return loadImage(
    path,
    () => console.log("Loading ok"),
    () => console.log("Loading error")
  )
}

function preload(){
  wolfImg = loadImg('../sketch/lobol.png')
  rabbitImg = loadImg('../sketch/coelho.png')
  backgroundImg = loadImg('../sketch/grama.jpg')
  fireImg = loadImg('../sketch/fire.gif')
}

function setup(){
  wolf = new Entity(2, 3, size, wolfImg)
  rabbit = new Entity(3, 2, size, rabbitImg)
  board = new Board(4, 5, size, backgroundImg)
  fire = new Obstacle(1, 1, size, 2, 2, fireImg)

  createCanvas(board.nc * size, board.nl * size)
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    wolf.x--
  }else if(keyCode === RIGHT_ARROW){
    wolf.x++
  }else if(keyCode === UP_ARROW){
    wolf.y--
  }else if(keyCode === DOWN_ARROW){
    wolf.y++
  }

  if(keyCode === "A".charCodeAt(0)){
    rabbit.x--
  }else if(keyCode === "D".charCodeAt(0)){
    rabbit.x++
  }else if(keyCode === "W".charCodeAt(0)){
    rabbit.y--
  }else if(keyCode === "S".charCodeAt(0)){
    rabbit.y++
  }
}

function canMove(){
  // TRANCANDO O LOBO
  if(wolf.x < 0){
    wolf.x++
  }
  if(wolf.x > board.nc - 1){
    wolf.x--
  }
  if(wolf.y < 0){
    wolf.y++
  }
  if(wolf.y > board.nl - 1){
    wolf.y--
  }

  // LOOP DO COELHO
  if(rabbit.x < 0){
    rabbit.x = board.nc - 1
  }
  if(rabbit.x > board.nc - 1){
    rabbit.x = 0
  }
  if(rabbit.y < 0){
    rabbit.y = board.nl - 1
  }
  if(rabbit.y > board.nl - 1){
    rabbit.y = 0
  }
}

function draw(){
  board.draw()
  wolf.draw()
  rabbit.draw()
  fire.draw()

  canMove()

  if(fire.colision(wolf)){
    if(!wolf.isDead){
      alert("LOBO MORREU")
    }
    wolf.isDead = true
  }
  if(fire.colision(rabbit)){
    if(!rabbit.isDead){
      alert("COELHO MORREU")
    }
    rabbit.isDead = true
  }
}