import Axios from 'axios'
import { returnErrors, clearErrors } from './erroresDucks'
//const host = 'https://caseta.herokuapp.com'
const host = 'http://localhost:3001'

//  CONSTANTES
const dataInicial = {
    token: sessionStorage.getItem('token'),
    isAuthenticated: null,
    usuario: null,
    loading: true
}

//  TYPES
const USER_LOADING = 'USER_LOADING'
const USER_LOADED = 'USER_LOADED'
const AUTH_ERROR = "AUTH_ERROR";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAIL = "REGISTER_FAIL";

//REDUCER
export default function authReducer(state = dataInicial, action) {
    switch (action.type) {
        case USER_LOADING:
            return { ...state, loading: false }
        case USER_LOADED:
            return { ...state, isAuthenticated: true, loading: false, usuario: action.payload }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            sessionStorage.setItem('token', action.payload.token);
            return { ...state, ...action.payload, isAuthenticated: true, loading: false }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            sessionStorage.removeItem('token');
            return { ...state, token: null, usuario: null, isAuthenticated: false, loading: false }
        default:
            return state
    }
}

//ACCIONES
//check token y carga usuario
export const loadUsuerAccion = () => async (dispatch, getState) => {

    dispatch({ type: USER_LOADING })

    Axios.get(`${host}/api/auth/user`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })

}


export const login = ({ email, password }) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    Axios.post(`${host}/api/auth/login`, body, config)
        .then(result => {
            //alert("chido")
            dispatch(clearErrors());
            dispatch({ type: LOGIN_SUCCESS, payload: result.data.data });
            dispatch(loadUsuerAccion());
            //console.log('data result:', result.data.data)
        })
        .catch(err => {
            //console.log(err.response)
            dispatch(
                returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
            );
            dispatch({
                type: LOGIN_FAIL
            });
        })

}

// Logout User
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;
    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};