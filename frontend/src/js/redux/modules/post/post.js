/* Actions of Post */

import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { reset } from 'redux-form';

/* Constants */
const SUBMIT = 'POST_SUBMIT'
const COMMENT_SUBMIT = 'COMMENT_SUBMIT'
const LOADER = 'POST_LOADER'
const SET_DATA = 'SET_DATA';
const SET_COMMENTS = 'SET_COMMENTS'
const SET_USERID = 'SET_USERID'


/* Pure Actions */

export const constants = {
    SUBMIT,
    COMMENT_SUBMIT,
};

const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setData = data => ({
    type: SET_DATA,
    data,
});

const setComments = comments => ({
    type: SET_COMMENTS,
    comments,
});

const setUser = user => ({
    type: SET_USERID,
    user,
});

/* Functions */

const onSubmit = () => (dispatch, getStore) => {
    const { values } = getStore().form.postForm;
    let user = getStore().form.profile.values

    values.author = user.id

    api.post('post', values).then((response) => {
        NotificationManager.success('Post registrado correctamente', 'Éxito', 1000);
        dispatch(push('/post'));
    }).catch(() => {
        NotificationManager.error('Verifica si el nombre no se repite', 'ERROR', 3000);
    });
};

const addComment = () => (dispatch, getStore) => {
    const { values } = getStore().form.commentForm
    const { data } = getStore().post
    let user = getStore().form.profile.values

    values.author = user.id
    values.post = data.id

    api.post('comment', values).then((response) => {
        NotificationManager.success('Comentario agregado', 'Éxito', 1000);
        
    }).catch(() => {
        NotificationManager.error('No se puede comentar', 'ERROR', 3000);
    }).finally(() => {
        dispatch(detail(data.id))
        dispatch(reset('commentForm'))
    });

    

};

const listar = () => (dispatch) => {

    api.get('post').then((response) => {

        dispatch(setData(response));
    }).catch(() => {
    }).finally(() => {

    });
};

const actualizar = () => (dispatch, getStore) => {

    const { values } = getStore().form.postForm;
    let user = getStore().form.profile.values

    const data = {
        title: values.title,
        content: values.content,
        author: user.id
    };

    api.put(`post/${values.id}`, data).then(() => {
        NotificationManager.success('Post se actualizó correctamente', 'Éxito', 1000);
        dispatch(push('/post'));
    }).catch((err) => {
        console.log(err)
    });
};

const edit = id => (dispatch) => {


    api.get(`post/${id}`).then((response) => {
        dispatch(initializeForm('postForm', response));
    }).catch((error) => {
        NotificationManager.error(error.detail, 'ERROR', 0);
    }).finally(() => {

    });
};

const detail = id => (dispatch, getStore) => {
    const params = {
        id
    }

    let user = getStore().form.profile.values
    dispatch(setUser(user.id))

    api.get(`post/${id}`).then((response) => {
        dispatch(setData(response))
    })

    api.get(`comment/filterPost`, params).then((response) => {
        console.log(response)
        dispatch(setComments(response))
    })
};

const remove = id => (dispatch, getStore) => {

    api.eliminar(`post/${id}`).then(() => {
        NotificationManager.success('Post eliminado correctamente', 'Éxito', 1000);
    }).catch(() => {
        NotificationManager.error('Hubo error en la eliminación', 'ERROR', 0);
    }).finally(() => {
        dispatch(push('/post'))
    });


};

export const actions = {
    detail,
    listar,
    onSubmit,
    remove,
    actualizar,
    edit,
    addComment,
}

/* Reducers */
const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_COMMENTS]: (state, { comments }) => {
        return {
            ...state,
            comments,
        };
    },
    [SET_USERID]: (state, { user }) => {
        return {
            ...state,
            user,
        };
    },
}

const initialState = {
    loader: false,
    data: {},
    comments: {},
    user: 0,
}

export default handleActions(reducers, initialState);