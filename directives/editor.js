
Vue.directive('editor', {
    twoWay: true,
    priority: 1000,

    bind: function () {
        var self = this;
        $(this.el).summernote({
            lang: 'it-IT',
            callbacks: {
                onChange: function(contents, $editable) {
                    self.set(contents);
                }
            }
        });

    },
    unbind: function () {
        $(this.el).off().summernote('destroy')
    }
});
