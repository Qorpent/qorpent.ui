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
            menu : function(code,position) {
                var m = $('#'+code).first() || $('#menu_'+code).first();
                if(m.length == 0){
                   m = this.createMenu(code,null,position);
                }
                /*m.append($('<li class="divider"/>'));
                m.append($('<li/>').append(e));
                m.append($('<li class="divider"/>'));
                $(document).on('click.dropdown.data-api', '#' + e.attr("id"), function (e) {
                    e.stopPropagation();
                });*/
                return this.__extendMenu(m);
            },
			
			__extendMenu :function  (e ){
				if(!!e.__extendMenu_completed)return e;
				return $.extend(e,{
					__extendMenu_completed : true,
					__select :  function(selector){
						selector = selector || 'button';
						item = $(this).find(selector).first();
						return item;
					},
					settitle : function(title, selector){
						var button = this.__select(selector);
						button.attr('data-original-title',title);
						button.tooltip({placement: 'bottom'});
						return this;
					},
					setinner : function(inner,selector){
						if(!inner)return this;
						var item = this.__select(selector);
						if(typeof(inner)=='string'){
							if(inner.indexOf('icon')!=-1){
								item.html('<i class="icon '+inner+'"/>');
							}else{
								if(inner.indexOf('<')!=-1){
									item.html(inner);
								}else{
									item.text(inner);
								}
							}
						}else{
							item.append(inner);
						}
						return this;
					},
					additem : function( menuitem , parent ) {
						var  ul = parent || $(this).find('.dropdown-menu').first();
						var li = $('<li>');
						if(!menuitem) return this;
						else if(!!menuitem.tagName){
							li.append(menuitem);
						}else if(typeof(menuitem)=='string'){
							if(menuitem=='div'){
								li.addClass('divider');
							}else{
								if(menuitem.indexOf('<')!=-1){
									li.html(menuitem);
								}else{
									li.text(menuitem);
								}
							}
						}else{
							var inner = li;
							if(!!menuitem.href) {
								inner = $('<a/>');
								li.append(inner);
								inner.attr({href:menuitem.href,target : menuitem.target || '_blank'});
							}
							if(menuitem.title.indexOf('<')!=-1){
								inner.html(menuitem.title);
							}else{
								inner.text(menuitem.title);
							}
							if(!!menuitem.onclick){
								li.on('click',menuitem.onclick);
							}
							
							if (!!menuitem.items){
								var newul = $('<ul class="dropdown-menu" />');
								if(0==li.find('a').length){
									li.empty();
									a = $('<a/>');
									a.html(menuitem.title);
									li.append(a);
								}
								li.append(newul);
								li.addClass('dropdown-submenu');
								
								$.each(menuitem.items, $.proxy(function(i,v){
									this.additem(v,newul);
								},this));
							}
							
							if (!!menuitem.icon) {
								li.find('a').first().prepend($('<i class="icon '+menuitem.icon+'"/>'));
							}
							
						}
						ul.append(li);
						
						
						
						this.lastitem = li;
						return this;
						
					},
					lastitem : null,
				});
			},
			
            createMenu : function(code, inner,position) {
                inner = inner || null;
                if (typeof inner == "string") {
                    inner = $(inner);
                }
                var g = $('<div class="btn-group"/>');
                var b = $('<button class="btn btn-small dropdown-toggle" data-toggle="dropdown"/>').append(inner || code); 
                var m = $('<ul class="dropdown-menu"/>');
                m.attr("id", "menu_"+code);
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
    };
})(_.layout = _.layout || {});