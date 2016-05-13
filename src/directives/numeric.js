
Vue.directive('numeric', {
    priority: 1000,

    bind: function () {
        $(this.el).numeric();
    },
    unbind: function () {
        $(this.el).off()
    }
});
