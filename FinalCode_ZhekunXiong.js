var data = [];
var dataCount;
var dataMin = -10;
var dataMax = 150;

var country = []

var dataTable;
var countryCode = "ALL";

var bounds = { };
var slider;
var buttonRegion;
var buttonRank;

var colOne
var colTwo
var colThree
var colFour
var colFive
var colSix
var col
var textColor

var years = [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012]
var year


var mode = false;


function preload() {
  dataTable = loadTable("data/WPF.csv", "header");
  lightR = loadFont("font/Roboto-Light.ttf");
  boldR = loadFont("font/Roboto-Bold.ttf");
}


function setup() { 
  canvas = createCanvas(960, 540);
  
  bounds.left = 50;
  bounds.right = width - 50;
  bounds.top = 60;
  bounds.bottom = height - 60;
 
  // Create Slider of years
  slider = createSlider(2003, 2012, 2003, 1);
  slider.position(bounds.left, 515);
  slider.size(width-2*bounds.left);
  slider.changed(showYear);
  
  // Create Buttons
  buttonRegion = createButton('Regions');
  //buttonRegion.class("BUTTON")
  buttonRegion.mousePressed(showRegion);
  buttonRegion.position(width/2-65, 450)
  buttonRegion.style("background-color", "ff3c6f");
  buttonRegion.style("color", "ffffff");
  buttonRegion.mouseOver(changeStyle1);
  buttonRegion.mouseOut(revertStyle1)
  
  buttonRank = createButton('Ranking');
  buttonRank.mousePressed(showRank);
  buttonRank.position(width/2+5, 450)
  buttonRank.style("background-color", "4ac5c9")
  buttonRank.style("color", "ffffff")
  buttonRank.mouseOver(changeStyle2);
  buttonRank.mouseOut(revertStyle2)
  
  dataCount = 152;
  for (var i = 2; i < dataCount; i++) {
    var row = dataTable.findRow(String(i), 'No')
    var columnName = String(slider.value());
    var countryName = row.getString('Country Name')
    data.push(new Dot(i, row.getNum(columnName), countryName));
  }
 
  colOne=color(0, 220, 212)
  colTwo=color(0, 220, 212)
  colThree=color(0, 220, 212)
  colFour=color(0, 220, 212)
  colFive=color(0, 220, 212)
  colSix=color(0, 220, 212)
  col=color(0, 220, 212)
  textColor=color(0, 220, 212)
  
  textFont(boldR);
  textSize(10);
  textAlign(CENTER);
  fill(255)
  year = createElement("h6", String(slider.value()))
  xYear= map(slider.value(), 2003, 2012, bounds.left, bounds.right-17)
  year.position(xYear,515)
}



function changeStyle1(){
  buttonRegion.style("background-color", "ff41eb")
}

function revertStyle1(){
  buttonRegion.style("background-color", "ff3c6f")
}

function changeStyle2(){
  buttonRank.style("background-color", "00eaff")
}

function revertStyle2(){
  buttonRank.style("background-color", "4ac5c9")
}

function showRegion(){
  for (var i = 2; i < dataCount; i++){
    var row = dataTable.findRow(String(i), 'No')
    data[i-2].setIndex(row.getNum("Region")) 
  }
  
  colOne=color(255, 194, 205)
  colTwo=color(255, 160, 181)
  colThree=color(255, 137, 166)
  colFour=color(255, 96, 137)
  colFive=color(255, 60, 84)
  colSix=color(255, 0, 68)
  col=color(255, 75, 223)
  textColor=color(255)
  
}

function showRank(){
  for (var i = 2; i < dataCount; i++){
    var row = dataTable.findRow(String(i), 'No');
    data[i-2].setIndex(row.getNum("R"+String(slider.value())))
  } 
  
  colOne=color(0, 220, 212)
  colTwo=color(0, 220, 212)
  colThree=color(0, 220, 212)
  colFour=color(0, 220, 212)
  colFive=color(0, 220, 212)
  colSix=color(0, 220, 212)
  col=color(0, 220, 212)
  textColor=color(0, 220, 212)
}

function showYear(){
  for (var i = 2; i < dataCount; i++){
    var row = dataTable.findRow(String(i), 'No')
    var columnName = String(slider.value());
    data[i-2].setAmount(row.getNum(columnName))
    //data[i].clicked();
    //data[i].move();
  }
  
  year.html(String(slider.value()))
  xYear= map(slider.value(), 2003, 2012, bounds.left, bounds.right-17)
  year.position(xYear,515)
}


