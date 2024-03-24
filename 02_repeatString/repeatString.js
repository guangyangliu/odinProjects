const repeatString = function(string, num) {
if(num < 0) {
    return 'ERROR';
}
let repeatedString = "";
while(num) {
repeatedString += string;
num --;
}
return repeatedString;
};

// Do not edit below this line
module.exports = repeatString;
