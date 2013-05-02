// validateName returns true if "name" has at least 3 characters
function validateName(name) {
  return (typeof(name) === "string" && name.length >= 3);
}

// Validates that age is an integer between 0 and 125
function validateAge (age){
  return age % 1 === 0 && age > 0 && age < 125;
}

function validatePhone(phone) {
  // Thanks to http://regexlib.com/REDetails.aspx?regexp_id=1865 for the NANP compatible regex
  var phoneRegex = /(?:\([2-9][0-8]\d\)\ ?|[2-9][0-8]\d[\-\ \.\/]?)[2-9]\d{2}[- \.\/]?\d{4}\b/;

  var phoneDigits = phone.replace(/[\D]/g,"");

  if (typeof(phone) === "string" && phoneRegex.test(phoneDigits)) {
    return true;
  }
  else {
    return false;
  }
}

// Validates a valid email
function validateEmail (email){
  var regEx = /\b[^@]+@[^@]+\.[^@]+\b/;
  return regEx.test(email);
}
