class Target{
  x: number
  y: number
  direction: string
  speed: number
  alive: boolean = true

  static radius: number = 20 //Static é uma propriedade da Classe não do objeto

  constructor(direction:string, speed:number){
    this.speed = speed
    this.direction = direction
  }

  update(): void{
    if(this.direction == 'vertical'){
      this.y += this.speed
    }else{
      this.x += this.speed
    }
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

  setCoordinates(): void{
    if(this.direction == 'horizontal'){
      this.y = random(0, height - Target.radius)

      if(this.speed < 0){
        this.x = width + Target.radius
      }else{
        this.x = - Target.radius
      }
    }

    if(this.direction == 'vertical'){
      this.x = random(0, width - Target.radius)

      if(this.speed < 0){
        this.y = height + Target.radius
      }else{
        this.y = - Target.radius
      }
    }
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
  backgroundIMG: p5.Image

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
    image(this.backgroundIMG, 0, 0, width, height)

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
    let target: Target = new Target(random(['vertical', 'horizontal']), random([1, -1, 2, -2]))
    target.setCoordinates()
    
    this.targets.push(target)

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
      if(target.direction == 'vertical'){
        if(target.speed < 0){
          if(target.y == - Target.radius){
            target.alive = false 
            this.removeDeadTargets()
            this.errors++
          }
        }

        if(target.speed > 0){
          if(target.y == height + Target.radius){
            target.alive = false 
            this.removeDeadTargets()
            this.errors++
          }
        }
      }

      if(target.direction == 'horizontal'){
        if(target.speed < 0){
          if(target.x == - Target.radius){
            target.alive = false 
            this.removeDeadTargets()
            this.errors++
          }
        }

        if(target.speed > 0){
          if(target.x == width + Target.radius){
            target.alive = false 
            this.removeDeadTargets()
            this.errors++
          }
        }
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
  soundSuspense: p5.SoundFile
  soundYeah: p5.SoundFile

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

    if(this.board.hits != 0 && this.board.hits % 10 == 0){
      if(!this.soundYeah.isPlaying()){
        this.soundYeah.play()
      } 
    }

    if(!this.soundBG.isPlaying()){
      this.soundBG.play()
    }

    if(this.board.errors >= 9){
      this.soundBG.stop()

      if(!this.soundSuspense.isPlaying()){
        this.soundSuspense.play()
      }
    }
  }

  gameOver(){
    background(255, 0, 0)
    fill(0)
    textSize(100)
    textFont('Georgia')
    textAlign(CENTER, CENTER)
    text("Game Over", width/2, height/2)
  }
}

let game: Game = new Game()
let soundGun: p5.SoundFile
let soundBG: p5.SoundFile 
let soundSuspense: p5.SoundFile
let soundYeah: p5.SoundFile
let shotMark: p5.Image
let backgroundIMG: p5.Image

function preload(){
  //Isso vai dar erro no VS mas tá dando certo. Eu juro que não sei o que tá rolando
  soundGun = loadSound('sketch/somTiro.wav')
  soundBG = loadSound('sketch/musicaFundo.mp3')
  soundSuspense = loadSound('sketch/musicaSuspense.mp3')
  soundYeah = loadSound('sketch/somYeah.mp3')
  shotMark = loadImage('sketch/shotMark.png')
  backgroundIMG = loadImage('sketch/backgroundIMG.jpg')
}

function setup(){
  createCanvas(626 * 1.5, 417 * 1.5)

  game.board.markShot = shotMark
  game.board.backgroundIMG = backgroundIMG

  game.soundBG = soundBG
  game.soundGun = soundGun
  game.soundSuspense = soundSuspense
  game.soundYeah = soundYeah

  game.soundGun.setVolume(0.5)
  game.soundBG.setVolume(0.2)
  game.soundSuspense.setVolume(0.2)
}

function mouseClicked(){
  game.board.removeByClick(mouseX, mouseY)
  game.soundGun.play()
}

function draw(){
  game.activeState()
}