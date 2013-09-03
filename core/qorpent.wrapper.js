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
        
        wiki_findWrap: function(obj) {
            var result = {
                pages: [],
                files: []
            }
            $.each(obj, function(i, o) {
                if (o.Type == "Page") result.pages.push(o)
                else if (o.Type == "File") result.files.push(o); 
            });
            result.pages.reverse();
            return result;
        },

        wiki_getWrap: function(obj) {
            if ($.isEmptyObject(obj)) return obj;
            var result = {
                articles: []
            }
            $.each(obj, function(i, o) {
                o.Code = o.Code || "";
                o.LastWriteTime = eval(o.LastWriteTime ? o.LastWriteTime.substring(2) : "new Date()").format("dd.mm.yyyy HH:MM");
                o.ReadableDate
                o.Existed = o.Existed || false;
                o.Propeties = o.Propeties || {};
                o.Text = o.Text || "";
                o.Title = o.Title || o.Code || "";
                o.Editor = o.Editor || "";
                result.articles.push(o);
            });
            result.articles.reverse();
            return result;
        }
    });
})(_.wrapper = _.wrapper || {});