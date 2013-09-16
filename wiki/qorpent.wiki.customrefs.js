(function($) {
    qwiki.getCustomReference = function(processor,addr,name,tail){
        // reference to another wiki page
        if(addr.match(/^\//)){
            return "<span class='wiki-link' code='"+addr+"'>"+name+"</span>";
        }
        //reference to wiki-image
        else if(addr.match(/^img:/)){
            var imgcode = addr.match(/^img:([\s\S]+)$/)[1];
            var imgaddr = "./wiki/getfile.filedesc.qweb?code="+imgcode;
			if(tail.match(/pict/)){
            return "<div  class='wiki-img'><div class='wiki-img-title'>"+name+"</div><img src='"+imgaddr+"' title='"+name+"' "+tail+" /></div>";
			}else{
				return "<img src='"+imgaddr+"' title='"+name+"' "+tail+" />";
			}
        }
        //reference to wiki-filedesc
        else if (addr.match(/^file:/)){
            var filecode = addr.match(/^file:([\s\S]+)$/)[1];
            var fileaddr = "./wiki/getfile.filedesc.qweb?asfile=true&code="+filecode;
            return "<a href='"+fileaddr+"' "+tail+" target='_blank' >"+name+"</a>";
        }
        // not custom
        return null;
    };
    var script_counter = 0;
    qwiki.updateScriptResult = function (id, content,cnt) {
        var e = $('#' + id);
        cnt = cnt||0;
        if (!e) {
            if (cnt == 3) return;
            window.timeout(function () { qwiki.updateScriptResult(id, content,cnt+1); }, 200);
            return;
        }
        e.html(content);
    };
    qwiki.scriptHandler = function (processor, type, script) {
        if (type == "dot") {
            var command = _.api._sys.renderdot.safeClone({
                datatype : "xml",
            });
            command.errorautodebug = false;
            script_counter++;
            code = "_script_" + script_counter;
            command.onError(function (e,r) {
                qwiki.updateScriptResult(code, r);
            });
            command.onSuccess(function (e, r) {
                qwiki.updateScriptResult(code, r);
            });
            command.execute({ script: script });
            return "<div id='" + code + "'>Ждите загрузки</div>";
        }

    };

    $(document).delegate(".wiki-link", "click", function(e) {
        e.stopPropagation();
        _.api.wiki.getsync.execute({code: $(this).attr("code")});
    });
})(jQuery);