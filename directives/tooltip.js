
Vue.directive('tooltip', {
    priority: 1000,

    bind: function () {
        $(this.el).tooltip();
    },
    update: function (value) {
        $(this.el).val(value)
    },
    unbind: function () {
        $(this.el).off().tooltip('destroy')
    }
});
