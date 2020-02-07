function setup() {
    var myCanvas = createCanvas(800, 250);
    frameRate(8);
    noStroke();
    background(random(255), random(255), random(255));
    myCanvas.parent(mySketch);
  }
  
  function draw() {
    if(mouseIsPressed) {
      fill(0);
    } else {
      fill(random(255), random(255), random(255), random(255));
    }
    var circSize = random(200);
    ellipse(mouseX, mouseY, circSize, circSize);
}