import React from 'react';
import {graphql} from 'react-apollo';
import Queries from '../_graphql/queries';

import BookDetail from "./BookDetail";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  filter() {
    let books = this.props.data.books
    let key = this.props.keyword;
    return (key) ?
      books.filter(el => `${el.title}`.toLowerCase().includes(key.trim().toLowerCase()))
      : books
  }

  handleSelectUpdate(selected) {
    this.props.onSelectUpdate(selected);
  }

  books() {
    let books = this.filter();
    if (!books) {
      return (<div>Loading Books...</div>)
    } else {
      return books.map(book => {
        return (
          <li key={book.id} onClick={e => {
            this.setState({selected: book.id})
          }}>
            {book.title}
          </li>
        )
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid text-center">
          <ul id="book-list">
            {this.books()}
          </ul>
        </div>
        <div className="container">
          <BookDetail onSelectUpdate={this.handleSelectUpdate.bind(this)} bookId={this.state.selected}/>
        </div>
      </div>
    );
  }
}

export default graphql(Queries.getBooks)(BookList);
