
Vue.directive('number', {
    priority: 1000,

    params: ['decimals', 'decimals-separator', 'thousands-separator'],

    bind: function () {

        var defaultSettings = {
            decimals: 0,
            decimalsSeparator: '.',
            thousandsSeparator: ','
        };

        var settings = $.extend(defaultSettings, this.params);

        $(this.el).number(true, settings.decimals, settings.decimalsSeparator, settings.thousandsSeparator);

    },
    unbind: function () {
        $(this.el).off().number('destroy');
    }
});
