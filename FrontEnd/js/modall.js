
if (isTokenPresent()) { 
    const $editworksLayout= document.querySelector(".editworks-layout")

    $modall.addEventListener('click', function(event) {
        const isOutside = !event.target.closest(".modal-content");
        if (isOutside) {
            hideModal()
        }
      })

      window.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            hideModal()
        }
      });

          document.getElementsByClassName('close')[0].addEventListener('click', function () {
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

function hideModal() {
    $modall.style.display = 'none';
}

} 