let sendMessage = () => {
    var result = document.getElementsByClassName("col-12-xsmall");
    var name = result[6].firstElementChild.value;
    var email = result[7].firstElementChild.value;
    var textMessage = document.getElementsByClassName("col-12")[0].firstElementChild.value;
    if(name != "" && email != "" && textMessage != ""){
        const url = 'https://hooks.slack.com/services/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';
        var message = name + "さん\n" + "email:" + email + "\nMessage:" + textMessage;
        const data = {
            text: message
        };
        $.ajax({
            type: 'POST',
            url:  url,
            data: `payload=${JSON.stringify(data)}`
        });
    }
    else{
        alert("入力されていない項目があります");
    }
}
