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
                	sessionStorage.setItem("fluidlayout__" + parent.attr("id"), parent.hasClass("fluid-part-hidden"));
                }
            });
            if (!!elid) {
            	var valueInStorage = sessionStorage.getItem("fluidlayout__" + elid);
            	if (valueInStorage == "true") {
            		s.trigger("click");
            	}
            	else if (null == valueInStorage) {
            		sessionStorage.setItem("fluidlayout__" + elid, false);
            	}
            }
        });
    };
    $.extend($.fn, { fluidlayout : fluidlayout });
})(jQuery);