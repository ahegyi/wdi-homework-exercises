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

// type is the kind of input field to validate
// valid is whether or not
function handleError(block) {
  var inputField = block.children("input");
  var entry = inputField.val();
  var type = inputField.attr("id");
  var valid = false;
  var currentError = "";

  var errors = {
    "name" : "Your name must be at least 3 characters long.",
    "age" : "Please enter a valid age (whole numbers only!)",
    "phone" : "Please enter a ten digit North American phone number.",
    "email" : "This is not a valid e-mail address - check your typing!"
  };

  switch (type) {
    case "name":
      valid = validateName(entry);
      break;
    case "age":
      valid = validateAge(entry);
      break;
    case "phone":
      valid = validatePhone(entry);
      break;
    case "email":
      valid = validateEmail(entry);
      break;
  }

  block.children('span.error').remove();

  if (!valid) {
    block.append('<span class="error">' + errors[type] + '</span>');
  }

}

$(document).ready( function () {

  $('input').on('blur', function() {
    handleError($(this).parent());
  });

  $('form').on('submit', function (e) {
    e.preventDefault();
    var numErrors = $('.error').length;
    
    if (numErrors === 0) {
      displayContent();
    }
  });

});

function displayContent() {

  $(".output").empty();

  $('.block').each(function(){
    var label = $(this).children('label').html();
    var entry = $(this).children('input').val();

    $(".output").append("<p>" + label + ": " + entry + "</p>");

  });
}

