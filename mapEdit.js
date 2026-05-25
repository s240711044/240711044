function init() {
    let b = document.getElementById("board");
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 8; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);
            let img = document.createElement("img");

            img.className ="tile"
            img.id = "img_" + (i * 8 + j);
            img.src = "通路/chipA.png";
            img.onclick = clicked;

            td.appendChild(img);
        }
        b.appendChild(tr);
    }
}

function clicked(e) {
    let targetId = e.target.id;
    let img = document.getElementById(targetId);
    

    if (img.src.includes("chipA.png")) {
        img.src = "壁/chipB.png";
    } else {
        img.src = "通路/chipA.png";
    }
}
