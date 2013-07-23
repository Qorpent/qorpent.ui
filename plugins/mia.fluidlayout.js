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
        var splitter = $('<div class="layout-splitter"/>');
        var ch = layout.children();
        $.each(ch, function(i, el) {
            el = $(el);
            el.addClass("fluid-part" + (i + 1));
            el.addClass("fluid-part");
        });
    };
    $.extend($.fn, { fluidlayout : fluidlayout });
})(jQuery);