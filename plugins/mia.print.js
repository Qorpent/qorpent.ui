(function ($) {
    $.fn.printelement = function () {
        return this.each(function () {
            var container = $(this);
            var hidden_IFrame = $('<iframe></iframe>').attr({
                width: '1px',
                height: '1px',
                display: 'none'
            }).appendTo(container);
            var myIframe = hidden_IFrame.get(0);
            var script_tag = myIframe.contentWindow.document.createElement("script");
            var style_tag = myIframe.contentWindow.document.createElement("style");
            style_tag.innerText = "@media print{.non-printable{display: none !important;}.printable{display: inherit !important;}}";
            script_tag.type = "text/javascript";
            var script = myIframe.contentWindow.document.createTextNode('function Print(){ window.print(); }');
            script_tag.appendChild(script);
            myIframe.contentWindow.document.body.innerHTML = container.html().replace(/display:\s?none;/g, '');
            myIframe.contentWindow.document.body.appendChild(script_tag);
            myIframe.contentWindow.document.body.appendChild(style_tag);
            myIframe.contentWindow.Print();
            hidden_IFrame.remove();
        });
    };
})(jQuery);