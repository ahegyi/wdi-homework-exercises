// validateName returns true if "name" has at least 3 characters
function validateName(name) {
  return (typeof(name) === "string" && name.length >= 3);
}

// Validates that age is an integer between 0 and 125
function validateAge (age){
  return age % 1 === 0 && age > 0 && age < 125;
}

// Validates a valid email
function validateEmail (email){
  var regEx = /\b[^@]+@[^@]+\.[^@]+\b/;
  return regEx.test(email);
}