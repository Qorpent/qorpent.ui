window._ = window._ || {};
(function(widget) {
    $.extend(widget, {
        W : function(o) {
            if (!o.name) {
                o.name = $.md5(JSON.stringify(o));
            }
            if (typeof o.routes == "string") {
                o.routes = new Array(o.routes);
            }
            return $.extend({
                append : null,
                position : null,
                float : "",
                authonly: true,
                adminonly: false,
                help: null,
                // Функция которая вызывается после того как виджет добавлен
                ready: null,
                el : null,
                installed : false,
                routes: []
            }, o);
        },
		
		install : function(w) {
			if (w.installed) return;
			w.layout = _.layout;
			
			if(!!w.init) {
				w.init();
			}
			
			if(w.type == "menu"){
				var menu = _.layout.menu(w.name, w.position).qorpentmenu(w.menu);
				menu.setTitle(w.title);
				menu.setIcon(w.icon);
				w.el = menu;
			}

			if(!!w.type && w.type.indexOf("button") != -1) {
				var button = $('<button class="btn btn-small"/>');
				var icon = null;
				if (!!w.icon) {
					icon = $('<i/>').addClass(w.icon);
					button.append(icon);
				}
				if (!!w.text) {
					button.append(w.text);
				}
				if (w.type.indexOf(":") != -1) {
					var btnclass = w.type.split(":")[1];
					button.addClass(btnclass);
					if (!!icon) {
						if (btnclass != "" && btnclass != "default") {
							icon.addClass("icon-white");
						}
					}
				}
				if (!!w.title) {
					button.attr("data-original-title", w.title);
					button.tooltip({placement: "bottom"});
				}
				w.el = button;
				if (!!w.onclick) {
					w.el.click($.proxy(w.onclick, w));
				}
			}
			
			if (!w.completed && !w.initonly && w.type!='menu') {
				if( !!w.render ) {
					w.render();
				}
				if (!w.el) {
					templatename = w.template || w.name;
					if (!!_.render.compiledTemplates[templatename]) {
						w.el =  $(_.render.compiledTemplates[templatename](w));
					}
				}
				w.el = $("<widget name='"+w.name+"'>").append(w.el);
				if (!!w.events) {
					$.each(w.events, function(i, e) {
						w.el.on(e.event, e.selector, $.proxy(e.handler, w));
					});
				}
				if (!!w.command && !!w.type) {
					if (w.type == "form") {
						var command = w.command;
						if (!!w.onsubmit) {
							command = w.command.safeClone();
							command.onSuccess(w.onsubmit);
						}
						w.el.on("submit", "form", function(e) {
							e.preventDefault();
							var params = $(e.target).serializeArray();
							if(!!this.getData){
								this.getData(params,e);
							}
							command.execute(params);
						});
					}
					else if (w.type == "button") {
						w.el.on("click", "button, .widget-button", $.proxy(function(e) {
							e.preventDefault();
							var params = {};
							if(!!this.getData){
								this.getData(params,e);
							}
							this.command.execute(params);
						}, w));
					}
				}
				
				if (w.authonly && !_.qorpent.user.isAuthorized()) return;
				if (w.adminonly && !_.qorpent.user.logonadmin) return;
				if (!$.isEmptyObject(w.routes)) {
					if ($.inArray(router.current, w.routes) == -1) return;
				}
				if (!!w.el) {
					w.el.addClass("qorpent-widget");
				}
				if (!!w.name) w.el.attr("id", w.name + "-widget");
				if (!!w.append) {
					_.layout[w.append](w.el);
				} 
				else if (!!w.position) {
					_.layout.add(w.position, w.el);
				}
				
				
			}
			if (!w.installed) w.installed = true;
			if (!!w.ready) w.ready();
		},

		remove : function(w) {
			if (!!w.el) {
				w.el.remove();
			}
			_.widgets = $.grep(_.widgets, function(widget) {return widget !== w });
		},

        installAll : function() {
            if ($.isEmptyObject(_.widgets)) return;
            $.each(_.widgets, $.proxy( function(i, w) {
				try {
					this.install(w);
				} catch(e) {
					if(w.el) {
						$(w.el).hide();
					}
					var errorw = new widget.W({ name : "error_"+w.name , position: w.position, 
					el : $("<div class='widget-error'/>")
						.attr('title',e.stack)
						.html('error in widget :'+w.name+"<br/>"+e)});
					this.install(0,errorw);
				}
            },this));
        },
		
		templatesSupported : false,

        uninstallAll : function() {

        }
    });
    widget.register = function(options) {
        var w = new widget.W(options);
        _.widgets = _.widgets || [];
        _.widgets.push(w);
        return w;
    };
    $(document).on('click.dropdown.data-api', '.dropdown-menu widget', function (e) {
        e.stopPropagation();
    });
})(_.widget = _.widget || {});