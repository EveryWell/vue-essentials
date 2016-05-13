
Vue.directive('timepicker', {
    priority: 1000,

    params: ['step'],

    bind: function () {

        $(this.el)
            .datetimepicker({
                lang: 'it',
                datepicker: false,
                timepicker: true,
                step: this.params.step ? this.params.step : 60,
                format: 'H:i',
                scrollInput: false,
                defaultTime:'12:00'
            });
    },
    unbind: function () {
        $(this.el).off().datetimepicker('destroy')
    }
});
