
Vue.directive('fileupload', {
    priority: 1000,

    params: ['url', 'done', 'add', 'progressall', 'fail', 'send'],

    bind: function () {

        var settings = {
            dataType: 'json',
            autoUpload: false,
            replaceFileInput:false
        };

        if (this.params.url) {
            settings.url = this.params.url;
        }

        if (this.params.add ) {
            settings.add = this.params.add;
        }

        if (this.params.done) {
            settings.done = this.params.done;
        }

        if (this.params.fail) {
            settings.fail = this.params.fail;
        }

        if (this.params.send) {
            settings.send = this.params.send;
        }

        if (this.params.progressall) {
            settings.progressall = this.params.progressall;
        }

        $(this.el).fileupload(settings);

    },
    unbind: function () {
        $(this.el).off().fileupload('destroy');
    }
});
