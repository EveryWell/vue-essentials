
Vue.directive('slider', {
    twoWay: true,
    priority: 1000,

    params: ['min', 'max', 'default', 'step'],

    bind: function () {

        var _self = this;

        $(this.el).ionRangeSlider({
            type: "single",
            min: this.params.min,
            max: this.params.max,
            from: this.params.default,
            step: this.params.step
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
