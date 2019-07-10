const gql = require('graphql');

const Book = require('../_models/Book');
const Author = require('../_models/Author');
const Publisher = require('../_models/Publisher');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLNonNull } = gql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        genre: {type: GraphQLString},
        published: {type: GraphQLString},
        author: {
            type: AuthorType,
            async resolve(parent, args) {
                return await Author.findById(parent.authorId);
            }
        },
        publisher: {
            type: PublisherType,
            async resolve(parent, args) {
                return await Publisher.findById(parent.publisherId);
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
            async resolve(parent, args){
                return await Book.find({ authorId: parent.id });
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
            async resolve(parent, args) {
                return await Book.find({ publisherId: parent.id });
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
            async resolve(parent, args) {
                return await Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args) {
                return await Author.findById(args.id);
            }
        },
        publisher: {
            type: PublisherType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args) {
                return await Publisher.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                return await Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve(parent, args) {
                return await Author.find({});
            }
        },
        publishers: {
            type: new GraphQLList(PublisherType),
            async resolve(parent, args) {
                return await Publisher.find({});
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
                authorId: { type: new GraphQLNonNull(GraphQLID) },
                publisherId: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                published: { type: new GraphQLNonNull(GraphQLString) }
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
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
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
                name: { type: new GraphQLNonNull(GraphQLString) }
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
