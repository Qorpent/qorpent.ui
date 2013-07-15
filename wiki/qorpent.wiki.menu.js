(function(){
    var qwiki = window.qwiki = window.qwiki || {};
    $.extend(qwiki, {
        getMENU : function(code, orient) {
            orient = orient || "right";
            var wiki = {};
            var getwiki = _.api.wiki.getsync.safeClone();
            getwiki.onSuccess(function(e, result) { wiki = result });
            getwiki.execute({code: code});

            var toc = qwiki.toTOC(wiki[0].Text);
            var items = $(toc.items);
            if (!items || items.length == 0) return;
            return qwiki.renderMENU(items, orient);
        },

        renderMENU : function(items, orient) {
            var result = $('<ul class="dropdown-menu"/>');
            $.each(items, function(i, item) {
                if (item.raw.search("admin") != -1 && !zefs.user.isAdmin()) {
                    return;
                }
                var li = $('<li/>');
                if (item.raw == "----") {
                    li.addClass("divider");
                } else {
                    var link = item.title || item.raw;
                    if (link[0] == "<") {
                        link = $('<a/>').append($(link));
                    } else {
                        link = $('<a/>').text(link);
                    }
                    li.html(link);
                    if (!!item.addr) {
                        if (item.addr.length == 0) return;
                        var action = function() {};
                        if (item.addr[0] == "/") {
                            action = function() {
                                _.api.wiki.get.execute({code: item.addr});
                            }
                        }
                        if (/javascript:.+/.test(item.addr)) {
                            action = function() {
                                eval(item.addr.substring(11));
                            }
                        }
                        link.click(function(e) {
                            e.preventDefault();
                            action();
                        });
                    }
                }
                if (item.items.length > 0) {
                    var submenu = qwiki.renderMENU(item.items, orient);
                    li.addClass("dropdown-submenu " + (orient == "left" ? "pull-left" : "pull-right"));
                    li.append(submenu);
                }
                result.append(li);
            });
            return result;
        }
    });
})();