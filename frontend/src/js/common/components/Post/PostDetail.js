import React, { Component } from 'react';
import CommentForm from './CommentForm'

export default class PostDetail extends Component {
    componentWillMount = () => {

        const { match, detail } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            detail(id);
        }
    }

    render() {

        const { data, comments, remove, addComment, user } = this.props
        console.log(user)
        console.log(data.author)
        return (
            <React.Fragment>
                <div className="py-4">
                    <div className="row">
                        <div className="mb-4 col-lg-12">
                            <div className="mb-4 card card-small">
                                <div className="border-bottom card-header d-flex justify-content-between">
                                    <h3 className="m-0">
                                        {data.title}
                                    </h3>

                                    <div>
                                        <a
                                            href={`#/post`}
                                        >
                                            <i
                                                className="material-icons"
                                                style={{ color: 'black', marginRight: '10px' }}
                                            >
                                                arrow_back
                                            </i>
                                        </a>
                                        {data.author && data.author.value == user
                                            &&
                                            <a
                                                href={`#/post/${data.id}/edit`}
                                            >
                                                <i
                                                    className="material-icons text-warning"
                                                    style={{ marginRight: '10px' }}
                                                >
                                                    edit
                                            </i>
                                            </a>
                                        }
                                        {data.author && data.author.value== user
                                            &&
                                            <button
                                                type="button"
                                                className="close"
                                                aria-label="Close"
                                                onClick={() => { remove(data.id) }}>
                                                <i
                                                    className="material-icons"
                                                    style={{ color: 'red', marginRight: '10px' }}
                                                >
                                                    delete
                                            </i>
                                            </button>
                                        }
                                    </div>

                                </div>
                                <div className="p-3 px-3 pt-3">
                                    {data.content}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small">
                            {comments.results &&
                                comments.results.map((items) => {
                                    return <div className="p-3 px-3 pt-3">
                                        <i
                                            className="material-icons"
                                            style={{ marginRight: '10px' }}
                                        >
                                            person
                                            </i>
                                        {items.author.label}

                                        <div className="p-3 px-3 pt-3">
                                            {items.content}

                                        </div>

                                    </div>
                                })}
                            <div className="p-3 px-3 pt-3">
                                <CommentForm
                                    addComment={addComment}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}