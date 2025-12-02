 // --------------------------
// Fruit definitions
// --------------------------
const FRUITS = [
  { img: "apple.png", value: 2 },
  { img: "banana.png", value: 3 },
  { img: "blueberry.png", value: 4 }
];

const FRUIT_BY_NAME = {
  apple: FRUITS[0],
  banana: FRUITS[1],
  blueberry: FRUITS[2]
};


// --------------------------
// Reel Filling
// --------------------------
function fillReel(reel, repeats = 4) {
  reel.innerHTML = "";

  // Add 4 images so the CSS animation looks correct
  for (let r = 0; r < repeats; r++) {
      for (let fruit of FRUITS) {
        const img = document.createElement("img");
        img.src = "images/" + fruit.img;
        reel.appendChild(img);
    }
  }
}

// Stop a reel and pick the final fruit

function stopReel(reel, fruitName){
  const fruit = FRUIT_BY_NAME[fruitName]; //0, 1, or 2
  reel.innerHTML = `<img src="images/${fruit.img}>`;

  return fruit;
}

// --------------------------
// Spin patterns
// --------------------------

const SPINS = [
  ["blueberry","apple","apple"],
  ["apple","blueberry","banana"],
  ["banana","apple","banana"]
];

let spinIndex = 0;

// --------------------------
// Handle animation
// --------------------------
function pullHandle() {
  document.getElementById("handleUp").classList.add("hidden");
  document.getElementById("handleDown").classList.remove("hidden");
  document.getElementById("spinBtn").classList.add("hidden");

  setTimeout(() => {
    document.getElementById("handleDown").classList.add("hidden");
    document.getElementById("spinBtn").classList.remove("hidden");
    document.getElementById("handleUp").classList.remove("hidden");
  }, 2400);
}

// --------------------------
// Spin button logic
// --------------------------
const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");

let final1, final2, final3;

document.getElementById("spinBtn").onclick = () => {
  pullHandle();

  // Fill reels with random fruits for spinning effect
  fillReel(reel1);
  fillReel(reel2);
  fillReel(reel3);

  reel1.classList.add("spin");
  reel2.classList.add("spin");
  reel3.classList.add("spin");

// determine current spin pattern

  const pattern = SPINS[spinIndex];

  //loop to next spin for next time
  spinIndex = (spinIndex + 1) % SPINS.length;

  // Stop reels one by one
  setTimeout(() => {
    reel1.classList.remove("spin");
    final1 = stopReel(reel1, pattern[0]);
  }, 1200);

  setTimeout(() => {
    reel2.classList.remove("spin");
    final2 = stopReel(reel2, pattern[0]);
  }, 1800);

  setTimeout(() => {
    reel3.classList.remove("spin");
    final3 = stopReel(reel3, pattern[0]);
  }, 2400);
};

// --------------------------
// Check code input
// --------------------------
function checkCode() {
  if (!final1 || !final2 || !final3) {
    document.getElementById("msg").innerText = "Spin the machine first!";
    return;
  }

  const generatedCode = `${final1.value}${final2.value}${final3.value}`;
  const entered = document.getElementById("codeInput").value;

  if (entered === generatedCode) {
    document.getElementById("msg").innerText = "Correct!";
    document.getElementById("nextBtn").disabled = false;
  } else {
    document.getElementById("msg").innerText = "Incorrect code.";
  }
}
