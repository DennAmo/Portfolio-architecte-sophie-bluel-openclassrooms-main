
if (isTokenPresent()) {
    const $editedworksLayout = document.querySelector(".editworks-layout")
    const $addworkBtn = document.querySelector(".addwork-button")
    const $modalContent = document.querySelector(".modal-content")
    const $modalAddwork = document.querySelector(".modal-addwork")
    const $modalPrevious = document.querySelector(".modal-previous")
    const $categoryContainer = document.getElementById("photo-category");


    function hideModal() {
        $modall.style.display = 'none';
        $modalContent.style.display = "initial"
        $modalAddwork.style.display = "none"
        $categoryContainer.selectedIndex = 0;
        $categoryContainer.firstChild.textContent = "Sélectionnez une catégorie";
    }

    window.addEventListener('click', function (event) {
        if (event.target === $modall) {
            hideModal()
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideModal()
        }
    });

    document.getElementsByClassName('close')[0].addEventListener('click', () => {
        hideModal()
    });

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




    $addworkBtn.addEventListener("click", () => {
        $modalContent.style.display = "none"
        $modalAddwork.style.display = "initial"
    })

    $modalPrevious.addEventListener("click", () => {
        $modalContent.style.display = "initial"
        $modalAddwork.style.display = "none"
    })

    function createCategories(categories) {
        categories.forEach(function (category, index) {
            const option = document.createElement("option");
            option.value = index + 1;
            option.text = category.name;
            $categoryContainer.appendChild(option);
        });
    }


    function deleteWork(workId) {
        let token = sessionStorage.getItem("token");
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.status === 200) {
                    $works = $works.filter(work => work.id !== workId);
                    createEditedWorks()
                    createWorks($works)
                    console.log(`Work with ID ${workId} deleted successfully.`);
                    console.log($works)
                } else if (response.status === 401) {

                    console.error(`Unauthorized: ${response.statusText}`);
                } else if (response.status === 500) {

                    console.error(`Unexpected Behaviour: ${response.statusText}`);
                } else {
                    console.log($works)
                    console.error(`Error deleting work with ID ${workId}: ${response.statusText}`);
                }
            })

            

            .catch(error => {
                console.error("Error deleting work:", error);
            });
    }


} 
