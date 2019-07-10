import { gql } from 'apollo-boost';

const Mutations = {
    addBook: gql`
        mutation {
            addBook(title: "", genre: "", published: "", publisherId: "", authorId: "" ) {
                id
                title
            }
        }
    `
};

export default Mutations;
