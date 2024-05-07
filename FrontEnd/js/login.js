if (window.location.pathname === "/login.html") {
    document.getElementById("login").addEventListener("submit", async function (form) {

        form.preventDefault()
        const $formData = new FormData(this)
        const $formDataJson = Object.fromEntries($formData.entries())

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify($formDataJson)
            });

            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('token', data.token)
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
        const $editWorks = document.createElement("aside")
        $editWorks.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> Modifier"
        $editWorks.classList.add("edit-button")
        $h2.insertAdjacentElement('afterend', $editWorks)

        $portfolio.style.textAlign = 'center'
        $h2.style.display = 'inline-block'
        $h2.style.paddingRight = '30px'
        $editWorks.style.display = 'inline-block'
        $editWorks.style.cursor = 'pointer'

        $editWorks.addEventListener('click', function () {
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
};

