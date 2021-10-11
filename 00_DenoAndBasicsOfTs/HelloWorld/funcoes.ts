// Função em JS
// function adicionar(a, b){
//     return a + b
// }
// Função em TS
function adicionar(a:number, b:number):number{
    return a+b
}

console.log(adicionar(2,3))

//FUNCAO ANONIMA

let v = function (a:number, b:number):number{
    return a + b
}

console.log(adicionar(3,3))

// Arrow Function

let adicionar2 = (a:number, b:number):number =>{
    return a+b
}

console.log(adicionar2(5,5))

// ARROW FUNCTION REDUZIDA

let adicionar3 = (a:number, b:number):number => (a+b)

console.log(adicionar3(10,15))