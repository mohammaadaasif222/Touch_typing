const element = document.getElementById("sec");
const timeup = document.getElementById("timeup");

const getData = async () => {
  try {
    const res = await fetch("http://api.quotable.io/random");
    const data = await res.json();
    text = data.content;
  } catch (error) {
    console.log(error);
  }
};
getData();

function addClass(element, name) {
  element.classList.add += name;
}

function removeClass(element, name) {
  element.classList.remove = name;
}

const formatText = (words) => {
  return `<span class="letter">${words}</span>`;
};

var total_sec;

var isStart=false;
const newGame = () => {
  isStart = true
  if(isStart){
    document.getElementById('start-btn').disabled = true;
  }
  document.getElementById("container").innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    document.getElementById("container").innerHTML += formatText(
      text.charAt(i)
    );
  }
  document.querySelector(".letter").classList.add("current");

  const timer = setInterval(countUp, 1000);
  total_sec = 0;

  function countUp() {
    total_sec++;
    var hour = Math.floor(total_sec / 3600);
    var minute = Math.floor((total_sec - hour * 3600) / 60);
    var seconds = total_sec - (hour * 3600 + minute * 60);
    element.innerHTML = minute + " : " + seconds;
    if (minute == 2) {
      clearInterval(timer);
      timeup.style.display = "block";
      element.innerHTML = 0 + " : " + 0;
      seconds = 0;
      minute = 0;
    }
  }
};

// var isStart = false;
// document.addEventListener("keydown", function (event) {
//   const key = event.key;
//   if (key === "Enter") {
//     newGame();
//     isStart = true;
//   } else if (!isStart) {
//     alert(`Please press 'Enter' to start game!`);
//   }
// });

let counter = 0;

document.addEventListener("keyup", function (event) {
  const key = event.key;
  const currentLetter = document.querySelector(".letter.current");
  const expected = currentLetter.innerHTML;
  const isLetter = key.length == 1 && key !== " ";
  const isSpace = key === " ";
  console.log({ key, expected });

  if (isLetter) {
    if (currentLetter) {
      document.getElementById("wpm").innerHTML = Math.round(
        (counter += 1 / total_sec)
      );
      currentLetter.classList.add(key === expected ? "correct" : "incorrect");
      currentLetter.classList.remove("current");
      currentLetter.nextElementSibling.classList.add("current");
    }
  }
  if (isSpace) {
    if (currentLetter !== " ") {
      currentLetter.classList.remove("current");
      currentLetter.nextElementSibling.classList.add("current");
    }
  }
});
