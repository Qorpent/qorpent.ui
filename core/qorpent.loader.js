(function() {
    var loadScripts = function() {
        var scriptsLoaded = 0;
        var scripts = [
            // библиотеки
            'bootstrap.min.js',
            'jquery-ui.min.js',
            'mustache.min.js',                                  // Библиотека для работы с шаблонами
            'jquery.md5.min.js',                            // для создания md5 хэшей
            'jquery.jsformatter.js',                        // Библиотека для конвертирования json --> html
            'dateformat.js',                        // Форматирование даты
            'qorpent.wiki.js',                      // библиотека для работы с документацией wiki, конвертер wiki markup --> html

            // расширения
            'qorpent.wiki.customrefs.js',      // Расширение для qorpent.wiki добавляет обработку кастомных ссылок
            'qorpent.wiki.menu.js',            // добавляет возможность преобразовывать wiki в html меню
            'mia.modals.js',                   // bootstrap окна
            'mia.print.js',

            // ядро
            'qorpent.layout.js',
            'qorpent.wrapper.js',
            'qorpent.qweb.js',
            'qorpent.api.js',
            'qorpent.router.js',
            'qorpent.widget.js',
            'qorpent.start.js',

            // виджеты
            'wiki.js',
            'auth.js',
            'admin.js',
            'user.js',
            'impersonator.js',
            'wikisearch.js',
            'usersearch.js'
        ];
        scripts.forEach(function(src) {
            var script = document.createElement('script');
            script.src = "js/" + src;
            script.async = false;
            document.body.appendChild(script);
            scriptsLoaded++;
        });
    };

    var loadStyles = function() {
        var stylesLoaded = 0;
        var styles = [
            'bootstrap.min.css',
            'bootstrap-responsive.min.css',
            'mia.bootstrap.css',
            'qorpent.wiki.css',
            'qorpent.wiki.search.css',
            'jquery.jsformatter.css',
            'jquery-modals.css',

            'impersonator.css',
            'auth.css',
            'user.css'
        ];
        styles.forEach(function(href) {
            var link = document.createElement('link');
            link.href = "css/" + href;
            link.rel = "stylesheet";
            link.async = false;
            document.body.appendChild(link);
            stylesLoaded++;
        });
    };

    var loadTemplates = function() {
        window.templates = window.templates || {};
        var templatesLoaded = 0;
        var tplts = [
            'qorpent.wiki.admin.tpl',
            'qorpent.wiki.attachform.tpl',
            'qorpent.wiki.user.tpl'
        ];
        tplts.forEach(function(href) {
            $.ajax({ url: "tpl/" + href + ".html", async: false })
                .success(function(data) {
                    templates[href] = data;
                    templatesLoaded++;
                });
        });
    };

    loadScripts();
    loadStyles();
    loadTemplates();
})();