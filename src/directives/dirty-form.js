
Vue.directive('dirty-form', {
    priority: 1000,

    params: ['dirty-form-message'],

    bind: function () {

        if (typeof this.params.dirtyFormMessage == 'undefined') {
            this.params.dirtyFormMessage = 'Ci sono modifiche non salvate, sei sicuro di lasciare la pagina?';
        }

        var _self = this;

        $(this.el).areYouSure({
            'message': _self.params.dirtyFormMessage
        });

    },
    unbind: function () {
    }
});
