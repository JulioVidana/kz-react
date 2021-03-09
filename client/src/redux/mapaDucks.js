import Axios from 'axios';
//const host = 'https://caseta.herokuapp.com'
const host = 'http://localhost:3001'

//  Constantes
const dataInicial = {
    array: [],
    total: 0
}

//  Types
const GET_LOCATION_APOYOS = 'GET_LOCATION_APOYOS'

//  Reducer
export default function mapeoReducer(state = dataInicial, action) {
    switch (action.type) {
        case GET_LOCATION_APOYOS:
            return { ...state, array: action.payload, total: action.total }
        default:
            return state
    }
}


//  Acciones
export const getDatosMapeoAccion = () => async (dispatch, getState) => {
    try {
        const res = await Axios.get(`${host}/mapeo/`)
        //console.log('axios', res.data[0].total[0].total)
        dispatch({
            type: GET_LOCATION_APOYOS,
            payload: res.data[0].Resultado,
            total: res.data[0].total[0].total
        })
    } catch (error) {
        console.log(error)
    }
}

