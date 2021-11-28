import readline = require('readline-sync');

let input = () => readline.question()
let write = (x: any) => process.stdout.write("" + x)

class Pet{
    private age: number
    private alive: boolean
    private cleanMax: number
    private diamonds: number
    private energy: number = 0
    private energyMax: number
    private hungry: number = 0
    private hungryMax: number
    private clean: number = 0

    constructor(energy:number, hungry: number, clean: number) {
        this.setEnergy(energy)
        this.setHungry(hungry)
        this.setClean(clean)

        this.age = 0
        this.alive = true
        this.diamonds = 0
        this.cleanMax = clean
        this.energyMax = energy
        this.hungryMax = hungry
    }

    public getAge(): number {
        return this.age;
    }

    public getAlive(): boolean {
        return this.alive;
    }

    public getCleanMax(): number {
        return this.cleanMax;
    }

    public getDiamonds(): number {
        return this.diamonds
    }

    public getEnergy(): number {
        return this.energy
    }

    public getEnergyMax(): number {
        return this.energyMax
    }

    public getHungry(): number {
        return this.hungry
    }

    public getHungryMax(): number {
        return this.hungryMax
    }

    public setClean(value: number){
        if(value <= 0){
            this.clean = 0
            this.alive = false
            console.log("PET MORREU DE PODRIDÃO")
        }else if(value >= this.cleanMax){
            this.clean = this.cleanMax
        }else{
            this.clean = value
        }
    }

    public setEnergy(value: number){
        if(value <= 0){
            this.energy = 0
            this.alive = false
            console.log("PET MORREU DE FRAQUEZA")
        }else if(value >= this.energyMax){
            this.energy = this.energyMax
        }else{
            this.energy = value
        }
    }

    public setHungry(value: number){
        if(value <= 0){
            this.hungry = 0
            this.alive = false
            console.log("PET MORREU DE FOME")
        }else if(value >= this.hungryMax){
            this.hungry = this.hungryMax
        }else{
            this.hungry = value
        }
    }

    eat():void {
        if(this.isAlive()){
            console.log("COMENDO :D")

            this.setHungry(this.hungry + 5)
            this.setEnergy(this.energy - 1)
            this.setClean(this.clean - 2)

            this.age++
        }
    }

    play():void {
        if(this.isAlive()){
            console.log("BRINCANDO :D")

            this.setEnergy(this.energy - 2)
            this.setHungry(this.hungry - 1)
            this.setClean(this.clean - 3)

            this.diamonds++
            this.age++
        }
    }

    shower():void {
        if(this.isAlive()){
            console.log("BANHANDO :D")

            this.setEnergy(this.energy - 3)
            this.setHungry(this.hungry - 1)
            this.setClean(this.cleanMax)

            this.age += 2
        }
    }

    sleep():void {
        if(this.isAlive()){
            if(this.energy <= (this.energyMax - 5)){
                console.log("DORMINDO :D")

                this.age += this.energyMax - this.energy

                this.setEnergy(this.energyMax)
                this.setHungry(this.hungry - 1)
            }else{
                console.log("NÃO ESTÁ COM SONITO")
            }
        }
    }

    isAlive():boolean{
        if(this.alive){
            return true
        }else{
            console.log("O PET ESTÁ MORTO :(")
            return false
        }
    }

    toString():string{
        return `E:${this.energy}/${this.energyMax} S:${this.hungry}/${this.hungryMax} L:${this.clean}/${this.cleanMax} D:${this.diamonds} I:${this.age}`
    }
}

class IO{
    create_pet(): Pet {
        write("Qual a energia máxima seu pet? ")
        let energyMAX = +input()
    
        write("Qual a saciedade máxima seu pet? ")
        let hungryMAX = +input()
    
        write("Quão limpo é seu pet?")
        let cleanMAX = +input()
    
        let pet: Pet = new Pet(energyMAX, hungryMAX, cleanMAX)
        return pet
    }

    help(){
        write("COMANDOS \n")
        write("   init <energyMAX> <hungryMAX> <cleanMAX>: Inicia um novo pet \n")
        write("   show: Mostra o pet \n")
        write("   play: Brinca com o pet \n")
        write("   eat: Dá comida ao pet \n")
        write("   end: Sai do programa \n")
    }

    shell(){
        let pet: Pet = this.create_pet() 
        this.help()
        while(true){
            let line = input()
            let words = line.split(" ")
            
            if(words[0] == "end"){
                break
            }else if(words[0] == "show"){
                write("" + pet)
            }else if(words[0] == "init"){
                pet = new Pet(+words[1], +words[2], +words[3])
            }else{
                console.log("COMANDO INVALIDO")
            }
        }
    }
}

let io = new IO();
io.shell()

// //case inicio
// console.log("////////////////// CASE 1")
// let pet = new Pet(20, 10, 15);
// console.log("" + pet);
// //E:20/20, S:10/10, L:15/15, D:0, I:0
// pet = new Pet(10, 20, 50);
// console.log("" + pet);
// //E:10/10, S:20/20, L:50/50, D:0, I:0

// console.log("////////////////// CASE 2")
// //case play - Brincar 
// pet = new Pet(20, 10, 15);
// pet.play();
// console.log("" + pet);
// //E:18/20, S:9/10, L:12/15, D:1, I:1
// pet.play();
// console.log("" + pet);
// //E:16/20, S:8/10, L:9/15, D:2, I:2

// console.log("////////////////// CASE 3")
// //case comer 
// pet.eat();
// console.log("" + pet);
// //E:15/20, S:10/10, L:7/15, D:2, I:3

// console.log("////////////////// CASE 4")
// //case dormir
// pet.sleep();
// console.log("" + pet);
// //E:20/20, S:9/10, L:7/15, D:2, I:8

// console.log("////////////////// CASE 5")
// //case tomar banho
// pet.shower();
// console.log("" + pet);
// //E:17/20, S:8/10, L:15/15, D:2, I:10

// console.log("////////////////// CASE 6")
// //case dormir sem sono
// pet.sleep();
// //fail: nao esta com sono

// console.log("////////////////// CASE 7")
// //case morrer
// pet.play();
// pet.play();
// pet.play();
// pet.play();
// console.log("" + pet);
// //E:9/20, S:4/10, L:3/15, D:6, I:14
// pet.play();
// //fail: pet morreu de sujeira
// console.log("" + pet);
// //E:7/20, S:3/10, L:0/15, D:7, I:15
// pet.play();
// //fail: pet esta morto
// pet.eat();
// //fail: pet esta morto
// pet.shower();
// //fail: pet esta morto
// pet.sleep();
// //fail: pet esta morto

// console.log("////////////////// CASE 7")
// //case exemplo2
// pet = new Pet(5, 10, 10);
// pet.play();
// pet.play();
// pet.play();
// //fail: pet morreu de fraqueza
// pet.play();
// //fail: pet esta morto
// console.log("" + pet);
// //E:0/5, S:7/10, L:1/10, D:3, I:3 

// console.log("////////////////// CASE 8")
// //case exemplo3
// pet = new Pet(10, 3, 10);
// pet.play();
// pet.play();
// pet.play();
// //fail: pet morreu de fome
// pet.play();
// //fail: pet esta morto
// console.log("" + pet);
// //E:4/10, S:0/3, L:1/10, D:3, I:3
