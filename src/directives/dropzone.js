
Vue.directive('dropzone', {
    priority: 1000,

    params: ['url', 'addedfile'],

    dropzone: {},

    bind: function () {

        var _self = this;

        this.dropzone = new Dropzone(this.el, {
            url: this.params.url,
            init: function() {
                if (_self.params.addedfile) {
                    this.on("success", _self.params.addedfile);
                }
            }
        });
    },
    unbind: function () {

        this.dropzone.destroy();
    }
});
