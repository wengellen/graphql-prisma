const users = [
    {
        id:'1',
        name:'ellen',
        email:'ellen@gmail.com',
        age:27
    },{
        id:'2',
        name:'sarah',
        email:'sarah@gmail.com'

    }
]

const posts = [
    {
        id:'10',
        title:'GraphQL 101',
        body:"This is how to use GraphQL",
        published:true,
        author:'1',
       
    },
    {
        id:'11',
        title:'Node 101',
        body:"This is how to use Node",
        published:true,
        author:'2'
    },
    {
        id:'12',
        title:'Design 101',
        body:"This is how to use Node",
        published:true,
        author:'1'
    }
]

const comments = [
    {
        id:'101',
        body:'Here is the comment',
        author:'1',
        post:'11',
 
    },
    {
        id:'102',
        body:'Here is the comment',
        author:'1',
        post:'12'
    },
    {
        id:'103',
        body:'Here is the comment',
        author:'1',
        post:'11'
    },
]

const db = {
    users,
    posts,
    comments
}

export default db