 class Contact{
     private name: string
     private fones: Array<Fone>

     constructor(name:string, fones:Array<Fone>){
         this.name = name
         this.fones = []

         this.setFones(fones) 
     }

     public getName(){
         return this.name
     }

     public getFones(){
         return this.fones
     }

     public setName(name:string){
         this.name = name
     }

     public setFones(fones:Array<Fone>){
         for(let fone of fones){
             this.addFone(fone)
         }
     }

     public addFone(fone:Fone){
         if(fone.isValid()){
             this.fones.push(fone)
         }
     }

     public removeFone(index:number){
         if(index < this.fones.length){
            this.fones.splice(index, 1)
         }else{
             console.log("INDICE INEXISTENTE")
         }
     }

     public toString(){
         let output = `- ${this.name} `

         for(let fone of this.fones){
             output += `${this.fones.indexOf(fone)}:[${fone}] `
         }

         return output 
     }
 }

 class Fone{
     private label: string
     private number: string

     constructor(label: string, number: string){
         this.setNumber(number)
         this.setLabel(label)
     }

     public getLabel(){
         return this.label
     }

     public setLabel(value:string){
         this.label = value
     }
     
     public getNumber(){
         return this.number
     }

     public setNumber(value:string){
        this.number = value
     }

     public isValid(): boolean{
         if(Fone.validate(this.number)){
             return true
         }else{
             return false
         }
     }

     static validate(number: string): boolean{
         let validString = "0123456789()."
        
         for(let i = 0; i < number.length; i++){
            if(validString.indexOf(number[i]) == -1){
                 console.log(`${number} NÃO É VÁLIDO`)
                 return false
            }
         }

         return true
     }

     public toString(): string{
         return `${this.label}:${this.number}`
     }
 }

 class Schedule{
     private contacts: Array<Contact> = []

     constructor(contacts: Array<Contact>){
         for(let contact of contacts){
             this.addContact(contact)
         }
     }

     public setContacts(contacts: Array<Contact>){
         this.contacts = contacts
     }

     public addContact(contact: Contact){
         let indexToSearch = this.findIndexByName(contact.getName())

         if(indexToSearch != -1){
             this.contacts[indexToSearch].setFones(contact.getFones())
         }else{
             this.contacts.push(contact)
             this.contacts.sort((a, b) => a.getName().localeCompare(b.getName()))
         }
     }

     public findIndexByName(name: string): number{
         for(let i = 0; i < this.contacts.length; i++){
             if(this.contacts[i].getName() == name){
                 return i
             }
         }
         return -1
     }

     public findContact(name: string): Contact | null{
         let indexToSearch = this.findIndexByName(name)

         if(indexToSearch != -1){
             return this.contacts[indexToSearch]
         }else{
             console.log("NÃO FOI POSSÍVEL ENCONTRAR UM CONTATO")
             return null
         }
     }

     public removeContact(name: string){
         let indexToSearch = this.findIndexByName(name)

         if(indexToSearch != -1){
             this.contacts.splice(indexToSearch, 1)
         }else{
             console.log("NÃO FOI POSSÍVEL ENCONTRAR UM CONTATO")
             return null
         }
     }

     public searchContacts(pattern: string): Array<Contact>{
         let contactsOut = []

         for(let contact of this.contacts){
             if(contact.toString().toUpperCase().indexOf(pattern.toUpperCase()) != -1){
                 contactsOut.push(contact)
             }
         }

         return contactsOut
     }

     public toString(){
         let output: string = ""

         for(let contact of this.contacts){
             output += `${contact}\n`
         }

         return output
     }
 }

 ///ADICIONANDO CONTATOS
 let contacts = [new Contact("eva",
                    [new Fone("Oi", "8585"), new Fone("Claro", "9999")]), 
                new Contact("ana",
                    [new Fone("Tim", "3434")]),
                new Contact("bia",
                    [new Fone("Claro", "5454")])
                ]
 let schedule = new Schedule(contacts)
 console.log(""+schedule)

 ///ADICIONANDO CONTATO QUE JÁ EXISTIA
 ///ANA RECEBE MAIS DOIS NUMEROS
 schedule.addContact(new Contact("ana", [new Fone("casa", "2312"), new Fone("oio", "93849")]))
 console.log(""+schedule)

 ///REMOVENDO O CONTATO 0 DE ANA "TIM"
 schedule.findContact("ana").removeFone(0)
 console.log("" + schedule)

 ///REMOVENDO BIA KK
 schedule.removeContact("bia")
 console.log("" + schedule)

 ///ADICIONANDO MAIS CONTATOS
 schedule.addContact(new Contact("ava", [new Fone("tim", "5454")]))
 schedule.addContact(new Contact("rui", [new Fone("viv", "2222"), new Fone("oio", "9991")]))
 schedule.addContact(new Contact("zac", [new Fone("rec", "3131")]))
 console.log("" + schedule)

 ///FAZENDO PESQUISAS

 /// AVA E EVA
 console.log(schedule.searchContacts("va").join('\n') + "\n")
 /// EVA E RUI
 console.log(schedule.searchContacts("999").join('\n'))