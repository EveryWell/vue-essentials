
Vue.directive('bootstraptable', {
    priority: 1000,

    params: ['row-style', 'query-params'],

    bind: function () {

        var _self = this;

        $(this.el)
            .bootstrapTable({
                pagination: true,
                pageSize: 20,
                pageList: [],
                cookie: true,
                cookieExpire: '24h',
                queryParams: this.params.queryParams ? this.params.queryParams : function(params) { return params},
                rowStyle: this.params.rowStyle ? this.params.rowStyle : function() { return {classes: ''}},
                locale: 'it-IT'
            }).on('load-success.bs.table', function (e, data) {
                _.each($('[recompile]'), function(el){
                    _self.vm.$compile(el);
                });
            })
    },
    update: function (value) {
        $(this.el).val(value)
    },
    unbind: function () {
        $(this.el).off().bootstrapTable('destroy')
    }
});
