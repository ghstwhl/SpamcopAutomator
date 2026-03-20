// SpamCop Automator Extension Content Script
(function(){
    var forms = document.getElementsByName('sendreport');
    if (forms.length === 1) {
        forms[0].submit();
    } else {
        function htmlEscape(s) {
            s = s.replace(/&/g, '&amp;');
            s = s.replace(/>/g, '&gt;');
            s = s.replace(/</g, '&lt;');
            return s;
        }
        function attrQuoteEscape(s) {
            s = s.replace(/&/g, '&amp;');
            s = s.replace(/"/g, '&quot;');
            return s;
        }
        var x = 'sc?id=';
        var n = 0;
        if (x != null) {
            x = x.toLowerCase();
            var z = document.links;
            if (!z || z.length === 0) {
                z = document.getElementsByTagName('a');
            }
            for (var i = 0; i < z.length; ++i) {
                var link = z[i];
                if ((link.innerHTML && link.innerHTML.toLowerCase().indexOf(x) !== -1) || link.href.toLowerCase().indexOf(x) !== -1) {
                    if (typeof global !== 'undefined' && typeof global.redirected !== 'undefined') {
                        global.redirected = attrQuoteEscape(link.href);
                    } else {
                        location.href = attrQuoteEscape(link.href);
                    }
                }
            }
        }
    }
})();
