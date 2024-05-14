document.getElementById("login").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = {
        email: username,
        password: password
    };

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const responseData = await response.json();
            sessionStorage.setItem('token', responseData.token);
            window.location.href = "index.html";
        } else {
            alert("Mauvais mot de passe ou nom d'utilisateur");
            console.error('Erreur de connexion');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
});
