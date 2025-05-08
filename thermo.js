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
    this.radius += rate / 1200;
  }

  // Calculates a proportional surface area of bacteria in canvas,
  // inorder to visualse the growth rate
  getSurfaceArea() {
    return (Math.PI * this.radius * this.radius) / 200;
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

  let totalSurfaceArea = 0;
  bacteriaArray.forEach((bacteria) => {
    bacteria.grow(rate);
    bacteria.draw(ctx);
    totalSurfaceArea += bacteria.getSurfaceArea()/80;
  });
  // Calculates the total surface area of the circles drawn on the canvas 
  document.getElementById("surfaceArea").innerHTML = "Surface Area: " + totalSurfaceArea.toFixed(2) + " cm²";

}

// Calculate the growth rate based on temperature
function growthRate() {
  const temp = Number(document.getElementById('temp').value);

  if (temp<69){
    rate = 3*(temp-48);
  }
  else{
    rate = (-0.65*((temp-70)*(temp-70)))+64;
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

  const downloadButton = document.getElementById("downloadBtn");
  downloadButton.style.pointerEvents = "none"; 
  downloadButton.style.opacity = "0.5"; 

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

    const downloadButton = document.getElementById("downloadBtn");
    downloadButton.style.pointerEvents = "auto";
    downloadButton.style.opacity = "1"; 
    
  }, time);
}

// Reset the canvas and simulation
function resetCanvas() {
  clearInterval(myInterval);
  initialiseBacteria(200); // Reset bacteria
  const canvas = document.getElementById('circle');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("surfaceArea").innerHTML = "Surface Area: 0.00 cm²"

  const startButton = document.getElementById("startbutton");
  startButton.innerHTML = "Start";
  startButton.disabled = false;
  startButton.style.background = "linear-gradient(to right, #428139, #33f819)";
}

// Initialise bacteria on page load
document.addEventListener('DOMContentLoaded', () => {
  initialiseBacteria(200); // Create 200 bacteria
});


function generateDownload() {
  // Gather variables used in the simulation
  const temp = document.getElementById('temp').value || "N/A"; // Temperature
  const time = document.getElementById('timeslider').value || "N/A"; // Experiment duration
  const area = document.getElementById('surfaceArea').innerText || "N/A"; // Surface area
  const now = new Date(); // Current date and time
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Create the content for the .txt file
  const content = 
`Data for your current simulation
Date: ${day}/${month}/${year} ${hours}:${minutes}
-----------------
Type of Bacteria: Thermophile
Optimum Temperature ≈ 69°C
Thermophiles are bacteria that thrive in lower temperatures, with their temperature range between 49°C and 79°C.

Variables used in Simulation:
Temperature of the Experiment = ${temp}°C
Length of Experiment = ${time} hours

Surface Area of Bacteria Growth = ${area}
`;
  // Encoding the content into readble format using characterset
  const encodedContent = encodeURIComponent(content);
  const dataUrl = `data:text/plain;charset=utf-8,${encodedContent}`;

  // Linking the download button to the txt file
  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.href = dataUrl;
  downloadBtn.download = "simulation_data.txt"; 
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

  // //If there is valid inputs, then call these functions
  growthRate("temp");
  startSimulation();
  timeLength();
  rCoord();
}

