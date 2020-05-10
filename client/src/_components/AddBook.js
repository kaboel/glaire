import React from 'react';
import {graphql, compose} from "react-apollo";
import Queries from '../_graphql/queries';
import Mutations from '../_graphql/mutations';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faCheck, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      id: null,
      authorId: null,
      publisherId: null,
      title: null,
      genre: null,
      published: null
    }
  }

  authors() {
    let data = this.props.authors;
    if (data.loading) {
      return (<option>Fetching Authors...</option>);
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        )
      })
    }
  }

  publishers() {
    let data = this.props.publishers;
    if (data.loading) {
      return (<option>Fetching Publishers...</option>);
    } else {
      return data.publishers.map(publisher => {
        return (
          <option key={publisher.id} value={publisher.id}>
            {publisher.name}
          </option>
        )
      })
    }
  }

  handleInitUpdateMode() {
    this.setState(state => ({}))
  }

  handleAddBook(e) {
    e.preventDefault();
    this.props.addBook({
      variables: {
        authorId: this.state.authorId,
        publisherId: this.state.publisherId,
        title: this.state.title,
        genre: this.state.genre,
        published: this.state.published
      },
      refetchQueries: [
        {query: Queries.getBooks}
      ]
    });
  }

  handleUpdateBook(e) {
    e.preventDefault();
  }

  clearSelected() {
    this.props.onClearSelected(null);
  }

  getDate(ms) {
    let date = new Date(parseInt(ms));

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    return year + "-" + month + "-" + day;
  }

  setMode(mode) {
    this.props.setMode(mode)
  }

  render() {
    let book = this.props.selected;
    console.log(book)
    if (book) {
      return (
        <form id="add-book" onSubmit={this.handleUpdateBook.bind(this)}>
          <div className="row mb-3">
            <div className="col-md-1 text-center">
              <FontAwesomeIcon size="2x"
                               className="mt-2 back-btn"
                               icon={faArrowLeft}
                               onClick={this.clearSelected.bind(this)}/>
            </div>
            <div className="col">
              <span className="h2">Update <u>{book.title}</u></span><br/>
              <small>({book.id})</small>
            </div>
          </div>

          <div className="field form-group">
            <label>Title</label>
            <input className="form-control"
                   onChange={e => {
                     this.setState({title: e.target.value})
                   }}
                   value={book.title}/>
          </div>
          <div className="field form-group">
            <label>Genre </label>
            <input className="form-control"
                   value={book.genre}
                   onChange={e => {
                     this.setState({genre: e.target.value})
                   }}/>
          </div>
          <div className="field form-group">
            <label>Author </label>
            <div className="input-group mb-3">
              <select defaultValue={book.author.id}
                      className="form-control"
                      onChange={e => this.setState({authorId: e.target.value})}>
                <option value="0" disabled>Select Author</option>
                {this.authors()}
              </select>
              <div className="input-group-append">
                <button className="btn btn-success"
                        onClick={this.setMode.bind(this, 1)}
                        type="button">
                  <FontAwesomeIcon size="xs" icon={faPlus}/>
                </button>
              </div>
            </div>
          </div>
          <div className="field form-group">
            <label>Published </label>
            <input className="form-control"
                   type="date"
                   value={this.getDate(book.published)}
                   onChange={e => this.setState({published: e.target.value})}/>
          </div>
          <div className="field form-group">
            <label>Publisher </label>
            <div className="input-group mb-3">
              <select defaultValue={book.publisher.id}
                      className="form-control"
                      onChange={e => this.setState({publisherId: e.target.value})}>
                <option value="0" disabled>Select Publisher</option>
                {this.publishers()}
              </select>
              <div className="input-group-append">
                <button className="btn btn-success"
                        onClick={this.setMode.bind(this, 2)}
                        type="button">
                  <FontAwesomeIcon size="xs" icon={faPlus}/>
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-circular">
            <FontAwesomeIcon size="xs" icon={faCheck}/>
          </button>

        </form>
      );
    } else {
      book = null;
      this.setState(state => {
        this.getInitialState()
      });
      return (
        <form id="add-book" onSubmit={this.handleAddBook.bind(this)}>
          <h2>
            Add A Book
          </h2><br/>

          <div className="field form-group">
            <label>Title</label>
            <input className="form-control" onChange={e => {
              this.setState({title: e.target.value})
            }}/>
          </div>
          <div className="field form-group">
            <label>Genre </label>
            <input className="form-control" onChange={e => {
              this.setState({genre: e.target.value})
            }}/>
          </div>
          <div className="field form-group">
            <label>Author </label>
            <div className="input-group mb-3">
              <select defaultValue="0" className="form-control"
                      onChange={e => this.setState({authorId: e.target.value})}>
                <option value="0" disabled>Select Author</option>
                {this.authors()}
              </select>
              {/* <div className="input-group-append">
                                <button className="btn btn-success"
                                        onClick={ this.setMode.bind(this, 1)}
                                        type="button">
                                    <FontAwesomeIcon size="xs" icon={ faPlus } />
                                </button>
                            </div> */}
            </div>
          </div>
          <div className="field form-group">
            <label>Published </label>
            <input className="form-control" type="date" onChange={e => this.setState({published: e.target.value})}/>
          </div>
          <div className="field form-group">
            <label>Publisher </label>
            <div className="input-group mb-3">
              <select defaultValue="0" className="form-control"
                      onChange={e => this.setState({publisherId: e.target.value})}>
                <option value="0" disabled>Select Publisher</option>
                {this.publishers()}
              </select>
              {/* <div className="input-group-append">
                                <button className="btn btn-success"
                                        onClick={ this.setMode.bind(this, 2)}
                                        type="button">
                                    <FontAwesomeIcon size="xs" icon={ faPlus } />
                                </button>
                            </div> */}
            </div>
          </div>
          <button type="submit" className="btn-circular">
            <FontAwesomeIcon size="xs" icon={faPlus}/>
          </button>

        </form>
      );
    }
  }
}

export default compose(
  graphql(Queries.getAuthors, {name: "authors"}),
  graphql(Queries.getPublishers, {name: "publishers"}),
  graphql(Mutations.addBook, {name: "addBook"}),
  graphql(Mutations.updateBook, {name: "updateBook"})
)(AddBook);
