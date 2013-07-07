(function(app) {
    $.extend(app, {
        init : function() {
            api.security.whoami.execute(null, { triggerOnSuccess: function(result) {
                app.user = app.user || {};
                app.user = result;
                if (!result.isAuthorized()) {
                    router.to("login");
                } else {
                    router.toDefault();
                }
            }});
        },

        start : function() {
            widget.installAll();
        },

        startLogin : function() {
            app.start();
            api.security.login.onSuccess(function(result) {
                if (!result.authenticated) router.to("login");
                api.security.whoami.execute(null, { triggerOnSuccess: function(result) {
                    app.user = app.user || {};
                    app.user = result;
                    router.toDefault();
                }});
            })
        },

        startRobotCreation : function() {
            app.start();
            var form = source.createForm();
            source.addGroup(form, "Группа1");
            $('#appBody').empty().append(form);
        },


        startRobots : function() {
            app.start();
            $('#appBody').empty();
            var getsourcelist = api.source.list.safeClone();
            getsourcelist.onSuccess(function(e, result) {
                var ul = $('<ul/>');
                $.each(result, function(i, s) {
                    var b = $('<button class="btn btn-link"/>').text(s.Name).attr("code", s.SourceId);
                    ul.append($('<li/>').append(b));
                    b.click(function() {
                        source.runTask(s.SourceId);
                    });
                });
                $('#appBody').append(ul);
            });
            getsourcelist.execute();
        },

        startApp : function() {
            app.start();
        }
    });
})(window.app = window.app || {});

$(document).ready(function() {
    router.addRoute("login", function() {
        app.startLogin();
    });
    router.addRoute("start", function() {
        app.startApp();
    });
    router.addRoute("newrobot", function() {
        app.startRobotCreation();
    });
    router.addRoute("robots", function() {
        app.startRobots();
    });
    router.asDefault("start");
    router.init();
    app.init();
});