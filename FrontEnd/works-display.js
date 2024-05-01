let $works;

function getWorks() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {  
            $works = data;
            createWorks($works);
        });
}

getWorks();

function categories() {
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {  
            categories = data;
            createBtn();
        });
}

categories();

function createWorks($works) {
    $gallery.innerHTML = "";
    for (let i = 0; i < $works.length; i++) {
        const worksArticle = document.createElement("article");
        const worksImg = document.createElement("img");
        const worksText = document.createElement("span");

        worksImg.src = $works[i].imageUrl;
        worksText.textContent = $works[i].title;
        worksArticle.appendChild(worksImg);
        worksArticle.appendChild(worksText);
        $gallery.appendChild(worksArticle);
    }
}


function createBtn() {
    for (let i = 0; i < categories.length; i++) {
        const $containerBtn = document.querySelector('.sort-btn');
        const $button = document.createElement("button");   

        $containerBtn.appendChild($button);
        $button.textContent = categories[i].name;
        $button.addEventListener('click',  function() {
            filterWorksByCategory(categories[i].name);
        });
    }
}

const $gallery = document.querySelector('.gallery');
const $btnAll = document.getElementById("btn-all");

$btnAll.addEventListener("click", function() {
    $gallery.innerHTML = "";
    createWorks($works);
});

function filterWorksByCategory(categoryName) {
    $gallery.innerHTML = "";
    const $filteredWorks = $works.filter(filterParam => filterParam.category.name === categoryName);
    createWorks($filteredWorks);
}


