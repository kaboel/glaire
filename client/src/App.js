import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from "./_components/BookList";
import AddBook from "./_components/AddBook";
import AddAuthor from "./_components/AddAuthor";
import AddPublisher from "./_components/AddPublisher";

const client = new ApolloClient({
  uri: `http://localhost:8089/v0`
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0,
      keyword: null,
      selectUpdate: null,
    }
  }

  handleViewMode(mode) {
    this.setState(state => ({ mode }))
  }

  handleSelectUpdate(selected) {
    this.setState(state => ({ selectUpdate: selected }))
  }

  handleClearSelected() {
    this.setState(state => ({ selectUpdate: null }))
  }

  viewMode() {
    let mode = this.state.mode;
    if (mode === 0) {
      return (
        <div>
          <AddBook selected={ this.state.selectUpdate }
                   onClearSelected={ this.handleClearSelected.bind(this) }
                   setMode={ this.handleViewMode.bind(this) }/>
        </div>
      )
    } else if(mode === 1) {
      return (
        <div>
          <AddAuthor setMode={ this.handleViewMode.bind(this) }/>
        </div>
      )
    } else if(mode === 2) {
      return (
        <div>
          <AddPublisher setMode={ this.handleViewMode(this) } />
        </div>
      )
    }
  }

  render() {
    return (
      <ApolloProvider client={ client }>
        <div id="main">
          <div className="container-fluid pt-4 pb-4">
            <div className="row d-flex justify-content-center">
              <div className="col-md-5 text-center">
                <h1>glaire@MyBooks</h1>
                <input type="text" placeholder="Search" className="form-control"
                       onChange={e => this.setState({ keyword: e.target.value})}/>
              </div>
            </div>
          </div>
          <BookList keyword={ this.state.keyword } onSelectUpdate={ this.handleSelectUpdate.bind(this) }/>
          { this.viewMode() }
        </div>

      </ApolloProvider>
    );
  }
}

export default App;
