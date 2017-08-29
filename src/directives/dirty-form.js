
Vue.directive('dirty-form', {
    priority: 1000,

    params: ['dirty-form-message', 'delay'],

    bind: function () {

        var delay = this.params.delay ? this.params.delay : 0;

        if (typeof this.params.dirtyFormMessage == 'undefined') {
            this.params.dirtyFormMessage = 'Ci sono modifiche non salvate, sei sicuro di lasciare la pagina?';
        }

        var _self = this;

        setTimeout(function() {
            $(_self.el).areYouSure({
                'message': _self.params.dirtyFormMessage
            });
        }, delay)

    },
    unbind: function () {
    }
});
