const gql = require('graphql');
const _ = require('lodash');

const Book = require('../_models/Book');
const Author = require('../_models/Author');
const Publisher = require('../_models/Publisher');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = gql;

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
                return Author.findById(parent.authorId);
            }
        },
        publisher: {
            type: PublisherType,
            resolve(parent, args) {
                return Publisher.findById(parent.publisherId);
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
                return Book.find({ authorId: parent.id });
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
                return Book.find({ publisherId: parent.id });
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
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        publisher: {
            type: PublisherType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Publisher.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
                return Author.find({});
            }
        },
        publishers: {
            type: new GraphQLList(PublisherType),
            resolve(parent, args) {
                // return publishers;
                return Publisher.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BookType,
            args: {
                authorId: { type: GraphQLID },
                publisherId: { type: GraphQLID },
                title: { type: GraphQLString },
                genre: { type: GraphQLString },
                published: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let book = new Book({
                    authorId: args.authorId,
                    publisherId: args.publisherId,
                    title: args.title,
                    genre: args.genre,
                    published: args.published
                });

                try {
                    return book.save();
                } catch(err) {
                    console.log(err.message);
                }
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });

                try {
                    return author.save();
                } catch (err) {
                    console.log(err.message);
                }
            }
        },
        addPublisher: {
            type: PublisherType,
            args: {
                name: { type: GraphQLString }
            },
            resolve(parent, args) {
                let publisher = new Publisher({
                    name: args.name
                });

                try {
                    return publisher.save();
                } catch(err) {
                    console.log(err.message);
                }
            }
        }
    }
});

const SCHEMA = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

module.exports = SCHEMA;
