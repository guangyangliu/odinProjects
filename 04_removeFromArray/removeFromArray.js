const removeFromArray = function(array, ...removeElements) {
    for (let removeElement of removeElements) {
        //help function to filter not euqal elements.
        let elementNotEqual = function(arrayElement) {
            return arrayElement !== removeElement;
        };
        array = array.filter(elementNotEqual);
    }
    return array;
};
// Do not edit below this line
module.exports = removeFromArray;
