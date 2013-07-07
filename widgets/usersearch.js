/**
 * Виджет формы поиска пользователей
 */
(function(widgets) {
    var q = $('<input class="input-small" type="text" placeholder="Имя или логин" autocomplete/>').width(139);
    var f = $('<form class="navbar-form"/>');
    var b = $('<button class="btn btn-small btn-primary" type="submit"/>').html('<i class="icon-search icon-white"></i>');
    var users = $('<div/>');
    f.append(q, b);
    f.submit(function(e) {
        e.preventDefault();
        getuser();
    });
    var getuser = function() {
        if (/^[а-я\s]+$/.test(q.val().toLowerCase())) {
            var getuserinfo = api.metadata.userinfo.safeClone();
            getuserinfo.onSuccess(function(e, result) {
                getinfo(result["0"].Login);
                /*users.empty();
                var label = $('<span class="label label-info"/>');
                $.each(result, function(i, u) {
                    users.append(label.clone().text(u.ShortName));
                });*/
            });
            getuserinfo.execute({name: q.val()});
        } else {
            getinfo(q.val());
        }
    };

    var getinfo = function(login) {
        var l = $('<span/>').text(login);
        l.miauser({showonready: true});
        q.val("");
    };

    $.extend(layout, {
        todebugmenu : function(e) { $('#appAdminMenu').append(e) }
    });
    var usersearch = new widget.W({
        authonly : false,
        name : "appusersearch",
        append : "todebugmenu"
    });
    usersearch.el = $('<li/>').append($('<div/>').text("Поиск пользователя:"), f, users);
    widgets.push({ append : "todebugmenu", el: $('<li class="divider"/>') });
    widgets.push(usersearch);
    widgets.push({ append : "todebugmenu", el: $('<li class="divider"/>') });
    $(document).on('click.dropdown.data-api', '#appusersearch-widget', function (e) {
        e.stopPropagation();
    });
})(window.widgets = window.widgets || []);