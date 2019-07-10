import { gql } from 'apollo-boost';

const Mutations = {
    addBook: gql`
        mutation($authorId: ID!, $publisherId: ID!, $title: String!, $genre: String!, $published: String!) {
            addBook(authorId: $authorId, publisherId: $publisherId, title: $title, genre: $genre, published: $published) {
                id
                title
            }
        }
    `
};

export default Mutations;
