/**
 * Виджет информации о пользователе
 */
(function(widgets) {
    var m = $('<div class="btn-group pull-right"/>');
    var l = $('<ul class="dropdown-menu" id="appUserMenu"/>');
    var b = $('<button class="btn btn-small dropdown-toggle" data-toggle="dropdown" data-original-title="Пользователь"/>')
        .html('<i class="icon-user"></i>');

    m.append(b, l);

    var configure = function() {
        if (!!qorpent.user) {
            var u = $('<a/>').text(qorpent.user.logonname);
            l.append($('<li/>').append(u));
            // u.miauser();
            if (!!qorpent.user.getImpersonation()) {
                var imp = $('<a/>').text(qorpent.user.getImpersonation());
                l.append($('<li class="divider"/>'));
                l.append($('<li/>').append($('<div/>').text("Вход от имени"), imp));
                // imp.miauser();
            }
        }
    };

    var appuser = new widget.W({
        authonly : true,
        adminonly : true,
        name : "appuser",
        append : "toheader",
        float : "right",
        ready: function() { configure() }
    });
    appuser.el = m;
    widgets.push(appuser);
})(window.widgets = window.widgets || []);