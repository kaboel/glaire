import React from 'react';
import {graphql, compose} from "react-apollo";
import Queries from '../_graphql/queries';
import Mutations from '../_graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class AddPublisher extends React.Component {





    render() {
        return (
            <div></div>
        )
    }
}



export default
compose(
    graphql(Queries.getPublishers, { name: "publishers" }),
    graphql(Mutations.addPublisher, { name: "addPublisher"})
)(AddPublisher);