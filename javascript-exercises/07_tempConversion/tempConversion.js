const convertToCelsius = function(fahrenheitTemperatures) {
  let f = fahrenheitTemperatures;
  let c = (f - 32) * 5 / 9;
  c = parseFloat(c.toFixed(1));
return c;
};

const convertToFahrenheit = function(celsiusTemperatures) {
  let c = celsiusTemperatures;
  let f = c * 9 / 5 + 32;
  f = parseFloat(f.toFixed(1));
  return f;
};

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
