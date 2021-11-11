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

let room = new Room(0);
console.log("RESULTADO " + room + "\n");
// [ ]

room = new Room(5);
console.log("RESULTADO " + room + "\n");
// [ - - - - - ]

room = new Room(4);
console.log("RESULTADO " + room + "\n");
// [ - - - - ]

room.reserve("davi", "3232", 0);
room.reserve("joao", "3131", 3);
console.log("RESULTADO " + room + "\n");
// [ davi:3232 - - joao:3131 ]

room.reserve("rute", "3030", 0);
// fail: cadeira ja esta ocupada

room.reserve("davi", "3234", 2);
// fail: cliente ja esta no room

room.cancel("davi");
console.log("RESULTADO " + room + "\n");
// [ - - - joao:3131 ]

room.cancel("rita");
// // fail: cliente nao esta no room

console.log("RESULTADO " + room + "\n");
// // [ - - - joao:3131 ]