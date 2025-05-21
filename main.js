import Node from "./Node.js";
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

// prettyPrint(tree.buildTree());
// tree.insert(6);
prettyPrint(tree.root);
// console.log(tree.find(3));
// tree.levelOrder((node) => console.log(node.data));
// tree.preOrder((node) => console.log(node.data));
// tree.inOrder((node) => console.log(node.data));
// tree.postOrder((node) => console.log(node.data));
// console.log(tree.depth(24));
// console.log(tree.height(8));
tree.deleteItem(40);
prettyPrint(tree.root);