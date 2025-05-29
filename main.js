import Tree from "./Tree.js";

// let tree = new Tree([1, 7, 8, 4, 23, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
let tree = new Tree([50,30,70,20,40,60,80]);

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

const generateRandomNum = function generateRandomNum(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateArray = function generateArrayFromRandomNumbers(size = 15) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(generateRandomNum());
  }

  return array;
}

const insertRandomNumbers = function insertRandomNumbers(tree, size = 10) {
  for (let i = 0; i < size; i++) {
    tree.insert(generateRandomNum(101, 200));
  }
}

// let array = generateArray();
// let tree = new Tree(array);
// prettyPrint(tree.root);
// console.log(tree.isBalanced());
// tree.levelOrder((node) => console.log(node.data));
// tree.preOrder((node) => console.log(node.data));
// tree.postOrder((node) => console.log(node.data));
// tree.inOrder((node) => console.log(node.data));
// insertRandomNumbers(tree);
// prettyPrint(tree.root);
// console.log(tree.isBalanced());
// tree.rebalance();
// prettyPrint(tree.root);
// console.log(tree.isBalanced());

tree.prettyPrint();
// tree.deleteItem(67);
console.log('-------------------------------');
// tree.deleteItem(80)
tree.deleteItem(50);
tree.prettyPrint();
// console.log(tree.find(40))