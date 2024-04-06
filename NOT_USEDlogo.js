// <script>
let RESOLUTION = 17000;
function f(theta, n) {
    return Math.cos(Math.asin(1) * 3 / n) / Math.cos(Math.asin(Math.sin(n * theta / 4)) * 3 / n)
}

function buildLogo(n, ctx, WIDTH) {
    let data = [];
    var gradient = ctx.createRadialGradient(WIDTH / 2, WIDTH / 2, 10, WIDTH / 2, WIDTH / 2, WIDTH / 2);
    gradient.addColorStop(0.5, '#542f27');
    gradient.addColorStop(1, '#95A671');
    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.strokeStyle = ctx.beginPath();
    ctx.arc(WIDTH / 2, WIDTH / 2, WIDTH / 2, 0, 2 * Math.PI);
    ctx.fill();

    // create RESOLUTIONxRESOLUTION grid
    for (var i = 0; i < WIDTH; i++) {
        let row = [];
        for (var j = 0; j < WIDTH; j++) {
            row.push(0);
        }
        data.push(row);
    }

    ctx.strokeStyle = `rgba(0, 0, 0, 1)`;
    ctx.fillStyle = `rgba(0, 0, 0, 0.15)`;

    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, WIDTH / 2);

    for (let i = 0; i <= RESOLUTION; i++) {
        let theta = (i / RESOLUTION) * 16 * Math.PI - 8 * Math.PI;

        let r = f(theta, n);

        let [x, y] = polarToPara(r, theta, WIDTH);

        ctx.lineTo(x, y);
        if (i % 1700 == 0) {
            ctx.closePath()
            ctx.fill()
            ctx.beginPath();
            ctx.moveTo(WIDTH / 2, WIDTH / 2);
            ctx.lineTo(x, y);
        }
    }
}

function polarToPara(r, theta, WIDTH) {
    let x = (r * Math.cos(theta) * RESOLUTION / 2 + RESOLUTION / 2);
    x = (x / (RESOLUTION / WIDTH));
    let y = (r * Math.sin(theta) * RESOLUTION / 2 + RESOLUTION / 2);
    y = (y / (RESOLUTION / WIDTH));

    return [x, y];
}


function setupLogos() {
    i = 0
    nMax = 6;
    nMin = 4.25;
    let WIDTH = 128;
    iconElem = document.getElementsByClassName('u-icon-1')[0];
    iconParentElem = iconElem.parentElement;
    iconParentElem.insertBefore(document.createElement('canvas'), iconElem);
    iconParentElem.removeChild(iconElem);
    // set width="128px" height="128px"
    dynamicCanvas = iconParentElem.childNodes[0];
    dynamicCanvas.setAttribute('width', '128px');
    dynamicCanvas.setAttribute('height', '128px');

    if (dynamicCanvas.getContext) {
        var dynamicCtx = dynamicCanvas.getContext('2d');
    }
    setInterval(function () {
        dynamicCtx.clearRect(0, 0, WIDTH, WIDTH);
        if (nMin + i <= nMax) {
            buildLogo(nMin + i, dynamicCtx, WIDTH);
        } else {
            buildLogo(2 * nMax - nMin - i, dynamicCtx, WIDTH);
        }
        i += 0.125 / 32;
        if (2 * nMax - nMin - i <= nMin) {
            i = 0;
        }
    }, 60);
}

document.addEventListener("DOMContentLoaded", setupLogos);
//    </script>


// <script>
document.addEventListener("DOMContentLoaded", function () {
    document.getElementsByClassName('u-backlink')[0].innerHTML = '';
    document.getElementsByClassName('u-backlink')[0].style.display = 'none';
});
//    </script>