window._ = window._ || {};
(function(layout) {
    $.extend(layout, {
        header : $('<div id="appHeader" class="app-layout-header"/>').append(
            $('<div class="navbar"/>').append(
                $('<div class="navbar-inner"/>')
            )
        ),
        tools : $('<div id="appTools" class="app-layout-tools"/>'),
        pageheader : $('<div id="appPageHeader" class="app-layout-pageheader"/>'),
        body : $('<div id="appBody" class="app-layout-body"/>'),
        footer : $('<div id="appFooter" class="app-layout-footer"/>'),
        toheader : function(e) { $('#appHeader > .navbar > .navbar-inner').append(e); },
        tomenu : function(e) { $('#appMenu').append(e); },
        topageheader : function(e) { $('#appPageHeader').append(e); },
        tobody : function(e) { $('#appBody').append(e); },
        tofooter : function(e) { $('#appFooter').append(e); },
		appendToMenu : function(code, e) {
			e = $(e);
            var m = $('#'+code);
            if(m.length == 0){
				this.createMenu(code);
			}
            m.append($('<li class="divider"/>'));
            m.append($('<li/>').append(e));
            m.append($('<li class="divider"/>'));
            $(document).on('click.dropdown.data-api', '#' + e.attr("id"), function (e) {
                e.stopPropagation();
            });
            m = null;
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
		},
        add : function(pos, e) {
            if (pos.toUpperCase() == "HEADER") this.toheader(e);
            else if (pos.toUpperCase() == "MENU") this.tomenu(e);
            else if (pos.toUpperCase() == "PAGEHEADER") this.topageheader(e);
            else if (pos.toUpperCase() == "BODY") this.tobody(e);
            else if (pos.toUpperCase() == "FOOTER") this.tofooter(e);
            else this.tobody(e);
        }
    });
    layout.init = function() {
        var body = $('body');
        body.append(layout.header);
        body.append(layout.tools);
        body.append(layout.pageheader);
        body.append(layout.body);
        body.append(layout.footer);
    };
})(_.layout = _.layout || {});