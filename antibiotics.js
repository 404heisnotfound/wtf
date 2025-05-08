class Bacteria {
  constructor(x, y, radius = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  // Functtion used to draw the bacteria on the petri dish canvas
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#E57373';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#C62828';
    ctx.stroke();
  }

  // Increases the radius of the circle in specified increments
  grow(rate) {
    this.radius += rate / 500;
  }
}

let bacteriaArray = []; 
let rate = 0;
let myInterval; //Interval used to determine how long the simulation runs

// Function used to calculate the random coordinates for bacteria and add them to the array
function initialiseBacteria(count) {
  bacteriaArray = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * (500 - 75 + 1)) + 75; //random x coord
    const y = Math.floor(Math.random() * (500 - 75 + 1)) + 75; //random y coord
    bacteriaArray.push(new Bacteria(x, y)); 
  }
}

// Draw all bacteria on the canvas
function drawBacteria() {
  const canvas = document.getElementById('circle');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bacteriaArray.forEach((bacteria) => {
    bacteria.grow(rate);
    bacteria.draw(ctx);
  });
}

// Calculate the growth rate based on temperature
function growthRate() {
  const temp = Number(document.getElementById('temp').value);

  if (temp < 36) {
    rate = 3 * (temp - 15);
  } 
  else {
    rate = (-1 * ((temp - 37) * (temp - 37))) + 64;
  }
}

// Code used to start drawing circles and disable appropriate buttons to improve user experience
function startSimulation() {
  clearInterval(myInterval);

  const startButton = document.getElementById("startbutton");
  startButton.innerHTML = "Running...";
  startButton.disabled = true;
  startButton.style.background = "linear-gradient(to right, #FFD700, #FFA500)";

  const resetButton = document.getElementById("resetbutton");
  resetButton.disabled = true;
  resetButton.style.color = "black";

  const multiButton = document.getElementById("removeMulti");
  multiButton.disabled = true;

  myInterval = setInterval(drawBacteria, 20);
}

// Stop the simulation after the specified time
function timeLength() {
  const time = Number(document.getElementById('timeslider').value) * 150;

  setTimeout(() => {
    clearInterval(myInterval);
    const startButton = document.getElementById("startbutton");
    startButton.innerHTML = "Start";
    startButton.disabled = true;
    startButton.style.background = "linear-gradient(to right, #428139, #33f819)";

    const resetButton = document.getElementById("resetbutton");
    resetButton.disabled = false;

    const multiButton = document.getElementById("removeMulti");
    multiButton.disabled = false;
  }, time);
}

// Reset the canvas and simulation
function resetCanvas() {
  clearInterval(myInterval);
  initialiseBacteria(200); // Reset bacteria
  const canvas = document.getElementById('circle');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const startButton = document.getElementById("startbutton");
  startButton.innerHTML = "Start";
  startButton.disabled = false;
  startButton.style.background = "linear-gradient(to right, #428139, #33f819)";
}

// Initialise bacteria on page load
document.addEventListener('DOMContentLoaded', () => {
  initialiseBacteria(200); // Create 200 bacteria
});








function removeMulti () {
  var antiCanvas = document.getElementById('anti'); //used to clear the antibiotic circles
  var antiCtx = antiCanvas.getContext('2d');
  antiCtx.clearRect(0, 0, antiCanvas.width, antiCanvas.height);

  var antiCirclesCanvas = document.getElementById('antiCircles'); //used to clear the antibiotic circles
  var antiCirclesCtx = antiCirclesCanvas.getContext('2d');
  antiCirclesCtx.clearRect(0, 0, antiCirclesCanvas.width, antiCirclesCanvas.height);
}

function antiBac(){
  var canvas = document.getElementById('antiCircles');
  if (canvas.getContext)
  
  {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(250, 115, A, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2d495b';
    ctx.stroke();
  }

  {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(385, 249, B, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2d495b';
    ctx.stroke();
  }

  {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(250, 385, C, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2d495b';
    ctx.stroke();
  }

  {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(117, 249, D, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2d495b';
    ctx.stroke();
  }
}


function placeMulti() {
  // Get the selected values from the dropdown menus
  const dropdownA = document.getElementById('dropdownA').value;
  const dropdownB = document.getElementById('dropdownB').value;
  const dropdownC = document.getElementById('dropdownC').value;
  const dropdownD = document.getElementById('dropdownD').value;


  // Assign the selected values to the circle radii
  A = parseInt(dropdownA, 10);
  B = parseInt(dropdownB, 10);
  C = parseInt(dropdownC, 10);
  D = parseInt(dropdownD, 10);

  const antiCanvas = document.getElementById('antiCircles');
  const antiCtx = antiCanvas.getContext('2d');
  antiCtx.clearRect(0, 0, antiCanvas.width, antiCanvas.height);

  // Redraw the circles with the updated radii
  antiBac();
  discImage();
}

function validateAndStart() {
  const tempInput = document.getElementById("temp").value;
  const timeInput = document.getElementById("timeslider").value;

  if (tempInput === "" || isNaN(tempInput)) {
    alert("Please enter a valid temperature before starting the simulation.");
    return; // Used to make sure there if a temp input
  }

  if (timeInput === "0" || isNaN(timeInput)) {
    alert("Please set the time slider to a valid value before starting the simulation.");
    return; //Used to make sure there is a time input from the user
  } 

  //If there is valid inputs, then call these functions
  growthRate("temp");
  startSimulation();
  timeLength();
  rCoord();
}