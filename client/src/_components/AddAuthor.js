import React from 'react';
import {graphql, compose} from "react-apollo";
import Queries from '../_graphql/queries';
import Mutations from '../_graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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

    render() {
        return (
            <form id="add-author" onSubmit={this.handleAddAuthor.bind(this)}>
                
            </form>
        )
    }
}


export default
compose(
    graphql(Queries.getAuthors, { name: "authors" }),
    graphql(Mutations.addAuthor, { name: "addAuthor"})
)(AddAuthor);

