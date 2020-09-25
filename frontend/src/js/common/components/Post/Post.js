import React, { Component } from 'react'
import PostForm from './PostForm'

export default class Post extends Component {

    componentWillMount = () => {
        const { match, edit } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            edit(id);
        }

    }


    render() {

        const { onSubmit, match, actualizar } = this.props
        const fn = match.params.id ? actualizar : onSubmit
        const isActualizar = (match.params.id) ? true : false

        return (
            <div className="py-4">

                <div className="row">
                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h3 className="m-0">
                                    {
                                        (isActualizar)
                                            ? 'Detalle Incidente'
                                            : 'Agregar Incidente'
                                    }
                                </h3>
                            </div>
                            <div className="p-0 px-3 pt-3">
                                <PostForm
                                    onSubmit={fn}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}