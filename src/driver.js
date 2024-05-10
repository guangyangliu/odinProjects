 import { Tree } from ".";
function createRandomBST() {
    let numberArray = [];
    for (let i = 0; i < 20; i++) {
        let randomNumber = Math.floor(Math.random()*100);
        numberArray.push(randomNumber);
    }
    return Tree(numberArray);
}

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



//1
let bst = createRandomBST();

//2
console.log(bst.isBalanced());
prettyPrint(bst.getRoot());

//3
const origin = (arg) => {return arg};
console.log(bst.levelOrder(origin));
console.log(bst.inOrder(origin));
console.log(bst.preOrder(origin));
console.log(bst.postOrder(origin));


//4
bst.insert(101);
bst.insert(102);
bst.insert(103);
bst.insert(104);
bst.insert(105);

//5
console.log(bst.isBalanced());
prettyPrint(bst.getRoot());

//6
bst.rebalance();

//7
console.log(bst.isBalanced());
prettyPrint(bst.getRoot());
//8
console.log(bst.levelOrder(origin));
console.log(bst.inOrder(origin));
console.log(bst.preOrder(origin));
console.log(bst.postOrder(origin));






