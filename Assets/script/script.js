var savedRecipes = []
if(localStorage.getItem("recipes")){
    savedRecipes = (JSON.parse(localStorage.getItem("recipes")))
}
var apiId = `65eb38bf`
var apiKey = `7ba37096f7d35dd3b5bd8c65c2dfe698`
var edamameApi = `https://api.edamam.com/search?app_id=${apiId}&app_key=${apiKey}&q=`
var smsApi = `https://www.A-ZSMS.com/api/text`
const $searchform = document.querySelector("#search-form")
const $resultsContainer = document.querySelector("#results-container")
displaySaved()
// fetch(`https://api.edamam.com/search?q=chicken&app_id=${apiId}&app_key=${apiKey}&from=0&to=3&calories=591-722&health=alcohol-free`)
//     .then(response => response.json())
//     .then(data => console.log(data));

// get reference to text field 
var $txtField = document.querySelector("#searchField");
console.log($txtField);
// get reference to button 
var $btn = document.querySelector(".btn");
console.log($btn);
// add an onclick event to button 
$searchform.addEventListener("submit", (event) => {
    event.preventDefault()
    // that finds the value of the text field
    $.ajax({
        url:
            edamameApi +
            $txtField.value
    })
        .then(function (response) {
            console.log("response", response)
            let recipes = response.hits
            for (let i = 0; i < recipes.length; i++) {
                const recipe = recipes[i];
                // append new html element to location already on html page 
                let newTitle = document.createElement("h3")
                newTitle.innerText = recipe.recipe.label
                $resultsContainer.appendChild(newTitle)
                
                let image = document.createElement("img")
                image.setAttribute("src", recipe.recipe.image) 
                $resultsContainer.appendChild(image)

                let ingredients = document.createElement("p")
                ingredients.textContent = recipe.recipe.ingredientLines
                $resultsContainer.appendChild(ingredients)
                console.log("response")

                let urlLink = document.createElement("a")
                urlLink.setAttribute("href", recipe.recipe.url)
                let url = document.createElement("p")
                url.textContent = recipe.recipe.url
                urlLink.appendChild(url)
                $resultsContainer.appendChild(urlLink)
                console.log(url)
                
                let saveButton = document.createElement("button")
                saveButton.innerText = "Save"
                saveButton.dataset.url = recipe.recipe.url
                console.log(typeof savedRecipes)
                saveButton.addEventListener("click", function(){
            
                        console.log(savedRecipes)
                        savedRecipes.push({url:this.dataset.url, title:recipe.recipe.label})
                        localStorage.clear()
                        localStorage.setItem("recipes", JSON.stringify(savedRecipes))
              
                })
                $resultsContainer.appendChild(saveButton)

                let smsContainer = document.createElement("div")
    
                
                // create SMS button
                let smsInput = document.createElement("input")
                smsInput.placeholder = "Enter phone number"
                smsContainer.appendChild(smsInput)

                let smsButton = document.createElement("button")
                smsButton.innerText = "Send Recipe"
                smsButton.addEventListener("click", function(){sendSms(recipe.recipe.url,this)})
                smsContainer.appendChild(smsButton)
                $resultsContainer.appendChild(smsContainer)
            }
        })



})

function displaySaved(){
    console.log("hello",savedRecipes)
    let savedContainer = $("#saved")
    console.log(savedContainer)
    for (let i = 0; i < savedRecipes.length; i++) {
        const recipe = savedRecipes[i];
        let newDiv = $("<div>")
        console.log(recipe.url)
       newDiv.text(recipe.url)
       $(`<div>${recipe.title}: <a href="${recipe.url}">${recipe.url}</a></div>`).appendTo('#saved');
        
    }}


function sendSms(link, that) {
    console.log(that)
    console.log(that.parentElement)
    console.log(that.parentElement.childNodes[0])

// create html elements for data returned 
console.log(link)
var smsData = {
    number: that.parentElement.childNodes[0].value, 
    message: "Enjoy this recipe at " + link
}


// send recipe link to user's phone number entered 
$.ajax({
    url:
        smsApi, 
        data: smsData,
        type: 'POST'
   
})
.then(function (response) {
console.log(response)
})
}


