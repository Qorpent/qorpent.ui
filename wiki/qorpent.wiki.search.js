/**
 * Виджет формы запроса документации wiki
 */
(function(widgets) {
    var q = $('<input class="input-small" type="text" placeholder="Код статьи" autocomplete/>').width(139);
    var f = $('<form class="navbar-form login-form"/>');
    var b = $('<button class="btn btn-small btn-success" type="submit"/>').html('<i class="icon-search icon-white"></i>');
    f.append(q, b);
    f.submit(function(e) {
        e.preventDefault();
        getwiki();
    });
    var getwiki = function() {
        _.api.wiki.get.execute({ Code: q.val() });
    };

    $.extend(layout, {
        todebugmenu : function(e) { $('#appAdminMenu').append(e) }
    });
    var wikisearch = new widget.W({
        authonly : false,
        name : "appwikisearch",
        append : "todebugmenu"
    });
    wikisearch.el = $('<li/>').append($('<div/>').text("Работа с wiki:"), f);
    widgets.push({ append : "todebugmenu", el: $('<li class="divider"/>') });
    widgets.push(wikisearch);
    widgets.push({ append : "todebugmenu", el: $('<li class="divider"/>') });
    $(document).on('click.dropdown.data-api', '#appwikisearch-widget', function (e) {
        e.stopPropagation();
    });
})(window.widgets = window.widgets || []);