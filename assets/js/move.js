let sendMessage = () => {
    var result = document.getElementsByClassName("col-12-xsmall");
    var name = result[6].firstElementChild.value;
    var email = result[7].firstElementChild.value;
    var textMessage = document.getElementsByClassName("col-12")[0].firstElementChild.value;
    if(name != "" && email != "" && textMessage != ""){
        const url = 'https://hooks.slack.com/services/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';
        var message = name + "さん\n" + "email:" + email + "\nMessage:" + textMessage;
        alert(message);
        const data = {
            text: message
        };
        const xml = new XMLHttpRequest();
        xml.open("POST", url, false);
        xml.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        xml.send(`payload=${JSON.stringify(data)}`)
    }
    else{
        alert("入力されていない項目があります");
    }
}
