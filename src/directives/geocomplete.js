
Vue.directive('geocomplete', {
    priority: 1000,

    params: [
        'details',
        'details-attribute'
    ],

    bind: function () {

        var _self = this;

        if (typeof google == 'undefined') {

            // If another instance is already including Google Maps Library wait 100 ms and try again the binding. (This avoids multiple inclusions of the Maps Library)
            if (typeof Vue.config.mapsLibrary !== 'undefined') {

                setTimeout(function() {
                    _self.bind();
                }, 100);

                return;
            }

            Vue.config.mapsLibrary = true;

            var apiKey = Vue.config.mapsApiKey ? ('&key=' + Vue.config.mapsApiKey) : '';

            $.getScript("//maps.googleapis.com/maps/api/js?libraries=places" + apiKey, function() {
                _self.initGeocomplete();
            });
        } else {
            this.initGeocomplete();
        }

    },

    initGeocomplete: function() {
        var _self = this;

        $(this.el).geocomplete({
            details: this.params.details,
            detailsAttribute: this.params.detailsAttribute
        }).bind("geocode:result", function(event, result){
            $(_self.el).val(result.formatted_address).change();
        });
    },
    unbind: function () {
        $(this.el).off()
    }
});
