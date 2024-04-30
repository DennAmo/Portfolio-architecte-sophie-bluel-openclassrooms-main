let works; 

fetch("works-array.json")
  .then(response => response.json())
  .then(data => {  
    works = data
    createWorks(works)
});

const gallery = document.querySelector('.gallery')

function generateWorks(works) {
    const worksArticle = document.createElement("article")
    const worksImg = document.createElement("img")
    const worksText = document.createElement("span")
    worksText.style.display = "block"
    worksText.style.padding = "7px 0px 0px 0px"


    worksImg.src = works.imageUrl
    worksText.textContent = works.title
    worksArticle.appendChild(worksImg)
    worksArticle.appendChild(worksText)
    gallery.appendChild(worksArticle)
};

function createWorks(works) {
    for (let i = 0; i < works.length; i++) {
        generateWorks(works[i])
    }
};

const btnAll = document.getElementById("btn-all")
const btnProjects = document.getElementById("btn-projects")
const btnApartments = document.getElementById("btn-apartments")
const btnHotels = document.getElementById("btn-hotels")

btnAll.addEventListener("click", function() {

    gallery.innerHTML = ""
    for (let i = 0; i < works.length; i++) {
        generateWorks(works[i])
    }

});

function filterWorksByCategory(categoryName) {

    gallery.innerHTML = ""
    const filteredWorks = works.filter(works => works.category.name === categoryName)

    for (let i = 0; i < filteredWorks.length; i++) {
        generateWorks(filteredWorks[i])
    }
}

btnAll.addEventListener("click", function() {
    gallery.innerHTML = ""
    createWorks(works)
});

btnProjects.addEventListener("click", function() {
    filterWorksByCategory("Objets")
});

btnApartments.addEventListener("click", function() {
    filterWorksByCategory("Appartements")
});

btnHotels.addEventListener("click", function() {
    filterWorksByCategory("Hotels & restaurants")
});