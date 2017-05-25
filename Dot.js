function Dot(idx, amt, cName) {  
  var index = idx;
  var amount = amt;
  this.cName = cName;
  
  // set these null so that they can be set the first time around
  var x = null;
  var y = null;
  var col = color(255);
  var size = 4

  // this handles updating any animated variables
  this.update = function() {
    x.update();
    y.update(); 
  }
  
  this.display = function(){
    push();
    noStroke();
    fill(col);
    ellipse(x.value, y.value, size, size);
    cursor(HAND);
    
    // if the distance from the mouse to the data point is within 10 pixels
    if (dist(mouseX, mouseY, x.value, y.value) < 3) {
      textAlign(CENTER);
      text(nf(amount, 0, 1), x.value, y.value - 7);
      col = color(255, 252, 0);
      size=9
      text(cName, x.value, y.value-18)
      
      textAlign(RIGHT, TOP);
      textSize(15)
      fill(0)
      text(cName, bounds.right-10, bounds.top+145)
    
      fill(255, 252, 0);
      noStroke();
      rect(bounds.left, bounds.top+10, bounds.right-bounds.left, 130);
 
      var rowCountry = dataTable.findRow(cName, 'Country Name')
      var dataCountry = [];
      for (var i = 0; i < years.length; i++){
        dataCountry.push(rowCountry.getNum(String(years[i])));
      }
      
      var rankCountry = [];
      for (var i = 0; i < years.length; i++){
        rankCountry.push(rowCountry.getNum("R"+String(years[i])));
      } 
      
      
      var minCountry = -10
      var maxCountry = 150
      
      var xs=[];
      var ys=[];
        
      for (var i = 0; i < years.length; i++){     
        var xCountry=map(years[i], 2003, 2012, bounds.left+20, bounds.right-20);
        var yCountry=map(dataCountry[i], minCountry, maxCountry, bounds.top+125, bounds.top+20);
        xs.push(xCountry)
        ys.push(yCountry)
        fill(0);
        textFont(lightR);
        textSize(8)
        textAlign(CENTER)
        noStroke();
        text(String(years[i]), xCountry, bounds.top+125)
        ellipse(xCountry, yCountry, 8, 8);
        text(nf(dataCountry[i], 0, 1)+"  #"+rankCountry[i], xCountry, yCountry-13)
      }
      
      for (var i = 0; i < years.length-1; i++){
        stroke(0);
        strokeWeight(1)
        line(xs[i],ys[i],xs[i+1],ys[i+1])
      }
        
      
      
      
       
      
    }else{
      col = color(255)
      size=4
    }
    pop();
  }
  
  
  
  // a function to set the 'index' (where it is in the array) 
  // which we can use to determine the x-position 
  this.setIndex = function(idx) {
    index = idx;
    // use setTarget() instead of x= so that it will animate
    var newX = map(index, 0, dataCount, bounds.left, bounds.right);
    // if this is the first time it's being set, create the SoftFloat
    if (x == null) {
      x = new SoftFloat(newX);
    } else {
      x.setTarget(newX);
    }
  }

  // this sets the actual value for this data point
  this.setAmount = function(amt) {
    amount = amt;
    // use setTarget() instead of y= so that it will animate
    var newY = map(amt, dataMin, dataMax, bounds.bottom-30, bounds.top+150);
    if (y == null) {
      y = new SoftFloat(newY);
    } else {
      y.setTarget(newY);
    }
  }
  
  // function to get the data point's value so it can be sorted
  this.getAmount = function() {
    return amount;
  }

      
 
 
  this.move = function(){
    var d =dist(mouseX, mouseY, x.value, y.value);
    if (d < 10){
      this.setIndex(10);
    }else{
      this.setAmount(0);
    }
  }
  
  // because these are inside DataPoint, not inside another function,
  // this code will run when "new DataPoint(idx, amt)" is called, 
  // setting the initial index and amount to the numbers passed in. 
  this.setIndex(idx);
  this.setAmount(amt);
}