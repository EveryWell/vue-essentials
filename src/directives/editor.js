
Vue.directive('editor', {
    twoWay: true,
    priority: 1000,

    params: ['placeholder', 'height', 'simple-toolbar', 'options'],

    bind: function () {

        var self = this;

        var settings = {
            lang: 'it-IT',
            height: this.params.height ? this.params.height: 150,
            placeholder: this.params.placeholder ? this.params.placeholder : ''
        };

        for (const prop in this.params.options) {
            settings[prop] = this.params.options[prop];
        }

        if (this.params.simpleToolbar === true) {
            settings.toolbar = [
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['insert',['link']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']]
            ];
        }

        $(this.el).summernote(settings).on('summernote.change', function(we, contents, $editable){
            self.set(contents);
        });

    },
    update: function (value) {
        $(this.el).summernote('code', value);
    },
    unbind: function () {
        $(this.el).off().summernote('destroy')
    }
});
