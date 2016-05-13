
Vue.directive('geocomplete', {
    priority: 1000,

    params: [
        'details',
        'details-attribute'
    ],

    bind: function () {

        var _self = this;

        if (typeof google == 'undefined') {
            $.getScript("//maps.googleapis.com/maps/api/js?libraries=places", function() {
                _self.initGeocomplete();
            });
        } else {
            this.initGeocomplete();
        }

    },

    initGeocomplete: function() {
        $(this.el).geocomplete({
            details: this.params.details,
            detailsAttribute: this.params.detailsAttribute
        });
    },
    unbind: function () {
        $(this.el).off()
    }
});
