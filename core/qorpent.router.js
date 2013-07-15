window._ = window._ || {};
(function(router) {
    $.extend(router, {
        routes : [],
        init : function() {
            var m = location.hash.match(/^#(\w+)/);
            if (!!m) this.current = m[1];
        },

        addRoute : function(name, callback) {
            this[name] = function() { callback() };
            this.routes.push(name);
        },

        asDefault : function(route) {
            this.default = route;
        },

        to : function(route) {
            if (route != this.current) {
                location.hash = route;
                this.current = route;
            }
            this[route]();
        },

        current : "",

        toDefault : function() {
            this.to(this.default);
        }
    });
})(_.router = _.router || {});