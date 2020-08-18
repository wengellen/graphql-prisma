const Subscription = {
    count:{
        subscribe(parent, args, {pubsub}, info){
            let count = 0;

            setInterval(()=>{
                count++
                pubsub.publish('countChannel', {
                    count
                })
            },1000)
            //return pubsub.asyncIterator('countChannel')
        }
    },
    comment:{
        subscribe(parent,{postId},{db, pubsub}, info){
            const post = db.posts.find(post=> post.id === postId)
            
            if(!post){
                throw new Error("no post found")
            }
            console.log("comment ${postId}",`comment ${postId}`)
            return pubsub.asyncIterator(`comment ${postId}`)
        }
    },

    post:{
        subscribe(parent, args, {pubsub}, info){
            return pubsub.asyncIterator('post')
        }

    }


}

module.exports = Subscription