const text = document.querySelector(".word"),
  hint = document.querySelector(".hint span"),
  refresh = document.querySelector(".refresh"),
  check = document.querySelector(".check"),
  timeText = document.querySelector(".time b");
userinp = document.querySelector("input");

let correctAns, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    clearInterval(timer);
    alert(`Time's up!! ${correctAns.toUpperCase()} was the correct answer`);
    initGame();
  }, 1000);
};

const initGame = () => {
  initTimer(30); // Starting the timer

  let randomObj = words[Math.floor(Math.random() * words.length)]; // For getting Random Words
  let wordArr = randomObj.word.split("");
  for (let i = wordArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // Getting a random Number
    [wordArr[i], wordArr[j]] = [wordArr[j], wordArr[i]]; // Shuffling the letters of the Word
  }
  text.innerText = wordArr.join(""); // Shuffled word as text
  hint.innerText = randomObj.hint;
  correctAns = randomObj.word.toLowerCase();

  userinp.value = "";
  userinp.setAttribute("maxlength", correctAns.length);
};

initGame();

const checkWord = () => {
  let word = userinp.value.toLocaleLowerCase(); // getting value and making the word lowercase to avoid errors
  if (!word) return alert(`Please Enter a word for guess!`);
  if (word !== correctAns)
    return alert(`Oops, ${word.toUpperCase()} is not the correct answer...`);
  alert(`Congrats!! ${word.toUpperCase()} is the correct answer...`);

  initGame();
};

refresh.addEventListener("click", initGame);
check.addEventListener("click", checkWord);
