class User{
    username: string
    inbox: Inbox
    followers: Map<string, User>
    following: Map<string, User>

    constructor(username: string){
        this.username = username.toLowerCase();
        this.inbox = new Inbox()
        this.followers = new Map<string, User>()
        this.following = new Map<string, User>()
    }

    follow(other: User): void {
        if(other.username != this.username){
            if(!this.following.has(other.username)){
                this.following.set(other.username, other)
                other.followers.set(this.username, this)
            }
        }else{
            throw new Error("Você não pode seguir a si mesmo")
        }
    }

    sendTweet(tweet:Tweet){
        this.inbox.storeInMyTweets(tweet)
        this.inbox.storeInTimeline(tweet)

        for(let follower of this.followers.values()){
            follower.inbox.storeInTimeline(tweet)
        }
    }

    getInbox(): Inbox{
        return this.inbox
    }

    toString(): string {
        return `Usuário: ${this.username} \nSeguidores: [${[...this.followers.keys()].join(", ")}] | Seguidos: [${[...this.following.keys()].join(", ")}]\n---------------\n${this.inbox}`
    }
}

class Inbox{
    timeline: Map<number, Tweet>
    myTweets: Map<number, Tweet>

    constructor(){
        this.timeline = new Map<number, Tweet>()
        this.myTweets = new Map<number, Tweet>()
    }

    storeInTimeline(tweet: Tweet){
        this.timeline.set(tweet.getId(), tweet)
    }

    storeInMyTweets(tweet: Tweet){
        this.myTweets.set(tweet.getId(), tweet)
    }

    getTimeline(): Tweet[]{
        let tweets: Tweet[] = [...this.timeline.values()]
        tweets = tweets.sort((a,b) => b.getId() - a.getId()) 
        return tweets
    }

    toString(): string {        
        return `Timeline\n${this.getTimeline().join('\n')}`
    }
}

class Controller{
    users: Map<string, User>
    nextIDTweet: number
    tweets: Map<number, Tweet>

    constructor(){
        this.users = new Map<string, User>()
        this.nextIDTweet = 0
        this.tweets = new Map<number, Tweet>()
    }

    addUser(username:string): void {
        username = username.toLowerCase()

        if(!this.users.has(username.toLowerCase())){
            this.users.set(username, new User(username)) 
        }else{
            throw new Error("Já existe um usuário com esse username")
        }
    }

    getUser(username:string): User | undefined{
        if(this.users.has(username)){
            return this.users.get(username)!
        }
    }

    createTweet(sender:string, msg:string): Tweet {
        let tweet: Tweet = new Tweet(this.nextIDTweet, sender, msg)
        this.tweets.set(this.nextIDTweet, tweet)
        this.nextIDTweet++

        return tweet
    }

    sendTweet(sender:string, msg:string){
        let user: User = this.getUser(sender)!
        let tweet: Tweet = this.createTweet(sender, msg)
        user.sendTweet(tweet)
    }

    toString(): string {
        return `${[...this.users.values()].join('\n \n')}`
    }
}

class Tweet{
    private id: number
    private username: string
    private msg: string

    constructor(id: number, username: string, msg: string) {
        this.id = id
        this.username = username
        this.msg = msg
    }

    getId() {
        return this.id
    }

    getUsername() {
        return this.username
    }

    getMsg() {
        return this.msg
    }

    toString(): string {
        return `${this.id}:${this.username} -> (${this.msg})`
    }
}

let controller = new Controller();

controller.addUser("Yurizin")
controller.addUser("Savinha")
controller.addUser("Natania")
controller.addUser("Edoarno")

let user_yurizin = controller.getUser("yurizin")!
let user_savinha = controller.getUser("savinha")!
let user_edoarno = controller.getUser("edoarno")!
let user_natania = controller.getUser("natania")!

user_yurizin.follow(user_savinha)
user_savinha.follow(user_edoarno)
user_edoarno.follow(user_yurizin)
user_yurizin.follow(user_natania)

controller.sendTweet("yurizin", "todo mundo que me segue é lindo")
controller.sendTweet("yurizin", "Exceto o Edoardo")
controller.sendTweet("edoarno", "Vá se lascar yuri otário")
controller.sendTweet("savinha", "Yuri e edo, parem com essa briga feia macho")
controller.sendTweet("natania", "Gente como usa o twitter")
controller.sendTweet("yurizin", "A naty é jeganha kk, não segue ninguém e quer ajuda. Como ela vai ver os meus tweets. Muito jeganha kk")

console.log(controller.toString())

// user_edoarno.follow(user_natania)

// console.log(controller.toString())