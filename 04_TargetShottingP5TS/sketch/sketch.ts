class Bubble{
  x: number
  y: number
  letter: string
  speed: number
  alive: boolean = true
  static radius: number = 20 //Static é uma propriedade da Classe não do objeto

  constructor(x: number, y:number, letter:string, speed:number){
    this.x = x
    this.y = y
    this.letter = letter
    this.speed = speed
  }

  update(): void{
    this.y += this.speed
  }

  draw(): void{
    fill(255)
    stroke(255)
    circle(this.x, this.y, 2 * Bubble.radius)

    fill(0)
    stroke(0)
    textSize(15)
    text(this.letter, this.x - 5, this.y + 5)

  }
}

class Board{
  bubbles: Bubble[] = []
  timer: number = 0
  alphabet: string[] = []
  hits: number = 0
  errors: number = 0
  static timeout:number = 60

  constructor(){
  }

  update(): void{
    this.checkBubbleTime()
    this.markOutsideBubbles()


    for(let bubble of this.bubbles){
      bubble.update()
    }

    this.removeDeadBubbles()
  }

  draw(): void{
    stroke(255)
    fill(255)
    textSize(30)
    text(`Ativas: ${this.bubbles.length} | Acertos ${this.hits} | Erros ${this.errors}`, 30, 50)
    for(let bubble of this.bubbles){
      bubble.draw()
    }
  }

  addBubble(): void{
    let x = random(0, width - 2 * Bubble.radius)
    let y = - 2 * Bubble.radius
    let letter = random(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"])
    let speed = random(1, 5)
    
    this.bubbles.push(new Bubble(x, y, letter, speed))
  }

  checkBubbleTime(): void{
    this.timer -= 1

    if(this.timer <= 0){
      this.addBubble()
      this.timer = Board.timeout
    }
  }

  markOutsideBubbles(): void{
    for(let bubble of this.bubbles){
      if(bubble.y + 2 * Bubble.radius >= height){
        bubble.alive = false 
        this.errors++
      }
    }
  }

  removeDeadBubbles(): void{
    this.bubbles = this.bubbles.filter(b => b.alive)

    // let aliviesBubbles: Bubble[] = []

    // for(let bubble of this.bubbles){
    //   if(bubble.alive){
    //     aliviesBubbles.push(bubble)
    //   }
    // }

    // this.bubbles = aliviesBubbles
  }

  removeByHit(code: number): void{
    for(let bubble of this.bubbles){
      if(bubble.letter[0].toUpperCase().charCodeAt(0) == code){
        bubble.alive = false
        this.hits++
      }
    }
  }

}

class Game{
  board: Board
  activeState: () => void

  constructor(){
    this.board = new Board()
    this.activeState = this.gamePlay
  }

  gamePlay(): void{
    background(50)
    this.board.draw()
    this.board.update()

    if(this.board.errors > 10){
      this.activeState = this.gameOver
    }
  }

  gameOver(){
    background(255, 0, 0)
    fill(0)
    textSize(100)
    text("Game Over", 50, 300)
  }
}

let game: Game

function setup(){
  createCanvas(800, 600)
  game = new Game()
}

function keyPressed(){
  game.board.removeByHit(keyCode)
}

function draw(){
  game.activeState()
}