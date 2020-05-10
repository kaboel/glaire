import React from 'react';
import {graphql, compose} from "react-apollo";
import Queries from '../_graphql/queries';
import Mutations from '../_graphql/mutations';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faCheck, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

class AddAuthor extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      name: null,
      age: null
    }
  }

  handleAddAuthor() {

  }

  handleSetMode(mode) {
    this.props.setMode(mode);
  }

  render() {
    return (
      <form id="add-author" onSubmit={this.handleAddAuthor.bind(this)}>
        <div className="row mb-3">
          <div className="col-md-1 text-center">
            <FontAwesomeIcon size="2x"
                             className="mt-2 back-btn"
                             icon={faArrowLeft}
                             onClick={this.handleSetMode.bind(this, 0)}/>
          </div>
          <div className="col">
            <span>Add Author</span>
          </div>
        </div>
      </form>
    )
  }
}


export default compose(
  graphql(Queries.getAuthors, {name: "authors"}),
  graphql(Mutations.addAuthor, {name: "addAuthor"})
)(AddAuthor);

