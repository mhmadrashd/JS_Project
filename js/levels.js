var btnEasy = document.getElementById("btnEasy");
var btnMedium = document.getElementById("btnMedium");
var btnDifficult = document.getElementById("btnDifficult");

btnEasy.addEventListener("click" , ()=>{
    localStorage.setItem("level" , "Easy");
})

btnMedium.addEventListener("click" , ()=>{
    localStorage.setItem("level" , "Medium");
})

btnDifficult.addEventListener("click" , ()=>{
    localStorage.setItem("level" , "Difficult");
})