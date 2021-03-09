import Axios from 'axios'
import { returnErrors } from './erroresDucks'

//const host = 'https://caseta.herokuapp.com'
const host = 'http://localhost:3001'

//  Constantes
const dataInicial = {
    encuesta: [],
    encuestaActual: [],
    persona: [],
    respuestas: [],
    mensaje: "",
    datosllamada: [],
    loading: false
}


//  Types
const LOADING_ENCUESTA_USR = 'LOADING_ENCUESTA_USR'
const OBTENER_ENCUESTAS = 'OBTENER_ENCUESTAS'
const OBTENER_PERSONA_RANDOM = 'OBTENER_PERSONA_RANDOM'
const NO_CONTESTO = 'NO_CONTESTO'
const AGREGA_RESPUESTAS = 'AGREGA_RESPUESTAS'
const GUARDA_RESPUESTAS = 'GUARDA_RESPUESTAS'
const AGREGA_EN_PROCESO = 'AGREGA_EN_PROCESO'
const OBTENER_DATOS_LLAMADA = 'OBTENER_DATOS_LLAMADA'
const ENCUESTA_ACTUAL_SAVE = 'ENCUESTA_ACTUAL_SAVE'
const CANCELAR_LLAMADA = 'CANCELAR_LLAMADA'
const ERROR_LLAMADA = 'ERROR_LLAMADA'

//  Reducer
export default function encuestasReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_ENCUESTA_USR:
            return { ...state, loading: action.payload }
        case OBTENER_ENCUESTAS:
            return { ...state, encuesta: action.payload }
        case OBTENER_PERSONA_RANDOM:
            return { ...state, persona: action.payload }
        case ERROR_LLAMADA:
        case NO_CONTESTO:
            return { ...state, mensaje: action.payload }
        case AGREGA_RESPUESTAS:
            return { ...state, respuestas: action.payload }
        case GUARDA_RESPUESTAS:
            return { ...state, mensaje: action.payload }
        case AGREGA_EN_PROCESO:
            return { ...state, mensaje: action.payload }
        case OBTENER_DATOS_LLAMADA:
            return { ...state, datosllamada: action.payload, loading: false }
        case ENCUESTA_ACTUAL_SAVE:
            return { ...state, encuestaActual: action.payload }
        case CANCELAR_LLAMADA:
            return { ...state, mensaje: action.payload, persona: [], datosllamada: [], encuestaActual: [] }
        default:
            return state
    }
}


//  Acciones
export const obtenerEncuestasAccion = () => async (dispatch, getState) => {
    try {
        const res = await Axios.post(`${host}/encuestasusr/`, getState().auth.usuario)
        dispatch({
            type: OBTENER_ENCUESTAS,
            payload: res.data
        })



        //console.log('encuestas', res.data)
    } catch (error) {
        console.log(error)
    }
}

export const obtenerPersonaRandom = (encuesta) => async (dispatch, getState) => {
    dispatch({ type: LOADING_ENCUESTA_USR, payload: true })
    try {
        dispatch({ type: ENCUESTA_ACTUAL_SAVE, payload: encuesta })

        await Axios.post(`${host}/encuestasusr/persona`, encuesta)
            .then(result => {
                //console.log(result.data)
                if (result.data.length) {
                    !result.data[0].persona ?
                        dispatch({ type: OBTENER_PERSONA_RANDOM, payload: result.data }) :
                        dispatch({ type: OBTENER_PERSONA_RANDOM, payload: result.data[0].persona })
                } else { dispatch({ type: OBTENER_PERSONA_RANDOM, payload: [] }) }


            })


        if (getState().encuestas.persona[0]) {

            //console.log('paque entras aqui?')
            const idUsuario = getState().auth.usuario._id;
            //const encuesta = getState().encuestas.encuesta;
            const persona = getState().encuestas.persona[0];
            // Request body
            const body = { idUsuario, encuesta, persona };

            //console.log('conola Agregar en proceso', body)
            Axios.post(`${host}/encuestasusr/enproceso`, body)
                .then(result => {
                    dispatch({ type: AGREGA_EN_PROCESO, payload: result.data })
                    //console.log('obtener llamada de:', getState().encuestas)
                    Axios.post(`${host}/encuestasusr/traellamada`, body)
                        .then(result => {
                            dispatch({ type: OBTENER_DATOS_LLAMADA, payload: result.data })
                            //      console.log('resultado de llamada', result)
                        })
                })



        }
        else {
            //console.log('No se guardó datos de usuario Random')
            dispatch({ type: LOADING_ENCUESTA_USR, payload: false })
        }


    } catch (error) {
        console.log(error)
    }
}

export const noContestoAccion = (datos) => async (dispatch, getState) => {
    dispatch({ type: LOADING_ENCUESTA_USR, payload: true })
    try {

        Axios.post(`${host}/encuestasusr/nocontesto`, getState().encuestas)
            .then(result => {
                dispatch({ type: NO_CONTESTO, payload: result.data })
            })


        await Axios.post(`${host}/encuestasusr/persona`, getState().encuestas.encuestaActual)
            .then(result => {
                if (result.data.length) {
                    !result.data[0].persona ?
                        dispatch({ type: OBTENER_PERSONA_RANDOM, payload: result.data }) :
                        dispatch({ type: OBTENER_PERSONA_RANDOM, payload: result.data[0].persona })
                } else { dispatch({ type: OBTENER_PERSONA_RANDOM, payload: [] }) }
            })

        if (getState().encuestas.persona[0]) {
            const idUsuario = getState().auth.usuario._id;
            const encuesta = getState().encuestas.encuestaActual;
            const persona = getState().encuestas.persona[0]
            // Request body
            const body = { idUsuario, encuesta, persona };
            Axios.post(`${host}/encuestasusr/enproceso`, body)
                .then(result => {
                    dispatch({ type: AGREGA_EN_PROCESO, payload: result.data })

                    Axios.post(`${host}/encuestasusr/traellamada`, body)
                        .then(result => {
                            dispatch({ type: OBTENER_DATOS_LLAMADA, payload: result.data })
                            //console.log(result)
                        })
                })
        } else {
            console.log('No hay datos')
            dispatch({ type: LOADING_ENCUESTA_USR, payload: false })
        }

    } catch (error) {
        console.log(error)
    }
}

export const agregaRespuesta = (datos) => async (dispatch, getState) => {
    try {

        dispatch({ type: AGREGA_RESPUESTAS, payload: datos })

        //Falta recibir los datos junto con el id despues de guardarse en la DB
        Axios.post(`${host}/encuestasusr/addrespuesta`, getState().encuestas)
            .then(result => {
                //alert("chido")
                dispatch({
                    type: GUARDA_RESPUESTAS,
                    payload: result.data
                })

                Axios.post(`${host}/encuestasusr/`, getState().auth.usuario)
                    .then(res =>
                        dispatch({
                            type: OBTENER_ENCUESTAS,
                            payload: res.data
                        })
                    )
            })
    } catch (error) {
        console.log(error)
    }
}

export const cancelarLlamada = () => async (dispatch, getState) => {
    try {
        Axios.post(`${host}/encuestasusr/cancelar`, getState().encuestas)
            .then(result => {
                dispatch({
                    type: CANCELAR_LLAMADA,
                    payload: result.data
                })
            })

    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: ERROR_LLAMADA
        });

    }
}