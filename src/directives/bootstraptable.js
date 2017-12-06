
Vue.directive('bootstraptable', {
    priority: 1000,

    params: [
        'url',
        'row-style',
        'query-params',
        'response-handler',
        'detail-formatter',
        'pagination',
        'side-pagination',
        'on-load-success',
        'page-size',
        'columns',
        'locale',
        'delay',
        'eloquent-pagination'
    ],

    paramWatchers: {

        'url': function() {

            $(this.el).bootstrapTable('destroy');

            this.init();
        }
    },

    bind: function() {

        if (this.params.delay) {
            setTimeout(function() {
                this.init();
            }.bind(this), this.params.delay)
        } else {
            this.init();
        }
    },

    init: function () {

        var data = $(this.el).data();

        var _self = this;

        var settings = {
            pagination: this.params.pagination === false ? false : true,
            pageSize: this.params.pageSize ? this.params.pageSize : 20,
            pageList: [],
            cookie: data.cookieIdTable ? true : false,
            cookieExpire: '24h',
            queryParams: this.params.queryParams ? this.params.queryParams : function(params) { return params},
            responseHandler: this.params.responseHandler ? this.params.responseHandler : function (res) { return res},
            rowStyle: this.params.rowStyle ? this.params.rowStyle : function() { return {classes: ''}},
            detailFormatter: this.params.detailFormatter ? this.params.detailFormatter : function (index, row) { return ''; },
            locale: this.params.locale ? this.params.locale : 'it-IT',
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

        if (this.params.sidePagination){
            settings.sidePagination = this.params.sidePagination;
        }

        if (this.params.eloquentPagination) {
            var queryParamsFunction = settings.queryParams;
            settings.queryParams = function(params) {
                var parameters = queryParamsFunction(params);

                parameters.table = 1;
                parameters.page = parameters.offset == 0 ? 1 : ((parameters.offset / parameters.limit) + 1);

                if (isNaN(parameters.page)) {
                    parameters.page = 1;
                }

                return parameters;
            }

            var responseHandlerFunction = settings.responseHandler;

            settings.responseHandler = function(response) {
                var res = responseHandlerFunction(response);

                res.rows = res.data;

                return res;
            }
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
