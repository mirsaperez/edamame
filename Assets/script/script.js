var apiId = `65eb38bf`
var apiKey = `7ba37096f7d35dd3b5bd8c65c2dfe698`
var edamameApi = `https://api.edamam.com/search?app_id=${apiId}&app_key=${apiKey}&q=`
const $searchform=document.querySelector("#search-form")
const $resultsContainer=document.querySelector("#results-container")

// fetch(`https://api.edamam.com/search?q=chicken&app_id=${apiId}&app_key=${apiKey}&from=0&to=3&calories=591-722&health=alcohol-free`)
//     .then(response => response.json())
//     .then(data => console.log(data));

// get reference to text field 
var $txtField = document.querySelector("#searchBox");
console.log($txtField);
// get reference to button 
var $btn = document.querySelector("#btn");
console.log($btn);
// add an onclick event to button 
$searchform.addEventListener("submit", ( event )=> { 
    event.preventDefault()
    // that finds the value of the text field
    $.ajax({
        url:
          edamameApi+
          $txtField.value
      })
        .then(function (response) {
            console.log("response",response)
            let recipes=response.hits
            for (let i = 0; i < recipes.length; i++) {
                const recipe = recipes[i];
                console.log(recipe)
                let newTitle=document.createElement("h3")
                newTitle.innerText=recipe.recipe.label
                $resultsContainer.appendChild(newTitle)
                
              
            }
        })
    
    

})
    
// create html elements for data returned 


// append new html element to location already on html page 