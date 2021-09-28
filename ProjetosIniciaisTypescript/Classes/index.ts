function depositar(conta:any, valor:number):void{
    conta.saldo += valor
}

function sacar(conta:any, valor:number):boolean{
    if(conta.saldo < valor){
        return false
    }else{
        conta.saldo -= valor
        return true
    }
}
let conta = {
    nome: "Yuri",
    saldo: 30000,
}

console.log(conta)
depositar(conta, 20)
console.log(conta)
sacar(conta, 20000)
console.log(conta)