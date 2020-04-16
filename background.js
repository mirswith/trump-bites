chrome.runtime.onInstalled.addListener(function() {
    console.log("T.Rump Bites Installed.");
});

chrome.runtime.onMessage.addListener(function(message, callback) {
    if (message == "runContentScript") {
        chrome.tabs.executeScript({
            file: 'content.js'
        });
    }
});
