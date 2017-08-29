
Vue.directive('selectize', {
    twoWay: true,

    params: ['tags', 'options', 'settings', 'optgroups', 'optgroup-field'],

    selectizeSettings: {},

    paramWatchers: {
        options: function (options) {

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
            plugins: ['remove_button'],
            onChange: function (value) {
                _self.set(value);
                _self.nativeEvent('change').call();
            },
            onFocus: this.nativeEvent('focus').bind(this),
            onBlur: this.nativeEvent('blur').bind(this)
        };

        this.selectizeSettings = $.extend({}, this.selectizeSettings, this.params.settings);

        if (this.params.options) {
            this.selectizeSettings['options'] = this.params.options;
        }

        if (this.params.optgroups) {
            this.selectizeSettings['optgroups'] = this.params.optgroups;
        }

        if (this.params.optgroupField) {
            this.selectizeSettings['optgroupField'] = this.params.optgroupField;
        }

        if (this.params.tags) {
            this.selectizeSettings['create'] = true;
        }

        $(this.el).selectize(this.selectizeSettings);
    },

    nativeEvent: function (eventName) {
        var self = this;
        return function () {
            // Create the event.
            var event = document.createEvent('Event');

            // Define that the event name is eventName.
            event.initEvent(eventName, true, true);

            // Listen for the event.
            self.el.addEventListener(eventName, function (e) {
                // e.target matches elem
            }, false);

            // target can be any Element or other EventTarget.
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