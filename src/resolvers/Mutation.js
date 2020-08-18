import {v4 as uuidv4} from 'uuid'

const Mutation =   {
    createUser(parent,args,{db}, info){
        const emailTaken = db.users.some(user=>user.email === args.data.email)
        if(emailTaken){
            throw new Error('Email taken')
        }
        
        const user ={
            id:uuidv4(),
            ...args.data
        }
        console.log("uuid",uuidv4())
        db.users.push(user)

        return user
    },
    deleteUser(parent,args,{db},info){
        const userIndex = db.users.findIndex(user=> user.id === args.id)
        if(userIndex === -1) {
            throw new Error('User not found')
        }
        const deletedUsers = db.users.splice(userIndex, 1)
        posts = db.posts.filter(post=> {
            const authtorMatch =  post.author === args.id
            if(authtorMatch){
                comments = comments.filter((comment)=> comment.post !==post.id)
            }
            return !authtorMatch
        })
        
        comments = db.comments.filter(comment => comment.author === args.id)
        return deletedUsers[0]
        
    },
    
    updateUser(parent, args, {db}, info){
        const {id, data} = args
        const user = db.users.find(user=>user.id === id)
        if(!user){
            throw new Error('No User Found')
        }

        if(typeof data.email=== "string"){
            const emailTaken = db.users.some((user) => user.email === data.email)

            if(emailTaken){
                throw new Error('Email taken')
            }

            user.email = data.email
        }
        if(typeof data.name === "string"){
            user.name = data.name
        }

        if(typeof data.age !== 'undefined'){
            user.age = data.age
        }
        return user
    },

    createPost(parent,args,{db, pubsub},info){
        const userExist = db.users.some(user=> user.id === args.data.author)
        if(!userExist){
            throw new Error('User not found')
        }

        const post = {
            id:uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        if(args.data.published){
            pubsub.publish('post', 
            {
                post:{mutation:'CREATED', data:post}})
        }

        return post
    },

    updatePost(parent, args, {pubsub,db}, info){
        const {id, data} = args
        const post = db.posts.find(post=>post.id === id)
        const originalPost = {...post}
        if(!post){
            throw new Error('Post does not exist')
        }
        if(typeof data.title === 'string'){
            post.title = data.title
        }

        if(typeof data.body === 'string'){
            post.body =data.body

        }
        
        if(typeof data.published === 'boolean'){
            post.body =data.body
            
            if(originalPost.published && !data.published){
                // deleted
                pubsub.publish('post',{
                    post:{
                        mutation:"DELETED",
                        data:originalPost
                    }
                })
            }else if(!originalPost.published && data.published){
                // created
                pubsub.publish('post',{
                    post:{
                        mutation:"CREATED",
                        data:post
                    }
                })
            }
        }else if(post.published){
            // not upated and original 
            pubsub.publish('post',{
                post:{
                    mutation:"UPDATED",
                    data:post
                }
            })
        }
        return post
    },

    deletePost(parent,args, {pubsub, db}, info){
        const postIndex = db.posts.findIndex(post => post.id === args.id)
        if(postIndex === -1){
            throw new Error('No Post found')
        }

        const [post] = db.posts.splice(postIndex, 1)

        if(db.comments.length > 0){
            db.comments = db.comments.filter(comment => comment.post !== args.id)
        }
      

        if(post.published){
            pubsub.publish('post', {post:{mutation:'DELETED', data:post}})
        }
        return post
    },

    createComment(parent,args,{db, pubsub},info){
        const userExist = db.users.some(user=> user.id === args.data.author)
        if(!userExist){
            throw new Error('User does not exist')
        }
        
        const postExist = db.posts.some(post=> post.id === args.data.post)
        if(!postExist){
            throw new Error("Post not found")
        }

        const comment = {
            id:uuidv4(),
            ...args.data
        }
        
        db.comments.push(comment)
        console.log(`comment ${args.data.post}`)
        pubsub.publish(`comment ${args.data.post}`, {comment})

        return comment
    },
    updateComment(parent, args, {db}, info){
        const {id, data } = args
        const comment = db.comments.find(comment=>comment.id === id)
        if(!comment){
            throw new Error('No comment found')
        }
        if(typeof data.body === 'string'){
            comment.body = data.body
        }
       

        return comment
    }
}

module.exports = Mutation