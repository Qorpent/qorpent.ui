(function($) {
    var miamodal = function(p){
        p = $.extend({
            title : null, // Заголовок окна
            customButton : null, // дополнительная кнопка
            closebutton : true, // нужна ли кнопка закрытия окна
            fade : false, // использовать эффект всплывания
            width : $(window).width() - 500, // ширина окна
            height : null, // высота окна
            backdrop : false, // нужен ли полупрозрачный фон
            id : "", // id окна который пойдет в аттрибут id
            onClose : null,
            resizable: true,
            autoclose: 0
        }, p);
        $.extend({
            class : "btn-primary",
            text : "OK",
            click : function() {}
        }, p.customButton);
        if (Object.keys(this).length == 0 && !p.title) return;
        if (p.id != "" && $('#' + p.id).length > 0) return;
        var content = this;
        var backdrop = $('<div class="modal-backdrop"/>');
        var modal = $('<div class="modal" role="dialog"/>').css("margin-left", (p.width || 560)/-2);
        if (p.name != "") modal.attr("id", p.id);
        if (!!p.width) modal.css("width", p.width);
        var modalheader = $('<div class="modal-header"/>');
        if (p.closebutton) {
            modalheader.append($('<button type="button" class="close" data-dismiss="modal" aria-hidden="true"/>').html("&times;"));
        }
        modalheader.append($('<h3/>').text(p.title));
        var modalbody = $('<div class="modal-body scrollable"/>').append(content);
        modalbody.css("max-height", $(window).height() - 236);
        if (!!p.height) modalbody.css("height", p.height);
        if (!!p.title) {
            modal.append(modalheader);
        }
        modal.append(modalbody);
        if (!!p.customButton || !!p.closebutton) {
            var modalfooter = $('<div class="modal-footer"/>');
            if (!!p.customButton) {
                modalfooter.append($('<a href="#" class="btn"/>').addClass(p.customButton.class)
                    .click(function(e) {
                        e.preventDefault();
                        p.customButton.click();
                    })
                    .html(p.customButton.text));
                if (p.customButton.class == "btn-primary") {
                    modalfooter.find('.closebtn').removeClass("btn-primary");
                }
            }
            if (!!p.closebutton) {
                modalfooter.append($('<a href="#" class="closebtn btn btn-primary" data-dismiss="modal"/>').text("Закрыть"));
            }
            if (p.resizable) {
                var resizer = $('<div class="modal-resizer"/>');
                modalfooter.append(resizer);
                var resizingMode = false;
                var c = {x: 0, y: 0};
                var resize = function(e) {
                    var xdelta = e.pageX - c.x;
                    var ydelta = e.pageY - c.y;
                    modal.css("width", modal.width() + xdelta);
                    modalbody.css("height", modalbody.height() + ydelta);
                    xdelta = ydelta = null;
                    c.x = e.pageX; c.y = e.pageY;
                };
                resizer.mousedown(function(e) {
                    e.preventDefault();
                    resizingMode = true;
                    c.x = e.pageX;
                    c.y = e.pageY;
                });
                $(document).mouseup(function() {
                    if (!resizingMode) return;
                    else resizingMode = false;
                });
                $(document).mousemove(function(e) {
                    if (resizingMode) {
                        resize(e);
                        e.preventDefault();
                    }
                });
            }
            modal.append(modalfooter);
        }
        if (p.backdrop) {
            $('body').append(backdrop);
        }
        $('body').append(modal);
        var top = ($(window).height() / 2) - (modal.height() / 2);
        modal.css("top", top);
        $(modal).modal({backdrop: false});
        if (p.autoclose > 0) {
            window.setTimeout(function() { modal.modal("hide") }, p.autoclose);
        }
        // Убиваем окно после его закрытия
        $(modal).on('hidden', function(e) {
            var datatoggle = $(e.target).attr('data-toggle');
            if(datatoggle === 'dropdown' || datatoggle === 'tooltip') {
                return;
            }
            if (!!p.onClose) p.onClose();
            $(this).remove();
            backdrop.remove();
        });
        var draggable_handle = !!p.title ? ".modal-header" : ".modal-body";
        $(modal).draggable({ handle: draggable_handle, containment: "window"});
        modal.mousedown(function() {
            $('.modal').css("z-index", 100);
            modal.css("z-index", 101);
        });
        modal.trigger('mousedown');
        return modal;
    };
    $.extend($.fn, { miamodal : miamodal });
})(jQuery);