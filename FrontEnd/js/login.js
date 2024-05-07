

if (window.location.pathname === "/login.html") {
    document.getElementById("login").addEventListener("submit", async function (form) {

        form.preventDefault()
        const $formData = new FormData(this)
        const $formDataJson = Object.fromEntries($formData.entries())

        try {
            const $response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify($formDataJson)
            });

            if ($response.ok) {
                localStorage.setItem('token', $response.token)
                window.location.href = "index.html"
            } else {
                console.error('connexion error')
            }
        } catch (error) {
            console.error('Erreur:', error)
        }
    });
};


if (window.location.pathname === "/index.html") {

    const $token = localStorage.getItem('token')

    if ($token) {
        const $logBtn = document.querySelector('.logBtn')
        const $portfolio = document.querySelector("#portfolio")
        const $h2 = document.querySelector("#portfolio h2")
        const $editedworksBtn = document.createElement("aside")

        $editedworksBtn.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> Modifier"
        $editedworksBtn.classList.add("edit-button")
        $h2.insertAdjacentElement('afterend', $editedworksBtn)
        $portfolio.style.textAlign = 'center'
        $h2.style.display = 'inline-block'
        $h2.style.paddingRight = '30px'
        $editedworksBtn.style.display = 'inline-block'
        $editedworksBtn.style.cursor = 'pointer'


        $editedworksBtn.addEventListener('click', function () {
            document.getElementById('modal').style.display = 'flex'
        });
        document.getElementsByClassName('close')[0].addEventListener('click', function () {
            document.getElementById('modal').style.display = 'none'
        });

        $logBtn.innerHTML = "logout"
        $logBtn.style.cursor = "pointer"

        $logBtn.addEventListener('click', function () {
            localStorage.removeItem('token')
            window.location.href = "login.html"
        });

    }

    const $modallContent = document.querySelector(".modal-content")
    function createEditedWorks() {
        for (let i = 0; i < $works.length; i++) {

            const $editedworksFigure = document.createElement("div");
            const $editedworksImg = document.createElement("img");

            $editedworksImg.src = $works[i].imageUrl;
            $editedworksFigure.appendChild($editedworksImg);
            $modallContent.appendChild($editedworksFigure);
            $editedworksFigure.style.margin = "5px"
            $editedworksImg.style.width = "76px"

        }
    }
    createEditedWorks()
};


