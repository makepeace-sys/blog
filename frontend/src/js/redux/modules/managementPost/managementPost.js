/* Actions of Post */

import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";
import {reset} from 'redux-form';

/* Constants */
const SET_DATA = 'SET_DATA_MANAGEMENT';


/* Pure Actions */

const setData = data => ({
    type: SET_DATA,
    data,
});



/* Functions */

const listar = () => (dispatch) => {
    
    api.get('management').then((response) => {
        
        dispatch(setData(response));
    }).catch(() => {
    }).finally(() => {
        
    });
};

const approved = (id) => (dispatch) => {
    
    api.post('management/approved', id).then((response) => {
        dispatch(listar());
        NotificationManager.success('Post Aprobado', 'Éxito', 1000);
    }).catch(() => {
    }).finally(() => {
        
    });
};

const deactivate = id => (dispatch) => {
    api.post(`management/remove`, id).then(() => {
        dispatch(listar())
        NotificationManager.success('Post eliminado correctamente', 'Éxito', 1000);
    }).catch((err) => {
        console.log(err)
        NotificationManager.error('Hubo error en la eliminación', 'ERROR', 0);
    });
};

export const actions = {
  listar,
  approved,
  deactivate,
}

/* Reducers */
const reducers = {
    [SET_DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
}

const initialState = {
    data: {},
}

export default handleActions(reducers, initialState);