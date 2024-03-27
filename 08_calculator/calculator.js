const add = function(a ,b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const sum = function(array) {
  return array.reduce((sum, current)=> sum+current, 0);
};

const multiply = function(array) {
  return array.reduce((product, current)=> product*current, 1);
};

const power = function(base, power) {
  return Math.pow(base, power);
};

const factorial = function(num) {
  if(num<0) {
    return;
  }
  if(num === 0) {
    return 1;
  }
  let product = 1;
  while(num>0) {
    product *= num;
    num--;
  }
  return product;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
