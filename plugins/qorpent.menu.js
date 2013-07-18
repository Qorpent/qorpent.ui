window._ = window._ || {};
(function($) {
    var Menu = function(element, options) {
        this.element = $(element);
    };

    $.extend(Menu.prototype, {
        structure: {},
        root: null,

        init: function(options) {
            options = options || {};
            this.root = this.element.find(".dropdown-menu").first();
            if (this.root.length > 0) {
                this.structure = this.getItems(this.root);
            } else {
                this.root = $('<ul class="dropdown-menu"/>');
                this.element.append(this.root);
            }
            if (!!options.items) {
                $.each(options.items, $.proxy(function(i, item) {
                    this.addItem(item, this.root);
                }, this));
            }
        },

        setTitle: function(title) {
            var button = this.element.find('button').first();
            if (button.length > 0) {
                button.attr('data-original-title', title);
                button.tooltip({placement: 'bottom'});
            }
        },

        setIcon: function(inner) {
            var button = this.element.find('button').first(); 
            if (typeof inner == "string") {
                if (inner.indexOf("icon") != -1) {
                    button.html('<i class="icon ' + inner + '"/>');
                } else {
                    if (inner.indexOf('<') != -1) {
                        button.html(inner);
                    } else {
                        button.text(inner);
                    }
                }
            } else {
                button.prepend(inner);
            }
        },

        addItem: function(item, root) {
            var itemMenu = null;
            // если это объект jquery
            if (!!item.jquery) {
                itemMenu = item;
            }
            else if (typeof item == "string" && (item == "divider" || item == "div")) {
                itemMenu = $('<li class="divider"/>');
            }
            else {
                itemMenu = $('<li/>')    
				var inner = $("<a/>")
							.attr({"href": item.href || "", "target": item.target || "_blank"})
							.append($('<i/>').addClass(item.icon || ""), item.title || "Нет заголовка");
				itemMenu.append(inner);
				
				if(item.onclick){
					if( typeof item.onclick  == 'function' ){
						inner.on('click', function(e){
							e.preventDefault();
							$.proxy( item.onclick, item )(e);
						});
					}else if (item.onclick.command) {
						var command = _.api.resolve(item.onclick.command);
						if (item.onclick.onsuccess){
							command = command.safeClone();
							if (typeof item.onclick.onsuccess == 'function'){
								command.onSuccess($.proxy(item.onsuccess,item));
							}else{
								if (item.onclick.onsuccess.modal){
									
									command.onSuccess($.proxy(
										
										function (e, r ) {
											var modal = this.onclick.onsuccess.modal;
											var el = null;
											if (modal.text ) {
												if(modal.text.indexOf('<')==-1){
													el = $('<p>').text(modal.text);
												}else{
													el = $(modal.text);
												}
											}
											else if(modal.template){
												var context = {item : this, result : r };
												el = $(_.render.compiledTemplates[modal.template](context));
											}
											else if( modal.render ) {
												el = $.proxy(modal.render,item)(r);
											}
											el.miamodal(modal);
										}
										
									,item));
								}
							}
							
						}
						inner.on('click',function(e){
								e.preventDefault();
								command.execute();
							});
					}
				}
				
				
                if (!!item.items) {
                    itemMenu.addClass("dropdown-submenu");
                    var submenu = $('<ul class="dropdown-menu"/>');
                    $.each(item.items, $.proxy(function(i, item) {
                        this.addItem(item, submenu);
                    }, this));
                    itemMenu.append(submenu);
                }
            }
            root.append(itemMenu);
        },

        getMenuItems: function(menu) {
            var items = [];
            $.each($(menu).children('li'), $.proxy(function(i, ch) {
                ch = $(ch);
                var item = {};
                var a = ch.find("a").first();
                item.title = a.text();
                item.icon = a.find("i").attr("class") || "";
                if (ch.hasClass("dropdown-submenu")) {
                    item.items = this.getMenuItems(ch.find(".dropdown-menu").first());
                }
                items.push(item);
            }, this));
            return items;
        },

        getItems: function() {
            console.log(this.getMenuItems(this.root));
        }
    });

    $.fn.qorpentmenu = function (options, method) {
        options = options || {};
        method = method || "init";
        return this.each(function () {
            var menu = $.data(this, "qorpentmenu");
            if (!menu) {
                menu = new Menu(this, options);
                $.data(this, "qorpentmenu", menu);
            }
            if (!!menu[method]) {
                menu[method](options);
            }
        });
    };
})(jQuery);