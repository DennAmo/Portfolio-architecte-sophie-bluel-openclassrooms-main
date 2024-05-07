
if (isTokenPresent()) { 
    const $modallContent = document.querySelector(".modal-content")

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

        const $editedworksFigure = document.createElement("div");
        const $editedworksImg = document.createElement("img");

        $editedworksImg.src = $works[i].imageUrl;
        $editedworksFigure.appendChild($editedworksImg);
        $modallContent.appendChild($editedworksFigure);
        $editedworksFigure.style.margin = "5px"
        $editedworksImg.style.width = "76px"

    }
}

function hideModal() {
    $modall.style.display = 'none';
}

}