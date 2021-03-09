import Axios from 'axios';
import { returnErrors } from './erroresDucks'
//const host = 'https://caseta.herokuapp.com'
const host = 'http://localhost:3001'

const dataInicial = {
    encuestas: [],
    llamadas: [],
    encuestaActual: [],
    agentes: [],
    nocontesto: 0,
    mensaje: "",
    loading: false
}

// TYPES
const LOADING = 'LOADING';
const OBTENER_ENCUESTAS_GLOBAL = 'OBTENER_ENCUESTAS_GLOBAL'
const OBTENER_LLAMADAS = 'OBTENER_LLAMADAS'
const CARGA_ENCUESTA_ACTUAL = 'CARGA_ENCUESTA_ACTUAL'
const TOTAL_NOCONTESTO = 'TOTAL_NOCONTESTO'
const ERROR_LLAMADAS = 'ERROR_LLAMADAS'
const ERROR_OBTENER_ENCUESTAS = 'ERROR_OBTENER_ENCUESTAS'
const OBTENER_AGENTES = 'OBTENER_AGENTES'



//  REDUCER
export default function encuestasGlobalReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case OBTENER_ENCUESTAS_GLOBAL:
            return { ...state, encuestas: action.payload, loading: false, nocontesto: 0 }
        case OBTENER_LLAMADAS:
            return { ...state, llamadas: action.payload }
        case CARGA_ENCUESTA_ACTUAL:
            return { ...state, encuestaActual: action.payload, loading: false }
        case TOTAL_NOCONTESTO:
            return { ...state, nocontesto: action.payload, loading: false }
        case ERROR_LLAMADAS:
        case ERROR_OBTENER_ENCUESTAS:
            return { ...state, loading: false }
        case OBTENER_AGENTES:
            return { ...state, agentes: action.payload }
        default:
            return state
    }
}

//ACCIONES
export const obtenerLlamadasAccion = (Encuesta) => async (dispatch, getState) => {
    dispatch({ type: LOADING })
    //console.log(Encuesta)
    try {
        await Axios.post(`${host}/encuestasglobal/llamadas`, Encuesta)
            .then(res => {
                dispatch({ type: OBTENER_LLAMADAS, payload: res.data })
                Axios.post(`${host}/encuestasglobal/nocontesto`, Encuesta)
                    .then(result => {
                        dispatch({ type: TOTAL_NOCONTESTO, payload: result.data.length })
                    })
                dispatch({ type: CARGA_ENCUESTA_ACTUAL, payload: Encuesta })

            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: ERROR_LLAMADAS
                });
            })

    } catch (error) {
        console.log(error)
    }
}


export const obtenerEncuestasAccion = () => async (dispatch, getState) => {

    await Axios.get(`${host}/encuestasglobal/`)
        .then(res =>
            dispatch({
                type: OBTENER_ENCUESTAS_GLOBAL,
                payload: res.data
            }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: ERROR_OBTENER_ENCUESTAS
            });
        })


}

export const obtenerAgentesLlamadas = (encuesta) => async (dispatch, getState) => {
    //console.log({ encuesta })
    await Axios.post(`${host}/encuestasglobal/agentesllamadas`, encuesta)
        .then(res =>
            dispatch({
                type: OBTENER_AGENTES,
                payload: res.data
            }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: ERROR_LLAMADAS
            });
        })


}
