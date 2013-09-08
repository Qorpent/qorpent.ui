window._ = window._ || {};
(function(router) {
    $.extend(router, {
        routes : [],
        params: {},
        init : function() {
            var hash = location.hash;
            var m = hash.match(/^#(\w+)/);
            if (!!m) this.current = m[1];
            if (hash.indexOf("?") != -1) {
                $.each(hash.split("?")[1].split("|"), $.proxy(function(i, p) {
                    var kv = p.split("=");
                    if (kv[1] == null) kv.push("");
                    this.params[kv[0]] = kv[1];
                }, this));
            }
        },

        addRoute : function(name, callback) {
            this[name] = function() { callback() };
            this.routes.push(name);
        },

        asDefault : function(route) {
            this.default = route;
        },

        to : function(route, params, openblank) {
            params = params || {};
            openblank = openblank || false;
            var hash = route;
            if (!$.isEmptyObject(params)) {
                hash += "?" + $.map(params, function(v, k) { return k + "=" + v }).join("|");
                this.params = params;
            }
            if (openblank) {
                window.open("#" + hash, "_blank");
            } else {
                location.hash = hash;
                this.current = route;
                this[route]();
            }
        },

        current : "",

        toDefault : function() {
            this.to(this.default, this.params);
        },

        toStart: function() {
            this.to(this.current != "" ? this.current : this.default, this.params);
        }
    });
})(_.router = _.router || {});