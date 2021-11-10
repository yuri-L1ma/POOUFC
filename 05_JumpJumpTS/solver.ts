class Kid{
    id:number
    age: number
    name: string

    constructor(id: number, age: number, name:string){
        this.id = id;
        this.age = age
        this.name = name
    }

    public toString() {
        return this.name + " " + this.age + " ANOS";
    }
}

class Trampoline{
    playing: Array<Kid> = []
    waiting: Array<Kid> = []

    arrive(kid: Kid): void{
        this.waiting.push(kid);
    }

    in(): void{
        this.playing.push(this.waiting.shift())
    }

    out(): void{
        this.waiting.push(this.playing.shift())
    }

    remove(id:number): Kid{
        for(let kid of this.waiting){
            if(kid.id == id){
                this.waiting = this.waiting.filter(kid => kid.id != id)
                return kid
            }
        }

        for(let kid of this.playing){
            if(kid.id == id){
                this.playing = this.playing.filter(kid => kid.id != id)
                return kid
            }
        }
    }

    public toString(){
        return `CRIANÇAS QUE ESTÃO NA FILA: ${this.waiting} \n CRIANÇAS QUE ESTÃO BRINCANDO ${this.playing}`
    }
}

let trampoline = new Trampoline()

trampoline.arrive(new Kid(1, 5, "mario"));
trampoline.arrive(new Kid(2, 4, "livia"));
trampoline.arrive(new Kid(3, 3, "luana"));
console.log(trampoline);
//=> luana:3 livia:4 mario:5 => [ ]
//case entrando
trampoline.in();
console.log(trampoline);
//=> luana:3 livia:4 => [ mario:5 ]
trampoline.in();
console.log(trampoline);
//=> luana:3 => [ livia:4 mario:5 ]
//case saindo
trampoline.out();
console.log(trampoline);
//=> mario:5 luana:3 => [ livia:4 ]

trampoline.remove(1);
console.log(trampoline);
// Mario foi embora
