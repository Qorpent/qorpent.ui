(function($) {
    var fluidlayout = function(options){
        var layout = $(this);
        if (!layout.hasClass("row-fluid")) return;
        options = $.extend({
            splited: true
        }, options);
        if (options.splited) {
            layout.addClass("splited-fluid");
            setupsplitter(layout);
        }
    };

    var setupsplitter = function() {
        var splitter = $('<div class="fluid-splitter"/>');
        $.each(layout.children(), function(i, el) {
            
        });
    };
    $.extend($.fn, { fluidlayout : fluidlayout });
})(jQuery);