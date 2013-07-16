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
        _.api._sys.login.execute({_l_o_g_i_n_: l.val(), _p_a_s_s_: p.val()});
    };

    _.api._sys.login.onSuccess(function(e, result) {
        if (result.authenticated) {
            authorizer.el.hide();
            _.router.toDefault();
        }
    });

    var authorizer = new _.widget.W({
        authonly : false,
        name : "authorizer",
        position: "header:right",
        ready : function() {
            if (_.qorpent.user.isAuthorized()) {
                this.el.hide();
            }
        }
    });
    authorizer.el = f;
    widgets.push(authorizer);
})(_.widgets = _.widgets || []);