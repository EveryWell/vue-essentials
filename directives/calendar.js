
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
