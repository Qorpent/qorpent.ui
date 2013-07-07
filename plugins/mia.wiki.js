/**
 * Виджет документации
 */
(function(widgets) {

    var authorize = function() {

    };
    var authorizer = new widget.W({
        authonly : false,
        name : "authorizer",
        append : "toheader",
        float : "right",
        ready : function() {
            if (zefs.user.isAuthorized()) {
                f.hide();
            }
        }
    });
    authorizer.el = f;
    widgets.push(authorizer);
})(window.widgets = window.widgets || []);

(function(api) {
    var wikiget = function(result) {
        var content = $('<div/>');
        var id = "";
        $.each(result, function(i, w) {
            id += w.Code;
            var wikiarticle = $('<div class="wikiarticle"/>');
            wikiarticle.attr("id", "wikiarticle_" + w.Code.replace(/\//g, "_"));
            var wikititle = $('<div class="wikititle"/>').text(w.Title || w.Code);
            wikititle.attr("title", w.Code);
            wikititle.data("history", w.Title || w.Code);
            var wikitext = $('<div class="wikitext"/>');
            if (w.Text != "") {
                wikitext.html(qwiki.toHTML(w.Text));
                wikitext.data("history", qwiki.toHTML(w.Text));
            }
            var wikiinfo = $('<div class="wikiinfo"/>').text("Последняя правка: ");
            if (!!w.Date) {
                wikiinfo.text(wikiinfo.text() + w.Date.format("dd.mm.yyyy HH:MM:ss"));
            }
            if (!!w.Editor) {
                var user = $('<span class="label label-info"/>').text(w.Editor);
                wikiinfo.append(user);
//                user.zetauser();
            }
            if (zefs.user.getIsDocWriter()) {
                var wikiedit = $('<textarea class="wikiedit"/>').val(w.Text);
                var wikititleedit = $('<input type="text" class="wikititleedit"/>').val(w.Title || w.Code);
                wikiedit.hide(); wikititleedit.hide();
                var wikicontrols = $('<div class="wikicontrols"/>');
                var wikieditbtn = $('<button class="btn btn-mini"/>').text("Править");
                var wikisavebtn = $('<button class="btn btn-mini btn-success"/>').html('<i class="icon-white icon-ok"/>').hide();
                var wikicancelbtn = $('<button class="btn btn-mini btn-danger"/>').html('<i class="icon-white icon-remove"/>').hide();
                var wikiprintbtn = $('<button class="btn btn-mini"/>').html('<i class="icon-print"/>');
                var progress = $('<div class="progress progress-striped active"/>').append($('<div class="bar" style="width:1%;"/>'));
                var uploadform = $('<form method="post"/>').css("display", "inline-block");
                var uploadbtn = $('<button type="submit" class="btn btn-mini btn-primary"/>').text("Прикрепить");
                var selectbtn = $('<button type="button" class="btn btn-mini"/>').text("Выбрать файл").css("margin-right", 3);
                // Поле с файлом
                var file = $('<input type="file" name="datafile"/>').hide();
                var code = $('<input name="code" type="text" placeholder="Код" class="input-small"/>').css({"padding": "0px 6px", "margin-right" : 3});
                var filename = $('<input type="text" name="title" placeholder="Название" class="input-normal"/>').css("padding", "0px 6px");
                var uid = $('<input type="hidden" name="uid"/>');
                var message = $('<div/>').css({
                    position: "absolute",
                    fontSize: "8pt",
                    color: "grey",
                    right: 0
                });
                file.change(function() {
                    uploadbtn.text("Прикрепить " + this.files[0].name);
                });
                selectbtn.click(function() { file.trigger("click") });
                uploadform.append(selectbtn,file,code,filename,uploadbtn, message);
                uploadform.submit(function(e) {
                    e.preventDefault();
                    if (file.get(0).files.length == 0) return;
                    WikiAttachFile($(e.target));
                });
                wikicontrols.append(uploadform, progress.hide(), wikiprintbtn, wikieditbtn, wikicancelbtn, wikisavebtn);
                wikiedit.keyup(function() {
                    wikitext.html(qwiki.toHTML(wikiedit.val()));
                });
                wikititleedit.keyup(function() {
                    wikititle.text(wikititleedit.val());
                });
                wikieditbtn.click(function() {
                    wikieditbtn.hide(); wikiedit.show(); wikititleedit.show(); wikisavebtn.show(); wikicancelbtn.show();
                });
                wikiprintbtn.click(function() {
                    wikitext.printelement();
                });
                wikicancelbtn.click(function() {
                    if (!!wikitext.data("history")) {
                        wikitext.text(qwiki.toHTML(wikitext.data("history")));
                    }
                    wikititle.text(wikititle.data("history"));
                    wikiedit.hide(); wikititleedit.hide(); wikisavebtn.hide(); wikicancelbtn.hide(); wikieditbtn.show();
                });
                wikisavebtn.click(function() {
                    wikiedit.hide(); wikititleedit.hide(); wikisavebtn.hide(); wikicancelbtn.hide();
                    var save = $.ajax({
                        url: "wiki/save.json.qweb",
                        type: "POST",
                        data: { code: w.Code, text: wikiedit.val(), title: wikititleedit.val() }
                    });
                    save.success(function(r) {
                        wikititle.text(r.Title || r.Code);
                        var v = eval(r.LastWriteTime.substring(2));
                        wikiinfo.text("Сохранено: " + v.format("dd.mm.yyyy HH:MM:ss"));
                        if (!!r.Editor) {
                            var user = $('<span class="label label-info"/>').text(r.Editor);
                            wikiinfo.append(user);
//                            user.zetauser();
                        }
                    });
                    wikieditbtn.show();
                });
                wikiarticle.append(wikititleedit, wikiedit, wikicontrols);
                $(zefs).on(zefs.handlers.on_wikifileloadstart, function() {
                    uploadform.hide(); progress.show();
                    message.text("");
                });
                $(zefs).on(zefs.handlers.on_wikifileloadfinish, function() {
                    progress.hide(); uploadform.show();
                    message.text("Файл с кодом " + code.val() + " был прикреплен");
                    code.val("");
                    filename.val("");
                    uploadbtn.text("Прикрепить");
                    progress.find('.bar').css("width", 0);
                });
                $(zefs).on(zefs.handlers.on_wikifileloadprocess, function(e, p) {
                    progress.find('.bar').css("width", (p.loaded / p.total * 100) + "%");
                });
                $(zefs).on(zefs.handlers.on_wikifileloaderror, function(e, error) {
                    progress.hide(); uploadform.show();
                    progress.find('.bar').css("width", 0);
                    $(window.zeta).trigger(window.zeta.handlers.on_modal, {
                        title: "Ошибка загрузки файла",
                        text: "Во время загрузки файла произошла ошибка: " + error.message
                    });
                });
            }
            wikiarticle.append(wikititle, wikitext, wikiinfo);
            content.append(wikiarticle);
        });
        if ($("#wiki_dialog__" + id.replace(/\//g, "_")).length == 0) {
            $(zeta).trigger(zeta.handlers.on_modal, {
                title: "База знаний", width: 900,
                content: $('<div/>').append(content),
                id: "wiki_dialog__" + id.replace(/\//g, "_"),
                customButton: {
                    class : "btn-warning",
                    text : "Справка",
                    click : function() { api.wiki.getsync.execute({code: "/wiki/wikimarkup/default"}); }
                }
            });
        }
    };
    $.extend(api.wiki.get, { triggerOnSuccess : wikiget });
})(window.api = window.api || {});