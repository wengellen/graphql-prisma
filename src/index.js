import {GraphQLServer, PubSub} from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Subscription from './resolvers/Subscription'
import db from './db'

const pubsub = new PubSub()
// emo user data

// Type definition
// Scalar Types - String, Boolean, Int, Float, ID



// Resolver
const resolvers = {

}

const server = new GraphQLServer(
    {
        typeDefs:'./src/schema.graphql',
        resolvers: {
            Query,
            Mutation,
            User,
            Post,
            Comment,
            Subscription
        },
        context:{
            db,
            pubsub
        }
    }
)

server.start(()=>{
    console.log('The server is up')
})

