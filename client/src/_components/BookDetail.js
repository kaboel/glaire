import React from 'react';
import {graphql} from "react-apollo";
import Queries from "../_graphql/queries";

class BookDetail extends React.Component {
    book() {
        const { book, loading } = this.props.data;
        if (loading) {
            return (<p>Fetching data...</p>)
        } else if(book) {
            return (
                <div>
                    <h2> {book.title} </h2>
                    <p> {book.genre} </p>
                    <p> {book.published} </p>
                    <p> By: {book.author.name} </p>
                    <hr/>
                    <p> Books by {book.author.name} </p>
                    <ul className="other-books">
                        {
                            book.author.books.map(item => {
                                return ( <li key={ item.id }>{ item.title }</li> )
                            })
                        }
                    </ul>
                </div>
            )
        } else {
            return (<p>No book selected...</p>)
        }
    }

    render() {
        return (
            <div id="book-details">
                { this.book() }
            </div>
        );
    }
}

export default
graphql(Queries.getBook, {
    options: props => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetail);
