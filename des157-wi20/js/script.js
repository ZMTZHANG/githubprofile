function setup() {
    var myCanvas = createCanvas(800, 250);
    frameRate(8);
    noStroke();
    background(random(255), random(255), random(255));
    myCanvas.parent(mySketch);
  }
  function draw() {
    var bar = mouseX / barWidth;
    if (bar != lastBar) {
      var barX = bar * barWidth;
      fill(barX, mouseY, 77);
      rect(barX, 0, barWidth, height, 10);
      lastBar = bar;
  }