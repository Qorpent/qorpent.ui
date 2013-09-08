/**
 * Виджет документации
 */
(function() {
    var showWiki = function(response) {
        var article_tpl = _.qorpent.user.logonadmin ? "qorpent_wiki_admin" : "qorpent_wiki_user";
        var content = $('<div class="wiki-body"/>');
        var code = "";
        $.each(response.articles, function(i, w) {
            code += "__" + w.Code.replace(/\//g, "_");
            var html = _.render.compile(article_tpl, w);
            html.find('.wiki-text').append(qwiki.toHTML(w.Text));
            html.delegate(".wiki-print-btn", "click", function(e) {
                $(e.delegateTarget).printelement();
            });
            html.delegate(".wiki-edit-btn", "click", function(e) {
                _.router.to("wiki", {code: w.Code}, true);
            });
            content.append(html);
        });
        content.miamodal({title: "База знаний", id: code, resizable: true});
    };

    _.qorpent = _.qorpent || {};
    _.qorpent.wiki = _.qorpent.wiki || {};
    $.extend(_.qorpent.wiki, {
        showinmodal: showWiki
    });
})();