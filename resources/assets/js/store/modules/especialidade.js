import resource from '../../resources/especialidade'
import emptyDataSource from '../../data/empty-data-source'
import _ from "lodash";

export const SEARCH_SUCCESS = 'ESPECIALIDADE_SEARCH_SUCCESS'
export const NEW = 'ESPECIALIDADE_NEW'
export const EDIT = 'ESPECIALIDADE_EDIT'
export const ERROR = 'ESPECIALIDADE_ERROR'
export const SAVE_SUCCESS = 'ESPECIALIDADE_SAVE_SUCCESS'
export const DELETE_SUCCESS = 'ESPECIALIDADE_DELETE_SUCCESS'

export const initialValue = {
    nome: null
};

const especialidade = {
    namespaced: true,
    state: {
        search: null,
        especialidade: _.clone(initialValue),
        especialidades: [],
        errors: null,
        selected: []
    },
    mutations: {
        [SEARCH_SUCCESS] (state, payload) {
            state.especialidades = payload
        },
        [NEW] (state) {
            state.especialidade = _.clone(initialValue)
        },
        [EDIT] (state,payload) {
            state.especialidade = _.clone(payload)
        },
        [SAVE_SUCCESS] (state, payload) {
            state.especialidade = payload
        },
        [ERROR] (state, payload) {
            state.errors = payload
        },
        [DELETE_SUCCESS] (state) {
            state.especialidade = _.clone(initialValue)
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
            if ('id' in state.especialidade && state.especialidade.id) {
                promise = resource.update({'id':state.especialidade.id}, state.especialidade)
            } else {
                promise = resource.save({}, state.especialidade)
            }

            promise.then(response => {commit(SAVE_SUCCESS, response.body)}, error => {commit(ERROR, error.body)});
        },
        edit ({commit}, payload) {
            commit(EDIT,payload)
        },
        _delete({commit, state}) {
            resource.delete({id:state.especialidade.id}).then(response => {commit(DELETE_SUCCESS)}, error => {commit(ERROR, error.body)})
        }
    }
};

export default especialidade;
