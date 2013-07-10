/**
 * Виджет формы запроса документации wiki
 */
(function(widget) {
	var q = $('<input class="input-small" type="text" placeholder="Код статьи" autocomplete/>').width(139);
    var f = $('<form class="navbar-form login-form"/>');
    var b = $('<button class="btn btn-small btn-success" type="submit"/>').html('<i class="icon-search icon-white"></i>');
    f.append(q, b);
    f.submit(function(e) {
        e.preventDefault();
        getwiki();
    });
    var getwiki = function() {
        api.wiki.get.execute({ Code: q.val() });
    };
    
	var wikisearch = widget.register({
        // отрисовка титла - вопрос движка
        title : "Работа с wiki",
        authonly : true,
        name : "wikisearch",
        position : "menu:appAdminMenu"
    });
    wikisearch.el = $('<li/>').append($('<div/>').text("Работа с wiki:"), f);
})(window.widget = window.widget || {});