// console.log("Script executing...");

// window.onload = function () {
//     chrome.identity.getProfileUserInfo(account => console.log(account));
// };


window.onload = function () {
    document.querySelector('button').addEventListener('click', function () {
        // chrome.identity.clearAllCachedAuthTokens(() => console.log("Done.."));
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            // let init = {
            //     method: 'GET',
            //     async: true,
            //     headers: {
            //         Authorization: 'Bearer ' + token,
            //         'Content-Type': 'application/json'
            //     },
            //     'contentType': 'json'
            // };
            // console.log(token);
            fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`)
                .then(res => res.json())
                .then((data) => console.log(data));
            // chrome.storage.sync.set({ token: token }, function () {
            //     console.log('Value is set to ' + token);
            // });
            // chrome.identity.getProfileUserInfo(account => console.log(account));
            // fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile",
            //     init)
            //     .then((response) => response.json())
            //     .then(function (data) {
            //         localStorage.user = {}
            //         console.log(data)
            //     });
        });
    });
};
