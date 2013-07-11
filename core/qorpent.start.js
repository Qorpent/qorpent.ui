(function(qorpent) {
    $.extend(qorpent, {
        init : function() {
            api.security.whoami.execute(null, { triggerOnSuccess: function(result) {
                qorpent.user = qorpent.user || {};
                qorpent.user = result;
                if (!result.isAuthorized()) {
                    router.to("login");
                } else {
                    router.toDefault();
                }
            }});
			
			
        },
	
        start : function() {
			widget.prepareTemplates(window.templates);
            widget.installAll();
        },

        startLogin : function() {
            qorpent.start();
            api.security.login.onSuccess(function(result) {
                if (!result.authenticated) router.to("login");
                api.security.whoami.execute(null, { triggerOnSuccess: function(result) {
                    qorpent.user = qorpent.user || {};
                    qorpent.user = result;
                    router.toDefault();
                }});
            });
        },

        startRobotCreation : function() {
            qorpent.start();
            var form = source.createForm();
            source.addGroup(form, "Группа1");
            $('#qorpentBody').empty().qorpentend(form);
        },


        startRobots : function() {
            qorpent.start();
            $('#qorpentBody').empty();
            var getsourcelist = api.source.list.safeClone();
            getsourcelist.onSuccess(function(e, result) {
                var ul = $('<ul/>');
                $.each(result, function(i, s) {
                    var b = $('<button class="btn btn-link"/>').text(s.Name).attr("code", s.SourceId);
                    ul.qorpentend($('<li/>').qorpentend(b));
                    b.click(function() {
                        source.runTask(s.SourceId);
                    });
                });
                $('#qorpentBody').qorpentend(ul);
            });
            getsourcelist.execute();
        },

        startqorpent : function() {
            qorpent.start();
        }
    });
})(window.qorpent = window.qorpent || {});

$(document).ready(function() {
    router.addRoute("login", function() {
        qorpent.startLogin();
    });
    router.addRoute("start", function() {
        qorpent.startqorpent();
    });
    router.asDefault("start");
    layout.init();
    router.init();
    qorpent.init();
});