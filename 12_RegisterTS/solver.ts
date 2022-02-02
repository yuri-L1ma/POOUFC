class Client{
    private accounts: Account[]
    private clientID: string

    constructor(clientID: string){
        this.clientID = clientID
        this.accounts = []
    }

    addAccount(account: Account){
        this.accounts.push(account)
    }

    getAccounts():number[]{
        let accountIDS: number[] = []

        for(let accountID of this.accounts){
            accountIDS.push(accountID.getID())
        }

        return accountIDS
    }

    getClientID(){
        return this.clientID
    }

    setAccounts(accounts: Account[]){
        this.accounts = accounts
    }

    setClientID(clientID: string){
        this.clientID = clientID
    }
    
    toString(){
        return `${this.clientID.toUpperCase()} [${this.getAccounts()}]`;
    }
}

abstract class Account{
    protected id: number
    protected balance: number = 0
    protected type: string
    protected clientID: string
  
    constructor(id: number, clientID: string, type: string){
        this.id = id
        this.clientID = clientID
        this.type = type
    }

    abstract monthlyUpdate(): any

    deposite(value: number){
        this.balance += value
    }

    transfer(other: Account, value: number){
        this.balance -= value
        other.balance += value
    }

    withDraw(value: number){
        this.balance -= value
    }

    getBalance(){
        return this.balance
    }

    getClientID(){
        return this.clientID
    }

    getID(){
        return this.id
    }
    
    getType(){
        return this.type
    }

    toString(){
        return `${this.id}:${this.clientID}:${this.balance}:${this.type}`;
    }
}

class SavingsAccount extends Account{
    constructor(id: number, clientID: string){
        super(id, clientID, "CP")
    }

    monthlyUpdate(){
        this.balance += this.balance/100
    }
}

class CheckingAccount extends Account{
    constructor(id: number, clientID: string){
        super(id, clientID, "CC")
    }

    monthlyUpdate(){
        this.balance -= 20
    }
}

class BankAgency{
    private accounts: Map<number, Account>
    private clients: Map<string, Client>
    private nextIDAccount: number

    constructor(){
        this.accounts = new Map<number, Account>()
        this.clients = new Map<string, Client>()
        this.nextIDAccount = 0
    }

    addClient(clientID: string){
        if(this.clients.has(clientID)){
            return new Error("JÁ EXISTE ESSE CLIENTE NO SISTEMA")
        }

        let client: Client = new Client(clientID)

        let CC: Account = new CheckingAccount(this.nextIDAccount, clientID)
        this.nextIDAccount++

        let CP: Account = new SavingsAccount(this.nextIDAccount, clientID)
        this.nextIDAccount++

        client.addAccount(CC)
        client.addAccount(CP)

        this.clients.set(clientID, client)
        this.accounts.set(CC.getID(), CC)
        this.accounts.set(CP.getID(), CP)
    }

    deposit(accountID: number, value: number){
        let account: Account = this.getAccount(accountID)!
        account.deposite(value)
    }

    monthlyUpdate(){
        for(let account of this.accounts.values()){
            account.monthlyUpdate()
        }
    }

    transfer(donor_account: number, receiver_account: number, value: number){
        let donor: Account = this.getAccount(donor_account)!
        let receiver: Account = this.getAccount(receiver_account)!

        if(this.hasMoney(donor, value))
            donor.transfer(receiver, value)
    }

    withDraw(accountID: number, value: number){
        let account: Account = this.getAccount(accountID)!

        if(this.hasMoney(account, value))
            account.withDraw(value)
    }

    private getAccount(accountID: number): Account{
        if(this.accounts.has(accountID))
            return this.accounts.get(accountID)!
        throw new Error("CONTA NÃO ENCONTRADA")
    }

    hasMoney(account: Account, value: number): boolean{
        if(account.getBalance() >= value)
            return true
        throw new Error("VOCÊ NÃO TEM SALDO SUFICIENTE")
    }

    toString(){
        return `CLIENTS:\n    ${[...this.clients.values()].join('\n    ')}\n\nACCOUNTS:\n   ${[...this.accounts.values()].join('\n   ')} \n`
    }
}

let nubank: BankAgency = new BankAgency()

nubank.addClient("yurico")
nubank.addClient("natypobre")
nubank.addClient("edoliso")
nubank.addClient("savinhaextorada")

console.log(nubank.toString())

nubank.deposit(0, 100)
nubank.deposit(1, 200)
nubank.deposit(2, 50)
nubank.deposit(3, 300)
// nubank.deposit(4, 20)
// nubank.deposit(5, 400)
// nubank.deposit(6, 80)
// nubank.deposit(7, 325)

console.log(nubank.toString())

nubank.withDraw(3, 50)
nubank.withDraw(0, 70)
// nubank.withDraw(1, 300) // fail

console.log(nubank.toString())

nubank.transfer(3, 5, 200)
nubank.transfer(0, 4, 25)
//nubank.transfer(9, 1, 30) // fail conta não encontrada
//nubank.transfer(2, 8, 10) // fail conta não encontrada

console.log(nubank.toString())

nubank.monthlyUpdate()

console.log(nubank.toString())