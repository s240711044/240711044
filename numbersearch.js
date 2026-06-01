Array.prototype.shuffle = function(){
    let i = this.length;
    while(i){
        let j = Math.floor(Math.random() * i);
        let t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

function shuffle(cards){
    cards.shuffle();
    document.getElementById("question1").innerText = `Q${qno}:  ` + cards.join(" ");
}

let qno = 1;
let x = 0;
let startTime = 0;     // タイマー開始時間を覚える変数
let isPlaying = false;  // ゲーム中か判定するフラグ

document.addEventListener('keydown', myhandler, false);

function myhandler(event) {
    if (!isPlaying) return; 

    for (let i = '1'; i <= '9'; i++) {
        if (event.key == i) {
            document.getElementById("ans1").innerText = '['+i+']';
            
            if (i == x + 1) {
                if (qno < 10) {
                    qno++;
                    q();
                } else {
                    // 10回正解したらタイマーを止めて結果表示
                    isPlaying = false;
                    let endTime = Date.now();
                    let totalTime = ((endTime - startTime) / 1000).toFixed(2); 
                    
                    document.getElementById("question1").innerText = "CLEAR!!";
                    document.getElementById("result").innerText = `Time: ${totalTime}s`;
                }
            }
        }
    }
}

function q (){
    let dgt =[1,2,3,4,5,6,7,8,9];
    let a = Array(8);
    
    x = Math.floor(Math.random() * 9);

    for (let i = 0, j = 0; i < 9; i++){
        if (i != x) {
            a[j] = dgt[i];
            j++;
        }
    }
    
    document.getElementById("ans1").innerText = ""; 

    shuffle(a); 

}

function start(){
    qno = 1;                    
    startTime = Date.now();      // 現在の時刻を記録
    isPlaying = true;
    document.getElementById("result").innerText = ""; 
    q();
}