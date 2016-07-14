
Vue.directive('editor', {
    twoWay: true,
    priority: 1000,

    params: ['placeholder', 'height', 'simple-toolbar'],

    bind: function () {

        var self = this;

        var simpleToolbar = [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ];

        $(this.el).summernote({
            lang: 'it-IT',
            height: this.params.height ? this.params.height: 150,
            placeholder: this.params.placeholder ? this.params.placeholder : '',
            toolbar: this.params.simpleToolbar ? simpleToolbar : null
        }).on('summernote.change', function(we, contents, $editable){
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
