
Vue.directive('geocomplete', {
    priority: 1000,

    bind: function () {
        $(this.el).geocomplete({
            //types: ['geocode', 'point_of_interest']
        });
    },
    unbind: function () {
        $(this.el).off()
    }
});
