let l = [1,2,3]
console.log(l)

//tipada

let l1:number[] = [1,2,4]

console.log(l1)

let nomes:string[] = ["Yuri", "Yur", "Yu"]
console.log(nomes)

for(let i:number = 0; i < nomes.length; i++){
    console.log(nomes[i])
}

//NÃO SÃO TIPADOS
//FOR IN - Indices
for(let indice in nomes){
    console.log(indice, nomes[indice])
}

//FOR OF - Valres da lista
for(let elemento of nomes){
    console.log(elemento)
}

//Interações
let listaNova:number[] = [20, 30]
listaNova.push(40)

listaNova.splice(1,1)
console.log(listaNova);