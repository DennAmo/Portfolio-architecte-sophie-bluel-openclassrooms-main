
if (isTokenPresent()) {
    const $editedworksLayout = document.querySelector(".editworks-layout")
    const $addworkBtn = document.querySelector(".addwork-button")
    const $modalContent = document.querySelector(".modal-content")
    const $modalAddwork = document.querySelector(".modal-addwork")
    const $modalPrevious = document.querySelector(".modal-previous")
    const $submitPhoto = document.querySelector(".submit-photo");
    const $title = document.getElementById("photo-title");
    const $categories = document.getElementById("photo-category");
    const $image = document.getElementById("photo-upload");
    const previewImage = document.getElementById('preview-image');


    /**************************************************************/
    /********** fonction pour cacher la modal **********/
    /************************************************************/
    function hideModal() {
        $modall.style.display = 'none';
        $modalContent.style.display = "initial"
        $modalAddwork.style.display = "none"
        resetFormFields()
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
    document.getElementsByClassName('close')[1].addEventListener('click', () => {
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
            $trashIcon.id = $works[i].id;

            $editedworksLayout.appendChild($editedworksContainer);
            $editedworksContainer.appendChild($trashIcon)
            $editedworksContainer.appendChild($editedworksImg);
            $editedworksContainer.appendChild($trashContainer)

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

    function getBackInModal() {
        $modalContent.style.display = "initial"
        $modalAddwork.style.display = "none"
        resetFormFields()
    }

    $modalPrevious.addEventListener("click", getBackInModal)

    /******************************************************************************************************************/
    /********** fonction pour crée les catégories en tant qu'option dans le menu déroulant pour ajouter photo *********/
    /******************************************************************************************************************/
    function createCategories(categories) {
        categories.forEach(function (category, index) {
            const option = document.createElement("option");
            option.value = index + 1;
            option.text = category.name;
            $categoryContainer.appendChild(option);
            $categoryContainer.selectedIndex = 0;
            $categoryContainer.firstChild.textContent = "Sélectionnez une catégorie";
        });
    }



    /*********************************************************************/
    /********** fonction pour supprimer une oeuvre + appel api **********/
    /*******************************************************************/
    function deleteWork(workId,) {
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
                    alert(`Oeuvre supprimée avec succès`);
                } else if (response.status === 401) {
                    alert(`Vous n'êtes pas autorisé à supprimer cette œuvre.`);
                } else if (response.status === 500) {
                    alert(`Une erreur inattendue s'est produite lors de la suppression de l'œuvre.`);
                } else {
                    alert(`Erreur inconnu lors de la suppression de l'œuvre`);
                }
            })
            .catch(error => {
                console.error("Error deleting work:", error);
                alert("Une erreur s'est produite lors de la suppression de l'œuvre.");
            });
    }

    /**************************************************************/
    /******** listener sur le formulaire d'ajout d'oeuvre ********/
    /************************************************************/
    $submitPhoto.addEventListener("click", (e) => {
        if (e.target.matches(".submit-photo")) {
            e.preventDefault();
            postNewWork();
        }
    });

    
    $image.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {

                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    /***********************************************************************************/
    /************ fonction pour récuperer les données reçu du formulaire **************/
    /*********************************************************************************/
    function postNewWork() {
        let token = sessionStorage.getItem("token");
        const $image = document.getElementById("photo-upload").files[0];
        const $title = document.getElementById("photo-title").value;
        const $categoryName = $categories.options[$categories.selectedIndex].innerText;
        const $categoryId = $categories.options[$categories.selectedIndex].value;

        let $validity = formValidation($image, $title, $categoryId);
        if ($validity === true) {
            const $formData = new FormData();
            $formData.append("image", $image);
            $formData.append("title", $title);
            $formData.append("category", $categoryId);

            sendNewData(token, $formData, $title, $categoryName);
        }

    };

    /***********************************************************************************/
    /************ fonction pour vérifier si le formulaire est bien rempli *************/
    /*********************************************************************************/
    function formValidation() {
   
        const image = document.getElementById("photo-upload").files[0];
        const title = document.getElementById("photo-title").value;
        const categoryId = document.getElementById("photo-category").value;


        if (!image || title.trim().length === 0 || categoryId === "") {
            return false;
        } else {
            return true;
        }

    }

    const testForm = () => {

            formValidation() ? $submitPhoto.removeAttribute("disabled") : $submitPhoto.setAttribute("disabled", "");
            if (formValidation()) {
                $submitPhoto.classList.add("submit-photo-active")
            } else {
                $submitPhoto.classList.remove("submit-photo-active")
            }
        
        $title.addEventListener('input', testForm);
        $categories.addEventListener('change', testForm);
        $image.addEventListener('change', testForm);

    }
    testForm()

    /****************************************************************************************************/
    /************ fonction pour ajouté une oeuvre dans le même modèle que celles présentes *************/
    /**************************************************************************************************/
    function addToWorksArray(data, categoryName) {
        newWork = {};
        newWork.title = data.title;
        newWork.id = data.id;
        newWork.category = { "id": data.$categoryId, "name": categoryName };
        newWork.imageUrl = data.imageUrl;
        $works.push(newWork);
    }


    function resetFormFields() {
        previewImage.src = './assets/icons/picture.png'
        $categories.selectedIndex = 0; 
        $title.value = '';
    }

    /***************************************************/
    /************ fonction pour appel api *************/
    /*************************************************/
    function sendNewData(token, formData, categoryName) {
        fetch(`http://localhost:5678/api/works/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => {
                if (response.status === 201) {
                    alert("Oeuvre envoyé avec succés");
                    return response.json();
                } else if (response.status === 401) {
                    alert(`Vous n'êtes pas autorisé à ajouter cette œuvre.`);
                } else if (response.status === 500) {
                    alert(`Une erreur inattendue s'est produite lors de l'ajout de l'œuvre.`);
                } else {
                    alert(`Erreur inconnu lors de l'ajout de l'œuvre`);
                }

            })
            .then((data) => {
                if (data) {
                    addToWorksArray(data, categoryName);
                } else {
                    alert(`Erreur: Les données reçues sont indéfinies ou corrompus.`);
                }
                createWorks($works)
                createEditedWorks()
                getBackInModal()
            })
            .catch((error) => console.error("Erreur:", error));
    }

}
