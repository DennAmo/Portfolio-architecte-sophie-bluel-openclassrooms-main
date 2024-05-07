let $works
let $categories

async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        $works = await response.json();
        createWorks($works);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

async function getCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        $categories = await response.json();
        createBtn();
    } catch (error) {
        console.error('Erreur:', error);
    }
}

getWorks();
getCategories();


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


function createBtn() {
    for (let i = 0; i < $categories.length; i++) {
        const $containerBtn = document.querySelector('.sort-btn');
        const $button = document.createElement("button");

        $containerBtn.appendChild($button);
        $button.textContent = $categories[i].name;
        $button.addEventListener('click', function () {
            filterWorksByCategory($categories[i].name);
        });
    }
}

const $gallery = document.querySelector('.gallery');
const $btnAll = document.getElementById("btn-all");

$btnAll.addEventListener("click", function () {
    $gallery.innerHTML = "";
    createWorks($works);
});

function filterWorksByCategory(categoryName) {
    $gallery.innerHTML = "";
    const $filteredWorks = $works.filter(filterParam => filterParam.category.name === categoryName);
    createWorks($filteredWorks);
}


