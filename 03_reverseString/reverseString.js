const reverseString = function(string) {
    let stringArray = string.split("");
    let rversedString = "";
    for(let i = stringArray.length - 1; i >= 0; i--) {
        rversedString += stringArray[i];
    }
    return rversedString;
};


// Do not edit below this line
module.exports = reverseString;
