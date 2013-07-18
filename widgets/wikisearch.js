/**
 * Виджет формы запроса документации wiki
 */
_.widget.register({
	name : "wikisearch",
	position : "menu:appAdminMenu",
	type : "form",
	
	// form setup
	title :"Работа с wiki:",
	pattern : "^(/\\w[\\w\\d_\\-]*)+$",
	userformat : "разделенные прямыми слэшами коды из букв, цифр и черточек, например /aaa/b1/c_d",
	
	//интеграция с _.api
	codeparam : "code",
	command : _.api.wiki.get,
});
