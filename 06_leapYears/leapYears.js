const leapYears = function(year) {
    //if divisible, give 1, else 0.
    let divisibleBy400 = !(year%400);
    let divisibleBy100 = !(year%100);
    let divisibleBy4 = !(year%4);
    if (divisibleBy400) {
        return true;
    } else if (divisibleBy100) {
        return false;
    } else if (divisibleBy4) {
        return true;
    } else {
        return false;
    }
};

// Do not edit below this line
module.exports = leapYears;
