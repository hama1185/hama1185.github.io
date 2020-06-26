let sendEmail = () => {
    var result = document.getElementsByClassName("col-12-xsmall");
    var email = result[6].firstElementChild.value;
    var pass = result[7].firstElementChild.value;
    var textMessage = document.getElementsByClassName("col-12")[0].firstElementChild.value;
    if(pass != "" && email != "" && textMessage != ""){
        Email.send({
            Host : "smtp.yourisp.com",
            Username : email,
            Password : pass,
            To : "h1810752@edu.cc.uec.ac.jp",
            From : email,
            Subject : "ポートフォリオテスト",
            Body : textMessage
        }).then(
          message => alert(message)
        );
    }
    else{
        alert("入力されていない項目があります");
    }
}
