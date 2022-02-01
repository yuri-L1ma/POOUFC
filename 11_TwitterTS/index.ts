class User{
    username: string
    inbox: Inbox
    followers: Map<string, User>
    following: Map<string, User>

    constructor(username: string){
        this.username = username.toLowerCase()
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

    like(tweet_id:number){
        let tweet: Tweet = this.inbox.getTweet(tweet_id)
        tweet.like(this.username)
    }

    unfollow(other:string){
        if(this.following.has(other)){
            this.following.get(other)!.followers.delete(this.username)
            this.following.delete(other)

            this.getInbox().rmMsgsFrom(other)
        }else{
            throw new Error("Usuário não encontrado na lista de seguidores")
        }
    }

    unfollowAll(){
        for(let user of this.following.values()){
            user.followers.delete(this.username)
            this.following.delete(user.username)
        }
    }

    rejectAll(){
        for(let user of this.followers.values()){
            user.following.delete(this.username)
            this.followers.delete(user.username)
        }
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

    getTimeline(): Tweet[]{
        let tweets: Tweet[] = [...this.timeline.values()]
        tweets = tweets.filter(a => !a.isDeleted())
        tweets = tweets.sort((a,b) => b.getId() - a.getId()) 
        return tweets
    }

    getTweet(id: number): Tweet {
        if(this.timeline.has(id)){
            return this.timeline.get(id)!
        }else{
            throw new Error("Tweet não encontrado")
        }
    }

    getMyTweets(): Tweet[] {
        return [...this.myTweets.values()]
    }

    storeInMyTweets(tweet: Tweet){
        this.myTweets.set(tweet.getId(), tweet)
    }

    rmMsgsFrom(username: string){
        for(let tweet of this.timeline.values()){
            if(tweet.getUsername() == username){
                this.timeline.delete(tweet.getId())
            }
        }
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

    getUser(username:string): User{
        if(this.users.has(username)){
            return this.users.get(username)!
        }else{
            throw new Error("Usuário não encontrado")
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
        let tweet: Tweet = this.createTweet(user.username, msg)

        user.sendTweet(tweet)
    }

    sendRT(username:string, twId:number, rtMsg:string){
        let user: User = this.getUser(username)!
        let tweet: Tweet = user.getInbox().getTweet(twId)!
        let retweet: Tweet = this.createTweet(user.username, rtMsg)

        retweet.setRT(tweet)
        user.sendTweet(retweet)
    }

    rmUser(username: string){
        let user: User = this.getUser(username)!

        user.unfollowAll()
        user.rejectAll()
        
        for(let tweet of user.getInbox().getMyTweets()){
            tweet.setDeleted()
        }

        this.users.delete(username)
    }

    toString(): string {
        return `${[...this.users.values()].join('\n \n')}`
    }
}

class Tweet{
    private id: number
    private username: string
    private msg: string
    private likes: string[]
    private rt: Tweet | null
    private deleted: boolean

    constructor(id: number, username: string, msg: string) {
        this.id = id
        this.username = username
        this.msg = msg
        this.likes = []
        this.rt = null
        this.deleted = false
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

    getLikes(): string[] {
        return this.likes
    }

    like(username: string){
        this.likes.push(username)
    }

    setRT(tweet: Tweet){
        this.rt = tweet
    }

    setDeleted(){
        this.deleted = true
        this.msg = "Esse tweet foi deletado"
        this.username = ""
        this.likes = []
    }

    isDeleted():boolean{
        if(this.deleted)
            return true
        return false
    }

    toString(): string {
        let tweet: string = `${this.id}:${this.username} -> (${this.msg}) [${this.getLikes().join(", ")}]`

        if(this.rt != null){
            tweet += `\n    ${this.rt}`
        }

        return tweet
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
user_savinha.follow(user_yurizin)
user_edoarno.follow(user_yurizin)
user_yurizin.follow(user_natania)
user_savinha.follow(user_natania)

controller.sendTweet("yurizin", "todo mundo que me segue é lindo")
controller.sendTweet("yurizin", "Exceto o Edoardo")
controller.sendTweet("edoarno", "Vá se lascar yuri otário")
controller.sendTweet("savinha", "Yuri e edo, parem com essa briga feia macho")
controller.sendTweet("natania", "Gente como usa o twitter")
controller.sendTweet("yurizin", "A naty é jeganha kk, não segue ninguém e quer ajuda. Como ela vai ver os meus tweets. Muito jeganha kk")

user_savinha.like(0)
user_savinha.like(2)
user_savinha.like(3)
user_yurizin.like(0)
user_yurizin.like(3)

user_yurizin.unfollow("savinha")
user_natania.follow(user_yurizin)
user_natania.follow(user_savinha)
user_natania.follow(user_edoarno)

controller.sendRT("yurizin", 4, "Macho eu não acredito que tu não sabe não KKKKKKKKKKKKKK")
controller.sendRT("savinha", 4, "KKKKKK mulher pelo amor de Deus")
controller.sendRT("natania", 6, "APRENDI AGORA KKKKKKKKK Eu sou muito doida MESMO KKKK") 

controller.sendTweet("natania", "CANSEI DO BULLYNG OVOAPAGARMINHACONTA")

console.log(controller.toString())

controller.rmUser("natania")

console.log(controller.toString())