
Vue.directive('dropzone', {
    priority: 1000,

    params: ['url', 'addedfile'],

    bind: function () {

        var _self = this;

        $(this.el).dropzone({
            url: this.params.url,
            init: function() {
                if (_self.params.addedfile) {
                    this.on("success", _self.params.addedfile);
                }
            }
        });


    },
    unbind: function () {
        $(this.el).off().dropzone('destroy')
    }
});
