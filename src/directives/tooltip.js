
Vue.directive('tooltip', {
    priority: 500,

    params: ['title'],

    bind: function () {

        var tooltipData = {};

        if (this.params.title) {
            tooltipData.title = this.params.title;
        }

        $(this.el).tooltip(tooltipData);
    },
    unbind: function () {
        $(this.el).off().tooltip('destroy')
    }
});
