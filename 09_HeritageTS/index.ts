abstract  class Vehicles {
    protected maximum_speed: number;
    protected honk: string;
    protected capacity: number;

    constructor(maximum_speed:number, honk: string, capacity:number){
        this.maximum_speed= maximum_speed;
        this.honk= honk;
        this.capacity = capacity;
    }

    abstract move(distance:number): any;

    public toString():string {
        return this.maximum_speed + ":" + this.honk + ":" + this.capacity + ":";        
    }
}

class Motorized extends Vehicles{
    private tank: number;
    private spent: number;

    constructor(maximum_speed:number, honk: string, capacity:number, tank:number, spent:number){
        super(maximum_speed, honk, capacity);
        this.tank = tank;
        this.spent = spent;
    }

    hasFuel():boolean {
        if (this.tank > 0){
            return true;
        } else {
            return false;
        }
    }

    move(distance:number){
        if(this.hasFuel()){
            let total_spent = this.capacity*(distance * this.spent);
            
            if(total_spent < this.tank){
                this.tank -= total_spent;
            } else {
                console.log("Não há gasolina o suficiente! Vá ao Posto Ipiranga!")!
            }
        }
    }
}

class Beetle extends Motorized {
    private id: string;
    private brand: string;
    private color: string;
    private year: string

    constructor(maximum_speed:number, honk: string, capacity:number, tank:number, spent:number, id:string, brand:string, color:string, year:string){
        super(maximum_speed, honk, capacity, tank, spent);
        this.id = id
        this.brand = brand;
        this.color = color
        this.year = year
    }

    public toString(): string {
        return `
        AQUI ESTÁ O FUSQUINHA MAIS IRADO DA REGIÃO \n
        - - - DÁ UMA OLHADA NA MÁQUINA - - - \n 
        Marca: ${this.brand} Cor: ${this.color} Ano: ${this.year} Placa: ${this.id} Capacidade: ${this.capacity} Velocidade máxima: ${this.maximum_speed} \n
        A BUZINHA DO MONSTRO: ${this.honk}`
    }
}

let fusca: Beetle = new Beetle(120, "biiiiiiiii", 4, 100, 9.7, "YUR - 2002", "Volkswagem", "Preto", "1996")