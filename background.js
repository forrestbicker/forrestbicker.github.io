let RESOLUTION = 17000;
function f(theta, n) {
    return Math.cos(Math.asin(1) * 3 / n) / Math.cos(Math.asin(Math.sin(n * theta / 4)) * 3 / n)
}

function buildLogo(n, ctx) {

    let data = [];
    var gradient = ctx.createRadialGradient(WIDTH / 2, WIDTH / 2, 10, WIDTH / 2, WIDTH / 2, WIDTH / 2);
    gradient.addColorStop(0.5, '#4C4799');
    gradient.addColorStop(1, '#DD7BA2');
    // gradient.addColorStop(1, 'white');
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.strokeStyle =
        ctx.beginPath()
    ctx.arc(WIDTH / 2, WIDTH / 2, WIDTH / 2, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.stroke();
    // 
    // ctx.fillRect(0, 0, WIDTH * 1.3, WIDTH * 1.3);


    // create RESOLUTIONxRESOLUTION grid
    for (var i = 0; i < WIDTH; i++) {
        let row = [];
        for (var j = 0; j < WIDTH; j++) {
            row.push(0);
        }
        data.push(row);
    }

    ctx.strokeStyle = `rgba(0, 0, 0, 1)`;
    ctx.fillStyle = `rgba(0, 0, 0, 0.2)`;

    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, WIDTH / 2);

    for (let i = 0; i <= RESOLUTION; i++) {
        let theta = (i / RESOLUTION) * 16 * Math.PI - 8 * Math.PI;

        let r = f(theta, n);

        let [x, y] = polarToPara(r, theta);

        ctx.lineTo(x, y);
        if (i % 1700 == 0) {
            ctx.closePath()
            ctx.fill()
            ctx.beginPath();
            ctx.moveTo(WIDTH / 2, WIDTH / 2);
            ctx.lineTo(x, y);
        }

        // data[y][x] += 1;
        // if (data[y][x] > max) {
        //     max = data[y][x];
        // }
    }


    // ctx.beginPath()
    // let a = Math.trunc(255 * (1 - data[0][0] / max));
    // ctx.fillStyle = `rgba(${a}, ${a}, ${a})`;
    // ctx.moveTo(0, 0);

    // for (var i = 0; i < WIDTH; i++) {
    //     for (var j = 0; j < WIDTH; j++) {
    //         let a = Math.trunc(255 * (1 - data[i][j] / max));
    //         ctx.fillStyle = `rgba(${a}, ${a}, ${a})`;
    //         ctx.lineTo(j, i);
    //     }
    // }
    // ctx.closePath()
    // ctx.stroke();

}

function polarToPara(r, theta) {
    let x = (r * Math.cos(theta) * RESOLUTION / 2 + RESOLUTION / 2);
    x = (x / (RESOLUTION / WIDTH));
    let y = (r * Math.sin(theta) * RESOLUTION / 2 + RESOLUTION / 2);
    y = (y / (RESOLUTION / WIDTH));

    return [x, y];
}

staticCanvas = document.getElementById('static-logo');
if (staticCanvas.getContext) {
    var staticCtx = staticCanvas.getContext('2d');
}
dynamicCanvas = document.getElementById('dynamic-logo');
if (dynamicCanvas.getContext) {
    var dynamicCtx = dynamicCanvas.getContext('2d');
}
i = 0
nMax = 6;
nMin = 4.25;
let WIDTH = 64;
buildLogo(nMin, staticCtx);
WIDTH = 128;

setInterval(function () {
    dynamicCtx.clearRect(0, 0, WIDTH, WIDTH);
    if (nMin + i <= nMax) {
        buildLogo(nMin + i, dynamicCtx);
    } else {
        buildLogo(2 * nMax - nMin - i, dynamicCtx);
    }
    i += 0.125 / 32;
    if (2 * nMax - nMin - i <= nMin) {
        i = 0;
    }
}, 60);
// buildLogo();



function buildButton(url, icon, section) {
    document.getElementById(section).innerHTML =
        `<div class="column" style="background-color: #FFF; height: 60px; width: 60px; border-radius: 50px">
            <ul class="icons no-print">
                <li>
                    <a target="_blank" href="${url}" class="button button--sacnite" style="border-radius: 50px">
                        <i class="${icon}" title="${section}"></i>
                    </a>
                </li>
            </ul>
        </div>`
}

function buildSorter(n) {
    canvas = document.getElementById("sort");

    let values = []
    min = Math.trunc(0.1 * n)
    for (var i = 0; i < n; i++) {
        values.push(min + i);
    }

    let cutoff = 0;
    while (cutoff < values.length) {
        let randIx = cutoff + Math.trunc(Math.random() * (values.length - cutoff));
        let temp = values[cutoff];
        values[cutoff] = values[randIx];
        values[randIx] = temp;
        cutoff++
    }

    maxHeight = canvas.clientHeight * 0.8 / 3 // only display on botom 1/3 of pannel
    maxWidth = Math.trunc(canvas.clientWidth * 1.1) // make sure extends off of screen

    widthUnit = Math.floor(1.0 * maxWidth / n); // here n = number of values
    heightUnit = Math.floor(1.0 * maxHeight / (min + (n - 1))); // here n = max value

    let newInnerHTML = ""
    for (var i = 0; i < values.length; i++) {
        let height = values[i] * heightUnit;
        newInnerHTML += `
                <rect
                width="${widthUnit}"
                height="${height}"
                x="${i * widthUnit}"
                y="${canvas.clientHeight * 0.8 - height + 10}"
                style="fill: #E2E8F0">
                </rect>`;
    }

    canvas.innerHTML = newInnerHTML;
}

function buildEpidemic(n) {
    canvas = document.getElementById("epidemic");

    widthUnit = Math.floor(1.0 * maxWidth / n); // here n = number of values
    heightUnit = Math.floor(1.0 * maxHeight / (min + (n - 1))); // here n = max value

    let newInnerHTML = ""
    // for (var i = 0; i < values.length; i++) {
    //     newInnerHTML += `<circle cx="${x}" cy="${y}" r="16" fill="red" />`
    // }
    canvas.innerHTML = newInnerHTML;
}

buildButton("https://github.com/forrestbicker", "fa fa-github", "github-button"); buildButton("https://www.linkedin.com/in/forrestbicker/", "fa fa-linkedin-square", "linkedin-button")

buildSorter(80)
buildEpidemic(20)