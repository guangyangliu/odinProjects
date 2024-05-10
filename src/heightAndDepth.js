export function nodeHeight(node) {
    let leftHeight = 0;
    let rightHeight = 0;
    if (node.left) {
        leftHeight = nodeHeight(node.left) + 1;
    }

    if (node.right) {
        rightHeight = nodeHeight(node.right) + 1;
    }

    return leftHeight > rightHeight ? leftHeight : rightHeight;
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