window._ = window._ || {};
(function(wrapper) {
    $.extend(wrapper, {
        _sys_whoamiWrap: function(obj) {
            $.extend(obj, {
                isAuthorized : function() { return (!!this.logonname && this.logonname != "") },
                // имя с которым входит пользователь
                getLogonName : function(){return this.impersonation != null ? this.impersonation : this.logonname},
                // признак того, что пользователь является администратором
                isAdmin : function(){return this.impadmin != null ? this.impadmin : this.logonadmin},
                isBudget : function(){return this.impbudget != null ? this.impbudget : this.logonbudget},
                isDocWriter : function(){return this.impdocwriter != null ? this.impdocwriter : this.logondocwriter},
                // признак того, что пользователь является разработчиком
                isDeveloper : function(){return this.impdeveloper != null ? this.impdeveloper : this.logondeveloper},
                // признак того, что пользователь является администратором данных
                isDataMaster : function(){return this.impdatamaster != null ? this.impdatamaster : this.logondatamaster},
                // возвращает логин пользователя за которого был осуществлен вход (если был)
                getImpersonation : function() {return this.impersonation || null}
            });
            return obj;
        },

        wiki_getWrap: function(obj) {
            if ($.isEmptyObject(obj)) return obj;
            $.each(obj, function(i, o) {
                o.Code = o.Code || "";
                o.Date = eval(o.LastWriteTime ? o.LastWriteTime.substring(2) : "new Date()");
                o.ReadableDate
                o.Existed = o.Existed || false;
                o.Propeties = o.Propeties || {};
                o.Text = o.Text || "";
                o.Title = o.Title || o.Code || "";
                o.Editor = o.Editor || "";
            });
            return obj;
        },

        minerva_getuserinfoWrap: function(obj) {
            var wrapit = function(o) {
                var n = o.Name.trim().replace(/\s+/g, " ").split(" ");
                if (o.Name != "NOT REGISTERED IN DB" && n.length == 3) {
                    o.ShortName = n[0] + " " + n[1].substring(0,1) + ". " + n[2].substring(0,1) + ".";
                } else {
                    o.ShortName = o.Name;
                }
            };
            if (!!obj["0"]) {
                $.each(obj, function(i, o) {
                    wrapit(o);
                });
            } else {
                wrapit(obj);
            }
            return obj;
        }
    });
})(_.wrapper = _.wrapper || {});