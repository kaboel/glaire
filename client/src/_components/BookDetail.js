import React from 'react';
import {graphql, compose} from "react-apollo";
import Queries from "../_graphql/queries";
import Mutations from "../_graphql/mutations";

class BookDetail extends React.Component {
    deleteBook(id) {
        let res = window.confirm("Are you sure you want to delete?");
        if (res) try {
            this.props.deleteBook({
                variables: {
                    id: id
                },
                refetchQueries: [
                    {query: Queries.getBooks}
                ]
            })
            document.getElementById("book-details").innerHTML = `<p>No book selected...</p>`
        } catch(err) {
            window.alert('An Error has occurred.');
        }
    }

    handleSelectUpdate(id) {
        let selected = id;
        this.props.onSelectUpdate(selected);
    }

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
                    <div className="float-right">
                        <button className="btn btn-warning mr-2" onClick={ this.handleSelectUpdate.bind(this, book) } >
                            Update
                        </button>
                        <button className="btn btn-danger" onClick={ this.deleteBook.bind(this, book.id) } >
                            Delete
                        </button>
                    </div>
                    <h2>
                        <small>{book.author.name}'s</small><br/>
                        <u>{book.title}</u> <br/>
                        <small>{book.genre}</small>
                    </h2>
                    <> Published: <b>{this.getDate(book.published)}</b>
                    &nbsp;&nbsp;
                    By: <b>{book.publisher.name}</b> </>
                    <hr/>
                    <p>Other books by <b>{book.author.name}</b> </p>
                    <ul className="other-books">
                        {
                            book.author.books.map((item, index) => {
                                if (item.id !== book.id) {
                                    return ( 
                                        <li key={ index }>{ item.title }</li> 
                                    )
                                }
                                return null;
                            })
                        }
                    </ul>
                    <hr/>
                    <p>Books published by <b>{book.publisher.name}</b> </p>
                    <ul className="other-books">
                        {
                            book.publisher.books.map((item, index) => {
                                if (item.id !== book.id) {
                                    return ( 
                                        <li key={ index }>
                                            <b>{item.title}</b> by {item.author.name}
                                        </li> 
                                    )
                                }
                                return null;
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
                <div className="footer">
                    <code>
                        &copy; 2019 <a href="https://github.com/kaboel/glaire" rel="noreferrer noopener" target="_blank">kaboel_gais</a>
                    </code>
                </div>
            </div>
        );
    }
}

export default
compose(
    graphql(Mutations.deleteBook, {name: "deleteBook"}),
    graphql(Queries.getBook, {
        options: props => {
            return {
                variables: {
                    id: props.bookId
                }
            }
        }
    })
)(BookDetail);
