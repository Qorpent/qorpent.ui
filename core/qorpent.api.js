(function(api) {
    var Command = qweb.C;
    $.extend(api, {
        utils: {
            cleaner: new Command({ domain: "utils", name: "xhtmlcleaner", method: "POST", group: "utils", title: "Очистка html кода", withProgress: true })
        },

        security : {
            login : $.extend(new Command({ domain:"_sys", name:"login", method: "POST", group: "security", title: "Вход в систему", withProgress: false }), {
                triggerOnSuccess : function(r) {
                    if (!r.authenticated) this["triggerOnError"]({ type: "Ошибка авторизации пользователя", message: r.errormessage });
                    else $(this).trigger(this.eventName + ":Success", r);
                }
            }),
            logout : new Command({ domain: "_sys", name: "logout"}),
            impersonate : new Command({ domain: "_sys", name: "impersonate"}),
            whoami : new Command({ domain: "_sys", name: "whoami", title: "Идентификация пользователя" })
        },

        server : {
            state : new Command({ domain: "minerva", name: "server", title: "Получение статуса сервера" }),
            restart : new Command({ domain: "minerva", name: "restart", title: "Перезапуск сервера" }),
            ready : new Command({ domain: "minerva", name: "ready", title: "Ожидание сервера", timeout: 20000, delay: 5000, withProgress: true })
        },

        source : {
            update : new Command({ domain: "source", name: "update", title: "Создание источника", withProgress: true }),
            list : new Command({ domain: "source", name: "list", title: "Получение всех источников", withProgress: true })
        },

        task : {
            handle : new Command({ domain: "task", name: "handle", title: "Добавление задачи", withProgress: true }),
            run : new Command({ domain: "task", name: "handle", title: "Выполнение задачи", withProgress: true })
        },

        wiki : {
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
        },

        metadata : {
            userinfo : new Command({ domain: "minerva", name: "getuserinfo", group: "metadata", cache: true })
        }
    });
})(window.api = window.api || {});