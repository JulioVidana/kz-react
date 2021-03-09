//import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import apoyosReducer from './apoyosDucks';
import mapeoReducer from './mapaDucks';
import encuestasReducer from './encuestasUsrDucks';
import authReducer from './authDucks';
import erroresReducer from './erroresDucks';
import usuariosReducer from './usuariosDucks';
import encuestasGlobalReducer from './encuestasGlobalDucks';
import generalReducer from './generalDucks';

const rootReducer = combineReducers({
    apoyos: apoyosReducer,
    mapeo: mapeoReducer,
    encuestas: encuestasReducer,
    auth: authReducer,
    error: erroresReducer,
    usuarios: usuariosReducer,
    encustasGlobal: encuestasGlobalReducer,
    general: generalReducer

})

//extensión de google chrome para visualizar la tienda en navegador
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    //const store = createStore(rootReducer, applyMiddleware(thunk))

    return store;
}