
Vue.directive('editor', {
    twoWay: true,
    priority: 1000,

    params: ['placeholder', 'height'],

    bind: function () {

        var self = this;

        $(this.el).summernote({
            lang: 'it-IT',
            height: this.params.height ? this.params.height: 150,
            placeholder: this.params.placeholder ? this.params.placeholder : ''
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
