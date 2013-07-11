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

        installAll : function() {
            if ($.isEmptyObject(widgets)) return;
            $.each(widgets, function(i, w) {
				if( !!w.render ) {
					w.render();
				}
			
				if (!w.el) {
					templatename = w.template || w.name;
					w.el =  $(widgets.compiledTemplates[templatename](w));
				}
				
				w.el = $("<widget name='"+w.name+"'>").append(w.el);
				
				if (!!w.events) {
					$.each ( w.events , function(i,e){
						w.el.on(i,e.selector, $.proxy(e.handler,w));
					});
				}
				
				
				if (!!w.command && !!w.type){
					if (w.type == "form") {
						w.el.on("submit","form",$.proxy(function(e){
							e.preventDefault();
							var params = $(e.target).serializeArray();
							if(!!this.getData()){
								this.getData(params,e);
							}
							this.command.execute(params);
						},w));
					}else if (w.type == "button" ) {
						w.el.on("click","button,.widget-button",$.proxy(function(e){
							e.preventDefault();
							var params = {};
							if(!!this.getData()){
								this.getData(params,e);
							}
							this.command.execute(params);
						},w));
					}
				}
			
                if (w.authonly && !qorpent.user.isAuthorized()) return;
                if (w.adminonly && !qorpent.user.logonadmin) return;
                if (!$.isEmptyObject(w.routes)) {
                    if ($.inArray(router.current, w.routes) == -1) return;
                }
                if (!!w.el) {
                    w.el.addClass("qorpent-widget");
                }
                if (!!w.name) w.el.attr("id", w.name + "-widget");
                if (!!w.append) {
                    layout[w.append](w.el);
                }
                // для позиционирования по-новому
                if (!!w.position) {
                    var p = w.position.split(':');
                    if (p[0] == "menu") {
                        layout.appendToMenu(p[1], w.el);
                    } else {
                        layout.add(p[0], w.el);
                    }
                }
                if (!!w.float) w.el.addClass("pull-" + w.float);
                if (!!w.ready) w.ready();
            });
        },
		
		templatesSupported : false,
		
		
		
		prepareTemplates : function ( templates ) {
			window.widgets.compiledTemplates = window.widgets.compiledTemplates || {};
			if(window.Mustache){
				this.templatesSupported = true;
				var ctemplates = window.widgets.compiledTemplates;
				$.each(templates, function(i,t){
					name = i.replace(/\./g,'_');
					try {
						ctemplates[name] = window.Mustache.compile ( t );
						window.Mustache.compilePartial(name, t);
					} catch (e){
						console.log("view error: "+name+"  " + e);
						ctemplates[name] = function(data) {
							return $("<div class='error'>Cannot render "+name+" due to template issue: ").html(e);
						};
					}
				});
			}
		},

        uninstallAll : function() {

        }
    });
    widget.register = function(options) {
        var w = new widget.W(options);
        window.widgets = window.widgets || [];
        window.widgets.push(w);
        return w;
    };
})(window.widget = window.widget || {});