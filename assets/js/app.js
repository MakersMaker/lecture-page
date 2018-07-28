/*!
 * HTMLEdito - HTML, CSS, JS Live Preview Editor v1.1
 * app.js
 * Copyright 2017 AMPBlogger (https://www.codecanyon.net/user/ampblogger).
 * License: https://codecanyon.net/licenses/standard
 */
// theme selection
function selectTheme() {
    var e = input.options[input.selectedIndex].innerHTML;
    codeeditorhtml.setOption("theme", e);
    codeeditorcss.setOption("theme", e);
    codeeditorjs.setOption("theme", e)
}
// resize panel editor
function resize() {
    $("#widget").width($win.width()).height($win.height() - 50);
    codeeditorhtml.setSize("100%", "100%");
    codeeditorcss.setSize("100%", "100%");
    codeeditorjs.setSize("100%", "100%")
}
// live update preview panel
function updatePreview() {
    var e = document.getElementById("preview");
    var t = e.contentDocument || e.contentWindow.document;
    t.open();
    if ($("#layerpreview").is(":checked")) {
        var n = "\n* { outline: 2px dotted red }\n* * { outline: 2px dotted green }\n* * * { outline: 2px dotted orange }\n* * * * { outline: 2px dotted blue }\n* * * * * { outline: 1px solid red }\n* * * * * * { outline: 1px solid green }\n* * * * * * * { outline: 1px solid orange }\n* * * * * * * * { outline: 1px solid blue }\n";
        var r = '<style type="text/css">\n' + codeeditorcss.getValue() + n + "\n</style>"
    } else {
        var r = '<style type="text/css">\n' + codeeditorcss.getValue() + "\n</style>"
    }
    if ($("#autopreviewcheckbox").is(":checked") || runcode == 1) {
        var i = '\n<!-- js code -->\n<script type="text/javascript">\n//<![CDATA[\n' + codeeditorjs.getValue() + "\n//]]>\n</script>";
        t.write(r + codeeditorhtml.getValue() + i)
    } else {
        t.write(r + codeeditorhtml.getValue())
    }
    t.close()
}
// full preview panel - stretch full width
function fullpreview() {
    windowsizewidth = $(window).outerWidth(true) - 5;
    windowsizeheight = $(window).outerHeight(true) - 55;
    $("#foo").animate({
        width: 0
    }, "fast");
    $(".vsplitter").animate({
        left: 0
    }, "fast");
    $("#bar").animate({
        width: windowsizewidth
    }, "fast", function() {
        $("#hor1").animate({
            top: 0
        }, "fast");
        $("#codejs").animate({
            height: 0
        }, "fast");
        $("#codepreview").animate({
            height: windowsizeheight
        }, "fast");
        $("#widget").split().position(0);
        $("#bar").split().position(0);
        $("#previewsizewidth").val(windowsizewidth);
        $("#previewsizeheight").val(windowsizeheight);
        updatepreviewinput()
    });
    codeeditorhtml.setSize("100%", "100%");
    codeeditorcss.setSize("100%", "100%");
    codeeditorjs.setSize("100%", "100%")
}

function previewdefault() {
    windowsizewidth = $(window).outerWidth(true) - 5;
    windowsizeheight = $(window).outerHeight(true) - 55;
    var e = 767;
    var t = 420;
    $("#foo").animate({
        width: windowsizewidth - e
    }, "fast");
    $(".vsplitter").animate({
        left: windowsizewidth - e
    }, "fast");
    $("#bar").animate({
        width: e
    }, "fast", function() {
        $("#hor1").animate({
            top: windowsizeheight - t
        }, "fast");
        $("#codejs").animate({
            height: windowsizeheight - t
        }, "fast");
        $("#codepreview").animate({
            height: t
        }, "fast");
        $("#widget").split().position(windowsizewidth - e + 2);
        $("#bar").split().position(windowsizeheight - t);
        $("#previewsizewidth").val(e);
        $("#previewsizeheight").val(t);
        updatepreviewinput();
        codeeditorhtml.setSize("100%", "100%");
        codeeditorcss.setSize("100%", "100%");
        codeeditorjs.setSize("100%", "100%")
    });
    codeeditorhtml.setSize("100%", "100%");
    codeeditorcss.setSize("100%", "100%");
    codeeditorjs.setSize("100%", "100%")
}

