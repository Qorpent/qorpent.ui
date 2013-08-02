(function($) {
    var ModalMode = function(element, options) {
        this.el = $(element);
        this.parent = el.parent();
        this.init();
    };

    ModalMode.prototype.options = {
        active: true
    }

    ModalMode.prototype.init = function () {
        if (this.options.active) {
            this.el.addClass("element-withmodalmode");
            var btn = $('<i class="btn"/>')
        }
    };

    $.fn.modalmode = function (options) {
        return this.each(function () {
            if (!$.data(this, "modalmode")) {
                $.data(this, "modalmode", 
                new ModalMode(this, options));
            }
        });
    }

})(jQuery);