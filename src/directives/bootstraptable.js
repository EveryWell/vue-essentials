
Vue.directive('bootstraptable', {
    priority: 1000,

    params: ['url', 'row-style', 'query-params', 'detail-formatter', 'pagination', 'on-load-success', 'page-size', 'columns'],

    paramWatchers: {

        'url': function() {

            $(this.el).bootstrapTable('destroy');

            this.init();
        }
    },

    bind: function() {
        this.init();
    },

    init: function () {

        var _self = this;

        var settings = {
            pagination: this.params.pagination === false ? false : true,
            pageSize: this.params.pageSize ? this.params.pageSize : 20,
            pageList: [],
            cookie: true,
            cookieExpire: '24h',
            queryParams: this.params.queryParams ? this.params.queryParams : function(params) { return params},
            rowStyle: this.params.rowStyle ? this.params.rowStyle : function() { return {classes: ''}},
            detailFormatter: this.params.detailFormatter ? this.params.detailFormatter : function (index, row) { return ''; },
            locale: 'it-IT',
            icons: {
                paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
                paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
                refresh: 'glyphicon-refresh icon-refresh',
                toggle: 'glyphicon-list-alt icon-list-alt',
                columns: 'glyphicon-th icon-th',
                detailOpen: 'fa fa-plus fa-lg',
                detailClose: 'fa fa-minus fa-lg'
            }
        };

        if (typeof Laravel !== 'undefined' && typeof Laravel.csrfToken !== 'undefined') {
            settings.ajaxOptions = {
                headers: {
                    'X-CSRF-TOKEN': Laravel.csrfToken
                }
            }
        }
        
        if (this.params.columns) {
            settings.columns = this.params.columns;
        }

        if (this.params.url) {
            settings.url = this.params.url;
        }

        $(this.el)
            .bootstrapTable(settings)
            .on('load-success.bs.table', function (e, data) {
                _self.recompile();
            }).on('post-body.bs.table', function (e, data) {
                _self.recompile();
            }).on('post-header.bs.table',function (e, data) {
                _self.recompile();
            });

        if (this.params.onLoadSuccess){
            $(this.el).on('load-success.bs.table', this.params.onLoadSuccess);
        }

        _self.recompile();
    },

    recompile: function() {

        if (this.recompiling) {
            return;
        }

        var _self = this;

        this.recompiling = true;

        setTimeout(function(){
            _.each($('[recompile]', _self.el), function(el){
                _self.vm.$compile(el);
            });

            _self.recompiling = false;
        }, 50);
    },

    update: function (value) {
        $(this.el).val(value)
    },
    unbind: function () {
        $(this.el).off().bootstrapTable('destroy')
    }
});
