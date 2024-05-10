function Node(data, left = null, right = null) {
    return {data, left, right};
}

function Tree(array) {
    let root = buildTree(array);
    function insert(value) {
        root = insertValueInTree(value, root);
    }
    return {root, insert};
}

function insertValueInTree(value, root) {
    if (root === null) {
        return root = Node(value);
    }

    if (value === root.data) {
        return root;
    }

    if (value < root.data) {
        root.left = insertValueInTree(value, root.left);
    } else {
        root.right = insertValueInTree(value, root.right);
    }
    return root;
}

function buildTree(array) {
    let sortedArray = sortArray(array);
    let bsTree = bst(sortedArray, 0, sortedArray.length-1);
    return bsTree;
}

function sortArray(array) {
    let set = new Set(array);
    let uniqueArray = [...set];
    let sortedArray = uniqueArray.sort((a, b) => a - b);
    return sortedArray;
}

function bst(sortedArray, start, end) {
    if (start > end) {
        return null;
    }
    let mid = parseInt((start + end) / 2);
    let node = Node(sortedArray[mid]);

    node.left = bst(sortedArray, start, mid-1);
    node.right = bst(sortedArray, mid+1, end);
    return node;
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = Tree(array);


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  tree.insert(999)
  prettyPrint(tree.root);