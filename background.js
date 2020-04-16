chrome.runtime.onInstalled.addListener(function() {
    console.log("Trump Bites Installed.");
});

chrome.runtime.onMessage.addListener(function(message, callback) {
    if (message == "runContentScript") {
        console.log("injecting content.js");
        chrome.tabs.executeScript({
            file: 'content.js'
        });
    }
});
