
class Grafite {
    calibre: number;
    dureza: string;
    tamanho: number;
    
    constructor(calibre: number, dureza: string, tamanho: number) {
        this.calibre = calibre;
        this.dureza = dureza;
        this.tamanho = tamanho;
    }

    gastoPorFolha(): number {
        if (this.dureza === 'HB')
            return 1;
        if (this.dureza === '2B')
            return 2;
        if (this.dureza === '4B')
            return 4;
        if (this.dureza === '6B')
            return 6;
        return 0;
    }

    toString(): string {
        return `Grafite ${this.calibre}:${this.dureza}:${this.tamanho}`;
    }
}

//agregação
class Lapiseira {
    calibre: number;
    capacity: number;
    private grafites: Grafite[] = []

    constructor(calibre: number) { 
        this.calibre = calibre;
    }

    addGrafite(grafite: Grafite): boolean {
        if(grafite.calibre != this.calibre){
            console.log("O CALIBRE DA LAPISEIRA NÃO É COMPATÍVEL")
            return false
        }
        
        if(this.grafites.length == this.capacity){
            console.log("A LAPISEIRA JÁ ESTÁ COM SUA CAPACIDADE MÁXIMA")
            return false
        }

        this.grafites.push(grafite)
        return true
    }

    removerGrafite(): Grafite | null {
        if (this.grafites.length == 0) {
            console.log("A lapiseira não possui um grafite");
            return null;
        }

        let grafiteOut: Grafite = this.grafites.pop()

        console.log(`FOI RETIRADO O GRAFITE QUE ESTAVA ATRÁS ${grafiteOut}`)
        
        return grafiteOut
    }

    escrever(folhas: number): boolean {
        for(let i = 0; i < folhas; i++){
            if (this.grafites.length == 0) {
                console.log("NÃO HÁ NENHUM GRAFITE NA LAPISEIRA");
                return false;
            }

            this.grafites[0].tamanho -= this.grafites[0].gastoPorFolha()

            if(this.grafites[0].tamanho == 0){
                console.log("Acabou um grafite! Vai vir outro em 3.. 2.. 1..")
                this.grafites.shift()
            }
        }

        return true 
    }
}

let Pentel = new Lapiseira(0.5);

console.log("================================")
Pentel.addGrafite(new Grafite(0.5, "HB", 40));
Pentel.addGrafite(new Grafite(0.5, "HB", 40));
Pentel.addGrafite(new Grafite(0.5, "HB", 40));
Pentel.addGrafite(new Grafite(0.5, "2B", 40));
console.log(Pentel);

console.log("================================")
Pentel.escrever(50);
console.log(Pentel);

console.log("================================")
Pentel.removerGrafite()
console.log(Pentel);

console.log("================================")
Pentel.addGrafite(new Grafite(0.5, "4B", 60))
console.log(Pentel);

//É PRA DAR ERROR
console.log("================================")
Pentel.addGrafite(new Grafite(0.3, "2B", 60))
console.log(Pentel);

console.log("================================")
Pentel.escrever(50);
console.log(Pentel)