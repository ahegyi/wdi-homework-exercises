//Validates that name is an integer between 0 and 125
function validateAge (age){
  return age % 1 === 0 && age > 0 && age < 125;
}