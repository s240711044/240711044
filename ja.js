let r = Math.floor(Math.random() * 100) + 1;

let life = 7;  //回数設定

function judge(){
  let a = document.getElementById("num").value;

  let msgArea = document.getElementById("message");
  let lifeArea = document.getElementById("life-display");
  
  if (a === "") {
        msgArea.innerHTML = "CP：数値を入力してください。";
        return;
    }

    if (a == r) {                            //正解
        msgArea.innerHTML = "正解を確認。CPの負けです。";
        window.alert("正解です！おめでとうございます。"); 
    } else {                             // 不正解
        life = life - 1; 
        lifeArea.innerHTML = "残り試行回数：" + life;

        if (life <= 0) { // ゲームオーバー
            msgArea.innerHTML = "試行回数上限。こちらの勝ちです。正解は " + r + " でした。";
            window.alert("ゲームオーバー。");
            location.reload(); 
        } else {
            let hint = (a > r) ? "より小さい数値です。" : "より大きい数値です。";
            msgArea.innerHTML = "不正解。対象の数値は " + a + hint;
        }
    }
}
//https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/div