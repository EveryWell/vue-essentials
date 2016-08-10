(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('../directives/select');
require('../directives/datepicker');
require('../directives/geocomplete');
require('../directives/numeric');
require('../directives/bootstraptable');
require('../directives/tooltip');
require('../directives/validate');
require('../directives/autocomplete');
require('../directives/dropzone');
require('../directives/calendar');
require('../directives/editor');
require('../directives/selectize');
require('../directives/timepicker');
require('../directives/slider');
require('../directives/dirty-form');
require('../directives/validate');
require('../directives/fileupload');
require('../directives/focus');
},{"../directives/autocomplete":2,"../directives/bootstraptable":3,"../directives/calendar":4,"../directives/datepicker":5,"../directives/dirty-form":6,"../directives/dropzone":7,"../directives/editor":8,"../directives/fileupload":9,"../directives/focus":10,"../directives/geocomplete":11,"../directives/numeric":12,"../directives/select":13,"../directives/selectize":14,"../directives/slider":15,"../directives/timepicker":16,"../directives/tooltip":17,"../directives/validate":18}],2:[function(require,module,exports){

Vue.directive('autocomplete', {
    priority: 1000,

    params: ['available-options'],

    bind: function () {

        this.params.availableOptions = this.params.availableOptions ? JSON.parse(this.params.availableOptions) : [];

        $(this.el).autocomplete({
            source: this.params.availableOptions
        });
    },
    update: function (value) {
        //$(this.el).val(value)
    },
    unbind: function () {
        $(this.el).off()
    }
});

},{}],3:[function(require,module,exports){

Vue.directive('bootstraptable', {
    priority: 1000,

    params: ['row-style', 'query-params', 'detail-formatter', 'pagination', 'on-load-success', 'page-size', 'columns'],

    bind: function () {

        var _self = this;

        var settings = {
            pagination: this.params.pagination === false ? false : true,
            pageSize: this.params.pageSize ? this.params.pageSize : 20,
            pageList: [],
            cookie: true,
            cookieExpire: '24h',
            queryParams: this.params.queryParams ? this.params.queryParams : function(params) { return params},
            rowStyle: this.params.rowStyle ? this.params.rowStyle : function() { return {classes: ''}},
            detailFormatter: this.params.detailFormatter ? this.params.detailFormatter : function (index, row) { return ''; },
            locale: 'it-IT',
            icons: {
                paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
                paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
                refresh: 'glyphicon-refresh icon-refresh',
                toggle: 'glyphicon-list-alt icon-list-alt',
                columns: 'glyphicon-th icon-th',
                detailOpen: 'fa fa-plus fa-lg',
                detailClose: 'fa fa-minus fa-lg'
            }
        };

        if (this.params.columns) {
            settings.columns = this.params.columns;
        }

        $(this.el)
            .bootstrapTable(settings)
            .on('load-success.bs.table', function (e, data) {
                _self.recompile();
            }).on('post-body.bs.table', function (e, data) {
                _self.recompile();
            }).on('post-header.bs.table',function (e, data) {
                _self.recompile();
            });

        if (this.params.onLoadSuccess){
            $(this.el).on('load-success.bs.table', this.params.onLoadSuccess);
        }

        _self.recompile();
    },

    recompile: function() {

        if (this.recompiling) {
            return;
        }

        var _self = this;

        this.recompiling = true;

        setTimeout(function(){
            _.each($('[recompile]', _self.el), function(el){
                _self.vm.$compile(el);
            });

            _self.recompiling = false;
        }, 50);
    },

    update: function (value) {
        $(this.el).val(value)
    },
    unbind: function () {
        $(this.el).off().bootstrapTable('destroy')
    }
});

},{}],4:[function(require,module,exports){

Vue.directive('calendar', {
    priority: 1000,

    params: ['event-sources'],

    bind: function () {

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $(this.el).fullCalendar({
            lang: 'it',
            header: {
                left: 'title',
                right: 'prev,today,next'
                //right: 'prev,today,next,basicDay,basicWeek,month'
            },

            timeFormat: 'h:mm',

            titleFormat: {
                month: 'MMMM YYYY',      // September 2009
                week: "MMM D YYYY",      // Sep 13 2009
                day: 'dddd, MMM D, YYYY' // Tuesday, Sep 8, 2009
            },

            themeButtonIcons: {
                prev: 'fa fa-caret-left',
                next: 'fa fa-caret-right'
            },

            eventSources: this.params.eventSources
        });

        // FIX INPUTS TO BOOTSTRAP VERSIONS
        var $calendarButtons = $(this.el).find('.fc-header-right > span');
        $calendarButtons
            .filter('.fc-button-prev, .fc-button-today, .fc-button-next')
            .wrapAll('<div class="btn-group mt-sm mr-md mb-sm ml-sm"></div>')
            .parent()
            .after('<br class="hidden"/>');

        $calendarButtons
            .not('.fc-button-prev, .fc-button-today, .fc-button-next')
            .wrapAll('<div class="btn-group mb-sm mt-sm"></div>');

        $calendarButtons
            .attr({ 'class': 'btn btn-sm btn-default' });

    },
    unbind: function () {
        $(this.el).off().fullCalendar('destroy')
    }
});

},{}],5:[function(require,module,exports){

Vue.directive('datepicker', {
    priority: 1000,

    params: ['time-picker', 'step'],

    bind: function () {

        $(this.el)
            .datetimepicker({
                lang: 'it',
                timepicker: this.params.timePicker ? this.params.timePicker : false,
                step: this.params.step ? this.params.step : 60,
                format: this.params.timePicker ? 'd/m/Y H:i' : 'd/m/Y',
                scrollInput: false/*,
                 defaultDate: new Date(),
                 defaultTime:'05:00'*/
            });
    },
    unbind: function () {
        $(this.el).off().datetimepicker('destroy')
    }
});

},{}],6:[function(require,module,exports){

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

},{}],7:[function(require,module,exports){

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

},{}],8:[function(require,module,exports){

Vue.directive('editor', {
    twoWay: true,
    priority: 1000,

    params: ['placeholder', 'height', 'simple-toolbar'],

    bind: function () {

        var self = this;

        var simpleToolbar = [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['insert',['link']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ];

        $(this.el).summernote({
            lang: 'it-IT',
            height: this.params.height ? this.params.height: 150,
            placeholder: this.params.placeholder ? this.params.placeholder : '',
            toolbar: this.params.simpleToolbar ? simpleToolbar : null
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

},{}],9:[function(require,module,exports){

Vue.directive('fileupload', {
    priority: 1000,

    params: ['url', 'done', 'add', 'progressall', 'fail', 'send'],

    bind: function () {

        var settings = {
            dataType: 'json',
            autoUpload: false,
            replaceFileInput:false
        };

        if (this.params.url) {
            settings.url = this.params.url;
        }

        if (this.params.add ) {
            settings.add = this.params.add;
        }

        if (this.params.done) {
            settings.done = this.params.done;
        }

        if (this.params.fail) {
            settings.fail = this.params.fail;
        }

        if (this.params.send) {
            settings.send = this.params.send;
        }

        if (this.params.progressall) {
            settings.progressall = this.params.progressall;
        }

        $(this.el).fileupload(settings);

    },
    unbind: function () {
        $(this.el).off().fileupload('destroy');
    }
});

},{}],10:[function(require,module,exports){
Vue.directive('focus', {
    bind: function () {
        var object = this.el;
        Vue.nextTick(function() {
            object.focus();
        });
    }
});
},{}],11:[function(require,module,exports){

Vue.directive('geocomplete', {
    priority: 1000,

    params: [
        'details',
        'details-attribute'
    ],

    bind: function () {

        var _self = this;

        if (typeof google == 'undefined') {

            // If another instance is already including Google Maps Library wait 100 ms and try again the binding. (This avoids multiple inclusions of the Maps Library)
            if (typeof Vue.config.mapsLibrary !== 'undefined') {

                setTimeout(function() {
                    _self.bind();
                }, 100);

                return;
            }

            Vue.config.mapsLibrary = true;

            var apiKey = Vue.config.mapsApiKey ? ('&key=' + Vue.config.mapsApiKey) : '';

            $.getScript("//maps.googleapis.com/maps/api/js?libraries=places" + apiKey, function() {
                _self.initGeocomplete();
            });
        } else {
            this.initGeocomplete();
        }

    },

    initGeocomplete: function() {
        $(this.el).geocomplete({
            details: this.params.details,
            detailsAttribute: this.params.detailsAttribute
        });
    },
    unbind: function () {
        $(this.el).off()
    }
});

},{}],12:[function(require,module,exports){

Vue.directive('numeric', {
    priority: 1000,

    bind: function () {
        $(this.el).numeric();
    },
    unbind: function () {
        $(this.el).off()
    }
});

},{}],13:[function(require,module,exports){

Vue.directive('select', {
    twoWay: true,
    priority: 1000,

    params: ['options', 'url', 'placeholder', 'allow-clear', 'minimum-input-length', 'initial-object', 'query-params', 'multiple-select'],

    paramWatchers: {

        'options': function() {

            var selectOptions = {
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
},{}],14:[function(require,module,exports){

Vue.directive('selectize', {
    twoWay: true,

    params: ['tags', 'options', 'settings', 'optgroups', 'optgroup-field'],

    selectizeSettings: {},

    paramWatchers: {
        options: function (options) {

            var selectize = this.el.selectize,
                value = this.el.selectize.getValue();

            selectize.clearOptions();
            selectize.addOption(options);
            selectize.refreshOptions(false);
            selectize.setValue(value);
        },

        settings: function(settings) {

            var value = this.el.selectize.getValue();

            this.selectizeSettings = $.extend({}, this.selectizeSettings, settings);

            this.el.selectize.destroy();
            $(this.el).selectize(this.selectizeSettings);
            this.el.selectize.setValue(value);
        }
    },

    bind: function () {

        var _self = this;

        this.selectizeSettings = {
            plugins: ['remove_button'],
            onChange: function (value) {
                _self.set(value);
                _self.nativeEvent('change').call();
            },
            onFocus: this.nativeEvent('focus').bind(this),
            onBlur: this.nativeEvent('blur').bind(this)
        };

        if (this.params.options) {
            this.selectizeSettings['options'] = this.params.options;
        }

        if (this.params.optgroups) {
            this.selectizeSettings['optgroups'] = this.params.optgroups;
        }

        if (this.params.optgroupField) {
            this.selectizeSettings['optgroupField'] = this.params.optgroupField;
        }

        if (this.params.tags) {
            this.selectizeSettings['create'] = true;
        }

        $(this.el).selectize(this.selectizeSettings);
    },

    nativeEvent: function (eventName) {
        var self = this;
        return function () {
            // Create the event.
            var event = document.createEvent('Event');

            // Define that the event name is eventName.
            event.initEvent(eventName, true, true);

            // Listen for the event.
            self.el.addEventListener(eventName, function (e) {
                // e.target matches elem
            }, false);

            // target can be any Element or other EventTarget.
            self.el.dispatchEvent(event);
        };
    },

    update: function (value) {
        this.el.selectize.setValue(value);
    },

    unbind: function () {
        this.el.selectize.destroy();
    }
});
},{}],15:[function(require,module,exports){

Vue.directive('slider', {
    twoWay: true,
    priority: 1000,

    bind: function () {

        var _self = this;

        $(this.el).ionRangeSlider({
            type: "single",
            min: 0,
            max: 5,
            from: 0,
            step: 0.5
        }).on("change", function () {

            var $this = $(this),
                value = $this.prop("value");

            _self.set(value);
        });
    },

    update: function (value) {

        var slider = $(this.el).data("ionRangeSlider");

        slider.update({
            from: value
        });
    },

    unbind: function () {
        $(this.el).off()
    }
});

},{}],16:[function(require,module,exports){

Vue.directive('timepicker', {
    priority: 1000,

    params: ['step'],

    bind: function () {

        $(this.el)
            .datetimepicker({
                lang: 'it',
                datepicker: false,
                timepicker: true,
                step: this.params.step ? this.params.step : 60,
                format: 'H:i',
                scrollInput: false,
                defaultTime:'12:00'
            });
    },
    unbind: function () {
        $(this.el).off().datetimepicker('destroy')
    }
});

},{}],17:[function(require,module,exports){

Vue.directive('tooltip', {
    priority: 500,

    params: ['title'],

    bind: function () {

        var tooltipData = {};

        if (this.params.title) {
            tooltipData.title = this.params.title;
        }

        $(this.el).tooltip(tooltipData);
    },
    unbind: function () {
        $(this.el).off().tooltip('destroy')
    }
});

},{}],18:[function(require,module,exports){

Vue.directive('validate', {
    priority: 1000,

    params: ['on-success', 'on-error'],

    bind: function () {

        var _self = this;

        $.formUtils.LANG = {errorTitle:"Impossibile inviare il modulo!",requiredField:"Campo obbligatorio",requiredFields:"Non sono stati compilati tutti i campi richiesti",badTime:"L'ora scelta non &egrave; valida",badEmail:"Questo indirizzo email non &egrave; valido",badTelephone:"Il numero di telefono imputato non &egrave; valido",badSecurityAnswer:"La risposta alla domanda di sicurezza &egrave; errata",badDate:"La data scelta non &egrave; valida",lengthBadStart:"La sua risposta non può essere più lunga di ",lengthBadEnd:" caratteri",lengthTooLongStart:"La lunghezza della risposta deve essere minore di ",lengthTooShortStart:"La lunghezza della risposta deve essere maggiore di ",notConfirmed:"Los valores proporcionados no pudieron ser confirmados",badDomain:"Il dominio inserito non &egrave; corretto.",badUrl:"L' URL inserito non &egrave; valido",badCustomVal:"I valori inseriti non sono validi",andSpaces:" e spazi ",badInt:"Il numero inserito non &egrave; valido",badSecurityNumber:"Il numero di sicurezza inserito non &egrave; valido",badUKVatAnswer:"La Partita IVA (VAT) inserita non &egrave; valida nel Regno Unito",badStrength:"La password proposta non &egrave; sufficientemente sicura",badNumberOfSelectedOptionsStart:"Deve selezionare almeno",badNumberOfSelectedOptionsEnd:" risposta/e",badAlphaNumeric:"Il valore proposto deve contenere caratteri alfanumerici (a-z e 1234...)",badAlphaNumericExtra:"",wrongFileSize:"Il file che si sta cercando di caricare è troppo grande (massimo %s)",wrongFileType:"Solo i file di tipo %s possono essere inviati",groupCheckedRangeStart:"Si prega di scegliere tra ",groupCheckedTooFewStart:"Si prega di selezionare un minimo di ",groupCheckedTooManyStart:"Si prega di selezionare un massimo di ",groupCheckedEnd:" opzione/i",badCreditCard:"Il numero di carta di credito non risulta valido",badCVV:"CVV non valido",wrongFileDim:"La dimensione dell'immagine non &egrave; valida,",imageTooTall:"il lato alto dell'immagine non può essere maggiore di",imageTooWide:"il lato lungo dell'immagine non può essere maggiore di",imageTooSmall:"L'immagine è troppo piccola",min:"min.",max:"máx.",imageRatioNotAccepted:"La proporzione dell' immagine (altezza x larghezza) non &egrave; valida"};

        $.validate({
            form: this.el,
            validateHiddenInputs: true,
            onSuccess: this.params.onSuccess ? this.params.onSuccess : function($form){},
            onError: this.params.onError ? this.params.onError : function($form){}
        });
    },
    update: function (value) {
    },
    unbind: function () {
        $(this.el).off()
    }
});

},{}]},{},[1]);
