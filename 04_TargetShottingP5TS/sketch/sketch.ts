class Target{
  x: number
  y: number
  img: p5.Image
  speed: number
  alive: boolean = true

  static radius: number = 20 //Static é uma propriedade da Classe não do objeto

  constructor(x: number, y:number, speed:number){
    this.x = x
    this.y = y
    this.speed = speed
  }

  update(): void{
    this.y += this.speed
  }

  draw(): void{
    rectMode(CENTER)
    noStroke()

    fill(255, 0, 0)
    circle(this.x, this.y, 2 * Target.radius)

    fill(255)
    circle(this.x, this.y, Target.radius + Target.radius/4)

    fill(255, 0, 0)
    circle(this.x, this.y, Target.radius/2)
  }
}

class ShotMark{
  image: p5.Image
  x: number
  y: number
  width: number
  height: number

  constructor(x: number, y: number){
    this.x = x
    this.y = y
    this.width = 16
    this.height = 16
    this.image = loadImage('sketch/shotMark.png')
  }

  draw(){
    image(this.image, this.x, this.y, this.width, this.height)
  }
}

class Board{
  targets: Target[] = []
  shotMarks: ShotMark[] = []
  timer: number = 0
  hits: number = 0
  errors: number = 0
  markShot: p5.Image

  static timeout:number = 60

  constructor(){
  }

  update(): void{
    this.checkTargetTime()
    this.markOutsideTargets()

    for(let target of this.targets){
      target.update()
    }
  }

  draw(): void{
    stroke(255)
    fill(255)
    textSize(30)
    text(`Ativas: ${this.targets.length} | Acertos ${this.hits} | Erros ${this.errors}`, 30, 50)

    for(let mark of this.shotMarks){
      mark.draw()
    }

    for(let target of this.targets){
      target.draw()
    }

  }

  addTarget(): void{
    let x = random(0, width - 2 * Target.radius)
    let y = - Target.radius
    let speed = random(1, 2)
    
    this.targets.push(new Target(x, y, speed))

    this.shotMarks.shift()
  }

  checkTargetTime(): void{
    this.timer -= 1

    if(this.timer <= 0){
      this.addTarget()
      this.timer = Board.timeout
    }
  }

  markOutsideTargets(): void{
    for(let target of this.targets){
      if(target.y - Target.radius >= height){
        target.alive = false 
        this.removeDeadTargets()
        this.errors++
      }
    }
  }

  removeDeadTargets(): void{
    this.targets = this.targets.filter(b => b.alive)

    // let aliviesTargets: Target[] = []

    // for(let Target of this.Targets){
    //   if(Target.alive){
    //     aliviesTargets.push(Target)
    //   }
    // }

    // this.Targets = aliviesTargets
  }

  removeByClick(x: number, y: number): void{
    this.shotMarks.push(new ShotMark(x - 8, y - 8))

    let numberOfTargets = this.targets.length

    for(let target of this.targets){
      let distance = dist(x, y, target.x, target.y)

      if(distance < Target.radius){
        target.alive = false
        this.hits++
        this.removeDeadTargets()
      }
    }

    if(numberOfTargets == this.targets.length){
      this.errors++
    }
  }
}

class Game{
  board: Board
  soundGun: p5.SoundFile
  soundBG: p5.SoundFile
  activeState: () => void

  constructor(){
    this.board = new Board()
    this.activeState = this.gamePlay
  }

  gamePlay(): void{
    background('teal')
    cursor('https://image.flaticon.com/icons/png/32/18/18554.png?ga=GA1.2.117944100.1633824000', 16, 16)

    this.board.draw()
    this.board.update()

    if(this.board.errors > 9){
      this.activeState = this.gameOver
    }

    if(!this.soundBG.isPlaying){
      this.soundBG.play()
    }
  }

  gameOver(){
    background(255, 0, 0)
    fill(0)
    textSize(100)
    text("Game Over", 50, 300)
  }
}

let game: Game = new Game()
let soundGun: p5.SoundFile 
let soundBG: p5.SoundFile 
let shotMark: p5.Image

function preload(){
  soundGun = loadSound('sketch/somTiro.wav')
  soundBG = loadSound('sketch/musicaFundo.mp3')
  shotMark = loadImage('sketch/shotMark.png')
}

function setup(){
  createCanvas(800, 600)
  game.board.markShot = shotMark
  game.soundBG = soundBG
  game.soundGun = soundGun

  game.soundBG.setVolume(0.2)
  game.soundBG.play()
}

function mouseClicked(){
  game.board.removeByClick(mouseX, mouseY)
  game.soundGun.setVolume(0.5)
  game.soundGun.play()
}

function draw(){
  game.activeState()
}