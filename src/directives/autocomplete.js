
Vue.directive('autocomplete', {
    priority: 1000,

    params: ['available-tags'],

    bind: function () {

        this.params.availableTags = this.params.availableTags ? this.params.availableTags : [];

        $(this.el).autocomplete({
            source: this.params.availableTags
        });
    },
    update: function (value) {
        //$(this.el).val(value)
    },
    unbind: function () {
        $(this.el).off()
    }
});