function previewtablet() {
    windowsizewidth = $(window).outerWidth(true) - 5;
    windowsizeheight = $(window).outerHeight(true) - 55;
    var e = 991;
    $("#foo").animate({
        width: windowsizewidth - e
    }, "fast");
    $(".vsplitter").animate({
        left: windowsizewidth - e
    }, "fast");
    $("#bar").animate({
        width: e
    }, "fast", function() {
        $("#hor1").animate({
            top: 0
        }, "fast");
        $("#codejs").animate({
            height: 0
        }, "fast");
        $("#codepreview").animate({
            height: windowsizeheight
        }, "fast");
        $("#widget").split().position(windowsizewidth - e + 2);
        $("#bar").split().position(0);
        $("#previewsizewidth").val(e);
        $("#previewsizeheight").val(windowsizeheight);
        updatepreviewinput()
    });
    codeeditorhtml.setSize("100%", "100%");
    codeeditorcss.setSize("100%", "100%");
    codeeditorjs.setSize("100%", "100%")
}

// panel - no javascript view
function nojsview() {
    windowsizewidth = $(window).outerWidth(true) - 5;
    windowsizeheight = $(window).outerHeight(true) - 55;
    var e = 768;
    $("#foo").animate({
        width: windowsizewidth - e
    }, "fast");
    $(".vsplitter").animate({
        left: windowsizewidth - e
    }, "fast");
    $("#bar").animate({
        width: e
    }, "fast", function() {
        $("#hor1").animate({
            top: 0
        }, "fast");
        $("#codejs").animate({
            height: 0
        }, "fast");
        $("#codepreview").animate({
            height: windowsizeheight
        }, "fast");
        $("#widget").split().position(windowsizewidth - e + 2);
        $("#bar").split().position(0);
        $("#previewsizewidth").val(e);
        $("#previewsizeheight").val(windowsizeheight);
        updatepreviewinput()
    });
    codeeditorhtml.setSize("100%", "100%");
    codeeditorcss.setSize("100%", "100%");
    codeeditorjs.setSize("100%", "100%")
}

function previewphone_h() {
    windowsizewidth = $(window).outerWidth(true) - 5;
    windowsizeheight = $(window).outerHeight(true) - 55;
    var e = 320;
    var t = windowsizeheight;
    if (windowsizeheight >= 767) {
        t = 767
    }
    $("#foo").animate({
        width: windowsizewidth - e
    }, "fast");
    $(".vsplitter").animate({
        left: windowsizewidth - e
    }, "fast");
    $("#bar").animate({
        width: e
    }, "fast", function() {
        $("#hor1").animate({
            top: windowsizeheight - t
        }, "fast");
        $("#codejs").animate({
            height: windowsizeheight - t
        }, "fast");
        $("#codepreview").animate({
            height: t
        }, "fast");
        $("#widget").split().position(windowsizewidth - e + 2);
        $("#bar").split().position(windowsizeheight - t);
        $("#previewsizewidth").val(e);
        $("#previewsizeheight").val(t);
        updatepreviewinput();
        codeeditorhtml.setSize("100%", "100%");
        codeeditorcss.setSize("100%", "100%");
        codeeditorjs.setSize("100%", "100%")
    });
    codeeditorhtml.setSize("100%", "100%");
    codeeditorcss.setSize("100%", "100%");
    codeeditorjs.setSize("100%", "100%")
}

