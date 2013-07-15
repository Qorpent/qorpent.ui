/**
 * Виджет формы имперсонации
 */
(function() {
    var impersonate = function(username) {
        if (/^[а-я\s]+$/.test(username.toLowerCase())) {
            var getuserinfo = _.api._sys.userinfo.safeClone();
            getuserinfo.onSuccess(function(e, result) {
                _.api._sys.impersonate.execute({ Target: result["0"].Login });
            });
            getuserinfo.execute({name: username});
        } else {
            _.api._sys.impersonate.execute({ Target: username });
        }
    };

    _.api._sys.impersonate.onSuccess(function() { location.reload() });

    var impersonator = _.widget.register({
        name : "impersonator",
        position : "menu:appAdminMenu",
        title :"Вход от имени:",
        ready: function() {
            if (!!_.qorpent.user.impersonation) {
                impersonator.el.find('.impersonator-query').hide();
                impersonator.el.find('.impersonator-submit').hide();
                impersonator.el.find('.impersonator-deimp').show();
            }
        },
        events: [ 
            {
                event: "submit",
                selector: "form",
                handler: function(e) {
                    e.preventDefault();
                    impersonate(impersonator.el.find('.impersonator-query').val());
                }
            },
            {
                event: "click",
                selector: ".impersonator-submit",
                hadler: function(e) {
                    var i = impersonator.el.find('.impersonator-query');
                    i.val("");
                    impersonate(i.val());
                    i = null;
                }
            },
            {
                event: "click",
                selector: ".impersonator-deimp",
                hadler: function(e) {
                    impersonate("");
                }
            }
        ]
    });
})();