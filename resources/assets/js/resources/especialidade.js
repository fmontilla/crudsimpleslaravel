import Vue from '../vue';

const EspecialidadeResource = Vue.resource('/api/especialidade{/id}');

export default EspecialidadeResource;
