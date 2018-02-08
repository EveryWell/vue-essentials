
Vue.directive('select', {
    twoWay: true,
    priority: 1000,

    params: [
        'options',
        'url',
        'process-results',
        'placeholder',
        'allow-clear',
        'minimum-input-length',
        'initial-object',
        'query-params',
        'multiple-select',
        'tags'
    ],

    paramWatchers: {

        'options': function() {

            var allowClear = typeof this.params.allowClear == 'boolean' ? this.params.allowClear : true;

            var selectOptions = {
                placeholder: this.params.placeholder ? this.params.placeholder : '',
                allowClear: allowClear,
                minimumInputLength: this.params.minimumInputLength ? this.params.minimumInputLength : 0,
                tags: typeof this.params.tags == 'boolean' ? this.params.tags : false,
                language: 'it',
                data: this.params.options
            };

            if (typeof this.params.multipleSelect == 'boolean') {
                selectOptions.multiple = this.params.multipleSelect;
            }

            $(this.el).html('');
            if (allowClear) {
                $(this.el).append('<option></option>')
            }

            $(this.el)
                .select2(selectOptions)
                .trigger('change')
                .on(
                    'select2:select',(
                        function(){
                            $(this).focus();
                        }
                    )
                );
        },

        'url': function() {

            this.bind();
        }
    },

    bind: function () {

        var self = this;

        var selectOptions = {
            placeholder: this.params.placeholder ? this.params.placeholder : '',
            allowClear: typeof this.params.allowClear == 'boolean' ? this.params.allowClear : true,
            minimumInputLength: this.params.minimumInputLength ? this.params.minimumInputLength : 0,
            tags: typeof this.params.tags == 'boolean' ? this.params.tags : false,
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

            if (this.params.processResults) {
                selectOptions.ajax.processResults = this.params.processResults
            }

            if (typeof Laravel !== 'undefined' && typeof Laravel.csrfToken !== 'undefined') {
                selectOptions.ajax['headers'] = {
                    'X-CSRF-TOKEN': Laravel.csrfToken
                }
            }
        }

        if (this.params.initialObject) {
            $(this.el).append('<option value="' + this.params.initialObject.id + '">' + this.params.initialObject.name + '</option>')
        }

        if (typeof this.params.multipleSelect == 'boolean') {
            selectOptions.multiple = this.params.multipleSelect;
        }

        $(this.el)
            .select2(selectOptions)
            .on('change', function () {
                self.set($(this).val());
            }).on(
            'select2:select',(
                function(){
                    $(this).focus();
                }
            )
        );
    },

    update: function (value) {
        $(this.el).val(value).trigger('change');
    },
    unbind: function () {
        $(this.el).off().select2('destroy')
    }
});