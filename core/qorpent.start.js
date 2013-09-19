window._ = window._ || {};
(function(qorpent) {
    $.extend(qorpent, {
        init : function() {
            _.api._sys.whoami.execute(null, { triggerOnSuccess: function(result) {
                _.qorpent.user = _.qorpent.user || {};
                _.qorpent.user = result;
                if (!result.isAuthorized()) {
                    _.router.asDefault(_.router.current);
                    _.router.to("login", _.router.params);
                } else {
                    _.router.toStart(_.router.params);
                }
            }});
        },
	
        start : function() {
            _.widget.installAll();
        },

        startLogin : function() {
            qorpent.start();
            _.api._sys.login.onSuccess(function(result) {
                if (!result.authenticated) _.router.to("login");
                _.api._sys.whoami.execute(null, { triggerOnSuccess: function(result) {
                    _.qorpent.user = _.qorpent.user || {};
                    _.qorpent.user = result;
                    _.router.toDefault();
                    location.reload();
                }});
            });
        },

        startWiki : function() {
            qorpent.start();
            if (!_.qorpent.wiki) return;
            _.qorpent.wiki.editor.start();
        },

        startqorpent : function() {
            qorpent.start();
        }
    });
})(_.qorpent = _.qorpent || {});

$(document).ready(function() {
    _.router.addRoute("login", function() {
        _.qorpent.startLogin();
    });
    _.router.addRoute("start", function() {
        _.qorpent.startqorpent();
    });
    _.router.addRoute("wiki", function() {
        _.qorpent.startWiki();
    });
    _.router.asDefault("start");
    _.render.init();
    _.layout.init();
    _.router.init();
    _.qorpent.init();
});