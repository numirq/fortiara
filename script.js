"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const headerElement = document.querySelector(".header");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 6;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  titleElement.innerHTML = " i knew u would choose yes dude, i lov u <3 ";
  buttonsContainer.classList.add("hidden");
  headerElement.classList.add("hidden");
  changeImage("yes");
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Are you sure?",
    "Pookie please",
    "Don't do this to me :(",
    "You're breaking my heart",
    "I'm gonna cry...",
    "Please don't say no :(",
    "I thought you love me...",
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  const formats = [".gif", ".png"];
  let currentFormatIndex = 0;

  function tryLoadImage() {
    if (currentFormatIndex >= formats.length) return;

    const src = `cat${image}${formats[currentFormatIndex]}`;
    const testImg = new Image();

    testImg.onload = function () {
      catImg.src = src;
    };

    testImg.onerror = function () {
      currentFormatIndex++;
      tryLoadImage();
    };

    testImg.src = src;
  }

  tryLoadImage();
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}
