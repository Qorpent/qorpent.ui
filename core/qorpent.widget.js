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
                append : "tobody",
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
                if (w.authonly && !app.user.isAuthorized()) return;
                if (w.adminonly && !app.user.logonadmin) return;
                if (!$.isEmptyObject(w.routes)) {
                    if ($.inArray(router.current, w.routes) == -1) return;
                }
                if (!!w.append) {
                    layout[w.append](w.el);
                    if (!!w.name) w.el.attr("id", w.name + "-widget");
                    if (!!w.float) w.el.addClass("pull-" + w.float);
                }
                if (!!w.ready) w.ready();
            });
        },

        uninstallAll : function() {

        }
    });
})(window.widget = window.widget || {});