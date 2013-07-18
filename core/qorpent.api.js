window._ = window._ || {};
(function(api) {
    var Command = qweb.C;
    api._sys = api._sys || {};
    api.wiki = api.wiki || {};
    var serverapi = {};
	$.extend(api, {
		//Находит команду по коду
		resolve : function(code){
			if(typeof(code) == 'string'){
				var codeparts = code.split('.');
				return this[codeparts[0]][codeparts[1]];
			}else{
				//прозрачный возврат
				return code;
			}
		}
	});
	$.extend(serverapi, window.qweb.embedStorage._sys__myactions);
    $.extend(api._sys, {
        login : $.extend(new Command({ domain:"_sys", name:"login", method: "POST", group: "security", title: "Вход в систему", withProgress: false }), {
            triggerOnSuccess : function(r) {
                if (!r.authenticated) this["triggerOnError"]({ type: "Ошибка авторизации пользователя", message: r.errormessage });
                else $(this).trigger(this.eventName + ":Success", r);
            }
        }),
        logout : new Command({ domain: "_sys", name: "logout"}),
        impersonate : new Command({ domain: "_sys", name: "impersonate"}),
        whoami : new Command({ domain: "_sys", name: "whoami", title: "Идентификация пользователя" }),
        userinfo : new Command({ domain: "_sys", name: "getuserinfo", group: "metadata", cache: true })
    });
    $.extend(api.wiki, {
        // Запрашивает статью с кодом [code]
        get : new Command({ domain: "wiki", name: "get" }),
        // то же самое что get, только
        getsync : new Command({ domain: "wiki", name: "get", async: false }),
        getmenu : $.extend(new Command({ domain: "wiki", name: "get", async: false }), {}),
        // Сохраняет или добавляет параметры
        save : new Command({ domain: "wiki", name: "save", group: "wiki", title: "Сохранение документации", withProgress: true, method: "POST" }),
        // Проверяет наличие статьи с кодом [code]
        exists : new Command({ domain: "wiki", name: "exists" }),
        savefile : new Command({ domain: "wiki", name: "savefile", method: "POST", withProgress: true })
    });
    $.each(serverapi, function(dk, dv) { 
        if (!api[dk]) api[dk] = {};
        $.each(dv, function(nk, nv) { 
            if (!!api[dk][nk]) $.extend(api[dk][nk], nv);
            else api[dk][nk] = $.extend(new Command({ domain: dk, name: nk }), nv);
        });
    });
    $.each(api, function(dk, dv) {
        if (!serverapi[dk]) {
            $.each(dv, function(nk, nv) { 
                $.extend(api[dk][nk], { disable: true });
            });
        } else {
            $.each(dv, function(nk, nv) { 
                if (!serverapi[dk][nk]) {
                    $.extend(api[dk][nk], { disable: true });
                }
            });
        }
    });
})(_.api = _.api || {});