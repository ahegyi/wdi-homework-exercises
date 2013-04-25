function Calculator(expression) {
  this.sanitize = function () {
    sanitized = this.expression.replace(/[\s]/,"");
    return sanitized;
  };

  this.expression = expression.toString();
  this.sanitizedExpression = this.sanitize();

  // only works with one operator and two operands
  this.calculate = function() {
    var exp = this.sanitizedExpression;
    var operands = this.sanitizedExpression.split(/[+*\/%]/);

    if (operands.length === 2) {
      var operator = this.sanitizedExpression.split(operands[0])[1].split(operands[1])[0];
      // reset as floats
      operands[0] = parseFloat(operands[0], 10);
      operands[1] = parseFloat(operands[1], 10);

      // sometimes operator is e.g. *- if the second operand is negative, so let's account for that
      switch (operator.charAt(0)) {
        case "+":
          return operands[0] + operands[1];
        case "-":
          // this is taken care of below
          break;
        case "*":
          return operands[0] * operands[1];
        case "/":
          return operands[0] / operands[1];
        case "%":
          return parseInt(operands[0], 10) % parseInt(operands[1], 10);
        default:
          return "Unsupported operator";
      }
    }
    // take care of 'minus' action here
    else if (operands.length === 1) {
      // operands[0] here should be '-4-4' or '4-4' or something like it

      var newExp = operands[0];
      leftOperand = newExp.slice(0, newExp.lastIndexOf("-"));
      rightOperand = newExp.slice(newExp.lastIndexOf("-") + 1, newExp.length);

      result = parseFloat(leftOperand, 10) - parseFloat(rightOperand, 10);
      return result;
    }
    else {
      return "Invalid expression - use only two numbers in your expression";
    }
  };

  // // is this private??
  // function TreeNode(value, left, right) {
  //   this.value = value;
  //   this.left = left;
  //   this.right = right;
  //   return this;
  // }

  // this.buildTree = function(exp) {
  //   operands = exp.split(/[+\-*\/%]/);
  //   node = new TreeNode(operator, operands[0], operands[1]);
  //   var leftOperand = operands[0];
  //   var rightOperand = operands[1];
  //   var operator = exp.split(operands[0]).split(operands[1])[0];


  //   for (var i = 0; i < exp.length; i += 1) {
  //     var character = exp[i];
  //   }

  // };

  // // Simple calculator. Does not work with negative numbers (e.g. 4+-42)
  // // Enter your stuff like this: 4+2
  // this.calculate = function () {
  //   var exp = this.sanitizedExpression;
  //   var tree = {};

  //   for (var i = 0; i < exp.length; i += 1) {
  //     var objekt = exp[i];
  //     switch (objekt) {
  //       case "+":
  //       case "-":
  //       case "*":
  //       case "/":
  //       case "%":
  //         // operators.push
  //     }
  //   }

  //   operands = this.sanitizedExpression.split(/[+\-*\/%]/);
  //   operators = this.sanitizedExpression.split(/[\D\.]/);

  //   var result;

  //   if (operands.length > 0) {
  //     result = operands.shift();
  //   }
  //   else {
  //     result = NaN;
  //   }

  //   return result;
  // };

}


function submitByEnter() {
  if (window.event.keyCode === 13) {
    calc();
  }
}

function calc() {
  var exp = document.getElementById('expression').value;
  var calculator = new Calculator(exp);
  alert(exp + " = " + calculator.calculate());
}