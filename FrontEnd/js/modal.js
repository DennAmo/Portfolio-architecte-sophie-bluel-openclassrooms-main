
if (isTokenPresent()) { 
    const $editworksLayout= document.querySelector(".editworks-layout")
    const $addworkBtn = document.querySelector(".addwork-button")
    const $modalContent = document.querySelector(".modal-content")
    const $modalAddwork = document.querySelector(".modal-addwork")
    const $modalPrevious = document.querySelector(".modal-previous")
    
    function hideModal() {
        $modall.style.display = 'none';
        $modalContent.style.display = "initial"
        $modalAddwork.style.display = "none"
    }

    window.addEventListener('click', function(event) {
        if (event.target === $modall) {
            hideModal()
        }
    });

      window.addEventListener('keydown', (event)=> {
        if (event.key === 'Escape') {
            hideModal()
        }
      });

          document.getElementsByClassName('close')[0].addEventListener('click', () => {
        hideModal()
    });

function createEditedWorks() {
    for (let i = 0; i < $works.length; i++) {

        const $editedworksContainer = document.createElement("div");
        const $editedworksImg = document.createElement("img");
        const $trashIcon = document.createElement("span")

        $trashIcon.innerHTML = "<span class= 'trashicon-container'><i class='fa-solid fa-trash fa-sm'></i></span>"
        $editedworksContainer.classList.add("editworks-container")
        
        $editedworksImg.src = $works[i].imageUrl;

        $editedworksContainer.appendChild($trashIcon)
        $editedworksContainer.appendChild($editedworksImg);
        $editworksLayout.appendChild($editedworksContainer);

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

} 