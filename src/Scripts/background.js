chrome.notifications.onButtonClicked.addListener(onButtonClicked);
chrome.runtime.onMessage.addListener(onMessage);
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({ 'useCount': 0 });
    chrome.storage.local.set({ 'didRanked': false });
    chrome.storage.local.set({ 'languages': [] });
    chrome.storage.local.set({ 'capitalLetters': [] });
});

function onButtonClicked(notificationId, buttonIndex){
    switch(notificationId){
        case 'Report': 
            handleReportButtons(buttonIndex);
            break;
        case 'Like it?':
            handleLikeItButtons(buttonIndex);
            break;
    }
}

function onMessage({type,data}){
    switch(type){
        case 'notification':
            sendNotification(data);
            break;
    }
}

function sendNotification(options){
    switch(options.title){
        case 'Like it?':
            chrome.notifications.create('Like it?', options);
            break;
        case 'Report':
            chrome.notifications.create('Report', options);
            break;
        default:break;
    }
}

function handleReportButtons(buttonIndex){
    switch(buttonIndex){
        case 0:
            sendEmailReport();
            break;
        case 1: break;
        default: break;
    }
}

function sendEmailReport(){
    let body="";
    window.open('mailto:EranCohenSW@gmail.com?subject=Report&body='+body);
}

function handleLikeItButtons(buttonIndex){
    switch(buttonIndex){
        case 0:
            chrome.tabs.create({ url: "https://github.com/EranCohenSW" });
            break;
        case 1: break;
        default: break;
    }
}