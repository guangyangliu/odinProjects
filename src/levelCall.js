import Queue from "queue";

export function levelCall(root, callback) {
    let valuesArray = [];
    let queue = new Queue();
    queue.push(root);
    console.log(root);



    while(queue.length) {
        let currentNode = queue.shift();
        
        let callbackData = callback(currentNode.data);
        valuesArray.push(callbackData);

        if (currentNode.left) {
            queue.push(currentNode.left);
        }

        if (currentNode.right) {
            queue.push(currentNode.right);
        }

    }
    return valuesArray;
}