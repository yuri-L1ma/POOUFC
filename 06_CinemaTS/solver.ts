import readline = require('readline-sync');

let input = () => readline.question()
let write = (x: any) => process.stdout.write("" + x)

class Client{
    id: string;
    cellphone: string

    constructor(id: string, cellphone: string){
        this.id = id
        this.cellphone = cellphone
    }

    toString(): string{
        return this.id + " | " + this.cellphone
    }
}

class Room{
    chairs: Array<Client|null> = []

    constructor(capacity: number){
        for(let i = 0; i < capacity; i++){
            this.chairs.push(null)
        }
    }

    cancel(id: string): boolean{
        for(let i = 0; i < this.chairs.length; i++){
            if(this.chairs[i] != null){
                if(this.chairs[i].id == id){
                    console.log(`O lugar no indice ${i} foi cancelado pelo usuário ${this.chairs[i]}`)
                    this.chairs[i] = null
                    return true
                }
            }
        }   
        console.log("O CLIENTE NÃO ESTÁ AQUI") 
        return false
    }

    reserve(id: string, fone: string, index: number): boolean{
        let client: Client = new Client(id, fone)

        for(let i = 0; i < this.chairs.length; i++){
            if(this.chairs[i] != null && this.chairs[i].id == id){
                console.log("ESSE CLIENTE JÁ ESTÁ NA SALA")
                return false
            }
        }

        if(index <= this.chairs.length - 1){
            if(this.chairs[index] == null){
                this.chairs[index] = client
                return true
            }else{
                if(this.chairs[index].id == client.id){
                    console.log(`NÃO É POSSÍVEL ADICIONAR DOIS CLIENTES COM MESMO ID NA MESMA CADEIRA`)
                    return false
                }
                console.log(`ESSE LUGAR JÁ ESTÁ OCUPADO POR: ${this.chairs[index]}`)
                return false
            }
        }else{
            console.log("NÃO HÁ LUGAR DISPONÍVEL NESSA SALA PARA ESSA POSIÇÃO")
            return false
        }
    }

    toString(): string{
        let output = '[ '
        for(let i = 0; i < this.chairs.length; i++){
            if(this.chairs[i] == null){
                output += '- '
            }else{
                output += this.chairs[i].id + ' '
            }
        }
        return output += ']'
    }
}

class IO{
    createRoom(): Room{
        write("Qual a capacidade da sua sala de cinema? ")
        let capacity = +input()

        let room: Room = new Room(capacity)

        return room
    }

    help() {
        write("COMANDOS \n")
        write("   init <capacity>: Inicia uma nova sala de cinema \n")
        write("   show: Mostra a sala de cinema \n")
        write("   reserve <id> <fone> <index>: Reservar um lugar na sala \n")
        write("   cancel <id>: Cancelar um lugar \n")
        write("   end: Sai do programa \n")
    }

    shell(){
        let room: Room = this.createRoom()

        this.help()

        while(true){
            let line = input()
            let words = line.split(" ")

            if(words[0] == "end"){
                break
            }else if(words[0] == "show"){
                write("" + room + "\n")
            }else if(words[0] == "init"){
                room = new Room(+words[1])
            }else if(words[0] == "reserve"){
                room.reserve(words[1], words[2], +words[3])
            }else if(words[0] == "cancel"){
                room.cancel(words[1])
            }else{
                write("COMANDO INVÁLIDO \n")
            }
        }
    }
}

let io = new IO()
io.shell()

// let room = new Room(0);
// console.log("RESULTADO " + room + "\n");
// // [ ]

// room = new Room(5);
// console.log("RESULTADO " + room + "\n");
// // [ - - - - - ]

// room = new Room(4);
// console.log("RESULTADO " + room + "\n");
// // [ - - - - ]

// room.reserve("davi", "3232", 0);
// room.reserve("joao", "3131", 3);
// console.log("RESULTADO " + room + "\n");
// // [ davi:3232 - - joao:3131 ]

// room.reserve("rute", "3030", 0);
// // fail: cadeira ja esta ocupada

// room.reserve("davi", "3234", 2);
// // fail: cliente ja esta no room

// room.cancel("davi");
// console.log("RESULTADO " + room + "\n");
// // [ - - - joao:3131 ]

// room.cancel("rita");
// // // fail: cliente nao esta no room

// console.log("RESULTADO " + room + "\n");
// // // [ - - - joao:3131 ]