// SpamCop Automator Extension Content Script
(function(){
    var forms = document.getElementsByName('sendreport');
    if (forms.length === 1) {
        forms[0].submit();
    } else {
        function attrQuoteEscape(s) {
            s = s.replace(/&/g, '&amp;');
            s = s.replace(/"/g, '&quot;');
            return s;
        }
        var x = 'sc?id=';
        x = x.toLowerCase();
        var z = document.links;
        for (var i = 0; i < z.length; ++i) {
            if ((z[i].innerHTML && z[i].innerHTML.toLowerCase().indexOf(x) !== -1) || z[i].href.toLowerCase().indexOf(x) !== -1) {
                location.href = attrQuoteEscape(z[i].href);
            }
        }
    }
})();