function previewphone_w() {
    windowsizewidth = $(window).outerWidth(true) - 5;
    windowsizeheight = $(window).outerHeight(true) - 55;
    var e = 767;
    var t = 320;
    $("#foo").animate({
        width: windowsizewidth - e
    }, "fast");
    $(".vsplitter").animate({
        left: windowsizewidth - e
    }, "fast");
    $("#bar").animate({
        width: e
    }, "fast", function() {
        $("#hor1").animate({
            top: windowsizeheight - t
        }, "fast");
        $("#codejs").animate({
            height: windowsizeheight - t
        }, "fast");
        $("#codepreview").animate({
            height: t
        }, "fast");
        $("#widget").split().position(windowsizewidth - e + 2);
        $("#bar").split().position(windowsizeheight - t);
        $("#previewsizewidth").val(e);
        $("#previewsizeheight").val(t);
        updatepreviewinput();
        codeeditorhtml.setSize("100%", "100%");
        codeeditorcss.setSize("100%", "100%");
        codeeditorjs.setSize("100%", "100%")
    });
    codeeditorhtml.setSize("100%", "100%");
    codeeditorcss.setSize("100%", "100%");
    codeeditorjs.setSize("100%", "100%")
}

function updatepreviewinput() {
    $("#previewoutputsize").fadeIn("fast");
    previewsizewidth = $("#preview").width() - 1;
    previewsizeheight = $("#preview").height() - 3;
    $("#outputsizenumber").html(previewsizewidth + "x" + previewsizeheight + " px")
}

function menubuttoninactive(e) {
    $(e).css("background-image", "");
    $(e).css("background-position", "");
    $(e).css("background-repeat", "")
}

