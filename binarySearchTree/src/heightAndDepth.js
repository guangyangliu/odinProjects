export function longestPath(node) {
    let leftHeight = 0;
    let rightHeight = 0;
    if (node.left) {
        leftHeight = longestPath(node.left) + 1;
    }

    if (node.right) {
        rightHeight = longestPath(node.right) + 1;
    }

    return leftHeight > rightHeight ? leftHeight : rightHeight;
}


export function shortestPath(node) {
    let leftHeight = 0;
    let rightHeight = 0;
    if (node.left) {
        leftHeight = shortestPath(node.left) + 1;
    }

    if (node.right) {
        rightHeight = shortestPath(node.right) + 1;
    }

    return leftHeight < rightHeight ? leftHeight : rightHeight;
}

export function nodeDepth(root, node) {
    let depth = 0;
    if(node.data < root.data) {
        depth = nodeDepth(root.left, node) + 1;
    }
    if(node.data > root.data) {
        depth = nodeDepth(root.right, node) + 1;
    }
    return depth;
}