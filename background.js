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

// buildRandom

function buildRandom(width, height, n) {
    let values = []
    for (var i = 0; i < n; i++) {
        values.push(i);
    }
}