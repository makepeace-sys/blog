import React, { Component } from 'react';
import Grid from "../Utils/Grid";
import SelectUser from './SelectUser'

export default class ReportList extends Component {
    componentWillMount = () => {
        const { getUsers } = this.props
        getUsers()
    };

    componentWillUnmount = () => {
        const { resetValues } = this.props
        resetValues()
    }

    render() {

        const { loader, listarPagePosts, page, loadingUsers } = this.props
        const { data, users, stats, comments } = this.props

        return (
            <React.Fragment>
                <div className="py-4">

                    <div className="row">
                        <div className="mb-4 col-lg-12">
                            <div className="mb-4 card card-small">
                                <div className="p-0 px-3 pt-3">
                                    <h5> Usuario </h5>
                                </div>
                                <div className="border-bottom card-header ">
                                    <SelectUser
                                        users={users}
                                        loadingUsers={loadingUsers}
                                    />
                                </div>

                                <div className="p-3 px-3 pt-4">
                                    <Grid
                                        data={data}
                                        loading={loader}
                                        onPageChange={listarPagePosts}
                                        page={page}
                                        striped
                                    >
                                        <TableHeaderColumn
                                            isKey
                                            dataField="title"
                                            headerAlign="center"
                                            dataSort
                                        >
                                            Posts
                                        </TableHeaderColumn>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-4 col-lg-12">
                            <div className="mb-4 card card-small">
                                <div className="p-3 px-3 pt-3">
                                    <div className="border-bottom card-header d-flex justify-content-center">
                                        <h3>Posts</h3>
                                    </div>
                                    <div className="card-header d-flex justify-content-between">
                                        <div>
                                            <h5>Aprobadas: {stats.approved_posts}</h5>
                                        </div>
                                        <div>
                                            <h5>Rechazadas: {stats.rejected_posts}</h5>
                                        </div>
                                        <div>
                                            <h5>Porcentaje: {stats.approved_percentage} %</h5>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-4 col-lg-12">
                            <div className="mb-4 card card-small">
                                <div className="p-3 px-3 pt-3">
                                    <div className="border-bottom card-header d-flex justify-content-center ">
                                        <h3>Comments </h3>
                                    </div>
                                    <div className=" card-header d-flex justify-content-between ">
                                        <div className="col">
                                            <h4>Post</h4>
                                        </div>
                                        <div className="col">
                                            <h4>Promedio</h4>
                                        </div>
                                        <div className="col">
                                            <h4>Cantidad</h4>
                                        </div>
                                    </div>
                                    {comments.posts &&
                                        comments.posts.map((items, key) => {
                                            return <div className="card-header d-flex ">
                                                <div className="col">
                                                    <h5>{items.post}</h5>
                                                </div>

                                                <div className="col">
                                                    <h5>{items.average}%</h5>
                                                </div>
                                                <div className="col">
                                                    <h5>{items.comments}</h5>
                                                </div>
                                            </div>

                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}