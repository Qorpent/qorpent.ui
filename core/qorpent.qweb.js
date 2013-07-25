(function(qweb) {
    $.extend(qweb, {
        session: function() {
            return "";
        }
    });

    qweb.defaults = function() {};
    $.extend(qweb.defaults.prototype, {
        domain: "_sys",
        cachekey: null,
        group: "default",
        wrap: function(r) { return r },
        timeout: -1,
        method: "GET",
        withProgress: false,
        withSession: false,
        datatype: "json",
        async: true,
        name: "",
        title: "",
        preloader: false,
        cache: false
    });

    qweb.C = function(o) {
        var self = this;
        var defaults = new qweb.defaults(),
        o = $.extend(defaults, o);
        o.eventName = o.domain + "-" + o.name;
//      o.eventName = o.safe ? this.name + "-" + new Date().getTime() : o.name;
        if (!o.url) {
            o.url = o.domain + "/" + o.name + "." + o.datatype + ".qweb";
        }
        if (o.timeout > 0 || o.delay > 0) {
            o.timeout = o.timeout || 30000;
            o.delay  = o.delay || 1000;
            o.currenttimeout = o.timeout;
        }
        $.extend(this, o);
        // Настройка хэндлеров
        // Пример перекрытия функции при выполнении команды (on complete) :
        /* api.group.simplecommand.execute(params, { triggerOnComplete: function(result) {
         ... do something with result
         }}); */
        var handlers = ["Start", "Error", "Success", "Complete"];
        if (o.withProgress) handlers.push("Progress");
        $.each(handlers, function(i, e) {
            self["triggerOn" + e] = self["triggerOn" + e] || function(r) { $(this).trigger(this.eventName + ":" + e, r)  };
            self["on" + e] = self["on" + e] || function(f) { $(this).on(this.eventName + ":" + e, f);return this; };
        });
        this.ready();
    };

    $.extend(qweb.C.prototype, {
        ready : function() {},

/*
        triggerOnError: function(r) { $(this).trigger(this.eventName + ":Error", r) },
        triggerOnSuccess: function(r) { $(this).trigger(this.eventName + ":Success", r) },
        triggerOnComplete: function(r) { $(this).trigger(this.eventName + ":Complete", r) },
        triggerOnStart: function(r) { $(this).trigger(this.eventName + ":Start", r) },
        triggerOnProgress: function(r) { $(this).trigger(this.eventName + ":Progress", r) },

        onError: function(f) { $(this).on(this.eventName + ":Error", f) },
        onSuccess: function(f) { $(this).on(this.eventName + ":Success", f) },
        onComplete: function(f) { $(this).on(this.eventName + ":Complete", f) },
        onStart: function(f) { $(this).on(this.eventName + ":Start", f) },
        onProgress: function(f) { $(this).on(this.eventName + ":Progress", f) },
*/

        safeClone : function() {
            var clone = $.extend({}, this);
            $.extend(clone, {eventName: this.domain + "-" + this.name + "-" + new Date().getTime()});
            clone.__isclone = true;
            return new qweb.C(clone);
        },

        getParameters : function() {
            var h = location.hash;
            if (h.search('/') != -1 && h.split('/').length > 0) {
                var params = h.split('/')[1].split('|');
                var result = {};
                $.each(params, function(i, p) {
                    var kv = p.split('=');
                    result[kv[0]] = kv[1] || "";
                });
                return result;
            }
            return {};
        },

        execute : function(params, options) {
            if (this.disable) {
                this["triggerOnError"]({ 
                    type: "Ошибка при выполнении команды", 
                    message: "Команда " + this.domain + "/" + this.name + " недоступна" 
                });
                return;
            }
            params = params || {};
            $.extend(this, options);
//          $.extend(params, this.getParameters());
            if (this.withSession && qweb.session() != "") {
                params.session = qweb.session();
            }
            this.call(params);
        },

        call : function(params) {
            var self = this;
            var ajax = {
                url : this.url,
                type : this.method,
                dataType: this.datatype,
                crossDomain : this.async,
                ifModified : this.method == "GET",
                async : this.async,
                data : params,
                complete : function(r) { self.complete(r) }
            };
            if (this.async) {
                ajax.xhrFields = { withCredentials: true };
            }
            if (this.useProgress) {
                $.extend(ajax, {
                    xhr: function() {
                        var x = $.ajaxSettings.xhr();
                        if(x.upload) {
                            x.upload.addEventListener("progress", function(e) {self.triggerOnProgress(e)}, false);
                        }
                        return x;
                    },
                    cache: true,
                    contentType: false,
                    processData: false
                });
            }
            this.ajax = this.ajax || {};
            $.extend(this.ajax, ajax);
            this["triggerOnStart"]();
            if (this.cache) {
                var fromstorage = sessionStorage.getItem(this.ajax.url+"?"+JSON.stringify(this.ajax.data));
                if (!!fromstorage) {
                    this["triggerOnComplete"]();
                    this["triggerOnSuccess"](this.returnResult(fromstorage));
                    return;
                }
            }
            $.ajax(ajax);
        },

        complete : function(r) {
            this["triggerOnComplete"](r);
            if (304 == r.status) {
                this["triggerOnSuccess"](this.returnResult(sessionStorage.getItem(this.ajax.url+"?"+JSON.stringify(this.ajax.data))));
            }
            else if (200 == r.status) {
                if (!r.responseText.match(/^\s*<!DOCTYPE/)) {
                    if ((this.ajax.type=="GET" && r.getResponseHeader("Last-Modified")) || this.cache)   {
                        sessionStorage.setItem(this.ajax.url+"?"+JSON.stringify(this.ajax.data), r.responseText);
                    }
                    this["triggerOnSuccess"](this.returnResult(r.responseText));
                }
            }
            else {
                if (!r.responseText.match(/^\s*<!DOCTYPE/)) {
                    this["triggerOnError"](r.responseText);
                } else {
                    this["triggerOnError"]({});
                }
            }
        },

        returnResult: function(r) {
            var result;
            if (this.datatype == "json") {
                result = JSON.parse(r);
                var wrapperName = this.domain + "_" + this.name + "Wrap";
                if (_.wrapper[wrapperName] != null) {
                    result = _.wrapper[wrapperName](result);
                } else {
                    result = this.wrap(result);                         // Это устар, надо все переносить во wrapper.js
                }
            }
            else {
                result = r;
            }
            // Если у команды есть timeout и она выполнилась
            // с ошибкой (или результат false) - выполняем ее повторно
            if (this.timeout > 0) {
                if (result == null || result == 0 || r.status == 403) {
                    this.currenttimeout -= this.delay;
                    if (this.currenttimeout > 0) {
                        var self = this;
                        setTimeout(function() { $.ajax(self.ajax) }, this.delay);
                    }
                }
            }
            return result;
        }
    });
})(window.qweb = window.qweb || {});


