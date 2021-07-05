let gmail = "";

const gmailLoader = new WebKitMutationObserver(function (a, d) {
    const usefulText = $(".gb_Ma.gb_C.gb_h").attr("aria-label");
    if (!usefulText) return;
    for (let i = 0, start = 0; i < usefulText.length; ++i) {
        if (usefulText[i] == ')') start = 0;
        if (start) gmail += usefulText[i];
        if (usefulText[i] == '(') start = 1;
    }
    if (gmail.length) this.disconnect();
    console.log(gmail);
}).observe(document, { subtree: !0, childList: !0, characterData: !1, attributes: !1 });

new WebKitMutationObserver(function (a, d) {
    $(".yW:not(.gab)")
        .addClass("gab")
        .each(function () {
            var usefulDiv = $(this).parent().children()[0];
            var usefulSpan = $(usefulDiv).children();
            var messageId;
            for (var i = 0; i < usefulSpan.length; ++i) {
                messageId = $(usefulSpan[i]).attr("data-legacy-thread-id");
                if (messageId)
                    break;
            }

            var m = $("<td></td>").addClass("gabHorizontal xY");
            m.append(`<input type="image" class="scheduler" id=${messageId} data-tooltip="Schedule Deletion" src = "https://www.gstatic.com/images/icons/material/system/1x/watch_later_black_20dp.png"></input>`)
            $(this).parent().prev().after(m);
            m.on("click", handleClick);
        });
}).observe(document, { subtree: !0, childList: !0, characterData: !1, attributes: !1 });

async function handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    const messageId = event.target.id;
    try {
        await chrome.storage.sync.get(gmail, function (res) {
            const token = res[gmail];
            if (!token) {
                chrome.runtime.sendMessage(({ loadError: 404, email: gmail }));
            }
            else deleteEmail(messageId, token);
        });
    } catch (e) {
        console.log(e);
    }
}


async function deleteEmail(messageId, token) {
    try {
        let init = {
            method: 'POST',
            async: true,
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            'contentType': 'json'
        };
        fetch(`https://gmail.googleapis.com/gmail/v1/users/${gmail}/threads/${messageId}/trash`, init)
            .then(res => {
                if (res.status == 401) {
                    chrome.runtime.sendMessage(({ loadError: 401, email: gmail, token: token }), (res) => console.log(res));
                }
                else if (res.status == 403) {
                    chrome.runtime.sendMessage(({ loadError: 403, email: gmail }, (token) => console.log(token)));
                }
            })
            .catch(e => Promise.reject())
    } catch (error) {
        throw error;
    }
}
