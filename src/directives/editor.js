
Vue.directive('editor', {
    twoWay: true,
    priority: 1000,

    bind: function () {

        var self = this;

        $(this.el).summernote({
            lang: 'it-IT'
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
