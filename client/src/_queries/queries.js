import { gql } from 'apollo-boost';

const Queries = {
    getBooks: gql`
        {
            books {
                id
                title
            }
        }
    `,
    getAuthors: gql`
        {
            authors {
                id
                name
            }
        }
    `,
    getPublishers: gql`
        {
            publishers {
                id
                name
            }
        }
    `
};

export default Queries;
