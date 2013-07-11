/**
 * Виджет формы запроса документации wiki
 */
widget.register({
	title :"Работа с wiki:",
	name : "wikisearch",
	position : "menu:appAdminMenu",
	events : {
		submit : { selector : "form" ,  handler : function(e){
			e.preventDefault();
			api.wiki.get.execute({ Code: $(e.target).find('input').val() });
		}},
	},
});
