/*************************************************************************
  This code is from Dynamic Web Coding at dyn-web.com
  Copyright 2004-10 by Sharon Paine 
  See Terms of Use at www.dyn-web.com/business/terms.php
  regarding conditions under which you may use this code.
  This notice must be retained in the code as is!
*************************************************************************/

/*  dw_sizerdx.js version date: April 2010
    requires dw_cookies.js (Nov 2009 version) and dw_event.js 
*/

var dw_fontSizerDX = {
    sizeUnit: "px",
    defaultSize: 12,
    maxSize: 26,
    minSize: 9,
    sizerDivId: 'sizer', // div id for sizer controls
    queryName: "dw_fsz", // name to check query string for when passing size in URL
    cookieLifetime: 180, // how long to keep cookie
    
    adjustList: [],  // set method populates

    setDefaults: function(unit, dflt, mn, mx, sels) {
        this.sizeUnit = unit; this.defaultSize = dflt;
        this.maxSize = mx;    this.minSize = mn;
        if (sels) this.set(dflt, mn, mx, sels);
    },

    set: function (dflt, mn, mx, sels) { 
        var ln = this.adjustList.length;        
        for (var i=0; sels[i]; i++) {
            this.adjustList[ln+i] = [];
            this.adjustList[ln+i]["sel"]  = sels[i];
            this.adjustList[ln+i]["dflt"] = dflt;
            this.adjustList[ln+i]["min"]   = mn || this.minSize;
            this.adjustList[ln+i]["max"]   = mx || this.maxSize;
            // hold ratio of this selector's default size to this.defaultSize for calcs in adjust fn 
            this.adjustList[ln+i]["ratio"] = this.adjustList[ln+i]["dflt"] / this.defaultSize;
        }
    },

    addHandlers: function () {
        var sizerEl = document.getElementById( dw_fontSizerDX.sizerDivId );
        if ( !dw_fontSizerDX.sizeIncrement ) { dw_fontSizerDX.getSizeIncrement(); }
        var links = sizerEl.getElementsByTagName('a');
        for (var i=0; links[i]; i++) {
            if ( dw_Util.hasClass( links[i], 'increase') ) {
                links[i].onclick = function () { dw_fontSizerDX.adjust( dw_fontSizerDX.sizeIncrement ); return false }
            } else if ( dw_Util.hasClass( links[i], 'decrease') ) {
                links[i].onclick = function () { dw_fontSizerDX.adjust( -dw_fontSizerDX.sizeIncrement ); return false }
            } else if ( dw_Util.hasClass( links[i], 'reset')  ) {
                links[i].onclick = function () { dw_fontSizerDX.reset(); return false }
            }
        }
        if (sizerEl) sizerEl.style.display = "block";
    },

    getSizeIncrement: function () {
        var val = 2;
        switch ( dw_fontSizerDX.sizeUnit ) {
            case 'px' : val = 2; break;
            case 'em' : val = .2; break;
            case '%' : val = 10; break;
        }
        dw_fontSizerDX.sizeIncrement = val;
    },
    
    init: function() {
        if ( !document.getElementById || !document.getElementsByTagName || !document.createElement ) return;
        var _this = dw_fontSizerDX;
        if ( !_this.doControlsSetup ) {
            _this.addHandlers();
        } else {
            _this.setupControls();
        }
        var size;
        // check query string and cookie for fontSize
        // check size (in case default unit changed or size passed in url out of range)
        size = dw_Util.getValueFromQueryString( _this.queryName );
        if ( isNaN( parseFloat(size) ) || size > _this.maxSize || size < _this.minSize ) {
            size = dw_Cookie.get("fontSize");
            if ( isNaN( parseFloat(size) ) || size > _this.maxSize || size < _this.minSize ) {
                size = _this.defaultSize;
            }
        } 
        // if neither set nor setDefaults populates adjustList, apply sizes to body and td's
        if (_this.adjustList.length == 0) _this.set(  _this.defaultSize, _this.minSize, _this.maxSize, ['body', 'td'] ); 
        _this.curSize = _this.defaultSize;  // create curSize property to use in calculations 
        if ( size != _this.defaultSize ) _this.adjust( size - _this.defaultSize );
    },

    adjust: function(n) {
        if ( !this.curSize ) return; 
        var alist, size, list, i, j;
        // check against max/minSize
        if ( n > 0 ) {
            if ( this.curSize + n > this.maxSize ) n = this.maxSize - this.curSize;
        } else if ( n < 0 ) {
            if ( this.curSize + n < this.minSize ) n = this.minSize - this.curSize;
        }
        if ( n == 0 ) return;
        this.curSize += n;
        // loop through adjustList, calculating size, checking max/min
        alist = this.adjustList;
        for (i=0; alist[i]; i++) {
            size = this.curSize * alist[i]['ratio']; // maintain proportion 
            size = Math.max(alist[i]['min'], size); size = Math.min(alist[i]['max'], size);
            list = dw_Util.getElementsBySelector( alist[i]['sel'] );
            for (j=0; list[j]; j++) { list[j].style.fontSize = size + this.sizeUnit; }
        }
        dw_Cookie.set( "fontSize", this.curSize, this.cookieLifetime, "/" );
    },

    reset: function() {
        if ( !this.curSize ) return; 
        var alist = this.adjustList, list, i, j;
        for (i=0; alist[i]; i++) {
            list = dw_Util.getElementsBySelector( alist[i]['sel'] );
            for (j=0; list[j]; j++) { 
                // Reset adjustList elements to their default sizes
                //list[j].style.fontSize = alist[i]['dflt'] + this.sizeUnit;
                list[j].style.fontSize = '';  // restores original font size (unless set inline!)
            } 
        }
        this.curSize = this.defaultSize;
        dw_Cookie.del("fontSize", "/");
    }

};

