
Vue.directive('validate', {
    priority: 1000,

    bind: function () {

        $(this.el).validate({

            highlight: function (element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');

                $(element).popover('destroy');
            },
            errorPlacement: function (error, element) {

                if (typeof $(element).data('bs.popover') == 'undefined' || $(element).data('bs.popover').getContent() != $(error).text()) {

                    $(element).popover({
                        content: $(error).text(),
                        placement: 'bottom'
                    });

                    $(element).popover('show');
                }
            },
            events: 'submit',
            selector: 'input[type!=submit], select, textarea',
            callback: function (elem, valid) {
                if (!valid) {
                    $(elem).addClass('error');
                }
            }
        });
    },
    update: function (value) {
    },
    unbind: function () {
        $(this.el).off()
    }
});
