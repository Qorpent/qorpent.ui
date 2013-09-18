(function($) {
    var fluidlayout = function(options){
        var layout = $(this);
        if (!layout.hasClass("fluid-layout")) {
            layout.addClass("fluid-layout");
        };
        options = $.extend({
            splited: true,
            width: []
        }, options);
        if (options.splited) {
            layout.addClass("splited-layout");
            setupsplitter(layout, options);
        }
    };

    var setupsplitter = function(layout, options) {
        var splitter = $('<div class="fluid-splitter"/>');
        var ch = layout.children();
        layout.on('click', 'legend', function(e) {
            e.stopPropagation();
            var target = $(e.currentTarget);
            if (e.target.tagName != "LEGEND") return;
            target.toggleClass("collapsed");
            if (target.hasClass("collapsed")) {
                target.nextAll().not('.hidden').hide();
            } else {
                target.nextAll().not('.hidden').show();
            }
        });

        $.each(ch, function(i, el) {
            el = $(el);
            el.addClass("fluid-part");
            if (el.hasClass("non-coolapsed")) return;
            var s = splitter.clone();
            var elid = el.attr("id");
            el.prepend(s);
            el.prepend($('<div class="fluid-legend"/>').text(el.attr("legend") || "Скрытая панель"));
            s.click(function(e) {
                var el = $(e.target);
                var parent = el.parent();
                parent.toggleClass("fluid-part-hidden");
                if (!!parent.attr("id")) {
                	localStorage.setItem("fluidlayout__" + parent.attr("id"), parent.hasClass("fluid-part-hidden"));
                }
            });
            if (!!elid) {
            	var valueInStorage = localStorage.getItem("fluidlayout__" + elid);
            	if (valueInStorage == "true") {
            		s.trigger("click");
            	}
            	else if (null == valueInStorage) {
            		localStorage.setItem("fluidlayout__" + elid, false);
            	}
            }
            el.css({
                "-webkit-flex-basis": options.width[i] || "100%",
                "-moz-flex-basis": options.width[i] || "100%",
                "flex-basis": options.width[i] || "100%"
            });
        });
    };
    $.extend($.fn, { fluidlayout : fluidlayout });
})(jQuery);