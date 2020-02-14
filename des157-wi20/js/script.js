function setup() {
    var myCanvas = createCanvas(800, 250);
    frameRate(8);
    noStroke();
    background(random(255), random(255), random(255));
    myCanvas.parent(mySketch);
  }
  function draw() {

    variableEllipse(mouseX, mouseY, pmouseX, pmouseY);
  }
  
  function variableEllipse(var x, var y, var px, var py) {
    var speed = abs(x-px) + abs(y-py);
    stroke(speed);
    ellipse(x, y, speed, speed);
  }