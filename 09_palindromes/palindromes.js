const palindromes = function (string) {
    string = string.toLowerCase();
    let stringArray = string.split("");
    stringArray = stringArray.filter(char=> {
        return /[a-zA-Z0-9]/.test(char);
    });
    string = stringArray.join();

    let reverseStringArray = stringArray.reverse();
    let reverseString = reverseStringArray.join();
    return string === reverseString;
};

// Do not edit below this line
module.exports = palindromes;
