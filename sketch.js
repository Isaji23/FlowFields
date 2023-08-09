let sliderSeed;
let sliderNoiseScale;
let sliderSpeed;

// array that stores all the particles
let particles = [];
const numParticles = 15000;

let speed = 1;
let seed;

function setup() {
  createCanvas(600, 600);
  sliderSeed = createSlider(0, 100, 0);
  sliderNoiseScale = createSlider(0.01, 0.05, 0.01, 0.01);
  sliderSpeed = createSlider(1, 5, 1);
  // loop that sets a random position for each particle
  for(let i = 0; i < numParticles; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  
  stroke(255);
  strokeWeight(1.5);
}

function draw() {
  /*
  if(frameCount === 1) {
    capturer.start();
  }
  */
  // we give an alpha as parameter so that the background is faded and you get a trail effect
  background(0, 10);

  seed = sliderSeed.value();
  noiseSeed(seed);
  
  let noiseScale = sliderNoiseScale.value();
  
  speed = sliderSpeed.value();
  
  // loop that draws a point in the position of each particle
  for(let i = 0; i < numParticles; i++) {
    let particle = particles[i];
    point(particle.x, particle.y);
    
    // use of noise function to get the noise value of each particle
    let n = noise(particle.x * noiseScale, particle.y * noiseScale);
    
    // we map each noise value to 0 and 2pi to get the degrees
    let a = TAU * n; // TAU = 2 * pi
    
    particle.x += cos(a) * speed;
    particle.y += sin(a) * speed;
    // if the particle is offScreen we give it a new random position in the canvas
    
    if(!onScreen(particle)) {
      particle.x = random(width);
      particle.y = random(height);
    }

    
  }

  /*
  if(frameCount < 24) {
    capturer.capture(canvas);
  } else if (frameCount === 24) {
    capturer.save();
    capturer.stop();
  }
  */
}

// function that checks if a particle has gone offScreen, it receives a vector as parameter
function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function mouseReleased() {
  console.log(seed);
}

function keyPressed() {
  const options = {
    units: "seconds",
    delay: 7
  }
  if(key == " ") {
    saveGif("noiseFlowField.gif", 5, options)
  }
}