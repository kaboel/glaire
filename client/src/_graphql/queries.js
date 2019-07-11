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
    `,
    getBook: gql`
        query($id: ID) {
            book(id: $id) {
                id
                title
                genre
                author {
                    name
                    books {
                        title
                        genre
                        published
                    }
                }
                publisher {
                    name
                    books {
                        title
                        genre
                        author {
                            name
                        }
                    }
                }
                published
            }
        }
    `
};

export default Queries;
