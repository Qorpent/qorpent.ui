/**
 * Виджет формы имперсонации
 */
(function(widgets) {
    var l = $('<input class="input-small" type="text" placeholder="Логин" autocomplete/>').width(119);
    var f = $('<form class="navbar-form login-form"/>');
    var b = $('<button class="btn btn-small" type="submit"/>').text("Войти");
    var d = $('<button class="btn btn-small" type="submit"/>').text("Вернуться в свой логин");
    d.click(function() {
        l.val("");
        impersonate();
    });
    f.append(l, b);
    f.submit(function(e) {
        e.preventDefault();
        impersonate();
    });
    var impersonate = function() {
        if (/^[а-я\s]+$/.test(l.val().toLowerCase())) {
            var getuserinfo = api.metadata.userinfo.safeClone();
            getuserinfo.onSuccess(function(e, result) {
                api.security.impersonate.execute({ Target: result["0"].Login });
            });
            getuserinfo.execute({name: l.val()});
        } else {
            api.security.impersonate.execute({ Target: l.val() });
        }
    };

    api.security.impersonate.onSuccess(function() { location.reload() });

    var imersonator = new widget.register({
        authonly : false,
        name : "appimersonator",
        append : "todebugmenu",
        ready : function() {
            if (!!qorpent.user.getImpersonation()) {
                d.show(); f.hide();
            } else {
                d.hide(); f.show();
            }
        }
    });
    imersonator.el = $('<div/>').append($('<div/>').text("Вход от имени"), f, d);
})(window.widgets = window.widgets || []);