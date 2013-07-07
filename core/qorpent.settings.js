(function(settings) {
    $.extend(settings, {
        init : function() {
            this.params = $.extend(this.defaults, JSON.parse(sessionStorage.getItem("app/user_settings")));
        },

        params : {

        },

        set: function(param, val) {
            this.params[param] = val;
            sessionStorage.setItem("app/user_settings", JSON.stringify(this.params));
        },

        get: function(param) {
            return this.params[param];
        },

        defaults: {
            form_in_new_window : false
        }
    });
})(window.settings = window.settings || {});

$(document).ready(function() {
    settings.init();
});