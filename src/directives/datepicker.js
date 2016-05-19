
Vue.directive('datepicker', {
    priority: 1000,

    params: ['time-picker', 'step'],

    bind: function () {

        $(this.el)
            .datetimepicker({
                lang: 'it',
                timepicker: this.params.timePicker ? this.params.timePicker : false,
                step: this.params.step ? this.params.step : 60,
                format: this.params.timePicker ? 'd/m/Y H:i' : 'd/m/Y',
                scrollInput: false/*,
                 defaultDate: new Date(),
                 defaultTime:'05:00'*/
            });
    },
    unbind: function () {
        $(this.el).off().datetimepicker('destroy')
    }
});
