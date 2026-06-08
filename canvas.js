let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let img = new Image();
img.src = "button_r.png";

let tunnelScale = 0.1; 
let angle = 0;         
let colorHue = 0;

function init() {
    setInterval(drawFrame, 20);
}

function drawFrame() {
    ctx.fillStyle = "rgba(5, 5, 15, 0.15)"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    tunnelScale += 0.02;             // 拡大
    angle += 0.5;                    // 時計回りに回転
    colorHue = (colorHue + 1) % 360; 

    // 戻す
    if (tunnelScale > 3.0) {
        tunnelScale = 0.1;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);

    for (let i = 0; i < 3; i++) {
        ctx.save(); 
        
        let currentScale = tunnelScale + (i * 0.8);
        if (currentScale > 3.0) currentScale -= 2.9; // 奥に戻す
        
        ctx.scale(currentScale, currentScale);
        ctx.rotate((angle + i * 30) * Math.PI / 180);
// 時間経過 ＋ レイヤーの番号(i) に応じて鮮やかな色を生成 これいい感じ
        let myColor1 = `hsl(${(colorHue + i * 40) % 360}, 100%, 60%)`;
        let myColor2 = `hsl(${(colorHue + i * 40 + 180) % 360}, 100%, 60%)`;

        drawRct(-40, -40, 20, 20, myColor1); 
        drawCcl(20, -40, 10, "white");      // 円
        drawTri(20, 20, 20, 20, myColor2);   // 三角形
        drawImg(-40, 20, 20, 20);            // 画像

        ctx.restore(); 
    }

    ctx.translate(-canvas.width / 2, -canvas.height / 2);
}

function drawRct(x, y, w, h, color) { 
    ctx.fillStyle = color; 
    ctx.fillRect(x, y, w, h); 
}

function drawCcl(x, y, r, color) { 
    ctx.fillStyle = color; 
    ctx.beginPath(); 
    ctx.arc(x + r, y + r, r, 0, Math.PI * 2, true); 
    ctx.closePath(); 
    ctx.fill(); 
}

function drawTri(x, y, w, h, color) { 
    ctx.fillStyle = color; 
    ctx.beginPath(); 
    ctx.moveTo(x + w / 2, y); 
    ctx.lineTo(x, y + h); 
    ctx.lineTo(x + w, y + h); 
    ctx.closePath(); 
    ctx.fill(); 
}

function drawImg(x, y, w, h) { 
    ctx.drawImage(img, x, y, w, h); 
}