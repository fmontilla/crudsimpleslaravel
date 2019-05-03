import resource from '../../resources/medico'
import emptyDataSource from '../../data/empty-data-source'
import _ from "lodash";

export const SEARCH_SUCCESS = 'MEDICO_SEARCH_SUCCESS'
export const NEW = 'MEDICO_NEW'
export const EDIT = 'MEDICO_EDIT'
export const ERROR = 'MEDICO_ERROR'
export const SAVE_SUCCESS = 'MEDICO_SAVE_SUCCESS'
export const DELETE_SUCCESS = 'MEDICO_DELETE_SUCCESS'

export const initialValue = {
    nome: null,
    crm: null,
    telefone: null,
    especialidades: []
};

const medico = {
    namespaced: true,
    state: {
        search: null,
        medico: _.clone(initialValue),
        medicos: [],
        errors: null,
        selected: []
    },
    mutations: {
        [SEARCH_SUCCESS] (state, payload) {
            state.medicos = payload
        },
        [NEW] (state) {
            state.medico = _.clone(initialValue)
        },
        [EDIT] (state,payload) {
            state.medico = _.clone(payload)
        },
        [SAVE_SUCCESS] (state, payload) {
            state.medico = payload
        },
        [ERROR] (state, payload) {
            state.errors = payload
        },
        [DELETE_SUCCESS] (state) {
            state.medico = _.clone(initialValue)
        }
    },
    actions: {
        search ({commit, state}, payload) {
            resource.get(payload).then(response => commit(SEARCH_SUCCESS, response.body), error => commit(ERROR, error.body))
        },
        _new ({commit}) {
            commit(NEW)
        },
        save ({commit, state}) {
            let promise = null
            if ('id' in state.medico && state.medico.id) {
                promise = resource.update({'id':state.medico.id}, state.medico)
            } else {
                promise = resource.save({}, state.medico)
            }

            promise.then(response => {commit(SAVE_SUCCESS, response.body)}, error => {commit(ERROR, error.body)});
        },
        edit ({commit}, payload) {
            commit(EDIT,payload)
        },
        _delete({commit, state}) {
            resource.delete({id:state.medico.id}).then(response => {commit(DELETE_SUCCESS)}, error => {commit(ERROR, error.body)})
        }
    }
};

export default medico;
