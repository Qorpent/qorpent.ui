window._ = window._ || {};
(function(render) {
    $.extend(render, {
        init : function() {
            this.prepareTemplates(window.templates);
        },
        prepareTemplates : function (templates) {
            render.compiledTemplates = render.compiledTemplates || {};
            if(window.Mustache){
                this.templatesSupported = true;
                var ctemplates = render.compiledTemplates;
                $.each(templates, function(i,t){
                    name = i.replace(/\./g,'_');
                    try {
                        ctemplates[name] = window.Mustache.compile ( t );
                        window.Mustache.compilePartial(name, t);
                    } catch(e) {
                        console.log("view error: "+name+"  " + e);
                        ctemplates[name] = function(data) {
                            return $("<div class='error'>Cannot render "+name+" due to template issue: ").html(e);
                        };
                    }
                });
            }
        },     
        tohtml : function( templatecode,obj,tags) { 
            return _.widgets.compiledTemplates[templatecode](obj,tags);
        },
        toelement : function (templatecode,obj,tags) { 
            return $(this.tohtml(templatecode,obj,tags));
        }
    });
})(_.render = _.render || {});