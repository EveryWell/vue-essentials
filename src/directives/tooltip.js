
Vue.directive('tooltip', {
    priority: 500,

    params: ['title', 'html'],

    bind: function () {

        var tooltipData = {};

        if (this.params.title) {
            tooltipData.title = this.params.title;
        }

        if (this.params.html) {
            tooltipData.html = true;
        }

        $(this.el).tooltip(tooltipData);
    },
    unbind: function () {

        var bootstrapMajorVersion = $.fn.tooltip.Constructor.VERSION.split('.')[0];

        if (bootstrapMajorVersion === '4') {
            $(this.el).off().tooltip('dispose')
        } else {
            $(this.el).off().tooltip('destroy')
        }
    }
});
