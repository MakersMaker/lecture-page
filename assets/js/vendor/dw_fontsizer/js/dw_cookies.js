/*********************************************************************************
  dw_cookies.js - cookie functions for dyn-web.com
  version date: Nov 2009
**********************************************************************************/

var dw_Cookie = {

    set: function(name, value, days, path, domain, secure) {
        var date, expires;
        if (typeof days == "number") {
            date = new Date();
            date.setTime( date.getTime() + (days*24*60*60*1000) );
            expires = date.toGMTString();
        }
        document.cookie = name + "=" + encodeURI(value) +
            ((expires) ? "; expires=" + expires : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    },
    
    get: function(name) {
        var c, cookies = document.cookie.split( /;\s/g );
        for (var i=0; cookies[i]; i++) {
            c = cookies[i];
            if ( c.indexOf(name + '=') === 0 ) {
                return decodeURI( c.slice(name.length + 1, c.length) );
            }
        }
        return null;
    },
    
    del: function(name, path, domain) {
        if ( dw_Cookie.get(name) ) {
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    }
}
