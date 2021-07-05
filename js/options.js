$(function () {
    if (localStorage.options) {
        var b = JSON.parse(localStorage.options);
        $("#archive")[0].checked = 1 == (b.actionIndex & 1);
        $("#delete")[0].checked = 2 == (b.actionIndex & 2);
        $("#markspam")[0].checked = 4 == (b.actionIndex & 4);
        $("#markread")[0].checked = 8 == (b.actionIndex & 8);
    }
    $("#save").click(function () {
        var a = 0;
        $("#archive")[0].checked && (a = parseInt($("#archive")[0].value));
        $("#delete")[0].checked && (a += parseInt($("#delete")[0].value));
        $("#markspam")[0].checked && (a += parseInt($("#markspam")[0].value));
        $("#markread")[0].checked && (a += parseInt($("#markread")[0].value));
        localStorage.options = JSON.stringify({ actionIndex: a, label: "" });
        chrome.extension.sendRequest({ name: "reload" }, function (a) { });
    });
});
