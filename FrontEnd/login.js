document.getElementById("login").addEventListener("submit", function(form) {
    form.preventDefault();

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
            window.location.href = "index.html";
        } else {
            throw new Error("Échec de la connexion : " + response.statusText);
        }
    })
    .catch(error => {
        console.error("Erreur lors de la connexion :", error);
    });
});
