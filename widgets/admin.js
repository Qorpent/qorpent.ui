/**
 * Виджет инструментов для отладки
 */
(function(widgets) {
    var m = $('<div class="btn-group pull-right"/>');
    var l = $('<ul class="dropdown-menu" id="appAdminMenu"/>');
    var b = $('<button class="btn btn-small dropdown-toggle" data-toggle="dropdown" data-original-title="Админам"/>')
        .html('<i class="icon-eye-close"></i><span class="caret"></span>');
    var serverinfo = $('<a/>').html('<i class="icon-tasks"></i>Статус сервера');
    serverinfo.click(function() { api.server.state.execute(null, {
        triggerOnSuccess: function(result) {
            $('<p/>').append(JSON.formatter.jsonObjToHTML(result)).miamodal({ title: "Статус сервера" });
        }
    })});
    var debuginfo = $('<a/>').html('<i class="icon-warning-sign"></i> Отладочная информация');
    debuginfo.click(function() { api.session.info.execute(null, {
        triggerOnSuccess: function(result) {
            $('<p/>').append(JSON.formatter.jsonObjToHTML(result)).miamodal({ title: "Отладочная информация" });
        }
    })});
    l.append($('<li/>').append(serverinfo));
    l.append($('<li/>').append(debuginfo));
    m.append(b, l);

    var appadmin = new widget.W({
        authonly : true,
        adminonly : true,
        name : "appadmin",
        append : "toheader",
        float : "right"
    });
    appadmin.el = m;
    widgets.push(appadmin);
})(window.widgets = window.widgets || []);