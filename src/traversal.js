import Queue from "queue";

export function levelCall(root, callback) {
    let valuesArray = [];
    let queue = new Queue();
    queue.push(root);

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

export function inOrderCall(root, callback) {
    let valuesArray = [];

    function inOrder(root) {
    if (root === null) {
        return;
    }
    inOrder(root.left);
    root.data = callback(root.data);
    valuesArray.push(root.data);
    inOrder(root.right);
}

    inOrder(root);
    return valuesArray;
}
export function preOrderCall(root, callback) {
    let valuesArray = [];

    function inOrder(root) {
    if (root === null) {
        return;
    }
    root.data = callback(root.data);
    valuesArray.push(root.data);
    inOrder(root.left);
    inOrder(root.right);
}

    inOrder(root);
    return valuesArray;

}
export function postOrderCall(root, callback) {
    let valuesArray = [];

    function inOrder(root) {
    if (root === null) {
        return;
    }
    inOrder(root.left);
    inOrder(root.right);
    root.data = callback(root.data);
    valuesArray.push(root.data);
}

    inOrder(root);
    return valuesArray;
}