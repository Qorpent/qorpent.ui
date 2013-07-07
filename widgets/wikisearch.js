/**
 * Виджет формы запроса документации wiki
 */
(function(widgets) {
	var wikisearch = widgets.register({
		// отрисовка титла - вопрос движка
		title : "Работа с wiki:",
        authonly : false,
        name : "appwikisearch",
        append : "todebugmenu",
		//это забота движка правильно распределеить на экран
		place : "menu:debug",
		
    });


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
    
    wikisearch.el = $('<li/>').append($('<div/>').text("Работа с wiki:"), f);
	
	
	
	// Это не забота викисерча
	// $(document).on('click.dropdown.data-api', '#appwikisearch-widget', function (e) {
        // e.stopPropagation();
    // });
    //widgets.push({ append : "todebugmenu", el: $('<li class="divider"/>') });
    
    //widgets.push({ append : "todebugmenu", el: $('<li class="divider"/>') });
    
})(window.widgets = window.widgets || []);