import Vuex from 'vuex'

import especialidade from './modules/especialidade'
import medico from './modules/medico'

const store = new Vuex.Store({
    modules: {
        especialidade,
        medico
    }
});

export default store
