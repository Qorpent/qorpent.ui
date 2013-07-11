/**
 * Виджет формы авторизации пользователя
 */
(function(widgets) {
    var l = $('<input class="input-small" type="text" placeholder="Логин" autocomplete/>');
    var p = $('<input class="input-small" type="password" placeholder="Пароль"/>');
    var f = $('<form class="navbar-form login-form"/>')
        .append(l, p, $('<button class="btn btn-small" type="submit"/>').text("Войти"));
    f.submit(function(e) {
        e.preventDefault();
        authorize();
    });
    var authorize = function() {
        api.security.login.execute({_l_o_g_i_n_: l.val(), _p_a_s_s_: p.val()});
    };

    api.security.login.onSuccess(function(e, result) {
        if (result.authenticated) {
            authorizer.el.hide();
            router.toDefault();
        }
    });

    var authorizer = new widget.W({
        authonly : false,
        name : "authorizer",
        append : "toheader",
        float : "right",
        ready : function() {
            if (qorpent.user.isAuthorized()) {
                this.el.hide();
            }
        }
    });
    authorizer.el = f;
    widgets.push(authorizer);
})(window.widgets = window.widgets || []);