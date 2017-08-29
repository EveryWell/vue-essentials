
Vue.directive('number', {
    priority: 1000,
    twoWay: true,

    params: ['decimals', 'decimals-separator', 'thousands-separator'],

    bind: function () {

        var _self = this;

        var defaultSettings = {
            decimals: 0,
            decimalsSeparator: '.',
            thousandsSeparator: ','
        };

        var settings = $.extend(defaultSettings, this.params);

        $(this.el)
            .number(true, settings.decimals, settings.decimalsSeparator, settings.thousandsSeparator)
            .on('propertychange change click keyup input paste focus', function() {

                var value = 0;

                if (_self.params.decimals > 0) {
                    value = parseFloat($(this).val());
                } else {
                    value = parseInt($(this).val());
                }

                _self.set(!isNaN(value) ? value : 0);
            });

    },

    update: function(value) {
        $(this.el).val(value);
    },

    unbind: function () {
        $(this.el).off().number('destroy');
    }
});
