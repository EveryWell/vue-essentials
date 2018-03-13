
Vue.directive('datepicker', {
    priority: 1000,

    params: ['time-picker', 'step', 'format', 'disabled-days'],

    bind: function () {
        var _self = this;
        var format = this.params.timePicker ? 'd/m/Y H:i' : 'd/m/Y';

        if (this.params.format) {
            format = this.params.format;
        }

        $(this.el)
            .datetimepicker({
                lang: 'it',
                timepicker: this.params.timePicker ? this.params.timePicker : false,
                step: this.params.step ? this.params.step : 60,
                format: format,
                beforeShowDay: _self.params.disabledDays
                    ? function(date){ return [!_self.params.disabledDays.includes(date.getDay()), ""]; }
                    : true,
                scrollInput: false/*,
                 defaultDate: new Date(),
                 defaultTime:'05:00'*/
            });
    },
    unbind: function () {
        $(this.el).off().datetimepicker('destroy')
    }
});
