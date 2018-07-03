
# vue-essentials
Some VueJS essentials directives.

## v-number

*Params*
- decimals: (Optional, Default: 0) The number of decimal places.
- decimals-separator: (Optional, Default: '.') The decimals separator character.
- thousands-separator: (Optional, Default: ',') The thousands separator character.

## v-dirty-form

*Params*
- dirty-form-message: message to be displayed when leaving page with unsaved data.

## v-geocomplete

***Requires***
- Jquery geocomplete dependency
- Google Maps API key

***Usage***

First set the Google maps api key in the Vue config object on the ***beforeCompile*** method of the app instance:

    beforeCompile: function() {  
	    Vue.config.mapsApiKey = "YOUR_PLACES_API_KEY";  
    },

Then insert an input field:

    <input id="address" type="text" class="form-control" v-model="address" v-geocomplete details="#el" details-attribute="data-geo"/>

If you want to post also latitude and longitude you can add these two input fields in the form:

    <input id="meLatitude" type="text" data-geo="lat">  
    <input id="meLongitude" type="text" data-geo="lng">

If you want to post the data with an AJAX request, you must listen to the geocode:result event:

    $('#address').bind("geocode:result", function(event, result){  

		this.$set('model.latitude', result.geometry.location.lat());  
		this.$set('model.longitude', result.geometry.location.lng());

	}.bind(this));
