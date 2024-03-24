const removeFromArray = function(array, ...removeElements) {
    return array.filter(arrayElement=>!removeElements.includes(arrayElement));
};
// Do not edit below this line
module.exports = removeFromArray;
