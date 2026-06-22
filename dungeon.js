"use strict";

const W = 31;
const H = 31;
const CELL_SIZE = 32;

const maze = [];
let ctx;

function random(v) {
    return Math.floor(Math.random() * v);
}

function init() {
    let mazeCanvas = document.getElementById("maze");
    ctx = mazeCanvas.getContext("2d");

    mazeCanvas.width = W * CELL_SIZE;
    mazeCanvas.height = H * CELL_SIZE;

    createMaze(W, H);
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
}