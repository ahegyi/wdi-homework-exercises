// Thanks Mr. Crockford! You've saved me/my animations.

// Usage: my_object.later(1000, erase, true);
//  where "erase" is the method and true is the argument for "erase"

Object.prototype.later = function(msec, method) {
  var that = this,
      args = Array.prototype.slice.apply(arguments, [2]);
  if (typeof method === 'string') {
    method = that[method];
  }
  setTimeout(function () {
    method.apply(that, args);
  }, msec);
  return that;
};