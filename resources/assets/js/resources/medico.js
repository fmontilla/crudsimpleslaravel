import Vue from '../vue';

const MedicoResource = Vue.resource('/api/medico{/id}');

export default MedicoResource;
