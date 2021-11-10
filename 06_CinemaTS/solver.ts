class Client{
    id: number
    cellphone: number

    constructor(id: number, cellphone: number){
        this.id = id
        this.cellphone = cellphone
    }

    toString(): string{
        return this.id + " | " + this.cellphone
    }
}

class Room{
    chairs: Array<Client|null>

    constructor(capacity: number){
        for(let i = 0; i < capacity; i){
            this.chairs.push(null)
        }
    }
}