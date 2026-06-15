let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let old_x = 0;
let old_y = 0;

/* ==========================================================================
   HTML5標準の「<input type="color">」を使い、簡単なコードで色変更。
   (参考: MDN Web Docs - <input type="color">)
   ========================================================================== */

const penColorInput = document.getElementById("penColor");
const penSizeInput = document.getElementById("penSize");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");

function init() {
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchmove", touchMove, false);
    
    // 消しゴムボタンを押したら、白にする
    eraserBtn.addEventListener("click", function() {
        penColorInput.value = "#ffffff"; 
    });
    
    clearBtn.addEventListener("click", function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}

function getTouchPos(e) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
    };
}

function touchStart(event) {
    let pos = getTouchPos(event);
    old_x = pos.x;
    old_y = pos.y;
}

function touchMove(event) {
    event.preventDefault(); 
    let pos = getTouchPos(event);
    
    ctx.beginPath();           
    ctx.lineWidth = penSizeInput.value;     
    ctx.strokeStyle = penColorInput.value;  
    ctx.lineCap = "round";   
    
    ctx.moveTo(old_x, old_y);         
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();             
    
    old_x = pos.x;
    old_y = pos.y;
}