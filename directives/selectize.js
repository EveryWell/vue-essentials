
Vue.directive('selectize', {
    twoWay: true,

    params: ['tags', 'options', 'settings'],

    selectizeSettings: {},

    paramWatchers: {
        options: function (options) {

            console.log(options);

            var selectize = this.el.selectize,
                value = this.el.selectize.getValue();

            selectize.clearOptions();
            selectize.addOption(options);
            selectize.refreshOptions(false);
            selectize.setValue(value);
        },

        settings: function(settings) {

            var value = this.el.selectize.getValue();

            this.selectizeSettings = $.extend({}, this.selectizeSettings, settings);

            this.el.selectize.destroy();
            $(this.el).selectize(this.selectizeSettings);
            this.el.selectize.setValue(value);
        }
    },

    bind: function () {

        var _self = this;

        this.selectizeSettings = {
            onChange: function (value) {
                _self.set(value);
                _self.nativeEvent('change').call();
            },
            onFocus: this.nativeEvent('focus').bind(this),
            onBlur: this.nativeEvent('blur').bind(this)
        };

        if (this.params.options) {
            this.selectizeSettings['options'] = this.params.options;
        }

        if (this.params.tags) {
            this.selectizeSettings['create'] = true;
        }

        $(this.el).selectize(this.selectizeSettings);
    },

    nativeEvent: function (eventName) {
        var self = this;
        return function () {
            var event = new Event(eventName);
            self.el.dispatchEvent(event);
        };
    },

    update: function (value) {
        this.el.selectize.setValue(value);
    },

    unbind: function () {
        this.el.selectize.destroy();
    }
});