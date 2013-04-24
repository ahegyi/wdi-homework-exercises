ORDINAL_EXCEPTIONS = {
  "1": "st",
  "2": "nd",
  "3": "rd",
  "11": "th",
  "12": "th",
  "13": "th"
};

function ordinalize(intNum) {
  intString = intNum.toString();
  intNum = parseInt(intNum, 10); // just force it!
  ordinalized = "";

  if (intNum <= 0) {
    ordinalized = "";
  }
  else if (intNum < 10) {
    if (intNum < 4) {
      ordinalized = intString + ORDINAL_EXCEPTIONS[intString];
    }
    else {
      ordinalized = intString + "th";
    }
  }
  else { // two digit number
    lastTwoDigits = intString.slice(intString.length - 2, intString.length);
    lastDigit = intString[intString.length - 1];

    switch (lastDigit) {
      case "1":
        if (lastTwoDigits === "11") {
          ordinalized = intString + ORDINAL_EXCEPTIONS[lastTwoDigits];
          break;
        } 
      case "2":
        if (lastTwoDigits === "12") {
          ordinalized = intString + ORDINAL_EXCEPTIONS[lastTwoDigits];
          break;
        } 
      case "3":
        if (lastTwoDigits === "13") {
          ordinalized = intString + ORDINAL_EXCEPTIONS[lastTwoDigits];
          break;
        } 
        // if none of the if statements are hit above, then this runs
        ordinalized = intString + ORDINAL_EXCEPTIONS[lastDigit];
        break;
      default:
        ordinalized = intString + "th";
        break;
    }

  }

  return ordinalized;
}