// Небольшое расширение, которое позволяет автоматически
// выводить ошибки команд в модальном окне.

// Зависит от bootstrap.js и mia.modals.js
(function(qweb) {
    $.extend(qweb.defaults.prototype, {
        errorautodebug: true
    });
    $.extend(qweb, {
        showErrorMessage : function(error, context) {
            if (!!$.fn.miamodal) {
                var message = $('<p/>').text(error.message);
                var text = $('<p/>');
                if (!!error.text) text.text(error.text);
                $('<div/>').append(message, text).miamodal({
                    title: error.type || "Во время работы приложения произошла ошибка", resizable: false, id: context.eventName + "-error"
                });
            }
        }
    });
    $.extend(qweb.C.prototype, {
        triggerOnError : function(r) {
            if (this.errorautodebug) {
                qweb.showErrorMessage(r, this);
            }
            $(this).trigger(this.eventName + ":Error", r);
        }
    });
})(window.qweb = window.qweb || {});

// Небольшое расширение. Позволяет добавить крутилку
// ко всем командам у которых withProcess = true

// Зависит от bootstrap.js и mia.modals.js
(function(qweb) {
    $.extend(qweb, {
        showProgressMessage : function(c) {
            if (!!$.fn.miamodal) {
                var preloader = $('<img src="images/app-preloader.gif">');
                var name = $('<p/>').text(c.title);
                $('<div class="app-preloadder"/>').append(preloader, name).miamodal({ width: 300, id: c.eventName + "_progress", closebutton: false, resizable: false });
            }
        },

        hideProgressMessage : function(c) {
            var modal = $("#" + c.eventName + "_progress");
            if (modal.length > 0) modal.trigger("hidden");
        }
    });
    $.extend(qweb.C.prototype, {
        ready : function() {
            if(this.__isclone)return;
            if (this.withProgress) {
                var self = this;
                this["onStart"](function() {
                    self.__inprogress = true;
//                  console.log("Started at " + new Date().format("dd.mm.yyyy HH:MM:ss lll"));
                    window[this.eventName + "_progress"] = setTimeout(function() {if(self.__inprogress)qweb.showProgressMessage(self)}, 2000);
                });
                this["onComplete"](function() {
//                  console.log("Completed at " + new Date().format("dd.mm.yyyy HH:MM:ss lll"));
                    clearTimeout(window[this.eventName + "_progress"]);
                    qweb.hideProgressMessage(self);
                    self.__inprogress = false;
                });
            }
        }
    });
})(window.qweb = window.qweb || {});