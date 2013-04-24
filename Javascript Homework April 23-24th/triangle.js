var sampleTriangle = {
  sideA: 3,
  sideB: 4,
  sideC: 5
};

// Formula from http://mste.illinois.edu/dildine/heron/triarea.html
// This formula is attributed to Heron of Alexandria
//   but can be traced back to Archimedes.
// Area = SQRT(s(s-a)(s-b)(s-c)),
// where s=(a+b+c)/2 or perimeter/2

// Assume triangle is a valid triangle
function area(triangle) {
  sA = parseFloat(triangle.sideA, 10);
  sB = parseFloat(triangle.sideB, 10);
  sC = parseFloat(triangle.sideC, 10);
  if (sA <= 0 || sB <= 0 || sC <= 0) {
    return 0;
  }
  perimeter = sA + sB + sC;
  s = perimeter / 2;

  return Math.sqrt(s * (s - sA) * (s - sB) * (s - sC) );
}

lengths = sampleTriangle.sideA.toString() + ", " + sampleTriangle.sideB.toString() + ", and " + sampleTriangle.sideC.toString();
console.log("The area of a triangle with sides of length " + lengths + " is " + area(sampleTriangle) + ".");