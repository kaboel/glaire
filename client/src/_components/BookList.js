import React from 'react';
import { graphql } from 'react-apollo';
import Queries from '../_graphql/queries';

import BookDetail from "./BookDetail";

class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }

    books() {
        let data = this.props.data;
        if (data.loading) {
            return ( <div>Loading Books...</div> )
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id}
                        onClick={ e => { this.setState({ selected: book.id })} }>
                        {book.title}
                    </li>
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
                <BookDetail bookId={ this.state.selected } />
            </div>
        );
    }
}

export default graphql(Queries.getBooks)(BookList);
