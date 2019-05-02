// variables
var numOfSquares = 6;
var colors = [];
var pickedColor;
// selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

// logic that we want to be run when the page first loads 
function init() {
    setUpModeButtons();
    addSquareListeners();
    reset();
}

function setUpModeButtons() {
    // loop through the mode buttons & add event listeners - easy and hard (we can easily add more modes this way)
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
            reset();
        });
    }
}

function addSquareListeners() {
    for(var i = 0; i < squares.length; i++) {
        // add click listeners to squares
        squares[i].addEventListener("click", function() {
            // grab color that is clicked using 'this'
            var clickedColor = this.style.backgroundColor;
    
            // compare color to pickedColor
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetBtn.textContent = "Play Again?";
                changeColor(clickedColor);
                h1.style.background = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function reset() {
    // generate all new colors
    colors = generateRandomColors(numOfSquares);
    // pick a new random color from array
    pickedColor = pickColor();
    // change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetBtn.textContent = "New Colors";

    // change colors of squares from array 
    for(var i = 0; i < squares.length; i++) {
        // keep adding colors to squares - if there are no more colors to add, hide the square  
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    // reset the h1 background color
    h1.style.backgroundColor = "steelblue";
}

resetBtn.addEventListener("click", function() {
    reset();   
});

// change all squares to the correct color
function changeColor(color) {
    // loop through all squares
    for(var i = 0; i < colors.length; i++) {
        // change each color to match given color
        squares[i].style.backgroundColor = color;
    }

}

function pickColor() {
    // generate a number between 0-5
    // Math.random() generates a random number between 0 and 6 (0.34242423, 0.1237138 etc)
    // Math.floor gets rid of the decimals and gives us a whole number to work with 
    var random = Math.floor(Math.random() * colors.length);

    return colors[random];
}

function generateRandomColors(num) {
    // make an array 
    var arr = [];

    // repeat num times
    for(var i = 0; i < num; i++) {
        // get random rgb color and push into array
        arr.push(randomColor());
    }

    // return that array;
    return arr;
}

function randomColor() {
    // pick a "red" from 0 to 255 
    var r = Math.floor(Math.random() * 256);

    // pick a "green" from 0 to 255
    var g = Math.floor(Math.random() * 256);

    // pick a "blue" from 0 to 255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}