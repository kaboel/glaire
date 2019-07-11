import React from 'react';
import {graphql, compose} from "react-apollo";
import Queries from '../_graphql/queries';
import Mutations from '../_graphql/mutations';

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
            return(<option>Fetching Authors...</option>);
        } else {
            return data.authors.map(author=> {
                return (
                    <option key={ author.id } value={ author.id }>
                        { author.name }
                    </option>
                )
            })
        }
    }

    publishers() {
        let data = this.props.publishers;
        if (data.loading) {
            return(<option>Fetching Publishers...</option>);
        } else {
            return data.publishers.map(publisher => {
                return (
                    <option key={ publisher.id } value={ publisher.id }>
                        { publisher.name }
                    </option>
                )
            })
        }
    }

    submitForm(e) {
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

    render() {
        return (
            <form id="add-book" onSubmit={ this.submitForm.bind(this) }>

                <div className="field">
                    <label>Title: </label>
                    <input onChange={ e => { this.setState({ title: e.target.value })} }/>
                </div>
                <div className="field">
                    <label>Genre: </label>
                    <input onChange={ e => { this.setState({ genre: e.target.value }) } }/>
                </div>
                <div className="field">
                    <label>Author: </label>
                    <select onChange={ e => this.setState({ authorId: e.target.value }) }>
                        <option value="" disabled selected>Select Author</option>
                        { this.authors() }
                    </select>
                </div>
                <div className="field">
                    <label>Published: </label>
                    <input type="date" onChange={ e => this.setState({ published: e.target.value }) }/>
                </div>
                <div className="field">
                    <label>Publisher: </label>
                    <select onChange={ e => this.setState({ publisherId: e.target.value })}>
                        <option value="" disabled selected>Select Publisher</option>
                        { this.publishers() }
                    </select>
                </div>

                <button type="submit">+</button>

            </form>
        );
    }
}

export default
compose(
    graphql(Queries.getAuthors, { name: "authors" }),
    graphql(Queries.getPublishers, { name: "publishers" }),
    graphql(Mutations.addBook, { name: "addBook" })
)(AddBook);
