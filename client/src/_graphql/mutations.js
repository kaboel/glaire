import { gql } from 'apollo-boost';

const Mutations = {
    addBook: gql`
        mutation($authorId: ID!, $publisherId: ID!, $title: String!, $genre: String!, $published: String!) {
            addBook(authorId: $authorId, publisherId: $publisherId, title: $title, genre: $genre, published: $published) {
                id, title, genre, published
            }
        }
    `,

    addAuthor: gql`
        mutation($name: String!, $age: Int!) {
            addAuthor(name: $name, age: $age) {
                id, name, age
            }
        }
    `,

    addPublisher: gql`
        mutation($name: String!) {
            addPublisher(name: $name) {
                id, name
            }
        }
    `,

    deleteBook: gql`
        mutation($id: ID!) {
            deleteBook (id: $id) {
                id
            }
        }
    `,

    deleteAuthor: gql`
        mutation($id: ID!) {
            deleteAuthor(id: $id) {
                id
            }
        }
    `,
    deletePublisher: gql`
        mutation($id: ID!) {
            deletePublisher(id: $id) {
                id
            }
        }
    `,
    updateBook: gql`
        mutation($id: ID!, $authorId: ID!, $publisherId: ID!, $title: String!, $genre: String!, $published: String!) {
            updateBook(id: $id, authorId: $authorId, publisherId: $publisherId, title: $title, genre: $genre, published: $published) {
                id, title, genre, published
            }
        }
    `
};

export default Mutations;
