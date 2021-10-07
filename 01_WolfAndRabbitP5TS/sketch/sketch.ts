let wolfImg: p5.Image
let rabbitImg: p5.Image
let backgroundImg: p5.Image

let size: number = 100

let wolf: Entity
let rabbit: Entity
let board: Board

class Entity {
  x: number
  y: number
  step: number
  image: p5.Image

  constructor(x: number, y: number, step: number, image: p5.Image){
    this.x = x
    this.y = y
    this.step = step
    this.image = image
  }

  draw(){
    image(this.image, this.x * this.step, this.y * this.step, this.step, this.step)
  }
}

class Board {
  nl: number
  nc: number
  step: number
  background: p5.Image

  constructor(nl: number, nc: number, step: number, background: p5.Image){
    this.nl = nl
    this.nc = nc
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
}

function setup(){
  wolf = new Entity(3, 3, size, wolfImg)
  rabbit = new Entity(2, 2, size, rabbitImg)
  board = new Board(4, 4, size, backgroundImg)

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

function draw(){
  board.draw()
  wolf.draw()
  rabbit.draw()
}