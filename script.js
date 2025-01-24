// APIs
const API_KEY = "&apikey=6bdd331d7d57482b81658933d7bce968";
const news_API = "https://newsapi.org/v2/everything?q=";
 
let currentCategory = "all"
let currentSource = ""
window.addEventListener("load", () => getNews(currentCategory, currentSource));

const selectCategory = document.getElementById("categorySelect")
const selectSource = document.getElementById("sourceSelect")

const searchBtn = document.getElementById("searchBtn")
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("click", () => {
    const query = searchInput.value
    if(!query){
        return;
    }
    currentCategory = query
    getNews(currentCategory, currentSource)
})

selectCategory.addEventListener("change", (event)=> {
    currentCategory = event.target.value;
    getNews(currentCategory, currentSource)
})

selectSource.addEventListener("change", (event) => {
        currentSource = event.target.value;
        if(currentSource == "all"){
            currentSource = "";
        }
        getNews(currentCategory, currentSource)
    }
)

var DataArray = [];
const NewsContainer = document.getElementById("news-container-id")

const getNews = async (category, source) => {
    try{
    const response = await fetch(`${news_API+category}&domains=${source+API_KEY}`);
    const data = await response.json();
    console.log(data.articles);
    DataArray = data.articles || [];
    displayData()
    }
    catch (error){
        console.log(error);
    }
}

const displayData = () => {

    NewsContainer.innerHTML = ""

    DataArray.forEach(data => {

        const article = document.createElement("div");
        article.setAttribute("class","article");

        const img = document.createElement("img");
        img.src = data.urlToImage || "#";

        const content = document.createElement("div");
        content.setAttribute("class","article-content");

        const heading = document.createElement("h2");
        heading.innerHTML = data.title;

        const description = document.createElement("p");
        description.innerHTML = data.description;
        
        const linktonews = document.createElement("a");
        linktonews.href = data.url || "#"
        linktonews.innerHTML = "Read More";
        
        content.appendChild(heading);
        content.appendChild(description);
        content.appendChild(linktonews);

        article.appendChild(img);
        article.appendChild(content);

        NewsContainer.appendChild(article);
    } )
}
