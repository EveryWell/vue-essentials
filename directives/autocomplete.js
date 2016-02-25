
Vue.directive('autocomplete', {
    priority: 1000,

    params: ['available-options'],

    bind: function () {

        this.params.availableOptions = this.params.availableOptions ? JSON.parse(this.params.availableOptions) : [];

        $(this.el).autocomplete({
            source: this.params.availableOptions
        });
    },
    update: function (value) {
        //$(this.el).val(value)
    },
    unbind: function () {
        $(this.el).off()
    }
});
