let janken = ["グー", "チョキ", "パー"];
let message;
let win = 0;

function init(){
    win = 0;
    message = "スコアをリセット";
    document.getElementById("result").innerHTML = message;
}

function judge(){
    let comp = Math.floor(Math.random() * 3);
    let elements = document.getElementsByName('jk')
    let user = -1

    for (let i = 0; i < elements.length; i++ )
        if (elements.item(i).checked) user = i;

    message = "あなたの手：" + janken[user] + "<br>";
    message += "コンピュータの手：" + janken[comp] + "<br>";
    
    if (user == comp) {
        message += "引き分け"
    } else if (user === (comp + 2) % 3){ // https://ameblo.jp/kusamaru08/entry-12658586312.html 
        message += "あなたの勝ち"
        win++;
    } else {
        message += "結果：あなたの負け…";
    }

    message += "<br>（通算勝利数: " + win + "）";


    document.getElementById("result").innerHTML = message;
}




 
