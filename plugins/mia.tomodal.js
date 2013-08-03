(function($) {
    var ModalMode = function(element, options) {
        this.el = $(element);
        this.parent = this.el.parent();
        this.modal = null;
        this.init();
        this.modalmode = false;
    };

    ModalMode.prototype.options = {
        active: true
    }

    ModalMode.prototype.init = function () {
        if (this.options.active && !!$.fn.miamodal) {
            this.el.addClass("element-withmodalmode");
            var btn = $('<i class="icon icon-share modalmode-icon"/>');
            this.el.append(btn);

            btn.click($.proxy(function(e) {
                if (!this.modalmode) {
                    this.modal = this.el.miamodal({
                        closebutton: false,
                        resizable: true,
                        customButton: {
                            class : "btn-mini",
                            text : "Закрыть",
                            click : function() {
                                btn.trigger("click");
                            }
                        },
                        id: (this.el.attr("id") || this.el.attr("class").replace(/\s*/g, "")) + "modal",
                        width: this.el.width() + 30,
                        onClose: $.proxy(function() {
                            this.restore();
                        }, this)
                    });
                    this.modalmode = true;
                } else {
                    this.modal.trigger("hidden");
                    this.modalmode = false;
                }
            }, this));
        }
    };

    ModalMode.prototype.restore = function () {
        this.parent.append(this.el);
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