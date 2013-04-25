function Triangle(sideA, sideB, sideC) {
  this.sideA = parseFloat(sideA, 10);
  this.sideB = parseFloat(sideB, 10);
  this.sideC = parseFloat(sideC, 10);
  this.perimeter = function() {
    return this.sideA + this.sideB + this.sideC;
  };
  this.validTriangle = function() {
    if (this.sideA <= 0 || this.sideB <= 0 || this.sideC <= 0) {
      return false;
    }
    return ((this.sideA + this.sideB > this.sideC) && (this.sideB + this.sideC > this.sideA) && (this.sideC + this.sideA > this.sideB));
  };
  // Formula from http://mste.illinois.edu/dildine/heron/triarea.html
  // This formula is attributed to Heron of Alexandria
  //   but can be traced back to Archimedes.
  // Area = SQRT(s(s-a)(s-b)(s-c)),
  // where s=(a+b+c)/2 or perimeter/2
  this.area = function() {
    s = this.perimeter() / 2;
    return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC) );
  };
}

var sampleTriangle = new Triangle(3, 4, 5);

lengths = sampleTriangle.sideA.toString() + ", " + sampleTriangle.sideB.toString() + ", and " + sampleTriangle.sideC.toString();
console.log("The area of a triangle with sides of length " + lengths + " is " + sampleTriangle.area() + ".");