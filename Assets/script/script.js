var apiId = `65eb38bf`
var apiKey = `1c2548d58be7dcb81429580c548dd86d`
var edamameApi = `https://api.edamam.com/search?q=${$txtField}&app_id=${apiId}&app_key=${apiKey}&from=0&to=3&calories=591-722&health=alcohol-free`

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
document.getElementById("#btn").addEventListener("click",
    // that finds the value of the text field
    fetch(edamameApi).then(function () {
        // runs the fetch edamame with q=text field value
        if (response.ok) {
            return response.json()
        }
        else {
            alert("Please enter valid search.")
        }
    }

    ));

// create html elements for data returned 
// append new html element to location already on html page 