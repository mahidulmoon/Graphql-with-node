const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLFloat,
} = graphql;


const Person = new GraphQLObjectType({
    name: 'person',
    description: 'description',
    fields: () => ({
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        age: {type : GraphQLInt},
        isMarried: {type: graphql.GraphQLBoolean},
        gpa: {type: GraphQLFloat},
        justaType:{
            type: Person,
            resolve(parent,args){
                return parent;
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        person: {
            type: Person,
            //args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                  //we resolve with data
                  //get and return data from a datasource

                  let personObj = {
                      //id: {type: GraphQLID},
                      name: 'Mahidul',
                      age: 34,
                      isMarried: true,
                      gpa: 4.0,

                  };

                   return personObj;
                  }
       }
         
       
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
})