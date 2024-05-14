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

            const $responseData = await $response.json()
            sessionStorage.setItem('token', $responseData.token)
            window.location.href = "index.html"

        } else {
            alert("Mauvais mot de passe ou nom d'utilisateur")
            console.error('connexion error')
        }
    } catch (error) {
        console.error('Erreur:', error)
    }
});


