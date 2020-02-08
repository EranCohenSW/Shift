$(function () {
    chrome.storage.sync.get('text', function (data) {
        debugger;
        if (!data.text) {
            chrome.storage.sync.set({ 'text': "" }, function () {
            });
        }
    });
    chrome.storage.sync.get('text', function (data) {
        $('#greet').text('Hack Password: ' + data.text);
    });

    $('#name').keyup(function () {
        $('#greet').text('Hack Password: ' + $('#name').val());
        debugger;
        if ($('#name').val() == '1234') {
            var notifOptions = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title: 'Hi',
                message: "passowrd hacked!"
            };
            chrome.notifications.create('not', notifOptions);
        }
    })


})