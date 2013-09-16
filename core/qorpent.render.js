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
                    t = t.replace(/>\s+/g, ">");
                    try {
                        if (name.indexOf('_partial') == -1) {
                            ctemplates[name] = window.Mustache.compile(t);
                        } else {
                            name = name.replace('_partial', '');
                            window.Mustache.compilePartial(name, t);
                            ctemplates[name] = window.Mustache.compile(t);
                        }
                    } catch(e) {
                        console.log("view error: "+name+"  " + e);
                        ctemplates[name] = function(data) {
                            return $("<div class='error'>Cannot render "+name+" due to template issue: ").html(e);
                        };
                    }
                });
            }
        }, 
        compile: function(templatecode, view, events) {
            if (typeof templatecode == "object") {
                $.extend({
                    templatecode: "",
                    view: {},
                    events: []
                }, templatecode);
            }
            else {
                templatecode = templatecode || null;
                view = view || {};
                events = events || [];
            }
            if (!window.Mustache || !window.templates || !templatecode) return;
            var compiledTemplate = this.compiledTemplates[templatecode];
            var template = $(compiledTemplate(view));
            if (events) {
                $.each(events, function(i, e) {
                    template.on(e.event, e.selector, e.handler);
                });
            }
            template.find("*[data-original-title]").tooltip({placement: "bottom"});
            return template;
        },  
        tohtml : function( templatecode,obj,tags) { 
            return _.widgets.compiledTemplates[templatecode](obj,tags);
        },
        toelement : function (templatecode,obj,tags) { 
            return $(this.tohtml(templatecode,obj,tags));
        }
    });
})(_.render = _.render || {});