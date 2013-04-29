var img = document.getElementById('walking-cat');
var imgWidth = parseInt(img.width, 10);
var docWidth = parseInt(document.width, 10);
var TWEEN_VALUE = 3;
var FRAMES_PER_SECOND = 60;

var currentTweenValue = TWEEN_VALUE;
var timerRight = null;

// function animate() {
//   var imgLeft = parseInt(img.style.left, 10);
//   // movin left
//   if (imgLeft >= (docWidth - imgWidth)) {
//     img.style.left = imgLeft - 3;
//   }
//   // movin right
//   else {
//     img.style.left = imgLeft + 3;
//   }
// }

function getLeft() {
  return parseInt(img.style.left, 10);
}

// function moveLeft() {
//   img.style.left = getLeft() - TWEEN_VALUE;
// }

function moveRight() {
  if (getLeft() < (docWidth - (imgWidth/2))) {
    img.style.left = getLeft() + currentTweenValue;
  }
  // wraparound
  else {
    img.style.left = -1 * (2 * imgWidth/3);
  }
}

function updateSpeed() {
  var speedEl = document.getElementById("currentSpeed");
  var speedAsCatLengthsPerSecond = parseInt(currentTweenValue, 10) / parseInt(TWEEN_VALUE, 10);
  // if moving...
  if (timerRight) {
    speedEl.innerText = speedAsCatLengthsPerSecond + " cat lengths per second";
  }
  else {
    speedEl.innerText = "0 cat lengths per second (will be " + speedAsCatLengthsPerSecond + " cats/sec upon start)";
  }
}

// function animate(leftPos) {
//   if (leftPos >= (docWidth - imgWidth)) {
//     moveLeft();
//   }
//   else {
//     moveRight();
//   }
// }

// function animateFoReal() {
//   animate(getLeft());
// }

var stopRightCallback = function () {
  if (timerRight !== null) {
    clearInterval(timerRight);
    timerRight = null;
  }
  updateSpeed();
};

// var stopLeft = function() {
//   clearInterval(timerLeft);
// };


// To get time from position: 1 / (pixels per second / pixels) => seconds
// var secondsToCross = 1 / ((TWEEN_VALUE * FRAMES_PER_SECOND) / (docWidth - imgWidth));

// var moveLeftCallback = function() {
//   setInterval(moveLeft, 1000 / FRAMES_PER_SECOND);
// };
var moveRightCallback = function () {
  // only set new interval if doesn't already exist
  if (timerRight === null) {
    timerRight = setInterval(moveRight, 1000 / FRAMES_PER_SECOND);
  }
  updateSpeed();
};

var start = document.getElementById("start");
start.onclick = moveRightCallback;

var stop = document.getElementById("stop");
stop.onclick = stopRightCallback;

function increaseTween() {
  currentTweenValue = parseInt(currentTweenValue, 10) + parseInt(TWEEN_VALUE, 10);
  updateSpeed();
}

var faster = document.getElementById("faster");
faster.onclick = increaseTween;

function decreaseTween() {
  newTweenValue = parseInt(currentTweenValue, 10) - parseInt(TWEEN_VALUE, 10);
  if (newTweenValue < 0) {
    currentTweenValue = 0;
  }
  else {
    currentTweenValue = newTweenValue;
  }
  updateSpeed();
}

var slower = document.getElementById("slower");
slower.onclick = decreaseTween;



// setTimeout(stopRight, secondsToCross * 1000);

// var timerLeft = setTimeout(moveLeftCallback, secondsToCross * 1000);
// setTimeout(stopLeft, secondsToCross * 1000);