var Util = {
    fireClick: function (b, c) {
        var a = document.createEvent("MouseEvents");
        a.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, c, !1, !1, !1, 0, null);
        return b.dispatchEvent(a);
    },
    fireMouseUp: function (b, c) {
        var a = document.createEvent("MouseEvents");
        a.initMouseEvent("mouseup", !0, !0, window, 0, 0, 0, 0, 0, c, !1, !1, !1, 0, null);
        return b.dispatchEvent(a);
    },
    fireMouseDown: function (b, c) {
        var a = document.createEvent("MouseEvents");
        a.initMouseEvent("mousedown", !0, !0, window, 0, 0, 0, 0, 0, c, !1, !1, !1, 0, null);
        return b.dispatchEvent(a);
    },
    fireMouseOver: function (b, c) {
        var a = document.createEvent("MouseEvents");
        a.initMouseEvent("mouseover", !0, !0, window, 0, 0, 0, 0, 0, c, !1, !1, !1, 0, null);
        return b.dispatchEvent(a);
    },
    fireMouseOut: function (b, c) {
        var a = document.createEvent("MouseEvents");
        a.initMouseEvent("mouseout", !0, !0, window, 0, 0, 0, 0, 0, c, !1, !1, !1, 0, null);
        return b.dispatchEvent(a);
    },
    fireGmailAction: function (b, c) {
        var a = Util.fireMouseDown(b, c);
        return Util.fireMouseUp(b, c) && a;
    },
    getCheckBoxToSelect: function (b) {
        var c = null,
            c = b.parentElement.parentElement.getElementsByClassName("T-Jo-auh")[0];
        return (c = c.parentElement);
    },
    getCheckedBoxes: function (b, c) {
        for (var a = [], f = b("div.T-Jo-auh:visible"), h = c.getAttribute("aria-labelledby"), d = 0; d < f.length; d++) {
            var g = f[d],
                e = g.parentElement,
                k = "true" == e.getAttribute("aria-checked"),
                e = e.getAttribute("aria-labelledby") == h;
            !0 != k || e || (0 < d && a.push(g));
        }
        return a;
    },
    isChecked: function (b) {
        return "true" == b.getAttribute("aria-checked");
    },
};
