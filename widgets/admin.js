/**
 * Виджет инструментов для отладки
 */
(function(widgets) {
    var m = $('<div class="btn-group pull-right"/>');
    var l = $('<ul class="dropdown-menu" id="appAdminMenu"/>');
    var b = $('<button class="btn btn-small dropdown-toggle" data-toggle="dropdown" data-original-title="Админам"/>')
        .html('<i class="icon-eye-close"></i><span class="caret"></span>');
    var serverinfo = $('<a/>').html('<i class="icon-tasks"></i>Статус сервера');
    serverinfo.click(function() { _.api._sys.state.execute(null, {
        triggerOnSuccess: function(result) {
            $('<p/>').append(JSON.formatter.jsonObjToHTML(result)).miamodal({ title: "Статус сервера" });
        }
    })});
    l.append($('<li/>').append(serverinfo));
    m.append(b, l);

    var appadmin = new _.widget.W({
        authonly : true,
        adminonly : true,
        name : "appadmin",
        append : "toheader",
        float : "right"
    });
    appadmin.el = m;
    widgets.push(appadmin);
})(_.widgets = _.widgets || []);