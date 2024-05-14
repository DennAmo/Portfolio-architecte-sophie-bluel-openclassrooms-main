let $works
let $categories
const $modall = document.getElementById('modal')
const $categoryContainer = document.getElementById("photo-category");
const $containerBtn = document.querySelector('.sort-btn');
const $gallery = document.querySelector('.gallery');

/*********************************************************************/
/* fonction pour récuperer la token si générer lors de la connexion */
/*******************************************************************/

const isTokenPresent = function token() {
    return sessionStorage.getItem('token') ? true : false;
}

/**************************************************************/
/********** fonction pour récuperer données backend **********/
/************************************************************/

async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        $works = await response.json();

        createWorks($works);
        if (isTokenPresent()) {
            createEditedWorks()
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}


async function getCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        $categories = await response.json();
        createBtn();
        createCategories($categories)
    } catch (error) {
        console.error('Erreur:', error);
    }
}


getWorks();
getCategories();


/**************************************************************/
/***** fonction pour crée les oeuvres sur page d'accueil *****/
/************************************************************/

function createWorks($works) {
    $gallery.innerHTML = "";
    for (let i = 0; i < $works.length; i++) {
        const $worksFigure = document.createElement("figure");
        const $worksImg = document.createElement("img");
        const $worksText = document.createElement("figcaption");

        $worksImg.src = $works[i].imageUrl;
        $worksText.textContent = $works[i].title;
        $worksFigure.appendChild($worksImg);
        $worksFigure.appendChild($worksText);
        $gallery.appendChild($worksFigure);
    }
}

/**************************************************************/
/***** fonction pour crée les boutons sur page d'accueil *****/
/************************************************************/

function createBtn() {
    for (let i = 0; i < $categories.length; i++) {
        const $button = document.createElement("button");

        $containerBtn.appendChild($button);
        $button.textContent = $categories[i].name;
        $button.addEventListener('click', function () {
            filterWorksByCategory($categories[i].name);
        });
    }
}

const $btnAll = document.getElementById("btn-all");

$btnAll.addEventListener("click", function () {
    $gallery.innerHTML = "";
    createWorks($works);
});

/**************************************************************/
/**** fonction pour filtré les oeuvres sur page d'accueil ****/
/************************************************************/

function filterWorksByCategory(categoryName) {
    $gallery.innerHTML = "";
    const $filteredWorks = $works.filter(filterParam => filterParam.category.name === categoryName);
    createWorks($filteredWorks);
}

/**************************************************************/
/***** exception pour création de contenu admin connecté *****/
/************************************************************/

if (isTokenPresent()) {

    const body = document.querySelector("body");
    const $logBtn = document.querySelector('.log-btn');
    const $h2 = document.querySelector("#portfolio h2");

    const $editBtn = document.createElement("aside");

    $editBtn.classList.add("edit-button");
    $editBtn.innerHTML = "<i class='fa-regular fa-pen-to-square'></i> Modifier";
    $h2.insertAdjacentElement('afterend', $editBtn);

    $editBtn.addEventListener('click', function () {
        modal.style.display = 'flex';
    });

    $logBtn.innerHTML = "logout";

    $logBtn.addEventListener('click', function () {
        sessionStorage.clear();
        window.location.href = "login.html";
    });
    
    const editMode = document.createElement("p");
    const topMenu = document.createElement("div");
    topMenu.className = "topMenu";
    editMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Mode édition`;

    body.insertAdjacentElement("afterbegin", topMenu);
    topMenu.append(editMode);
    $containerBtn.style.display = "none"
    $gallery.style.paddingTop = "50px"

}