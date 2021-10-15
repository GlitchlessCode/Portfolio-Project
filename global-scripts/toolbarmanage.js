// Dropdown Manager Script by Timothy V

// -- Initialize Variables --

// - Create buttons

let sheet = document.getElementById('stylesheet').sheet;

let cssRulesNum = sheet.cssRules.length;

addDropdownButton('Basic Gravity Simulator').addEventListener('click', function() {
    location.replace('../gravitySim/');
});

addDropdownButton('Random Maze Generator').addEventListener('click', function() {
    location.replace('../randomMaze/');
});

addDropdownButton('Pixel Art Experiment').addEventListener('click', function() {
    location.replace('../gridSnapping/');
});

addDropdownButton('Image Zooming Experiment').addEventListener('click', function() {
    location.replace('../imageZoom/');
});

addDropdownButton('Firework Simulator').addEventListener('click', function() {
    location.replace('../fireworkSim/');
});

addDropdownButton('Minesweeper').addEventListener('click', function() {
    location.replace('../minesweeper/');
});

addDropdownButton('To Do List').addEventListener('click', function() {
    location.replace('../todoList/');
});

// - HTML Element References -
// Button array on dropdown menu
let buttonsArrayEl = docGetClass("dropdownButton");

// Toolbar Buttons
let projectBtnEl = docGetID("projectsBtn");
let homeBtnEl = docGetID("homeBtn");

// - Global Variables -
let dropdownToggleBool = true;

// -- Add Event Listeners --
projectBtnEl.addEventListener('click', function() {
    dropdownToggleBool = dropdownToggle(dropdownToggleBool, buttonsArrayEl)
});

if(!homeBtnEl.classList.contains("active")){
    homeBtnEl.addEventListener('click', gotoHome);
}

// Add CSS Rules
for (let n = 1; n <= buttonsArrayEl.length; n++) {
    sheet.insertRule(`#dropdownList :nth-child(${n}) div.smallDropdown {transition-delay: 0.${n-1}s;`, cssRulesNum);
}