/////////////////////////////////////////////////////////////////////
//  
var dw_Util; 
if (!dw_Util) dw_Util = {};

// removes space characters from start and end of string
dw_Util.trimString = function (str) {
    var re = /^\s+|\s+$/g;
    return str.replace(re, "");
}

// removes extra space characters
dw_Util.normalizeString = function (str) {
    var re = /\s\s+/g;
    return dw_Util.trimString(str).replace(re, " ");
}

dw_Util.hasClass = function (el, cl) {
    var re = new RegExp("\\b" + cl + "\\b", "i");
    if ( re.test( el.className ) ) {
        return true;
    }
    return false;
}

// what className attached to what element type in what container element (default: document)
dw_Util.getElementsByClassName = function (sClass, sTag, oCont) {
    var result = [], list, i;
    var re = new RegExp("\\b" + sClass + "\\b", "i");
    oCont = oCont? oCont: document;
    if ( document.getElementsByTagName ) {
        if ( !sTag || sTag == "*" ) { // for ie5
            list = oCont.all? oCont.all: oCont.getElementsByTagName("*");
        } else {
            list = oCont.getElementsByTagName(sTag);
        }
        for (i=0; list[i]; i++) 
            if ( re.test( list[i].className ) ) result.push( list[i] );
    }
    return result;
}

// resource: simon.incutio.com/archive/2003/03/25/getElementsBySelector
dw_Util.getElementsBySelector = function (selector) {
    if (!document.getElementsByTagName) return [];
    var nodeList = [document], tokens, bits, list, col, els, i, j, k;
    selector = dw_Util.normalizeString(selector);
    tokens = selector.split(' ');
    for (i=0; tokens[i]; i++) {
        if ( tokens[i].indexOf('#') != -1 ) {  // id
            bits = tokens[i].split('#'); 
            var el = document.getElementById( bits[1] );
            if (!el) return []; 
            if ( bits[0] ) {  // check tag
                if ( el.tagName.toLowerCase() != bits[0].toLowerCase() ) return [];
            }
            for (j=0; nodeList[j]; j++) {  // check containment
                if ( nodeList[j] == document || dw_Util.contained(el, nodeList[j]) ) 
                    nodeList = [el];
                else return [];
            }
        } else if ( tokens[i].indexOf('.') != -1 ) {  // class
            bits = tokens[i].split('.'); col = [];
            for (j=0; nodeList[j]; j++) {
                els = dw_Util.getElementsByClassName( bits[1], bits[0], nodeList[j] );
                for (k=0; els[k]; k++) { col[col.length] = els[k]; }
            }
            nodeList = [];
            for (j=0; col[j]; j++) { nodeList.push(col[j]); }
        } else {  // element 
            els = []; 
            for (j = 0; nodeList[j]; j++) {
                list = nodeList[j].getElementsByTagName(tokens[i]);
                for (k = 0; list[k]; k++) { els.push(list[k]); }
            }
            nodeList = els;
        }
    }
    return nodeList;
}

// obj: link or window.location
dw_Util.getValueFromQueryString = function (name, obj) {
    obj = obj? obj: window.location; 
    if (obj.search && obj.search.indexOf(name != -1) ) {
        var pairs = obj.search.slice(1).split("&"); // name/value pairs
        var set;
        for (var i=0; pairs[i]; i++) {
            set = pairs[i].split("="); // Check each pair for match on name 
            if ( set[0] == name && set[1] ) {
                return set[1];
            }
        }
    }
    return '';
}

// returns true of oNode is contained by oCont (container)
dw_Util.contained = function (oNode, oCont) {
    if (!oNode) return null; // in case alt-tab away while hovering (prevent error)
    while ( (oNode = oNode.parentNode) ) if ( oNode == oCont ) return true;
    return false;
}