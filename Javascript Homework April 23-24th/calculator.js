function calculate(expression) {
  return eval(expression);
}

function submitByEnter() {
  if (window.event.keyCode === 13) {
    calc();
  }
}

function calc() {
  alert(
    calculate(
      document.getElementById('expression').value
    )
  );
}

