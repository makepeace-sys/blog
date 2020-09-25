import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PostList extends Component {
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render() {

        const { data } = this.props

        return (
            <React.Fragment>
                <div className="py-4">
                    <div className="row mb-5 mt-4">
                        <div className="col-lg-12 d-flex justify-content-end">
                            <Link
                                className="btn btn-outline-primary"
                                to="/post/create"
                            >
                                <i className="material-icons">add</i>
                            </Link>
                        </div>
                    </div>
                    {data.results &&
                        data.results.map((items) => {
                            return <div className="row">
                                <div className="mb-4 col-lg-12">
                                    <div className="mb-4 card card-small">
                                        <div className="border-bottom card-header d-flex justify-content-between">
                                            <h3 className="m-0">
                                                {items.title}
                                            </h3>
                                            <a
                                                href={`#/post/${items.id}/detail`}
                                            >
                                                <i className="material-icons" style={{ color: 'green'}}>remove_red_eye</i>
                                            </a>
                                        </div>
                                        <div className="p-3 px-3 pt-3">
                                            <i className="material-icons" style={{ marginRight: '10px'}}>person</i>
                                            {items.author.label}
                                        </div>
                                        <div className="p-3 px-3 pt-3">
                                            <i className="material-icons" style={{ marginRight: '10px'}}>event</i>
                                            {items.created}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </React.Fragment>
        )
    }

}