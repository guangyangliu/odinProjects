import { inOrderCall, preOrderCall, postOrderCall, levelCall } from "./traversal";
import { nodeDepth, longestPath, shortestPath } from "./heightAndDepth";

export function Node(data, left = null, right = null) {
    return {data, left, right};
}

export function Tree(array) {
    let root = buildTree(array);
    function insert(value) {
        root = insertValueInTree(value, root);
    }
    function deleteItem(value) {
        root = deletNode(value, root);
    }
    function find(value) {
        return findNode(value, root);
    }

    function levelOrder(callback) {
        return levelCall(root, callback);
    }

    function inOrder(callback) {
        return inOrderCall(root, callback);

    }
    function preOrder(callback) {
        return preOrderCall(root, callback);
    
    }
    function postOrder(callback) {
        return postOrderCall(root, callback);
    }
    function height(node) {
        return longestPath(node);
    }
    function depth(node) {
        return nodeDepth(root, node);
    }
    function isBalanced() {
        let diff = longestPath(root) - shortestPath(root);
        return diff <= 1;
    }
    function rebalance() {
        let callback = (data) => {return data};
        let treeArray = inOrder(callback);
        root = buildTree(treeArray);
    }
    function getRoot() {
        return root;
    }
    return {getRoot, insert, deleteItem, find, levelOrder, inOrder, preOrder, postOrder, height, depth, isBalanced, rebalance};
}

function insertValueInTree(value, root) {
    if (root === null) {
        return root = Node(value);
    }

    if (value < root.data) {
        root.left = insertValueInTree(value, root.left);
    }
    
    if (value > root.data) {
        root.right = insertValueInTree(value, root.right);
    }
    return root;
}

function deletNode(value, root) {
    if (root === null) {
        return root;
    }
    if (value < root.data) {
        root.left = deletNode(value, root.left);
    }

    if (value > root.data) {
        root.right = deletNode(value, root.right);
    }

    if (value === root.data) {
        if (root.left === null) {
            return root.right;
        }
        if (root.right === null) {
            return root.left;
        }

        root.data = minValue(root.right);
        
        root.right = deletNode(root.data, root.right);
    }
    return root;
}

function minValue(node) {
    let minv = node.data;
    while (node.left !== null) {
        minv = node.left.data;
        node = node.left;
    }
    return minv;
}

function findNode(value, root) {
    if(root === null) {
        return null;
    }

    if (value < root.data) {
        return findNode(value, root.left);
    }

    if (value > root.data) {
        return findNode(value, root.right);
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


/*
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

  tree.insert(9999)
  console.log(tree.height(tree.getRoot()));
  prettyPrint(tree.getRoot());


  tree.deleteItem(8);
  prettyPrint(tree.getRoot());

  const mutiplyOne = (arg) => {return arg *1};
  console.log(tree.levelOrder(mutiplyOne));
  console.log(tree.inOrder(mutiplyOne));
  console.log(tree.preOrder(mutiplyOne));
  console.log(tree.postOrder(mutiplyOne));

  let node = Node(1);
  console.log(tree.depth(node));

  prettyPrint(tree.getRoot());
  console.log(tree.isBalanced());
  
  tree.rebalance();
  prettyPrint(tree.getRoot());
  console.log(tree.isBalanced());
  */