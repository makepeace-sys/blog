import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validators } from 'validate-redux-form';
import { renderTextArea } from '../Utils/renderField';


const CommentForm = (props) => {

    const { addComment } = props;

    return (

        <form className="form-validate mb-lg" >
            <div >
                <label>Comentario</label>
                <Field
                    name="content"
                    className='form-control'
                    component={renderTextArea}
                />

            </div>
           

            <div className="row mb-3 mt-4">
                <div className="col-lg-12 d-flex justify-content-end">
                    <button
                        type='button'
                        className="btn btn-primary"
                        onClick={() => addComment()}
                    >
                        Agregar Comentario
                    </button>
                    
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'commentForm', // a unique identifier for this form
    /* validate: (data) => {
        return validate(data, {
            name: validators.exists()('Campo es requerido'),
            commission_percentage: validators.exists()('Campo es requerido'),
        });
    }, */
})(CommentForm);