function menubuttonactive(e) {
  //  $(e).css("background-image", "url(../images/icon/arrow_bottom.png)");
    $(e).css("background-position", " center 40px");
    $(e).css("background-repeat", "no-repeat")
}
var input = document.getElementById("select");
var choice = document.location.search && decodeURIComponent(document.location.search.slice(1));
if (choice) {
    input.value = choice;
    codeeditorhtml.setOption("theme", theme);
    codeeditorcss.setOption("theme", theme);
    codeeditorjs.setOption("theme", theme)
}
var $win = $(window);
$(window).on('load', function() {
    $("#loader").fadeOut()
});
$(window).on('unload', function() {
    $("#loader").fadeIn()
});
jQuery(function(e) {
    $win.resize(resize);
    e("#widget").width($win.width()).height($win.height() - 50).split({
        orientation: "vertical",
        limit: 1
    });
    e("#foo").split({
        orientation: "horizontal",
        limit: 1
    });
    e("#bar").split({
        orientation: "horizontal",
        limit: 1
    });
    codeeditorhtml.setSize("100%", "100%");
    codeeditorcss.setSize("100%", "100%");
    codeeditorjs.setSize("100%", "100%");
    e("#bar .hsplitter").attr("id", "hor1");
    e("#foo .hsplitter").attr("id", "hor2");
    updatePreview();
    e("#coderevisionreport").prop("disabled", true)
});
$(window).resize(function() {
    var e = $(window);
    e.resize(resize);
    $("#widget").width(e.width()).height(e.height() - 50).split({
        orientation: "vertical",
        limit: 1
    });
    $("#foo").split({
        orientation: "horizontal",
        limit: 1
    });
    $("#bar").split({
        orientation: "horizontal",
        limit: 1
    })
});
$("#coderevisionreport").click(function() {
    $("#coderevisionreport").prop("disabled", false)
});
var codeeditorhtml = CodeMirror.fromTextArea(document.getElementById("codeeditorhtml"), {
    mode: "text/html",
    tabMode: "indent",
    lineNumbers: true,
    matchBrackets: true,
    autoCloseTags: true,
    extraKeys: {
        "Ctrl-Q": "toggleComment"
    },
    styleActiveLine: true,
    profile: "xhtml",
    autoCloseBrackets: true
});
var codeeditorcss = CodeMirror.fromTextArea(document.getElementById("codeeditorcss"), {
    mode: "text/css",
    tabMode: "indent",
    lineNumbers: true,
    matchBrackets: true,
    continueComments: "Enter",
    extraKeys: {
        "Ctrl-Q": "toggleComment"
    },
    styleActiveLine: true,
    autoCloseBrackets: true
});
var codeeditorjs = CodeMirror.fromTextArea(document.getElementById("codeeditorjs"), {
    mode: "application/typescript",
    tabMode: "indent",
    lineNumbers: true,
    matchBrackets: true,
    continueComments: "Enter",
    extraKeys: {
        "Ctrl-Q": "toggleComment"
    },
    styleActiveLine: true,
    autoCloseBrackets: true,
    gutters: ["CodeMirror-lint-markers"],
    lint: true
});
var runcode = 0;
$("#layerpreview").click(function() {
    updatePreview()
});
$("#autopreviewcheckbox").click(function() {
    if ($("#autopreviewcheckbox").is(":checked")) {
        updatePreview()
    }
});
$("#runcodebutton").click(function() {
    runcode = 1;
    updatePreview();
    runcode = 0;
    $("#coderevisionreport").prop("disabled", false)
});
$("#linewrappingcheckbox").click(function() {
    if ($("#linewrappingcheckbox").is(":checked")) {
        codeeditorhtml.setOption("lineWrapping", true);
        codeeditorcss.setOption("lineWrapping", true);
        codeeditorjs.setOption("lineWrapping", true);
        codeeditorhtml.setOption("autoCloseTags", true)
    } else {
        codeeditorhtml.setOption("lineWrapping", false);
        codeeditorcss.setOption("lineWrapping", false);
        codeeditorjs.setOption("lineWrapping", false);
        codeeditorhtml.setOption("autoCloseTags", false)
    }
});
$("#autoclosetagscheckbox").click(function() {
    if ($("#autoclosetagscheckbox").is(":checked")) {
        codeeditorhtml.setOption("autoCloseTags", true)
    } else {
        codeeditorhtml.setOption("autoCloseTags", false)
    }
});
codeeditorhtml.on("change", function() {
    updatePreview();
    $("#codeeditorhtml").val(codeeditorhtml.getValue())
});
codeeditorcss.on("change", function() {
    updatePreview();
    $("#codeeditorcss").val(codeeditorcss.getValue())
});
codeeditorjs.on("change", function() {
    updatePreview();
    $("#codeeditorjs").val(codeeditorjs.getValue())
});
var windowsizewidth = $(window).outerWidth(true) - 5;
var windowsizeheight = $(window).outerWidth(true) - 55;
var previewsizewidth = $(window).outerWidth(true) - 5;
var previewsizeheight = $(window).outerWidth(true) - 55;
$("#previewsizewidth").keyup(function(e) {
    windowsizewidth = $(window).outerWidth(true) - 5;
    windowsizeheight = $(window).outerHeight(true) - 55;
    var t = $(this).val();
    this.value = this.value.replace(/[^0-9\,]/g, "");
    if (windowsizewidth < t) {
        t = windowsizewidth;
        $(this).val(windowsizewidth);
        alert("max window width " + windowsizewidth + "px!")
    }
    if (windowsizewidth >= t) {
        $("#bar").animate({
            width: t
        }, "fast");
        $(".vsplitter").animate({
            left: windowsizewidth - t
        }, "fast", function() {
            $("#widget").split().position(windowsizewidth - t + 2);
            updatepreviewinput()
        });
        $("#foo").animate({
            width: windowsizewidth - t
        }, "fast");
        codeeditorhtml.setSize("100%", "100%");
        codeeditorcss.setSize("100%", "100%");
        codeeditorjs.setSize("100%", "100%")
    }
});
$("#previewsizeheight").keyup(function(e) {
    windowsizewidth = $(window).outerWidth(true) - 5;
    windowsizeheight = $(window).outerHeight(true) - 55;
    var t = $(this).val();
    this.value = this.value.replace(/[^0-9\,]/g, "");
    if (windowsizeheight < t) {
        t = windowsizeheight;
        $(this).val(windowsizeheight);
        alert("max window height " + windowsizeheight + "px!")
    }
    if (windowsizeheight >= t) {
        $("#codejs").animate({
            height: windowsizeheight - t
        }, "fast");
        $("#codepreview").animate({
            height: t
        }, "fast");
        $("#hor1").animate({
            top: windowsizeheight - t
        }, "fast", function() {
            $("#bar").split().position(windowsizeheight - t + 2);
            $("#previewoutputsize").fadeIn("fast");
            previewsizewidth = $("#preview").width() - 1;
            previewsizeheight = $("#preview").height() - 1;
            $("#outputsizenumber").html(previewsizewidth + "x" + previewsizeheight + " px")
        });
        codeeditorhtml.setSize("100%", "100%");
        codeeditorcss.setSize("100%", "100%");
        codeeditorjs.setSize("100%", "100%")
    }
});
$("#previewsize").click(function() {
    inputwindowresize == 1
});
$("#previewdefault").click(function() {
    previewdefault()
});
$("#previewtablet").click(function() {
    previewtablet()
});
$("#nojsview").click(function() {
    nojsview()
});
$("#previewphone-h").click(function() {
    previewphone_h()
});
$("#previewphone-w").click(function() {
    previewphone_w()
});
$("#fullpreview").click(function() {
    fullpreview()
});
$("#previewsizewidth").bind("input propertychange", function() {
    $("#previewsizewidth").keyup();
    this.value = this.value.replace(/[^0-9\,]/g, "")
});
$("#previewsizeheight").bind("input propertychange", function() {
    $("#previewsizeheight").keyup();
    this.value = this.value.replace(/[^0-9\,]/g, "")
});
var thisbutton;
var codeinfostate;
$("#codeinfo").click(function() {
    thisbutton = $("#codeinfo");
    $("#settingsmenu, #viewmenu, #librarymenu, #sharemenu").hide();
    if (codeinfostate == 1) {
        menubuttoninactive(thisbutton);
        codeinfostate = 0
    } else {
        menubuttoninactive(".topmenubutton");
        menubuttonactive(thisbutton);
        codeinfostate = 1;
        viewmenubuttonstate = 0;
        settingsbuttonstate = 0;
        librarybuttonstate = 0
    }
    $("#codeinfomenu").toggle()
});
var viewmenubuttonstate;
$("#viewmenubutton").click(function() {
    thisbutton = $("#viewmenubutton");
    $("#codeinfomenu, #settingsmenu, #librarymenu, #sharemenu").hide();
    if (viewmenubuttonstate == 1) {
        menubuttoninactive(thisbutton);
        viewmenubuttonstate = 0
    } else {
        menubuttoninactive(".topmenubutton");
        menubuttonactive(thisbutton);
        viewmenubuttonstate = 1;
        codeinfostate = 0;
        settingsbuttonstate = 0;
        librarybuttonstate = 0
    }
    $("#viewmenu").toggle()
});
var settingsbuttonstate;
$("#settingsmenubutton").click(function() {
    thisbutton = $("#settingsmenubutton");
    $("#codeinfomenu, #viewmenu, #librarymenu, #sharemenu").hide();
    if (settingsbuttonstate == 1) {
        menubuttoninactive(thisbutton);
        settingsbuttonstate = 0
    } else {
        menubuttoninactive(".topmenubutton");
        menubuttonactive(thisbutton);
        settingsbuttonstate = 1;
        codeinfostate = 0;
        viewmenubuttonstate = 0;
        librarybuttonstate = 0
    }
    $("#settingsmenu").toggle()
});
var librarybuttonstate;
$("#librarymenubutton").click(function() {
    thisbutton = $("#librarymenubutton");
    $("#codeinfomenu, #viewmenu, #settingsmenu, #sharemenu").hide();
    if (librarybuttonstate == 1) {
        menubuttoninactive(thisbutton);
        librarybuttonstate = 0
    } else {
        menubuttoninactive(".topmenubutton");
        menubuttonactive(thisbutton);
        librarybuttonstate = 1;
        codeinfostate = 0;
        viewmenubuttonstate = 0;
        settingsbuttonstate = 0
    }
    $("#librarymenu").toggle()
})