<template>
    <div class="summary" v-if="datasource.total && datasource.total > 0" style="margin-top: 18px">
        <div class="row">
            <div class="col-xs-4 text-center">{{ datasource.total === 1 ? 'Registro' : 'Registros' }}:
                <strong>{{ datasource.total }}</strong>
            </div>
            <div class="col-xs-4 text-center">
                Exibindo:
                <strong>{{ datasource.from }}</strong> - <strong>{{ datasource.to }}</strong>
            </div>
            <div class="col-xs-4 text-center">
                Página:
                <strong>{{ datasource.current_page }}</strong> - <strong>{{ datasource.last_page }}</strong>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            datasource: {
                type: Object,
                default: {
                    total: 0,
                    from: 0,
                    to: 0,
                    current_page: 0,
                    last_page: 0
                }
            }
        }
    }
</script>
