
Vue.directive('dirty-form', {
    priority: 1000,

    bind: function () {

        $(this.el).areYouSure({
            'message': 'Non hai salvato le tue modifiche. Sei sicuro di voler lasciare la pagina?'
        });

    },
    unbind: function () {
    }
});
