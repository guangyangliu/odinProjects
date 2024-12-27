const sumAll = function(start, end) {
    if(typeof(start) !== typeof(end) || 
        typeof(start) !== typeof(1) || 
        start < 0 || 
        end < 0) {
            return 'ERROR';
        }
    let sum = 0;
    if(start > end) {
        let temp = start;
        start = end;
        end = temp;
    }
    while(start<= end) {
        sum += start;
        start++;
    }
    return sum;
};

// Do not edit below this line
module.exports = sumAll;
