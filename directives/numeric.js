
Vue.directive('numeric', {
    priority: 1000,

    bind: function () {
        $(this.el).numeric();
    },
    update: function (value) {
        $(this.el).val(value)
    },
    unbind: function () {
        $(this.el).off()
    }
});
