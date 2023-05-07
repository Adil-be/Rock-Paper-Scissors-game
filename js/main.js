let score = 0;
let delay = 2000; // en milisecond

let option = [
  {
    name: "paper",
    pathImg: "img/icon-paper.svg",
    backgroung:
      "linear-gradient(to bottom, hsl(230, 89%, 62%), hsl(230, 89%, 65%)",
    win: "rock",
    lose: "scissors",
  },
  {
    name: "scissors",
    pathImg: "img/icon-scissors.svg",
    backgroung:
      "linear-gradient(to bottom, hsl(40, 84%, 53%), hsl(39, 89%, 49%))center",
    win: "paper",
    lose: "rock",
  },
  {
    name: "rock",
    pathImg: "img/icon-rock.svg",
    backgroung:
      "linear-gradient(to bottom, hsl(349, 71%, 52%), hsl(349, 70%, 56%))center",
    win: "scissors",
    lose: "paper",
  },
];

// Html elment

let PulsingCirle = document.createElement("div");
PulsingCirle.className = "pulse";
PulsingCirle.innerHTML = `<span style="--i:0;"></span>
<span style="--i:1;"></span>
<span style="--i:2;"></span>
<span style="--i:3;"></span>`;

let maxoption = option.length - 1;
console.log(maxoption);

// APPEL DOM
let sectionGame = document.querySelector("#game");
let canva = document.querySelector("#canva");
let scoreText = document.querySelector("#score");
let ruleLink = document.querySelector("#ruleLink");
let ruleSection = document.querySelector("#ruleSection");
let closeRule = document.querySelector("#closeRule");

ruleLink.onclick = () => {
  ruleSection.style.display = "flex";
};
closeRule.onclick = () => {
  ruleSection.style.display = "none";
};

function initialiseGame() {
  canva.innerHTML = "";
  canva.className = "init";
  option.forEach((element, i) => {
    let item = createItem(element);
    item.id = `item${i + 1}`;
    item.onclick = () => {
      startBattle(element);
    };
    item.classList.add(`item${i + 1}`);
    canva.appendChild(item);
  });
  updateScore();
}

function createItem(element) {
  let item = document.createElement("div");
  item.classList.add("ImgGameContainer", element.name);
  item.innerHTML = `<div class="ImgGameBorder">
    <img src="${element.pathImg}" alt="${element.name}" />
  </div>`;
  item.style.background = element.backgroung;
  return item;
}

function startBattle(element) {
  canva.innerHTML = "";
  canva.className = "battle";
  let rand = Math.round(Math.random() * maxoption);
  let oppenentElement = option[rand];

  let divContainer1 = document.createElement("div");
  let divContainer2 = document.createElement("div");
  divContainer1.style.order = "0";
  divContainer2.style.order = "2";
  divContainer1.className = "textAlign flexColumn";
  divContainer1.innerHTML += `<p class="textUpercase textWhite" style="font-size:2rem">You picked</p>`;
  divContainer2.innerHTML += `<p class="textUpercase textWhite" style="font-size:2rem">The house picked</p>`;
  divContainer2.className = "textAlign flexColumn";
  let item1 = createItem(element);
  item1.id = `item1`;
  divContainer1.appendChild(item1);
  canva.appendChild(divContainer1);
  // item2
  let item2 = document.createElement("div");
  item2.className = "ImgGameContainer";
  divContainer2.appendChild(item2);
  canva.appendChild(divContainer2);
  item2.innerHTML = "";
  item2.id = `item2`;
  console.log("item2 ", item2);

  // affichage computeur choice
  let timer1 = setTimeout(function () {
    let oppenentOption = document.querySelector("#item2");
    fillItem(oppenentOption, oppenentElement);
    let result = ResultBattle(element, oppenentElement);

    afficherResult(result);
  }, delay);
}

function fillItem(item, element) {
  item.classList.add("ImgGameContainer", element.name);
  item.innerHTML = `<div class="ImgGameBorder">
    <img src="${element.pathImg}" alt="${element.name}" />
  </div>`;
  item.style.background = element.backgroung;
}

function ResultBattle(element1, element2) {
  if (element1.win == element2.name) {
    return "win";
  } else if (element1.lose == element2.name) {
    return "lose";
  } else {
    return "draw";
  }
}

function afficherResult(result) {
  let Divresult = document.createElement("div");
  Divresult.className = "textAlign flexColumn";
  Divresult.id = "divResult";
  let textResult = document.createElement("p");
  textResult.className = "textResult";
  Divresult.appendChild(textResult);

  let item1 = document.querySelector("#item1");
  let item2 = document.querySelector("#item2");

  let buttonAgain = document.createElement("button");
  buttonAgain.className = "buttonAgain";
  buttonAgain.innerHTML = `Try again`;
  buttonAgain.onclick = initialiseGame;
  Divresult.appendChild(buttonAgain);
  canva.appendChild(Divresult);

  switch (result) {
    case "win": {
      textResult.innerHTML = `You win `;

      let leftPos = item1.offsetLeft + item1.offsetWidth / 2;
      let topPos = item1.offsetTop + item1.offsetHeight / 2;

      PulsingCirle.style.right = "initial";
      PulsingCirle.style.top = `${topPos}px`;
      PulsingCirle.style.left = `${leftPos}px`;

      canva.appendChild(PulsingCirle);
      score++;
      break;
    }
    case "lose": {
      textResult.innerHTML = `You lose`;

      let rightPos = 0 - item2.offsetWidth / 2;
      let topPos = item2.offsetTop + item2.offsetHeight / 2;

      PulsingCirle.style.left = "initial";
      PulsingCirle.style.top = `${topPos}px`;
      PulsingCirle.style.right = `${rightPos}px`;

      canva.appendChild(PulsingCirle);
      // score = 0;
      break;
    }
    case "draw": {
      textResult.innerHTML = `It's a draw`;
      break;
    }
  }
}

function updateScore() {
  scoreText.innerHTML = score;
}

initialiseGame();
