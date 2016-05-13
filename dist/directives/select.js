
Vue.directive('select', {
    twoWay: true,
    priority: 1000,

    params: ['options', 'url', 'placeholder', 'allow-clear', 'minimum-input-length', 'initial-object', 'query-params', 'multiple-select'],

    paramWatchers: {

        'options': function() {

            var selectOptions = {
                width: 'resolve',
                placeholder: this.params.placeholder ? this.params.placeholder : '',
                allowClear: this.params.allowClear ? this.params.allowClear : true,
                minimumInputLength: this.params.minimumInputLength ? this.params.minimumInputLength : 0,
                language: 'it',
                data: this.params.options
            };

            $(this.el).html('');
            if (this.params.allowClear) {
                $(this.el).append('<option></option>')
            }

            $(this.el)
                .select2(selectOptions)
                .trigger('change');
        }
    },

    bind: function () {

        var self = this;

        var selectOptions = {
            width: 'resolve',
            placeholder: this.params.placeholder ? this.params.placeholder : '',
            allowClear: this.params.allowClear ? this.params.allowClear : true,
            minimumInputLength: this.params.minimumInputLength ? this.params.minimumInputLength : 0,
            language: 'it'
        };

        if (this.params.options) {
            selectOptions.data = this.params.options;
        }

        if (this.params.url) {
            selectOptions.ajax = {
                url: this.params.url,
                dataType: 'json',
                delay: 250,
                data: this.params.queryParams ? this.params.queryParams : function (params) {

                    return {
                        name: params.term // search term
                    };
                },
                processResults: function (data) {
                    return {
                        results: data
                    };
                },
                cache: false
            };
        }

        if (this.params.initialObject) {
            $(this.el).append('<option value="' + this.params.initialObject.id + '">' + this.params.initialObject.name + '</option>')
        }

        $(this.el)
            .select2(selectOptions)
            .on('change', function () {

                if (self.params.multipleSelect) {
                    var values = [];
                    for (var option in this.selectedOptions){
                        if (this.selectedOptions[option].value) {
                            values.push(this.selectedOptions[option].value);
                        }
                    }
                    self.set(values)
                } else {

                    self.set(this.value);
                }

            })
    },

    update: function (value) {
        $(this.el).val(value).trigger('change');
    },
    unbind: function () {
        $(this.el).off().select2('destroy')
    }
});