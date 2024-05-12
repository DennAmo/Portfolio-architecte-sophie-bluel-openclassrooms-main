
if (isTokenPresent()) {
    const $editedworksLayout = document.querySelector(".editworks-layout")
    const $addworkBtn = document.querySelector(".addwork-button")
    const $modalContent = document.querySelector(".modal-content")
    const $modalAddwork = document.querySelector(".modal-addwork")
    const $modalPrevious = document.querySelector(".modal-previous")
    const $categoryContainer = document.getElementById("photo-category");
    const $submitPhotoForm = document.querySelector(".submit-photo");

    /**************************************************************/
    /********** fonction pour cacher la modal **********/
    /************************************************************/
    function hideModal() {
        $modall.style.display = 'none';
        $modalContent.style.display = "initial"
        $modalAddwork.style.display = "none"
        $categoryContainer.selectedIndex = 0;
        $categoryContainer.firstChild.textContent = "Sélectionnez une catégorie";
    }

    /******************************************************************************/
    /********** fonction pour fermer la modal quand on clique en dehors **********/
    /****************************************************************************/
    window.addEventListener('click', function (event) {
        if (event.target === $modall) {
            hideModal()
        }
    });

    /******************************************************************************/
    /********** fonction pour fermer la modal quand on appuie sur échap **********/
    /****************************************************************************/
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideModal()
        }
    });

    /******************************************************************************/
    /*************** fermer la modal quand on clique sur la croix ****************/
    /****************************************************************************/
    document.getElementsByClassName('close')[0].addEventListener('click', () => {
        hideModal()
    });


    /******************************************************************************/
    /*********** fonction pour crée les oeuvres dans la modal d'édition **********/
    /****************************************************************************/
    function createEditedWorks() {
        $editedworksLayout.innerHTML = "";
        for (let i = 0; i < $works.length; i++) {

            const $editedworksContainer = document.createElement("div");
            const $editedworksImg = document.createElement("img");
            const $trashIcon = document.createElement("i")
            const $trashContainer = document.createElement("span")

            $trashIcon.classList.add("fa-trash-o")
            $trashIcon.classList.add("fa")
            $trashContainer.classList.add("trashicon-container")
            $editedworksContainer.classList.add("editworks-container")

            $editedworksImg.src = $works[i].imageUrl;

            /** l'id de l'icone = à l'id de l'oeuvre **/
            $trashIcon.id = $works[i].id;

            $editedworksLayout.appendChild($editedworksContainer);
            $editedworksContainer.appendChild($trashIcon)
            $editedworksContainer.appendChild($editedworksImg);
            $editedworksContainer.appendChild($trashContainer)

            /*** listener sur l'icone trashbin **/
            $trashIcon.addEventListener("click", (e) => {
                if (e.target.matches(".fa-trash-o")) {
                    e.preventDefault();
                    deleteWork(e.target.id);
                }
            });

        }
    }

    /************************************************************************************/
    /********** listener sur le bouton pour ajouter photo et l'icone previous **********/
    /**********************************************************************************/
    $addworkBtn.addEventListener("click", () => {
        $modalContent.style.display = "none"
        $modalAddwork.style.display = "initial"
    })

    $modalPrevious.addEventListener("click", () => {
        $modalContent.style.display = "initial"
        $modalAddwork.style.display = "none"
    })

    /********************************************************************************************************************/
    /********** fonction pour crée les catégories en tant qu'option dans le menu déroulant pour ajouter photo **********/
    /******************************************************************************************************************/
    function createCategories(categories) {
        categories.forEach(function (category, index) {
            const option = document.createElement("option");
            option.value = index + 1;
            option.text = category.name;
            $categoryContainer.appendChild(option);
        });
    }

    /*********************************************************************/
    /********** fonction pour supprimer une oeuvre + appel api **********/
    /*******************************************************************/

    function deleteWork(workId) {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette œuvre ?");

        if (!confirmed) {
            return;
        }

        let token = sessionStorage.getItem("token");
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.ok) {
                    $works = $works.filter(work => parseInt(work.id) !== parseInt(workId));
                    createEditedWorks();
                    createWorks($works);
                    alert("Oeuvre supprimée avec succès");
                } else if (response.status === 401) {
                    console.error(`Unauthorized: ${response.statusText}`);
                    alert("Vous n'êtes pas autorisé à supprimer cette œuvre.");
                } else if (response.status === 500) {
                    console.error("Erreur non prévue:", response.statusText);
                    alert("Une erreur inattendue s'est produite lors de la suppression de l'œuvre.");
                } else {
                    console.error(`Erreur lors de la suppression de l'œuvre: ${response.statusText}`);
                    alert(`Erreur inconnu lors de la suppression de l'œuvre: ${response.statusText}`);
                }
            })
            .catch(error => {
                console.error("Error deleting work:", error);
                alert("Une erreur s'est produite lors de la suppression de l'œuvre.");
            });
    }



}
