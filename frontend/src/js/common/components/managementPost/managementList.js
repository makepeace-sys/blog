import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ManagementList extends Component {
    componentWillMount = () => {
        const { listar } = this.props;
        listar();
    }

    render() {

        const { data, approved, deactivate } = this.props

        return (
            <React.Fragment>
                <div className="py-4">
                    <div className="row mb-0 mt-4">
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
                                            <div className="d-flex">
                                                <div>
                                                <button
                                                    type="button"  
                                                    className="btn btn-outline-success btn-sm mr-1"
                                                    onClick={e => approved(items.id)}
                                                >
                                                    <i className="material-icons">check</i>
                                                </button>
                                                </div>
                                                <div>
                                                <button
                                                    type="button" 
                                                    className="btn btn-outline-danger btn-sm mr-1"
                                                    onClick={e => deactivate(items.id)}
                                                >
                                                    <i className="material-icons">delete</i>
                                                </button>
                                                </div>
                                           
                                            </div>

                                                
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