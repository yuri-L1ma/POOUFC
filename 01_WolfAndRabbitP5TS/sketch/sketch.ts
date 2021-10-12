let evaderImg: p5.Image
let evaderWithBillImg: p5.Image
let billImg: p5.Image
let backgroundImg: p5.Image
let fireImg: p5.Image
let marcationImg: p5.Image

let evader: Evader
let bill: Bill
let board: Board
let fire: Fire
let safe_area: Fire

class Fire {
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
    if(this.img == null){
      fill(`rgba(100%,100%,0%,0.2)`)
      rect(this.x * this.step, this.y * this.step, this.width * this.step, this.height * this.step)
    }else{
      image(this.img, this.x * this.step, this.y * this.step, this.width * this.step, this.height * this.step)
    }
  }
}

class Evader {
  x: number
  y: number
  step: number
  image: p5.Image
  catchedBills: number

  constructor(x: number, y: number, step: number, image: p5.Image){
    this.x = x
    this.y = y
    this.step = step
    this.image = image
    this.catchedBills = 0
  }

  draw(){
    image(this.image, this.x * this.step, this.y * this.step, this.step, this.step)
  }

  update(bill: Bill){
    if(!bill.isTaked){
      this.image = evaderImg
    }else{
      this.image = evaderWithBillImg
    }
  }

  takeABill(bill: Bill): boolean{
    if(this.x == bill.x && this.y == bill.y){
      return true
    }
  }

  colision(area: Fire): boolean{
    if(
      this.x >= area.x && this.x <= area.x + area.width - 1 &&
      this.y >= area.y && this.y <= area.y + area.height - 1
      ){
      return true
    }
  }
}

class Bill {
  x: number
  y: number
  step: number
  image: p5.Image
  isTaked: boolean

  constructor(x: number, y: number, step: number, image: p5.Image){
    this.x = x
    this.y = y
    this.step = step
    this.image = image
    this.isTaked = false
  }

  draw(){
    if(!this.isTaked){
      image(this.image, this.x * this.step, this.y * this.step, this.step, this.step)
    }
  }

  update(){
    this.isTaked = false
    this.x = Math.floor(random(0, board.nc))
    this.y = Math.floor(random(0, board.nl))
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
    () => console.log(`Não deu erro nessa foto ${path}`),
    () => console.log(`Deu erro nessa foto ${path}`)
  )
}

function preload(){
  evaderImg = loadImg('../sketch/Sonegador.png')
  evaderWithBillImg = loadImg('../sketch/SonegadorComConta.png')
  billImg = loadImg('../sketch/Conta.png')
  backgroundImg = loadImg('../sketch/FundoEstado.jpeg')
  fireImg = loadImg('../sketch/fire.gif')
}

function setup(){
  let size: number = 100

  board = new Board(6, 4, size, backgroundImg)

  fire = new Fire(1, 1, size, 3, 1, fireImg)
  safe_area = new Fire(fire.x - 1, fire.y - 1, size, fire.width + 2, fire.height + 2, null)
  
  bill = new Bill(Math.floor(random(0,board.nc)), Math.floor(random(0,board.nl)), size, billImg)

  evader = new Evader(0, 0, size, evaderImg)

  createCanvas(board.nc * size, board.nl * size)
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    evader.x--
  }else if(keyCode === RIGHT_ARROW){
    evader.x++
  }else if(keyCode === UP_ARROW){
    evader.y--
  }else if(keyCode === DOWN_ARROW){
    evader.y++
  }

  if(evader.colision(safe_area) && bill.isTaked){
    if(keyCode === "E".charCodeAt(0)){
      evader.catchedBills++
      alert("VOCÊ INCINEROU " + evader.catchedBills + " CONTAS")
      bill.update()
    }
  }
}

function update(){
  evader.update(bill)

  if(evader.takeABill(bill)){
    bill.isTaked = true
  }

  if(evader.colision(fire)){
    bill.isTaked = false
    evader.catchedBills = 0
    evader.x = 0
    evader.y = 0
    
    alert("MORREU")
  }
}

function draw(){
  board.draw()
  safe_area.draw()

  evader.draw()
  bill.draw()
  fire.draw()

  update()
}