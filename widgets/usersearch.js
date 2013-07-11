/**
 * Виджет формы поиска пользователей
 */
(function(widgets) {
    var getuser = function(username) {
        if (/^[а-я\s]+$/.test(username.toLowerCase())) {
            var getuserinfo = api.metadata.userinfo.safeClone();
            getuserinfo.onSuccess(function(e, result) {
                getinfo(result["0"].Login);
                /*users.empty();
                var label = $('<span class="label label-info"/>');
                $.each(result, function(i, u) {
                    users.append(label.clone().text(u.ShortName));
                });*/
            });
            getuserinfo.execute({name: username});
        } else {
            getinfo(username);
        }
    };

    var getinfo = function(login) {
        var l = $('<span/>').text(login);
        l.miauser({showonready: true});
        q.val("");
    };

    var usersearch = widget.register({
        name : "usersearch",
        position : "menu:appAdminMenu",
        title :"Поиск пользователей:",
        pattern : "^[\\sA-Za-zА-Яа-я]+$",
        events: [ 
            {   
                event: "submit",
                selector: "form",
                handler: function(e) {
                    e.preventDefault();
                    getuser(usersearch.el.find('.usersearch-query').val());
                }
            }
        ]
    });
})();