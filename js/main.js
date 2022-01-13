
let progressSpans = document.querySelectorAll(".the-progress span");
let section = document.querySelector(".scores");
let Play = document.querySelector("#btnPlay");
let Continue = document.querySelector("#btnContinue");


let nums = document.querySelectorAll(".stats .number");
let statsSection = document.querySelector(".stats");
let started = false; // Function Started ? No


Continue.addEventListener("click",()=>{
console.log("here");
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
