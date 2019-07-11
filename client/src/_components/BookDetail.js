import React from 'react';
import {graphql} from "react-apollo";
import Queries from "../_graphql/queries";

class BookDetail extends React.Component {
    getDate(ms) {
        let date = new Date(parseInt(ms));
        return date.getFullYear();
    }

    book() {
        const { book, loading } = this.props.data;
        if (loading) {
            return (<p>Fetching data...</p>)
        } else if(book) {
            return (
                <div className="details">
                    <h2>
                        <span>{book.author.name}</span><br/>
                        {book.title} <br/>
                        <span>{book.genre}</span>
                    </h2>
                    <p> Published: <b>{this.getDate(book.published)}</b> </p>
                    <p> By: <b>{book.publisher.name}</b> </p>
                    <hr/>
                    <p> Books by <b>{book.author.name}</b> </p>
                    <ul className="other-books">
                        {
                            book.author.books.map(item => {
                                return ( <li key={ item.id }>{ item.title }</li> )
                            })
                        }
                    </ul>
                    <hr/>
                    <p> Books published by <b>{book.publisher.name}</b> </p>
                    <ul className="other-books">
                        {
                            book.publisher.books.map(item => {
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
