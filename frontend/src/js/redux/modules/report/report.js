/* Actions of Post */

import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

/* Constants */
const LOADER = 'POST_LOADER'
const SET_DATA_REPORT = 'SET_DATA_REPORT';
const PAGE = 'SET_PAGE';
const SET_USERS = 'SET_USERS'
const SET_USER_ID = 'SET_USER_ID'
const SET_STATS = 'SET_STATS'
const SET_COMMENTS = 'SET_COMENTS'


/* Pure Actions */


const setLoader = loader => ({
    type: LOADER,
    loader,
});

const setData = data => ({
    type: SET_DATA_REPORT,
    data,
});

const setPage = page => ({
    type: PAGE,
    page,
});

const setUsers = users => ({
    type: SET_USERS,
    users,
});

const setUser = userId => ({
    type: SET_USER_ID,
    userId,
});

const setStats = stats => ({
    type: SET_STATS,
    stats,
});

const SetComments = comments => ({
    type: SET_COMMENTS,
    comments,
});


/* Functions */

const getUsers = () => (dispatch) => {

    api.get(`user/users_list`).then((response) => {
            const options = response.map(item => ({
                value: item.id,
                label: item.username,
            }));
            dispatch(setUsers(options));
        })
        .catch((error) => {
            NotificationManager.error(error, 'ERROR', 3000);
        })
        .finally(() => {
        });
};

const loadingUsers = (Id) => (dispatch, getStore) => {
    dispatch(setUser(Id.value))
    dispatch(listPosts(Id.value))

}

const listPosts = (Id) => (dispatch, getStore) => {

    const data ={
        Id
    }

    dispatch(setLoader(true))

    api.get(`reportPost/filterUser`, data).then((response) => {
        
        dispatch(setData(response))
    }).catch((error) => {
        console.log(error)
    }).finally(() => {
        dispatch(setLoader(false));
    }); 

    api.post(`reportPost/stats`, data).then((response) => {
        dispatch(setStats(response))
    })

    api.post(`reportComment/stats`, data).then((response) => {
        console.log(response)
        dispatch(SetComments(response))
    })
    
    
}

// Lista los leads y aplica paginacion 
const listPagePosts = page  => (dispatch, getStore) => {
    
    let { userId } = getStore().selectForm
    const data = { 
        userId: userId,
        page
    }
    

    dispatch(setLoader(true))

    api.get(`leads/filterFunnel`, data).then((response) => {
       
        dispatch(setData(response))
        dispatch(setPage(page));
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        dispatch(setLoader(false));
    }); 
};

const resetValues = () => (dispatch) => {
    dispatch(setData({}))
    dispatch(setStats([]))
    dispatch(SetComments([]))

};

export const actions = {
    getUsers,
    loadingUsers,
    listPosts,
    listPagePosts,
    resetValues,
}

/* Reducers */
const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [SET_DATA_REPORT]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [SET_USERS]: (state, { users }) => {
        return {
            ...state,
            users,
        };
    },
    [SET_USER_ID]: (state, { userId }) => {
        return {
            ...state,
            userId,
        };
    },
    [SET_STATS]: (state, { stats }) => {
        return {
            ...state,
            stats,
        };
    },
    [SET_COMMENTS]: (state, { comments }) => {
        return {
            ...state,
            comments,
        };
    },
}

const initialState = {
    loader: false,
    data: {},
    users: [],
    userId: 0,
    stats: [],
    comments: [],
}

export default handleActions(reducers, initialState);