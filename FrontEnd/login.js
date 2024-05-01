if (window.location.pathname === "/login.html") {
    document.getElementById("login").addEventListener("submit", function(form) {
        form.preventDefault();

        const $formData = new FormData(this); 
        const $formDataJson = Object.fromEntries($formData.entries()); 

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify($formDataJson)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('connexion error');
            }
        })
        .then(data => {
            localStorage.setItem('token', data.token);
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });
}

if (window.location.pathname === "/index.html") {
    const token = localStorage.getItem('token');
    if (token) {
        const logBtn = document.querySelector('.logBtn');
        if (logBtn) {
            logBtn.innerText = "logout";
        } else {
            console.error("error create btn")
        }
        logBtn.addEventListener('click', function() {
            localStorage.removeItem('token');
            window.location.href = "index.html";
        });
    }
}
