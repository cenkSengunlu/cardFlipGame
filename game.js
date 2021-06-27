let arr = [];
let count = 0;
let score = 0;
let obj = {};
let timer = 30;
let gameStart = false;
let lastCard = null;

document.getElementById("myBtn").addEventListener("click", clickmyBtn);
function clickmyBtn() {
  if(gameStart){
    return;
  }
  document.getElementById("myBtn").style.display = "none";
  arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6].sort(() => Math.random() - 0.5);
  for (let i = 1; i <= arr.length; i++) {
    document.getElementById(`card${i}`).style.display = "block";
  }
  document.getElementById("start").style.display = "block";
  
  for (let p = 3; p >= 0; p--) {
    setTimeout(function () {
      document.getElementById("start").innerHTML = `${p}`;
    }, count * 1000);
    count++;
  }
  
  setTimeout(function () {
    count = 0;
    gameStart = true;
    document.getElementById("start").style.display = "none";
    document.getElementById("time").style.display = "block";
    for (let t = timer; t >= 0; t--) {
      setTimeout(function () {
        document.getElementById("time").innerHTML = `Time: ${t}`;
        console.log(timer);
        
        if(timer === 0){
            count = 0;
            gameEnd();
        }
        timer--;
      }, count * 1000);
      count++;
    }
  }, 3250);

  

  for (let j = 0; j < arr.length; j++) {
    obj[`card${j + 1}`] = arr[j];
  }
}

function gameEnd(){
  gameStart = false;
  
  document.getElementById("time").style.display = "none";
  document.getElementById("score").innerHTML = `Game Finished - Your Total Score: ${score}`;
  document.getElementById("score").style.display = "block";
  window.location.href = "#match";
}



document
  .getElementById("container")
  .addEventListener("click", clickmycontainer);
function clickmycontainer(e) {
  
  if (e.target.id !== "container" && gameStart && score !== 12) {
    e.target.src = `p${obj[e.target.id]}.jpg`;
    e.target.classList.add("open");
    if(lastCard === null){
      lastCard = e.target;
    }
    else{
      if(lastCard.src === e.target.src){
        gameStart = false;
        setTimeout(function () {
          score += 2;
          lastCard.style.visibility = "hidden";
          e.target.style.visibility = "hidden";
          gameStart = true;
          if(score === 12){
            gameEnd();
          }
          lastCard = null;
        },1000);
      }
      else{
        gameStart = false;
        setTimeout(function () {
          lastCard.classList.remove("open");
          lastCard.src = "card.jpg";
          e.target.classList.remove("open");
          e.target.src = "card.jpg";
          gameStart = true;
          lastCard = null;
        },1000);
      }
    }
  }
}