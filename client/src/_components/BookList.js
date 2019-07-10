import React from 'react';
import { graphql } from 'react-apollo';
import Queries from '../_graphql/queries';

class BookList extends React.Component {
    books() {
        let data = this.props.data;
        if (data.loading) {
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
                    { this.books() }
                </ul>
            </div>
        );
    }
}

export default graphql(Queries.getBooks)(BookList);
