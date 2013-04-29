var FRAMES_PER_SECOND = 60;
var OPACITY_TWEEN_VALUE = 0.02;

/* SIMPLE LINEAR FADE */

function fadeOut(obj) {
  obj.style.opacity = parseFloat(obj.style.opacity, 10) - OPACITY_TWEEN_VALUE;
}

function fadeIn(obj) {
  obj.style.opacity = parseFloat(obj.style.opacity, 10) + OPACITY_TWEEN_VALUE;
}

// fading from 1 => 2
function setStart(obj1, obj2) {
  // in case opacities don't exist yet, reset them
  obj1.style.opacity = 1;
  obj2.style.opacity = 0;
  // obj1.style.zIndex = 1;
  // obj2.style.zIndex = 0;
}

function setEnd(obj1, obj2) {
  obj1.style.opacity = 0;
  obj2.style.opacity = 1;
  // obj1.style.zIndex = 0;
  // obj2.style.zIndex = 1;
}

// both obj1 and obj2 must have the same position for this to work
// and obj1 must have a higher z-index to start
function crossFade(obj1, obj2) {
  setStart(obj1, obj2);
  
  var timer1 = setInterval(function(){ fadeOut(obj1); }, 1000 / FRAMES_PER_SECOND);
  var timer2 = setInterval(function(){ fadeIn(obj2); }, 1000 / FRAMES_PER_SECOND);

  setTimeout(function(){ clearInterval(timer1); clearInterval(timer2); setEnd(obj1, obj2); }, 1/((OPACITY_TWEEN_VALUE * FRAMES_PER_SECOND) / 1000));
}


/* EASING FUNCTIONS */

/* NOT WORKING RIGHT NOW! */

// adapted from http://stackoverflow.com/questions/4880860/ease-out-using-settimeout
// time passed and total time have to be the same unit (e.g. seconds)
// returns 0 - 1 based on timePassed value with an "ease in ease out" behavior
function simpleEasing(timePassed, totalTime) {
  return (1 - Math.cos((timePassed / totalTime) * Math.PI)) / 2;
}

function crossFadeEase(obj1, obj2, durationInSeconds) {
  setStart(obj1, obj2);
  var framesNeeded = durationInSeconds * FRAMES_PER_SECOND;
  var timeStepInMS = (1 / FRAMES_PER_SECOND) * 1000;
  var currentTimeInMS = 0;

  while(framesNeeded > 0) {
    currentTimeInMS = parseFloat(currentTimeInMS, 10) + timeStepInMS;

    var newOutVal = 1 - simpleEasing(currentTimeInMS, durationInSeconds * 1000);
    var newInVal = simpleEasing(currentTimeInMS, durationInSeconds * 1000);

    /* The values are correct, but how do we translate these values to time
        in Javascript?? Not working so well since callbacks can't deal with
        arguments (i.e. for setTimeout)
    */
    // console.log("Time: " + currentTimeInMS + ", New Out Val: " + newOutVal);
    // console.log("Time: " + currentTimeInMS + ", New In Val: " + newInVal);

    // var outClass = new FadeOutEaseClass(obj1, newOutVal);
    // var inClass = new FadeInEaseClass(obj2, newInVal);

    // setTimeout( outClass.fadeOutEase, currentTimeInMS);
    // setTimeout( inClass.fadeInEase, currentTimeInMS);

    framesNeeded -= 1;
  }
}

// function FadeOutEaseClass(obj, newValue) {
//   this.obj = obj;
//   var thisObj = this.obj;
//   this.newValue = newValue;
//   parentThis = this;

//   function fadeOutEase(parentThis) {
//     console.log(parentThis);
//     this.obj.style.opacity = parseFloat(this.newValue, 10);
//   }
// }

// function FadeInEaseClass(obj, newValue) {
//   var thisObj = obj;
//   var thisNewValue = newValue;
//   this.fadeInEase = function (thisObj, thisNewValue) {
//     thisObj.style.opacity = parseFloat(thisNewValue, 10);
//   };
// }


