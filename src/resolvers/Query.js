const Query =  {
    me(){
        return {
            id:'12345',
            name:'mike',
            age: 45
        }
    },
    posts(parents, args, {db}){
        if(!args.query) return db.posts
        return db.posts.filter(post=> {
            const query = args.query.toLowerCase()
            const isTitleMatch = post.title.toLowerCase().includes(query)
            const isBodyMatch = post.body.toLowerCase().includes(query)
            return isTitleMatch || isBodyMatch
        })
    },
    post(){
        return {
            id:'092',
            title:'graphQL101',
            body:'',
            published:false
        }
    },
    // parent, args, ctx, info
    greeting(parent, args){
        return `my name is ${args.name}. I am a ${args.job}`
    },
    add(parent, args){
        if (args.numbers.length === 0){
            return 0
        }

        return args.numbers.reduce((acc,item)=>{ return acc + item},0) 
    },
    grades(parent, args, ctx, info){
        return [99, 29,100, 40]
    },
    users(parent, args, {db}, info){
        if(args.query){
            return db.users.filter(el=> {
                return el.name.toLowerCase().includes(args.query.toLowerCase())
            })
        }
        return db.users
    },

    comments(parent,args,{db},info){
        return db.comments
    }

}

module.exports = Query