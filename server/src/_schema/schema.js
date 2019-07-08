const gql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = gql;

let books = [
    {title: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {title: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
    {title: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {title: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {title: 'The Color of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
    {title: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
];

let authors = [
    {name: 'Patrick Star', age: 44, id: '1'},
    {name: 'Brandon Smith', age: 42, id: '2'},
    {name: 'Terry James', age: 68, id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // get data from source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
    }
});

const SCHEMA = new GraphQLSchema({
    query: RootQuery
});

module.exports = SCHEMA;
