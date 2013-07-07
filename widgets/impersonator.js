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

    $.extend(layout, {
        todebugmenu : function(e) { $('#appAdminMenu').append(e) }
    });
    var imersonator = new widget.W({
        authonly : false,
        name : "appimersonator",
        append : "todebugmenu",
        ready : function() {
            if (!!app.user.getImpersonation()) {
                d.show(); f.hide();
            } else {
                d.hide(); f.show();
            }
        }
    });
    imersonator.el = $('<li/>').append($('<div/>').text("Вход от имени:"), f, d);
    widgets.push({ append : "todebugmenu", el: $('<li class="divider"/>') });
    widgets.push(imersonator);
    widgets.push({ append : "todebugmenu", el: $('<li class="divider"/>') });
    $(document).on('click.dropdown.data-api', '#appimersonator-widget', function (e) {
        e.stopPropagation();
    });
})(window.widgets = window.widgets || []);