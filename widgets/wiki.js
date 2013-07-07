/**
 * Виджет документации
 */
(function() {
    var showWiki = function(result) {
        var article_tpl = app.user.isAdmin() ? templates["wiki-admin"] : templates["wiki-user"];
        var attach_form_tpl = templates["wiki-attach-form"];
        var content = $('<div class="wiki-body"/>');
        $.each(result, function(i, w) {
            w.Date = w.Date.format("dd.mm.yyyy HH:MM:ss");
            var html = $(Mustache.to_html(article_tpl, w));
            html.find('.wiki-text').append(qwiki.toHTML(w.Text));
            html.delegate(".wiki-print-btn", "click", function(e) {
                $(e.delegateTarget).printelement();
            });
            content.append(html);
        });
        var form = $(attach_form_tpl);
        content.prepend(form);
        var file = form.find('.wiki-file');
        var attachbtn = form.find('.wiki-file-attach');
        var sourcebtn = form.find('.wiki-file-source');
        file.change(function() {
            attachbtn.text("Прикрепить " + this.files[0].name);
        });
        sourcebtn.click(function() {
            form.find('.wiki-file').trigger("click");
        });

        var wikisave = api.wiki.savefile.safeClone();
        attachbtn.click(function(e) {
            e.preventDefault();
            var fd = new FormData();
            fd.append("code", form.find('input[name="code"]').val());
            fd.append("title", form.find('input[name="title"]').val());
            fd.append("datafile", form.find('input[name="datafile"]').get(0).files[0]);
            wikisave.execute(fd);
        });

        wikisave.onStart(function() {
            form.hide();
            form.find('.progress').show();
            form.find('form').text("");
        });

        wikisave.onProgress(function(e, p) {
            form.find('.bar').css("width", (p.loaded / p.total * 100) + "%");
        });

        wikisave.onComplete(function() {
            var code = form.find('.wiki-file-code');
            form.show();
            form.find('.progress').hide();
            form.find('.wiki-file-message').text("Файл с кодом " + code.val() + " был прикреплен");
            code.val("");
            form.find('.wiki-file-name').val("");
            form.find('.wiki-file-attach').text("Прикрепить");
            form.find('.bar').css("width", 0);
        });

        content.miamodal({title: "База знаний", id: ""});
    };

    api.wiki.get.onSuccess(function(e, result) {
        showWiki(result);
    });
})();