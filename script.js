const maxTextNum = 6;
const randomTextNum = Math.floor(Math.random() * maxTextNum) + 1;

// To be used for generating a new random text number different from the current one
function getNewTextNum(currentNum, max) {
    if (max <= 1) return currentNum;
    let newNum;
    do {
        newNum = Math.floor(Math.random() * max) + 1;
    } while (newNum === currentNum);
    return newNum;
}

function typingEffect(element, text, delay = 30) {
    let index = 0;
    let timeoutId = null;
    let isPaused = false;

    function type() {
        if (isPaused) return;
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            timeoutId = setTimeout(type, delay);
        }
    }

    const speedSlider = document.getElementById("speed-slider");
    if (speedSlider) {
        speedSlider.addEventListener("input", () => {
            delay = 50 - parseInt(speedSlider.value);
        });
    }

    function pause() {
        isPaused = true;
    }

    function resume() {
        if (isPaused) {
            isPaused = false;
            type();
        }
    }

    const pauseButton = document.getElementById("pause-switch");
    if (pauseButton) {
        pauseButton.addEventListener("click", () => {
            if (isPaused) {
                resume();
            } else {
                pause();
            }
        });
    }

    function reset() {
        clearTimeout(timeoutId);
        element.textContent = "";
        index = 0;
        isPaused = false;
        type();
    }

    const resetButton = document.getElementById("reset-button");
    if (resetButton) {
        resetButton.addEventListener("click", reset);
    }

    function changeText() {
        clearTimeout(timeoutId);
        element.textContent = "";
        index = 0;
        isPaused = false;
        const newTextNum = Math.floor(Math.random() * 6) + 1;

        getTextByNumber(newTextNum).then(newText => {
            text = newText;
            type();
        });
    }

    const switchContentButton = document.getElementById("switch-content");
    if (switchContentButton) {
        switchContentButton.addEventListener("click", () => {
            changeText();
        });
    }

    type();

    return { pause, resume, restart };
}

// Wait for the DOM to load before executing the script
document.addEventListener("DOMContentLoaded", async () => {
  const spinner = document.getElementById("spinner");
  const element = document.getElementById("typing-effect");

  if (spinner) spinner.style.display = "block";

  const text = await getTextByNumber(randomTextNum);

  if (spinner) spinner.style.display = "none";
  if (element) typingEffect(element, text);
});

// Fetch text from JSON file based on number
async function getTextByNumber(num) {
  try {
    const response = await fetch("assets/texts/texts.json");
    const data = await response.json();
    const key = `text${num}`;
    return data[key] || "You are seeing this because the text is empty or does not exist.";
  } catch (error) {
    return "Error loading text.";
  }
}

// Hamburger menu toggle
document.getElementById("hamburger-menu").addEventListener("click", () => {
  const menu = document.getElementById("menu");
  const icon = document.getElementById("hamburger-icon")
  menu.classList.toggle("hidden");

  if (menu.classList.contains("hidden")) {
      icon.src = "assets/icons/list.svg";
      icon.alt = "Menu";
  } else {
      icon.src = "assets/icons/list-nested.svg";
      icon.alt = "Close";
  }
});

// Bootstrap 5 theme toggle
document.getElementById("toggle-theme").addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");
  document.documentElement.setAttribute("data-bs-theme",
    currentTheme === "dark" ? "light" : "dark");
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});

// For testing Jest
function sum(a, b) {
  return a + b;
}

module.exports = {
  sum,
  getTextByNumber
};




