// version = 1;
// void 0 == localStorage.version && (localStorage.version = 0);
// localStorage.version < version && (chrome.tabs.create({ url: chrome.extension.getURL("options.html") }), (localStorage.version = version));
// chrome.extension.onRequest.addListener(function (a, b, e) {
//     switch (a.name) {
//         case "reload":
//             reloadGmail();
//     }
// });
// chrome.extension.onMessage.addListener(function (a, b, e) {
//     "loadOptions" == a.action && e({ options: JSON.parse(localStorage.options) });
// });
// function reloadGmail() {
//     chrome.windows.getAll({ populate: !0 }, function (a) {
//         for (var b = 0, e = a.length; b < e; b++) {
//             for (var d = a[b].tabs, f = null, c = 0, g = d.length; c < g; c++)
//                 d[c].url.match("mail.google.com") && reloadTab(d[c], !0), d[c].title.match("Actions for Gmail") && (f = d[c]);
//             null != f && chrome.tabs.remove(f.id);
//         }
//     });
// }
// function reloadTab(a, b) {
//     chrome.tabs.update(a.id, { url: a.url, selected: b }, null);
// }



// import { readFile } from 'fs';
// import { google } from 'googleapis';
// const { google } = require('googleapis');

// const SCOPES = ['https://mail.google.com/'];

// readFile('credentials.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);
//     // Authorize a client with credentials, then call the Gmail API.
//     authorize(JSON.parse(content), test);
// });

// function authorize(content, callback) {
//     const { client_secret, client_id, redirect_uris } = credentials.installed;
//     const oAuth2Client = new google.auth.OAuth2(
//         client_id, client_secret, redirect_uris[0]);
//     readFile('token.json', (err, token) => {
//         if (err) return getNewToken(oAuth2Client, callback);
//         oAuth2Client.setCredentials(JSON.parse(token));
//         callback(oAuth2Client);
//     });
// }

// function getNewToken(oAuth2Client, callback) {
//     const authurl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPES
//     });
//     chrome.tabs.create({ url: authurl });
// }

// async function test(auth) {
//     const gmail = google.gmail({ version: 'v1', auth });

//     const user = await gmail.users.getProfile({ userId: 'me' });
//     console.log(user.data);
// }


// chrome.tabs.create({ url: "background.html" });

// const val = [{ user_id: "123", scheduled_emails: ["1232"] }];
// chrome.storage.local.set(val, () => console.log("Value stored is: " + val))

// try {

//     async function getCurrentTab() {
//         let queryOptions = { active: true, currentWindow: true };
//         let tab = await chrome.tabs.query(queryOptions);
//         return tab;
//     }
//     getCurrentTab().then((tabId) => {
//         console.log(tabId[0]);

//         chrome.scripting.executeScript({
//             target: { tabId: tabId[0].id },
//             files: ['./googleAuth.js']
//         })
//     });
// } catch (error) {
//     console.log("I am chutiya");
//     console.log(error);
// }


// try {


// } catch (error) {
//     console.log(error);
// }
// chrome.identity.clearAllCachedAuthTokens(() => console.log("Done.."));

chrome.identity.getAuthToken({ interactive: true }, function (token) {
    // console.log(token);
    fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`)
        .then(res => res.json())
        .then((data) => {
            const email = data.email;
            const info = { [email]: token };
            chrome.storage.sync.set(info, function () {
                console.log(info);
            });
        });
});

chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if (message.loadError == 401) {
        try {
            chrome.identity.removeCachedAuthToken(message.token, () => {
                chrome.identity.getAuthToken({ interactive: true }, function (token) {
                    const info = { [message.email]: token };
                    chrome.storage.sync.set(info, function () {
                        console.log(info);
                    });
                    response(token);
                })
            });
        } catch (e) {
            console.log(e);
        }
    }
    else if (message.loadError == 404) {
        console.log(message);
        // response("This is send by Arpit.");
    }
});