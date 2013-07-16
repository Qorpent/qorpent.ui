/**
 * Виджет формы запроса документации wiki
 */
_.widget.register({
	name : "bxlparser_btn",
	
	autoroute : true,
	
	position : "header:left",
	
	mainview : "bxlparser_main",
	
	type : "button",
	
	title :"Отладчик BXL",
	
	onclick : function ( e ) {
		_.layout.body.empty()
			.append(_.render.toelement(this.mainview,this));
		
	},
});



