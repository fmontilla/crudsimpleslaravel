<template>
    <div class="row">
        <div class="col-md-12 form-group">
            <label class="control-label">
                Telefone
            </label>
            <div class="row">
                <template v-for="(telefone, index) in model">
                    <div class="col-xs-12 col-md-2 form-group">
                        <select class="form-control" v-show="readonly === false" v-model="telefone.tipo" :data-category="`${dataCategory}.${index}.tipo`">
                            <option v-for="(nome, id) in tipotelefone" :value="id">{{ nome }}</option>
                        </select>
                        <p class="form-control-static" v-show="readonly" v-text="tipoTelefoneNome(telefone.tipo)"></p>
                    </div>
                    <div class="col-xs-12 col-md-3 form-group">
                        <input-mask v-show="readonly === false" v-model="telefone.numero" mask="phone" :data-category="`${dataCategory}.${index}.numero`"></input-mask>
                        <p class="form-control-static" v-show="readonly" v-text="telefone.numero"></p>
                    </div>
                    <div class="col-xs-12 col-md-1 form-group" v-show="readonly === false">
                        <button type="button" class="btn btn-primary" @click="add" v-if="index === 0">
                            <i class="fa fa-plus"></i>
                        </button>
                        <button type="button" class="btn btn-danger" @click="remove(index)" v-if="index !== 0">
                            <i class="fa fa-minus"></i>
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        props: {
            value: {
                type: Array,
                default: function () {
                    return [{
                        tipo: 1,
                        numero: ''
                    }];
                }
            },
            dataCategory: {
                type: String,
                default: 'telefone'
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            tipotelefone () {
                return Lang.get('enum')['cliente']['tipotelefone'];
            },
            model: {
                get () {
                    return this.value
                },
                set (value) {
                    this.$emit('input', value);
                }
            }
        },
        methods: {
            add () {
                this.model = this.model.concat({
                    tipo: 1,
                    numero: ''
                });
            },
            remove(index) {
                this.model = this.model.filter((telefone, i) => {
                    return index !== i;
                });
            },
            tipoTelefoneNome (tipotelefone) {
                const arrTipoTelefone = _.filter(this.tipotelefone, function(value, key){return key == tipotelefone });
                return arrTipoTelefone.length ? arrTipoTelefone[0] : null;
            }
        }
    }
</script>