const works = await fetch("works-array.json").then(works => works.json)

function createWorks(works) {
    for (let i = 0; i < works.length; i++) {

        const worksArticle = document.createElement("article")
        const worksImg = document.createElement("img")

        worksImg.src = works[i].imageUrl
        worksArticle.appendChild(worksImg)
        document.gallery.appendChild(worksArticle)
    }
}

createWorks[works]