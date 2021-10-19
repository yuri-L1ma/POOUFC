class Person {
    age: number;
    name: string;

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    toString(): string {
        return `Pessoa ${this.name} ${this.age}`;
    }
}

class Motorcycle {
    person: Person | null;
    power: number;
    time: number;

    constructor(power: number) {
        this.person = null
        this.power = power
        this.time = 0
    }

    buy(time: number): void {
        this.time += time
    }

    drive(time: number): void {
        if(this.person != null){
            if(this.person.age <= 10){
                if(this.time > 0){
                    if(time <= this.time){
                        this.time -= time
                    }else{
                        console.log("A CRIANÇA ANDOU " + (time - this.time) + " MINUTOS E ACABOU O TEMPO")
                        this.time = 0
                    }
                }else{
                    console.log("SEU TEMPO ESTÁ ESGOTADO")
                }                
            }else{
                console.log("A PESSOA QUE ESTÁ NA motocaCA NÃO TEM IDADE SUFICIENTE PARA ANDAR")
            }
        }else{
            console.log("NÃO HÁ NINGUÉM NA motocaCA")
        }
    }

    honk(): void {
        if(this.person != null){
            let pem = "P"
            for(let i = 0; i < this.power; i++){
                pem += "E"
            }
            console.log(pem + "M")
        }else{
            console.log("SE NÃO TEM NINGUÉM NA motoca, NÃO TEM COMO BUZINAR")
        }
    }

    in(person: Person): boolean {
        if(this.person != null){
            console.log("JÁ TEM UMA PESSOA AQUI NESSA motoca")
            return false
        }

        this.person = person

        console.log(`A PESSOA CHAMADA ${this.person.name} DE ${this.person.age} ANO(S) SUBIU NA motoca`)
        
        return true
    }

    out(): Person{
        if(this.person != null){
            let personOut = this.person
            this.person = null
            console.log("A PESSOA QUE ESTAVA NA motoca SAIU")
            return personOut
        }else{
            console.log("A MOTO JÁ ESTÁ VAZIA")
        }
    }

    toString(): string {
        return `PESSOA NA motoca ${this.person}; PODER DA motoca ${this.power}; TEMPO DA motoca ${this.time}`
    }
}

console.log("==========================")

let motoca = new Motorcycle(1);
console.log(motoca);
//power: 1, minutos: 0, person: null
motoca.honk();
//fail: motoca vazia
motoca.in(new Person("marcos", 4));
console.log(motoca);
//power: 1, minutos: 0, person: [marcos:4]
motoca.honk();
//Pem
motoca.in(new Person("marisa", 2));
//fail: motoca ocupada
console.log(motoca);
//power: 1, minutos: 0, person: [marcos:4

console.log("==========================")

//case subindo e buzinando
motoca = new Motorcycle(5);
console.log(motoca);
//power: 5, minutos: 0, person: null
motoca.in(new Person("marcos", 4));
console.log(motoca);
//power: 5, minutos: 0, person: [marcos:4]
motoca.honk();
//Peeeee

console.log("==========================")

//case subindo e trocando
motoca = new Motorcycle(7);
motoca.in(new Person("heitor", 6));
console.log(motoca);
//power: 7, minutos: 0, person: [heitor:6]
let heitor: Person = motoca.out();
console.log(heitor);
//[heitor:6]
motoca.out();
//fail: motoca vazia
motoca.in(new Person("suzana", 8));
console.log(motoca);
//power: 7, minutos: 0, person: [suzana:8

console.log("==========================")

//case passeando
motoca = new Motorcycle(7);
motoca.in(new Person("suzana", 8));
motoca.drive(10);
//fail: time zerado
motoca.buy(40);
console.log(motoca);
//power: 7, minutos: 40, person: [suzana:8]
motoca.drive(20);
console.log(motoca);
//power: 7, minutos: 20, person: [suzana:8

console.log("==========================")

//case nem grande nem pequeno
motoca = new Motorcycle(7);
motoca.buy(20);
motoca.in(new Person("andreina", 23));
motoca.drive(15);
//fail: muito grande para andar de motoca
console.log(motoca);
//power: 7, minutos: 20, person: [andreina:23

console.log("==========================")

//case acabou o time
motoca = new Motorcycle(7);
motoca.buy(20);
motoca.in(new Person("andreina", 6));
motoca.drive(15);
console.log(motoca);
//power: 7, minutos: 5, person: [andreina:6]
motoca.drive(10);
//fail: andou 5 min e acabou o time