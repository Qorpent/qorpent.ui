window._ = window._ || {};
_.qorpent = _.qorpent || {};
(function() {
    var WikiEditor = function() {};

    $.extend(WikiEditor.prototype, {
        editor: null,
        list: $('<div id="wiki-list"/>'),
        attachform: $('<div id="wiki-attach"/>'),
        historyform: $('<div id="wiki-history"/>'),
        history: [],
        fav: [],
        wikisource: null,
        wikisearch: null,
        preview: null,
        previewhtml: null,
        source: null,
        text: null,
        code: null,
        title: null,
        
        editorinit: function(wikisource) {
            this.wikisource = wikisource;
            var events = [{
                event: "click",
                selector: "#wikiPreviewBtn",
                handler: $.proxy(function(e) { 
                    this.previewhtml.html(qwiki.toHTML(this.text.val()));
                }, this)
            }, {
                event: "click",
                selector: "#wikiSaveBtn",
                handler: $.proxy(function(e) { 
                    e.stopPropagation();
                    this.save();
                }, this)
            }, {
                event: "keyup",
                selector: "#wikiEditText.autopreview",
                handler: $.proxy(function(e) {
                    this.previewhtml.html(qwiki.toHTML($(e.target).val()));
                }, this)
            }];
            var editor = _.render.compile("qorpent_wiki-standalone-editor", this.wikisource, events);
            this.preview = editor.find('.wiki-preview');
            this.source = editor.find('.wiki-source');
            this.text = editor.find("#wikiEditText");
            if (!!wikisource) {
                this.text.attr("rows", this.wikisource.Text.split(/\r*\n/).length);
            }
            this.code = editor.find("#wikiEditCode");
            this.title = editor.find("#wikiEditTitle");
            this.previewhtml = editor.find("#wikiEditPreview");
            editor.fluidlayout();
            _.layout.update("body", editor);
            if (!!this.wikisource) {
                this.previewhtml.html(qwiki.toHTML(this.wikisource.Text));
            }
            _.layout.body().on("mouseup", "*", $.proxy(function(e) {
                e.stopPropagation();
                this.text.css('width', '100%');
            }, this));
            $(window).resize($.proxy(function() {
                var h = $(window).height() - _.layout.header().height();
                this.previewhtml.height(h - 100);
                editor.find("#wikiEditSource").height(h - 100);
            }, this));
            $(window).trigger("resize");
            this.previewhtml.delegate(".wiki-link", "click", function(e) {
                var id = $(e.target).attr("code");
                _.qorpent.wiki.editor.openpage(id);
            });
        },

        historyinit: function() {
            var events = [{
                event: "click",
                selector: ".wiki-hist-link",
                handler: function(e) {
                    if (e.target.tagName == "I") return;
                    var id = $(e.target).attr("wikicode");
                    _.qorpent.wiki.editor.openpage(id);
                }
            }, {
                event: "click",
                selector: ".wiki-delete-btn",
                handler: function(e) {
                    e.stopPropagation(); 
                    var id = $(e.target).parent().attr("wikicode");
                    _.qorpent.wiki.editor.historyRemove(id);
                }
            }, {
                event: "click",
                selector: ".wiki-hist-clear",
                handler: function(e) {
                    _.qorpent.wiki.editor.historyClear();
                }
            }, {
                event: "click",
                selector: ".wiki-fav-btn",
                handler: function(e) {
                    var id = $(e.target).parent().attr("wikicode");
                    var fav = $(e.target).hasClass("fav-true") ? false : true;
                    _.qorpent.wiki.editor.historyFav(id, fav);
                }
            }]
            this.history = JSON.parse(localStorage.getItem("qorpent__wikieditor-history")) || [];
            this.fav = JSON.parse(localStorage.getItem("qorpent__wikieditor-fav")) || [];
            var history = this.history;
            $.each(history, $.proxy(function(i, h) {
                if ($.inArray(h.Code, this.fav) != -1) h.Fav = true;
            }, this));
            var hist = _.render.compile("qorpent_wiki-standalone-hist", { history: history }, events);
            this.historyform.empty();
            this.historyform.append(hist);
        },

        attachinit: function() {
            var events = [{
                event: "change",
                selector: ".wiki-attach-file",
                handler: $.proxy(function(e) {
                    this.attachname.val(e.target.files[0].name);
                    this.attachcode.focus();
                }, this)
            }, {
                event: "click",
                selector: ".wiki-attach-select",
                handler: $.proxy(function() {
                    this.attachfile.trigger("click");
                }, this)
            }, {
                event: "click",
                selector: ".wiki-attach-submit",
                handler: $.proxy(function(e) {
                    e.preventDefault();
                    if (this.attachcode.val() != "") {
                        var fd = new FormData();
                        fd.append("code", this.attachcode.val());
                        fd.append("title", this.attachname.val());
                        fd.append("datafile", this.attachfile.get(0).files[0]);
                        this.attach(fd);
                    } else {
                        this.attachcode.focus();
                    }
                }, this)
            }];

            var attach = _.render.compile("qorpent_wiki-standalone-attach", null, events);
            this.attachfile = attach.find(".wiki-attach-file");
            this.attachname = attach.find(".wiki-attach-name");
            this.attachcode = attach.find(".wiki-attach-code");
            this.attachselect = attach.find(".wiki-attach-select");
            this.attachsubmit = attach.find(".wiki-attach-submit");
            this.attachform.append(attach);
        },

        listinit: function(wikilist) {
            var events = [{
                event: "click",
                selector: ".wiki-page-link, .wiki-file-link",
                handler: function(e) {
                    e.preventDefault();
                    e.stopPropagation(); 
                    var link = $(e.target);
                    var id = e.target.tagName == "I" ? 
                        link.parent().attr("wikicode") :
                        link.attr("wikicode");
                    if (link.attr("type") == "Page") {
                        _.qorpent.wiki.editor.openpage(id);
                    } else {
                        _.qorpent.wiki.editor.openfile(id);
                    }
                }
            }, {
                event: "click",
                selector: ".wiki-create",
                handler: function(e) { 
                    _.qorpent.wiki.editor.open();
                }
            }, {
                event: "change",
                selector: "#wikiListSearch",
                handler: $.proxy(function(e) { 
                    this.search($(e.target).val());
                }, this)
            }, {
                event: "click",
                selector: ".wiki-delete",
                handler: function(e) {
                    e.stopPropagation();
                    var code = $(e.target).parent().attr("wikicode") || "";
                    if (code != "") {
                        $('<p/>').text("Статья wiki с кодом " + code + " будет удалена").miamodal({
                            title: "Удаление статьи",
                            width: 400,
                            customButton: {
                                class : "btn-danger",
                                text: "Удалить",
                                click : function() {
                                    _.api.wiki.delete.safeClone()
                                        .onSuccess(function() { _.api.wiki.find.execute() })
                                        .execute({code: code});         
                                }
                            }
                        });
                    }
                }
            }];
            var list = _.render.compile("qorpent_wiki-standalone-list", wikilist, events);
            this.wikisearch = list.find("#wikiListSearch");
            this.list.empty();
            this.list.append(list);
        },

        search: function(query) {
            if (query == "" || !query) query = "/";
            var wikifind = _.api.wiki.find.safeClone()
            wikifind.onSuccess($.proxy(function(e, result) {
                result.Search = query != "/" ? query : "";
                this.listinit(result);
            }, this));
            wikifind.execute({search: query});
        },

        attach: function(formdata) {
            var wikiattach = _.api.wiki.savefile.safeClone();
            wikiattach.onSuccess(function(e, result) {
                $('<p/>').text("Файл прикреплен").miamodal({
                    resizable: false,
                    closebutton: false,
                    autoclose: 2000,
                    width: 300
                });
            });
            wikiattach.execute(formdata);
        },

        historyAdd: function(page) {
            if ($.map(this.history, function(e) { if (e.Code == page.Code) return e }).length > 0) {
                this.historyRemove(page.Code);
            }
            if (this.history.length == 100) {
                this.historyRemove(this.history[100].Code);    
            }
            this.history.reverse();
            this.history.push(page);
            this.history.reverse();
            this.historySave();
        },

        historyRemove: function(code) {
            this.history = $.grep(this.history, function(v) {
                return v.Code != code;
            });
            this.historySave();
        },

        historySave: function() {
            localStorage.setItem("qorpent__wikieditor-history", JSON.stringify(this.history));
            this.historyinit();
        },

        historyFav: function(code, fav) {
            if (fav) {
                this.fav.push(code);
            } else {
                // $.inArray(h.Code, this.fav) != -1
                this.fav = $.grep(this.fav, function(f) {
                    return f != code;
                });
            }
            localStorage.setItem("qorpent__wikieditor-fav", JSON.stringify(this.fav));
            this.historyinit();
        },

        historyClear: function() {
            this.history = $.grep(this.history, function(v) {
                return v.Fav;
            });
            this.historySave();
        },

        save: function() {
            var wikisave = _.api.wiki.save.safeClone();
            var message = "";
            message = this.code.val() == "" 
                ? "Ошибка при сохранении статьи. Не указан код." 
                : "Статья сохранена успешно";
            wikisave.onSuccess(function() {
                $('<p/>').text(message).miamodal({
                    resizable: false,
                    closebutton: false,
                    autoclose: 2000,
                    width: 300
                });
            });
            if (this.code.val() != "") {
                wikisave.execute({
                    code: this.code.val(),
                    title: this.title.val(),
                    text: this.text.val()
                });
            }
        },

        openpage: function(code) {
            if (!!code) {
                var wikiget = _.api.wiki.get.safeClone();
                wikiget.onSuccess($.proxy(function(i, result) {
                    var article = result.articles.length > 0 ? result.articles[0] : null;
                    this.editorinit(article);
                    this.historyAdd({Code: article.Code, Title: article.Title});
                }, this));
                wikiget.execute({code: code});   
            } else {
                this.editorinit(null);
            }
        },

        openfile: function(code) {
            window.open(_.api.wiki.getfile.url + "?code=" + code, "_blank");
        },

        start: function() {
            _.layout.left().empty();
            _.layout.left().append(this.attachform);
            _.layout.left().append(this.list);
            _.layout.left().append(this.historyform);
            this.attachinit();
            this.historyinit();
            this.search();
            $(document).undelegate(".wiki-link", "click");
        }
    });

    _.qorpent.wiki = _.qorpent.wiki || {};
    $.extend(_.qorpent.wiki, {
        editor: new WikiEditor()
    });
})();