import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SelectField } from '../Utils/renderField/renderField';


const SelectUser = (props) => {

    const { handleSubmit, users, loadingUsers } = props;

    return (
        <form >
            <div >
                <Field
                    name="user"
                    placeholder="Seleccionar Usuario..."
                    options={users}
                    component={SelectField}
                    onChange={e => loadingUsers(e)}
                />
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'selectForm',
})(SelectUser);