(function() {
    var loadScripts = function() {
        var scriptsLoaded = 0;
        var scripts = [
            'js/libs/dateformat.js',
            'js/libs/qorpent.wiki.js',
            'js/libs/jquery.jsformatter.js',
            'js/plugins/mia.modals.js',
            'js/plugins/mia.print.js',
            'js/plugins/mia.userinfo.js',                   // Плагин для вывода информации о пользователе
            'js/plugins/qorpent.wiki.customrefs.js',
            'js/plugins/qorpent.wiki.menu.js',

            'js/layout.js',
            'js/wrapper.js',
            'js/qweb.js',
            'js/api.js',
            'js/router.js',
            'js/widget.js',
            'js/source.js',
            'js/app.js',

            'js/widgets/wiki.js',
            'js/widgets/auth.js',
            'js/widgets/admin.js',
            'js/widgets/user.js',
            'js/widgets/impersonator.js',
            'js/widgets/minerva-addsource.js',
            'js/widgets/minerva-sourcelist.js',
            'js/widgets/wikisearch.js'
        ];
        scripts.forEach(function(src) {
            var script = document.createElement('script');
            script.src = src;
            script.async = false;
            document.body.appendChild(script);
            scriptsLoaded++;
        });
    };

    var loadStyles = function() {
        var stylesLoaded = 0;
        var styles = [
            'css/qorpent.wiki.css',
            'css/mia.bootstrap.css',
            'css/jquery.jsformatter.css',
            'css/jquery-modals.css',

            'css/impersonator.css',
            'css/minerva-addsource.css',
            'css/auth.css',
            'css/user.css',
            'css/wiki.css',
            'css/wikisearch.css'
        ];
        styles.forEach(function(href) {
            var link = document.createElement('link');
            link.href = href;
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
            'minerva-source-form',
            'minerva-source-group',
            'wiki-admin',
            'wiki-user',
            'wiki-attach-form'
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