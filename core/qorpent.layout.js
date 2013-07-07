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
		tomenu2 : function(menucode, e){
			if(!$('#qlMenu_'+menucode)){
				this.createMenu(menucode);
			}
			this.appendMenuDivider(menucode);
			this.appendMenuItem(e);
			this.appendMenuDivider(menucode);
		},
		todebugmenu : function(e) { 
			if( $('#appAdminMenu')) $('#appAdminMenu').append(e) 
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
    var body = $('body');
    body.append(layout.header);
    body.append(layout.tools);
    body.append(layout.pageheader);
    body.append(layout.body);
    body.append(layout.footer);
})(window.layout = window.layout || {});