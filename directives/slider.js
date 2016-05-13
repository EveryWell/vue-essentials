
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
