const graphql = require('graphql');
var _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList

} = graphql;

var usersData = [
         {id: '1', name: 'Bond', age: 36, profession: 'Programmer'},
         {id: '13', name: 'Anna', age: 26, profession: 'Baker'},
         {id: '211', name: 'Bella', age: 16, profession: 'Mechanic'},
         {id: '19', name: 'Gina', age: 26, profession: 'Painter'},
         {id: '150', name: 'Georgina', age: 36, profession: 'Teacher'}
    ];

var hobbiesData = [
    {id: '1', title: 'Programming', description: 'Using computers to make the world a better place', userId: '150'},
    {id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donouts', userId: '211'},
    {id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '211'},
    {id: '4', title: 'Fencing', description: 'A hobby for fency people', userId: '13'},
    {id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '150'},
];

var postsData = [
    {id: '1', comment: 'Building a Mind', userId: '1'},
    {id: '2', comment: 'GraphQL is Amazing', userId: '1'},
    {id: '3', comment: 'How to Change the World', userId: '19'},
    {id: '4', comment: 'How to Change the World', userId: '211'},
    {id: '5', comment: 'How to Change the World', userId: '1'}
]

//table schema created
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'description for user',
    fields: () => ({
        id: {type: GraphQLString},
        name : {type: GraphQLString},
        age : {type: GraphQLInt},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent,args){
                return _.filter(postsData,{userId: parent.id});
            }
        },
        hobby: {
            type: new GraphQLList(HobbyType),
            resolve(parent,args){
                return _.filter(hobbiesData,{userId: parent.id});
            }
        }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'description for hobby',
    fields: () => ({
        id: {type: GraphQLString},
        title : {type: GraphQLString},
        description : {type: GraphQLString},
        user : {
            type: UserType,
            resolve(parent,argse){
                return _.find(usersData,{id: parent.userId}) //relation here
            }
        }
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'description for post',
    fields: ()=> ({
        id: {type: GraphQLString},
        comment : {type: GraphQLString},
        // userId : {type: GraphQLString}
        user : {
            type: UserType,
            resolve(parent,argse){
                return _.find(usersData,{id: parent.userId}) //relation here
            }
        }
    })
})

//root query


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    description: 'description',
    fields: {
        user: {
            type: UserType,
            args: {id : {type: GraphQLString}},
            resolve(parent,args){
                // let user = {
                //     id:"234",
                //     name: 'mahidulmoon',
                //     age: 25

                // }
                // return user;
                return _.find(usersData,{id: args.id})
            }
        },
        hobby:{
            type: HobbyType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return _.find(hobbiesData,{id: args.id})
            }
        },
        post:{
            type: PostType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                return _.find(postsData,{id: args.id})
            } 
        },
        // all arrays

        hobbies:{
            type: new GraphQLList(HobbyType),
            resolve(parant,args){
                return hobbiesData;
            }
            
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent,args){
                return postsData;
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent,args){
                return usersData;
            }
        }
    }

})

// mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser:{
            type: UserType,
            args:{
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString},
            },
            resolve(parent,args){
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user;
            }
        },
        createPost: {
            type: PostType,
            args:{
                comment: {type: GraphQLString},
                userId: {type: GraphQLID},
            },
            resolve(parent,args){
                let post = {
                    comment: args.comment,
                    userId: args.userId,
                }
                return post;
            }
        },
        createHobby: {
            type: HobbyType,
            args:{
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLString},
            },
            resolve(parent,args){
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                }
                return hobby;
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})