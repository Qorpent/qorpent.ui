(function($) {
    var fluidlayout = function(options){
        var layout = $(this);
        if (!layout.hasClass("fluid-layout")) {
            layout.addClass("fluid-layout");
        };
        options = $.extend({
            splited: true
        }, options);
        if (options.splited) {
            layout.addClass("splited-layout");
            setupsplitter(layout);
        }
    };

    var setupsplitter = function(layout) {
        var splitter = $('<div class="fluid-splitter"/>');
        var ch = layout.children();
        $.each(ch, function(i, el) {
            el = $(el);
            el.addClass("fluid-part");
            if (el.hasClass("non-coolapsed")) return;
            var s = splitter.clone();
            el.prepend(s);
            el.prepend($('<div class="fluid-legend"/>').text(el.attr("legend") || "Скрытая панель"));
            s.click(function(e) {
                var el = $(e.target);
                var parent = el.parent();
                el.nextAll().toggle();
                parent.toggleClass("fluid-part-hidden");
            });
        });
        layout.on('click', 'legend', function(e) {
            e.stopPropagation();
            var target = $(e.currentTarget);
            if (e.target.tagName != "LEGEND") return;
            target.toggleClass("collapsed");
            if (target.hasClass("collapsed")) {
                target.nextAll().hide();
            } else {
                target.nextAll().show();
            }
        });
    };
    $.extend($.fn, { fluidlayout : fluidlayout });
})(jQuery);