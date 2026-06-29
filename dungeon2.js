"use strict";

const W = 31;
const H = 31;
const CELL_SIZE = 32;

const maze = [];
let ctx;

function random(v) {
    return Math.floor(Math.random() * v);
}

const player = new Player(1, 1); // 主人公
let keyCode = 0; // 押下されたキー
let timer = NaN; // タイマー

// 主人公オブジェクトコンストラクタ
function Player(x, y) {
    this.x = x; // x座標
    this.y = y; // y座標
    this.dir = 1; // 向き

    this.update = function () {
        let nx = 0; // 仮のx方向移動量
        let ny = 0; // 仮のy方向移動量
        switch (keyCode) {
            case 37:
                nx = -1;
                this.dir = 2;
                break;
            case 38:
                ny = -1;
                this.dir = 0;
                break;
            case 39:
                nx = +1;
                this.dir = 3;
                break;
            case 40:
                ny = +1;
                this.dir = 1;
                break;
        }
        if (maze[this.y + ny][this.x + nx] == 0 && (nx != 0 || ny != 0)) {
            // 移動先の座標が通路(0)のとき
            this.x = this.x + nx; // x座標更新
            this.y = this.y + ny; // y座標更新
        }
    };

    this.paint = function (gc, x, y, w, h) {
        let img = document.getElementById("hero" + this.dir);
        gc.drawImage(img, this.x * 32, this.y * 32, w, h); // 主人公描画
    };
}

function init() {
    let mazeCanvas = document.getElementById("maze");
    ctx = mazeCanvas.getContext("2d");

    mazeCanvas.width = W * CELL_SIZE;
    mazeCanvas.height = H * CELL_SIZE;

    createMaze(W, H);
    repaint();

    go();
}

function go() {
    window.onkeydown = mykeydown;
    window.onkeyup = mykeyup;

    let maze = document.getElementById("maze");
    maze.oncontextmenu = function (e) {
        e.preventDefault();
    };

    timer = setInterval(tick, 200);
}

// メインルーチン
function tick() {
    player.update();
    repaint();
}

function createMaze(w, h) {
    for (let y = 0; y < h; y++) {
        maze[y] = [];
        for (let x = 0; x < w; x++) {
            maze[y][x] = x == 0 || x == w - 1 || y == 0 || y == h - 1 ? 1 : 0;
        }
    }
    for (let y = 2; y < h - 2; y += 2) {
        for (let x = 2; x < w - 2; x += 2) {
            maze[y][x] = 1;
            let dir = random(y == 2 ? 4 : 3);
            let px = x;
            let py = y;
            switch (dir) {
                case 0: py++; break;
                case 1: px--; break;
                case 2: px++; break;
                case 3: py--; break;
            }
            maze[py][px] = 1;
        }
    }
}

function drawWall(ctx, x, y, size) {
    ctx.fillStyle = "#4a4c50";
    ctx.fillRect(x, y, size, size);

    ctx.fillStyle = "#28292b";
    ctx.fillRect(x, y + size - 2, size, 2);
    ctx.fillRect(x + size - 2, y, 2, size);
    ctx.fillRect(x, y + Math.floor(size / 2) - 2, size, 2);
    ctx.fillRect(x + Math.floor(size / 2) - 2, y, 2, Math.floor(size / 2));
    ctx.fillRect(x + Math.floor(size / 4) - 2, y + Math.floor(size / 2), 2, Math.floor(size / 2));

    ctx.fillStyle = "#787b80";
    ctx.fillRect(x, y, size - 2, 2);
    ctx.fillRect(x, y, 2, size - 2);
}

function drawPath(ctx, x, y, size) {
    ctx.fillStyle = "#7c6249";
    ctx.fillRect(x, y, size, size);

    ctx.fillStyle = "#544130";
    ctx.strokeRect(x + 1, y + 1, size - 2, size - 2);

    ctx.fillStyle = "#94775c";
    ctx.fillRect(x + 4, y + 4, 4, 4);
    ctx.fillRect(x + size - 8, y + size - 8, 4, 4);
}

// 描画
function repaint() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let x = 0; x < W; x++) {
        for (let y = 0; y < H; y++) {
            if (maze[y][x] == 1) {
                drawWall(ctx, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
            } else {
                drawPath(ctx, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
            }
        }
    }

    ctx.save();
    player.paint(ctx, 32, 32, 32, 32);
    ctx.restore();
}

// キー＆マウス押下のイベントハンドラ
function mykeydown(e) {
    keyCode = e.keyCode;
}

function mykeyup(e) {
    keyCode = 0;
}