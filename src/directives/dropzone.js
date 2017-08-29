
Vue.directive('dropzone', {
    priority: 1000,

    params: ['url', 'addedfile', 'max-files', 'upload-multiple', 'params', 'on-success'],

    dropzone: {},

    paramWatchers: {

        'url': function () {

            this.dropzone.destroy();

            this.bind();
        },

        'params': function () {

            this.dropzone.destroy();

            this.bind();
        }
    },

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

        if (this.params.maxFiles) {
            settings.maxFiles = this.params.maxFiles;
        }

        if (this.params.params) {
            settings.params = this.params.params;
        }

        if (this.params.uploadMultiple === false) {
            settings.uploadMultiple = false;
        }

        if (typeof Laravel !== 'undefined' && typeof Laravel.csrfToken !== 'undefined') {
            settings.headers = {
                'X-CSRF-TOKEN': Laravel.csrfToken
            }
        }

        this.dropzone = new Dropzone(this.el, settings);

        if (this.params.onSuccess) {

            this.dropzone.on('success', this.params.onSuccess);
        }
    },
    unbind: function () {

        this.dropzone.destroy();
    }
});