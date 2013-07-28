(function ($) {
    function Textarea(element, options) {
        this.el = $(element);
        this.element = this.el.get(0);
        this.options = $.extend(this.options, options);
        this.init();
    };

    Textarea.prototype.options = {
        preventtabs: true
    };

    Textarea.prototype.hasSelection = function() {
        if (this.element.selectionStart == this.element.selectionEnd) {
            return false;
        } else {
            return true;
        }
    };

    Textarea.prototype.getPos = function() {
        return this.element.selectionStart;
    };

    Textarea.prototype.setPos = function(position) {
        this.element.selectionStart = position;
        this.element.selectionEnd = position;
        this.element.focus();
    };

    Textarea.prototype.preventtabs = function(event) {
        var el = this.el;
        if (event.keyCode == 9) {
            event.preventDefault();
            var pos;
            pos = this.getPos() + "    ".length;
            el.val(el.val().substring(0, this.getPos()) + "    " + el.val().substring(this.getPos(), el.val().length));
            this.setPos(pos);
            return false;
        }
        if(event.keyCode == 8) {
            if (el.val().substring(this.getPos() - 4, this.getPos()) == "    ") {
                var pos;
                pos = this.getPos() - 3;
                el.val(el.val().substring(0, this.getPos() - 3) + el.val().substring(this.getPos(), el.val().length));
                this.setPos(pos);
            }
        }
        if(event.keyCode == 37) {
            var pos;
            if (el.val().substring(this.getPos() - 4, this.getPos()) == "    ") {
                pos = this.getPos() - 3;
                this.setPos(pos);
            }    
        }
        if(event.keyCode == 39) {
            var pos;
            if (el.val().substring(this.getPos() + 4, this.getPos()) == "    ") {
                pos = this.getPos() + 3;
                this.setPos(pos);
            }
        }
    };

    Textarea.prototype.init = function () {
        if (this.options.preventtabs) {
            this.el.keydown($.proxy(this.preventtabs, this));
        }
    };

    $.fn.miatextarea = function (options) {
        return this.each(function () {
            if (!$.data(this, "miatextarea")) {
                $.data(this, "miatextarea", 
                new Textarea(this, options));
            }
        });
    }

})(jQuery);