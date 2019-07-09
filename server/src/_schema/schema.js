const gql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = gql;

let books = [
    {title: 'Name of the Wind', genre: 'Fantasy', year: '2011', id: '1', authorId: '1', publisherId: '2'},
    {title: 'The Final Empire', genre: 'Fantasy', year: '2014', id: '2', authorId: '2', publisherId: '3'},
    {title: 'The Long Earth', genre: 'Sci-Fi', year: '2012', id: '3', authorId: '3', publisherId: '2'},
    {title: 'The Hero of Ages', genre: 'Fantasy', year: '2016', id: '4', authorId: '2', publisherId: '1'},
    {title: 'The Color of Magic', genre: 'Fantasy', year: '2014', id: '5', authorId: '3', publisherId: '3'},
    {title: 'The Light Fantastic', genre: 'Fantasy', year: '2013', id: '6', authorId: '3', publisherId: '3'}
];

let authors = [
    {name: 'Patrick Star', age: 44, id: '1'},
    {name: 'Brandon Smith', age: 42, id: '2'},
    {name: 'Terry James', age: 68, id: '3'}
];

let publishers = [
    {name: 'Hachette Livre', id: '1'},
    {name: 'Springer Nature', id: '2'},
    {name: 'Harper-Collins', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        year: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId })
            }
        },
        publisher: {
            type: PublisherType,
            resolve(parent, args) {
                return _.find(publishers, { id: parent.publisherId })
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
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
});

const PublisherType = new GraphQLObjectType({
    name: 'Publisher',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { publisherId: parent.id })
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
        publisher: {
            type: PublisherType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(publishers, { id: args.id })
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
        },
        publishers: {
            type: new GraphQLList(PublisherType),
            resolve(parent, args) {
                return publishers;
            }
        }
    }
});

const SCHEMA = new GraphQLSchema({
    query: RootQuery
});

module.exports = SCHEMA;
