import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from "./_components/BookList";
import AddBook from "./_components/AddBook";

const client = new ApolloClient({
    uri: `http://localhost:8089/v0`
});

class App extends React.Component {
  render() {
      return (
          <ApolloProvider client={ client }>

              <div id="main">
                  <h1>glaire</h1>

                  <BookList />
                  <AddBook />
              </div>

          </ApolloProvider>
      );
  }
}

export default App;