function overdot(){
  bounds.top=300
}




function draw() {
  background(255);
 
  // put a white rectangle behind the plot
  fill(col);
  noStroke();
  rectMode(CORNERS);
  rect(0, bounds.top, width, bounds.bottom+30);
  
  bound1 = map(17.5, 0, dataCount, bounds.left, bounds.right)
  bound2 = map(60.5, 0, dataCount, bounds.left, bounds.right)
  bound3 = map(82.5, 0, dataCount, bounds.left, bounds.right)
  bound4 = map(98.5, 0, dataCount, bounds.left, bounds.right)
  bound5 = map(108.5, 0, dataCount, bounds.left, bounds.right)

  // Show Regions
  rectMode(CORNER);
  fill(colOne)
  rect(bounds.left, bounds.top, bound1, bounds.bottom-bounds.top+30)
  fill(colTwo)
  rect(bound1, bounds.top, bound2-bound1, bounds.bottom-bounds.top+30)
  fill(colThree)
  rect(bound2, bounds.top, bound3-bound2, bounds.bottom-bounds.top+30)
  fill(colFour)
  rect(bound3, bounds.top, bound4-bound3, bounds.bottom-bounds.top+30)
  fill(colFive)
  rect(bound4, bounds.top, bound5-bound4, bounds.bottom-bounds.top+30)
  fill(colSix)
  rect(bound5, bounds.top, bounds.right-bound5, bounds.bottom-bounds.top+30)  

  
  textFont(boldR);
  textSize(10);
  textAlign(CENTER);
  fill(textColor)
  
  push();
  textFont(boldR);
  textSize(10);
  textAlign(LEFT, TOP);
  fill(textColor) 
  translate(bounds.left+15, bounds.top+10)
  rotate(PI/2)
  text("East Asia&Pacific",0, 0)
  pop();
  
  push();
  textFont(boldR);
  textSize(10);
  textAlign(LEFT, TOP);
  fill(textColor);
  translate(bound1+15, bounds.top+10);
  rotate(PI/2);
  text("Europe&Central Asia",0, 0);
  pop();
  
  push();
  textFont(boldR);
  textSize(10);
  textAlign(LEFT, TOP);
  fill(textColor);
  translate(bound2+15, bounds.top+10); 
  rotate(PI/2);
  text("Latin America&Caribbean",0, 0);
  pop();

  push();
  textFont(boldR);
  textSize(10);
  textAlign(LEFT, TOP);
  fill(textColor);
  translate(bound3+15, bounds.top+10);
  rotate(PI/2);
  text("Middle East&North Africa", 0, 0);
  pop();

  push();
  textFont(boldR);
  textSize(10);
  textAlign(LEFT, TOP);
  fill(textColor);
  translate(bound4+15, bounds.top+10);
  rotate(PI/2);
  text("South Asia", 0, 0);
  pop();

  push();
  textFont(boldR);
  textSize(10);
  textAlign(LEFT, TOP);
  fill(textColor);
  translate(bound5+15, bounds.top+10);
  rotate(PI/2);
  text("Sub-Saharan Africa",0, 0);
  pop();
  
  // Title
  push();
  textFont(lightR);
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text("World Press Freedom Index", width/2, 35);
  pop();
  
  push();
  textFont(lightR);
  fill(0);
  textSize(10);
  textAlign(CENTER);
  text("How dare are you willing to say?", width/2, 50);
  pop();

  // use gray for the dots, turn off stroke
  textFont(boldR);
  textSize(10);
  data.forEach(function(entry) {
    entry.update();  // run the next animation step
    entry.display();
  });
  
  fill(255);
  textSize(8)
  text("150", bounds.left-20, bounds.top+145)
  text("Low Free", bounds.left-20, bounds.top+153)
  text("-10", bounds.left-20, bounds.bottom-33)
  text("High Free", bounds.left-20, bounds.bottom-25)
  
  stroke(255)
  line(bounds.left-20, bounds.top+158, bounds.left-20, bounds.bottom-43)
  ellipse(bounds.left-20, bounds.top+158, 3,3)
  ellipse(bounds.left-20, bounds.bottom-43,3,3)
     
}