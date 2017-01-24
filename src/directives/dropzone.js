
Vue.directive('dropzone', {
    priority: 1000,

    params: ['url', 'addedfile'],

    dropzone: {},

    bind: function () {

        var _self = this;

        var settings = {
            url: this.params.url,
            init: function() {
                if (_self.params.addedfile) {
                    this.on("success", _self.params.addedfile);
                }
            }
        };

        if (typeof Laravel !== 'undefined' && typeof Laravel.csrfToken !== 'undefined') {
            settings.headers = {
                'X-CSRF-TOKEN': Laravel.csrfToken
            }
        }

        this.dropzone = new Dropzone(this.el, settings);
    },
    unbind: function () {

        this.dropzone.destroy();
    }
});
