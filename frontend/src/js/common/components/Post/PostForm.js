import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validators } from 'validate-redux-form';
import { renderField, renderTextArea } from '../Utils/renderField';


const PostForm = (props) => {

    const { handleSubmit, actualizar } = props;

    return (

        <form onSubmit={handleSubmit} className="form-validate mb-lg" >
            <div >
                <label>Titulo</label>
                <Field
                    name="title"
                    className='form-control'
                    component={renderField}
                />

                <label>Descripcion</label>
                <Field
                    name="content"
                    className='form-control'
                    component={renderTextArea}  
                />
            </div>
           

            <div className="row mb-5 mt-4">
                <div className="col-lg-12 d-flex justify-content-end">

                    <a
                        href="/#/post"
                        className="btn btn-outline-secondary btn-sm mr-1"
                    >
                        Cancelar
                    </a>
                    
                    <button
                        className="btn btn-outline-primary btn-sm mr-1">
                        {actualizar ? 'Actualizar ' : 'Registrar '}
                    </button>
                    
                </div>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'postForm', // a unique identifier for this form
    /* validate: (data) => {
        return validate(data, {
            name: validators.exists()('Campo es requerido'),
            commission_percentage: validators.exists()('Campo es requerido'),
        });
    }, */
})(PostForm);