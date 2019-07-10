import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from "./_components/BookList";

const client = new ApolloClient({
    uri: `http://localhost:8089/v0`
});

class App extends React.Component {
  render() {
      return (
          <ApolloProvider client={ client }>

              <div id="main">
                  <h1>My Reading List</h1>

                  <BookList />
              </div>

          </ApolloProvider>
      );
  }
}

export default App;
