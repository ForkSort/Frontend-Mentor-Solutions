'use strict';
// elements:
const themes = document.querySelector(".theme-btn-bkg");
const screenElement = document.querySelector(".screen");
const keyElements = document.querySelector(".keys");
//events:
themes.addEventListener("click", setTheme);
keyElements.addEventListener("click", keyClick);
screenElement.addEventListener('input', renderEquation);
document.addEventListener('keydown', keyPress);

// vars: 
let equation = "";

/* Theme selection related functions. */

// check if a theme is stored in 'localStorage'
let storedTheme = localStorage.getItem('theme');
if (!storedTheme) {
    // if not in local storage load optimal theme based on users-agents 'prefers-color-scheme'
    window.matchMedia("(prefers-color-scheme: dark)").matches
        ? storedTheme = "theme3"
        : storedTheme = "theme1";
}
themes.querySelector(`#${storedTheme}-button`).checked = true;
renderTheme(storedTheme);

function renderTheme(theme) {
    document.body.classList = "";
    document.body.classList.add(theme);
}
function setTheme(event) {
    if (event.target.type !== "radio") return;

    const themeName = event.target.id.substr(0,6);
    localStorage.setItem('theme', themeName);
    renderTheme(themeName);
}

/* Key-events and equation related functions. */

function keyPress(e) {
    const keyValue = e.key;
    const validKeys = [
        "Enter",
        "Delete",
        "Backspace",
        "=",
        "+",
        "/",
        "*",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "."
    ];
    if (validKeys.includes(keyValue)) {
        if (keyValue === "=" || keyValue === "Enter") {
            equation = calculate();
            screenElement.value = equation;
        }
        else {
            if (keyValue === "Delete" || keyValue === "Backspace") {
                if (equation) equation = equation.slice(0, -1);
            }
            else equation += keyValue;
            screenElement.value = equation;
        }
    }
}
function renderEquation(event) {
    equation = event.target.value;
    screenElement.value = equation;
}
function keyClick(event) {
    console.log(event.target.textContent)
    const keyValue = event.target.textContent;
    if (keyValue === "=") {
        equation = calculate();
        screenElement.value = equation;
    }
    else {
        if (keyValue === "DEL") equation = equation.slice(0, -1);
        else if (keyValue === "RESET") equation = "";
        else equation += keyValue;
        screenElement.value = equation;
    }
}
function calculate() {

    return Function(`
        return (${equation})`
    )();
}
 