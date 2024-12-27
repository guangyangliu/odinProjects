function mergeSort(array) {
    if (array.length === 1) {
        return array;
    }
    let midIndex = array.length / 2;

    //sort left arrya
    let leftArray = mergeSort(array.slice(0, midIndex));

    //sort right array
    let rightArray = mergeSort(array.slice(midIndex));
    
    //mearge left and right part
    return merge(leftArray, rightArray);

}

function merge(leftArray, rightArray) {
    let mergedArray = [];
    while(leftArray.length>= 1 && rightArray.length>=1) {
        if (leftArray[0] < rightArray[0]) {
            mergedArray.push(leftArray[0]);
            leftArray.splice(0,1);
        } else {
            mergedArray.push(rightArray[0]);
            rightArray.splice(0,1);
        }
    }

    let remainArray = leftArray.length >= 1 ? leftArray : rightArray;

    for (let number of remainArray) {
        mergedArray.push(number);
    }
    return mergedArray;
}

console.log(mergeSort([105, 79, 100, 110]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([0]));