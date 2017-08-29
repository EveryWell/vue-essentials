Vue.directive('focus', {
    bind: function () {
        var object = this.el;
        Vue.nextTick(function() {
            object.focus();
        });
    }
});