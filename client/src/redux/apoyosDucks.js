import Axios from 'axios'
//const host = 'https://caseta.herokuapp.com'
const host = 'http://localhost:3001'
//  Constantes
const dataInicial = {
    array: []
}



//  Types
const OBTENER_APOYOS_EXITO = 'OBTENER_APOYOS_EXITO'
const AGREGA_APOYO = 'AGREGA_APOYO'



//  Reducer
export default function apoyosReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_APOYOS_EXITO:
            return { ...state, array: action.payload }
        case AGREGA_APOYO:
            return state
        default:
            return state
    }
}

//  Acciones
export const obtenerApoyosAccion = () => async (dispatch, getState) => {
    try {
        //const res = await Axios.get('http://localhost:3001/api/get')
        const res = await Axios.get(`${host}/padron/`)
        dispatch({
            type: OBTENER_APOYOS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const agregarApoyoAccion = (datos) => async (dispatch) => {
    try {
        //Falta recibir los datos junto con el id despues de guardarse en la DB
        Axios.post(`${host}/api/insert`, datos)
            .then(result => {
                //alert("chido")
                dispatch({
                    type: AGREGA_APOYO,
                    payload: result
                })
            })
    } catch (error) {

    }
}