
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

        if ($.fn.tooltip.Constructor.VERSION === '4.0.0') {
            $(this.el).off().tooltip('dispose')
        } else {
            $(this.el).off().tooltip('destroy')
        }
    }
});
