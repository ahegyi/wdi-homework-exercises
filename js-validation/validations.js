// validateName returns true if "name" has at least 3 characters
function validateName(name) {
  return (typeof(name) === "string" && name.length >= 3);
}