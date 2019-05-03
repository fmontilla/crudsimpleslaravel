<template>
    <div class="row">
        <div class="col-sm-4 col-xs-12">
            <list title="Médicos" placeholder="Pesquisa por Nome do Médico / CRM" v-on:search="searchList">
                <div slot="buttons">
                    <button class="btn btn-default" v-on:click="_new"><i class="fa fa-plus"></i></button>
                    <button class="btn btn-default" v-on:click="confirmDelete()" :disabled="!('id' in medico && medico.id)"><i class="fa fa-trash"></i></button>
                </div>
                <div class="list-group">
                    <a class="list-group-item" :class="{'active':'id' in medico && medico.id == _medico.id}" v-for="_medico in medicos" v-on:click="edit(_medico)">Nome: {{_medico.nome}} / CRM: {{_medico.crm}}</a>
                </div>
            </list>
        </div>
        <div class="col-sm-8 col-xs-12">
            <form v-on:submit.prevent="save" ref="form">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-sm-5 col-xs-12 form-group">
                                <label class="control-label">Nome</label>
                                <input class="form-control" v-model="medico.nome" data-category="nome">
                            </div>
                            <div class="col-sm-3 col-xs-12 form-group">
                                <label class="control-label">CRM</label>
                                <input class="form-control" v-model="medico.crm" data-category="crm">
                            </div>
                            <div class="col-sm-4 col-xs-12 form-group">
                                <label class="control-label">Telefone</label>
                                <input-mask class="form-control" v-model="medico.telefone" mask="phone" data-category="telefone"></input-mask>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label">Especialidades</label>
                            <div class="checkbox" v-for="(especialidade,i) in especialidades">
                                <label>
                                    <input type="checkbox" v-model="medico.especialidades" :value="especialidade.id" data-category="especialidades"> {{especialidade.nome}}
                                </label>
                            </div>
                        </div>

                        <button class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { SAVE_SUCCESS, DELETE_SUCCESS, ERROR } from '../../store/modules/medico'
    import Validator from '../../bootstrap/ui/Validator'
    import Notify from '../../bootstrap/ui/Notify'
    import Dialog from '../../bootstrap/ui/Dialog'
    import $ from 'jquery'

    let unsubscribe;
    export default {
        props: ['value'],
        computed: mapState({
            medicos: state => state.medico.medicos,
            medico: state => state.medico.medico,
            especialidades: state => state.especialidade.especialidades
        }),
        mounted () {
            this.search();
            this.search_especialidade();
            unsubscribe = this.$store.subscribe(mutation => {
                if (mutation.type === `medico/${ERROR}`) {
                    Validator.showErrors(mutation.payload, $(this.$refs.form))
                }

                if (mutation.type === `medico/${SAVE_SUCCESS}`) {
                    Notify.success('Médico registrado com sucesso.')
                    this.search()
                    this._new()
                }

                if (mutation.type === `medico/${DELETE_SUCCESS}`) {
                    Notify.success('Médico deletado com sucesso.')
                    this.search()
                    this._new()
                }
            });
        },
        destroyed () {
            unsubscribe()
        },
        methods: {
            ...mapActions('medico', ['search','_new','save','edit','_delete']),
            ...mapActions('especialidade', {'search_especialidade':'search'}),

            confirmDelete() {
                Dialog.confirm('Tem certeza que quer excluir este médico?',this._delete)
            },
            searchList(search) {
                this.search({'search':search})
            }
        }
    }
</script>
