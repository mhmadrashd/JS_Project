
let progressSpans = document.querySelectorAll(".the-progress span");
let section = document.querySelector(".scores");
let Play = document.querySelector("#btnPlay");
let Continue = document.querySelector("#btnContinue");
let firstScore = document.querySelectorAll(".firstScore");
let secondScore = document.querySelectorAll(".secondScore");
let thirdScore = document.querySelectorAll(".thirdScore");
let nums = document.querySelectorAll(".stats .number");
let statsSection = document.querySelector(".stats");
let started = false; // Function Started ? No
firstScore[0].textContent =localStorage.getItem("firstScore");
secondScore[0].textContent =localStorage.getItem("secondScore");
thirdScore[0].textContent =localStorage.getItem("thirdScore");

firstScore[1].dataset.width= (localStorage.getItem("firstScore")/localStorage.getItem("firstScore")*100).toString()+  "%";
secondScore[1].dataset.width= (localStorage.getItem("secondScore")/localStorage.getItem("firstScore")*100).toString()+  "%";
thirdScore[1].dataset.width= (localStorage.getItem("thirdScore")/localStorage.getItem("firstScore")*100).toString()+  "%";
console.log(firstScore[1].dataset.width);
Continue.addEventListener("click",()=>{
  localStorage.setItem('Status', 1 );

});
Play.addEventListener("click",()=>{
  localStorage.setItem('Status', 0 );

});


window.onscroll = function () {
  // Scores Animate Width
  if (window.scrollY >= section.offsetTop - 150) {
    progressSpans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
  // Stats Increase Number
  if (window.scrollY >= statsSection.offsetTop - 200) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}
