const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this); 
    const formDataJson = Object.fromEntries(formData.entries()); 

    fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataJson)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Échec de la connexion : " + response.statusText);
        }
    })
    .then(data => {
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error("Erreur lors de la connexion :", error);
    });
});
