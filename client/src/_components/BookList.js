import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from "react-apollo";

const getBooks = gql`
    {
        books {
            id
            title
        }
    }
`;

class BookList extends React.Component {
    displayBooks() {
        let data = this.props.data;
        if(data.loading) {
            return ( <div>Loading Books...</div> )
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id}> {book.title} </li>
                )
            });
        }
    }

    render() {
        return (
            <div>
                <ul id="book-list">
                    { this.displayBooks() }
                </ul>
            </div>
        );
    }
}

export default graphql(getBooks)(BookList);
