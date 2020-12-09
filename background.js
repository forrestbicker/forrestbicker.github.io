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

buildButton("https://github.com/forrestbicker", "fa fa-github", "github-button");buildButton("https://www.linkedin.com/in/forrestbicker/", "fa fa-linkedin-square", "linkedin-button")
function buildRandom(n) {
    canvas = document.getElementById("sort");

function buildRandom(width, height, n) {
    let values = []
    min = Math.trunc(0.1 * n)
    for (var i = 0; i < n; i++) {
        values.push(min + i);
    }
}    maxHeight = canvas.clientHeight / 3 // only display on botom 1/3 of pannel
    maxWidth = Math.trunc(canvas.clientWidth * 1.1) // make sure extends off of screen
