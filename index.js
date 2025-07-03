let yourName = document.getElementById("name")
let yourScore = document.getElementById("score")
let submit= document.getElementsByClassName("button")
let form = document.getElementById("form")

form.addEventListener("submit", function(event){
    event.preventDefault()
    console.log("Form submitted")
})
