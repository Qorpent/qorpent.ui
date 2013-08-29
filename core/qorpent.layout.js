window._ = window._ || {};
(function(layout) {
    layout.template = "qorpent_layout";
    layout.resolvePosition = function(pos) {
        var result = null;
        // if pos is selector
        if (typeof pos == "object") {
            result = $(pos);
        }
        // else if string
        else if (typeof pos == "string") {
            if (pos.indexOf(":") != -1) {
                var options = pos.split(":");
                if (options.length > 1) {
                    if (options[0] == "menu" && options[1] != "") {
                        result = this.menu(options[1]);
                    }
                    else if (!!this[options[0].toLowerCase()]) {
                        result = this[options[0].toLowerCase()]();
                    }
                    $.each(options, function(i, o) {
                        if (i == 0) return;
                        if (!/^(right|left)$/.test(o)) {
                            var c = result.find(o);
                            if (c.length > 0) {
                                result = c; 
                            }
                        }
                    });
                }
            } else {
                if (!!this[pos.toLowerCase()]) {
                    result = this[pos.toLowerCase()]();
                }
            }
        }
        return result;
    };

    layout.add = function(pos, el) {
        el = $(el);
        var parent = this.resolvePosition(pos);
        if (typeof pos == "string") {
            if (pos.indexOf(":") != -1) {
                var options = pos.split(":");
                $.each(options, function(i, o) {
                    if (i == 0) return;
                    if (/^(right|left)$/.test(o)) {
                        el.addClass("pull-" + o);
                    }
                });
            }
        }
        if (!!parent) parent.append(el);  
    };

    layout.update = function(pos, el) {
        el = $(el);
        var parent = this.resolvePosition(pos);
        if (parent.hasClass("fluid-part")) {
            parent.children().not('.fluid-legend').not('.fluid-splitter').remove();
        }
        else {
            parent.empty();
        }
        if (!!parent) parent.append(el);
    };

    layout.init = function() {
        var body = $('body');
        var html = $(_.render.compiledTemplates[this.template]());
        body.append(html);
        $.extend(layout, {
            // zones
            header : function() { return $('#appHeader > .navbar > .navbar-inner') },
            statusbar : function() { return $('#appStatusbar') },
            pageheader : function() { $('#appPageHeader') },
            body : function() { return $('#appBody') },
            footer : function() { return $('#appFooter') },
            left : function() { return $('#appLeft') },
            menu : function(code,position) {
                var m = $('#'+code + ', #menu_'+code).first();
                if(m.length == 0){
                   m = this.createMenu(code, null, position);
                }
                /*$(document).on('click.dropdown.data-api', '#' + e.attr("id"), function (e) {
                    e.stopPropagation();
                });*/
                return m;
            },
			
            createMenu : function(code, inner,position) {
                inner = inner || null;
                if (typeof inner == "string") {
                    inner = $(inner);
                }
                var g = $('<div class="btn-group"/>');
                var b = $('<button class="btn btn-small dropdown-toggle" data-toggle="dropdown"/>').append(inner || code); 
                var m = $('<ul class="dropdown-menu"/>');
                g.attr("id", "menu_"+code);
				g.menucode = code;
				g.append(b,m);
				_.layout[position]().append(g);
				return g.first();
            },
            todebugmenu : function(e) { 
                this.appendToMenu("appAdminMenu", e);
                /*var m = $('#appAdminMenu');
                if (m.length == 0) {
                    this.createMenu("appAdminMenu", '<i class="icon icon-eye">');
                } else {
                    m.append(e); 
                }
                m = null;*/
            }  
        });

        body.find('.fluid-layout').first().fluidlayout();
    };
})(_.layout = _.layout || {});