window._ = window._ || {};
(function(layout) {
    layout.template = "qorpent_layout";
    layout.add = function(pos, el) {
        el = $(el);
        // if pos is selector
        if (typeof pos == "object") {
            $(pos).append(el);
        }
        // else if string
        else if (typeof pos == "string") {
            if (pos.indexOf(":") != -1) {
                var parent = null;
                var align = ""; 
                var options = pos.split(":");
                if (options.length > 1) {
                    if (options[0] == "menu" && options[1] != "") {
                        parent = this.menu(options[1]);
                    }
                    else if (!!this[options[0].toLowerCase()]) {
                        parent = this[options[0].toLowerCase()]();
                    }
                    $.each(options, function(i, o) {
                        if (i == 0) return;
                        if (/^(right|left)$/.test(o)) {
                            align = o;
                        } else {
                            var c = parent.find(o);
                            if (c.length > 0) {
                                parent = c; 
                            }
                        }
                    });
                }
                if (align != "") el.addClass("pull-" + align);
                if (parent) {
                    parent.append(el);
                }
            } else {
                if (!!this[pos.toLowerCase()]) {
                    this[pos.toLowerCase()]().append(el);
                }
            }
        }
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
            menu : function(code) {
                var m = $('#'+code);
                if(m.length == 0){
                    this.createMenu(code);
                }
                /*m.append($('<li class="divider"/>'));
                m.append($('<li/>').append(e));
                m.append($('<li class="divider"/>'));
                $(document).on('click.dropdown.data-api', '#' + e.attr("id"), function (e) {
                    e.stopPropagation();
                });*/
                return m;
            },
            createMenu : function(code, inner) {
                inner = inner || null;
                if (typeof inner == "string") {
                    inner = $(inner);
                }
                var g = $('<div class="btn-group"/>');
                var b = $('<button class="btn btn-small"/>').append(inner || code); 
                var m = $('<ul class="dropdown-menu"/>');
                m.attr("id", code);
                this.toheader(g.append(b, m));
                g = b = m = null;
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
    };
})(_.layout = _.layout || {});