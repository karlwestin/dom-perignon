// chai's not compatible with IE8
//
// let's write a mini version on our own :)

function assert(actual, expected){
  if(actual !== expected) {
    throw new Error("Expected " + actual + " to equal " + expected);
  }
}
