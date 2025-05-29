import Node from "./Node.js";

export default class Tree {
  constructor(array) {
    this.array = array;
    this.sortedArray = this.sortArray(this.removeDuplicates(this.array));
    this.root = this.buildTree();
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

  removeDuplicates(array = this.array) {
    const arrayToSet = new Set(array);

    return [...arrayToSet];
  }

  sortArray(array = this.array) {
    if(array.length === 1) return array;

    let mid = Math.floor((array.length - 1) / 2);
    let leftArrSorted = this.sortArray(array.slice(0, mid + 1));
    let rightArrSorted = this.sortArray(array.slice(mid + 1, array.length));
    let sortedArray = [];

    // Merge sorted arrays
    let l = 0;
    let r = 0;
    while((l < leftArrSorted.length) && (r < rightArrSorted.length)) {
      const leftArrElement = leftArrSorted[l];
      const rightArrElement = rightArrSorted[r];

      if(leftArrElement < rightArrElement) {
        sortedArray.push(leftArrElement);
        l++;
      } else {
        sortedArray.push(rightArrElement);
        r++;
      }
    }

    sortedArray = sortedArray.concat(leftArrSorted.slice(l)).concat(rightArrSorted.slice(r));

    return this.removeDuplicates(sortedArray);
  }

  buildTree(array = this.sortedArray) {
    if(array.length === 0) return null;

    let midIndex = Math.floor((array.length - 1) / 2);
    const root = new Node(array[midIndex]);
    let leftArr = array.slice(0, midIndex);
    let rightArr = array.slice(midIndex + 1, array.length);
    root.left = this.buildTree(leftArr);
    root.right = this.buildTree(rightArr);

    return root;
  }

  insert(value) {
    let node = this.root;
    if(value === node.data) return;

    while(true) {
      
      if(value < node.data) {
        if(node.left === null) {
          node.left = new Node(value);
          break;
        }
        node = node.left;
      }

      if(value > node.data) {
        if(node.right === null) {
          node.right = new Node(value);
          break;
        }
        node = node.right;
      }
    }

    return this.root;
  }

  isLeaf(node) {
    return (node.left === null) && (node.right === null);
  }

  hasOneChild(node) {
    return (
      ((node.left !== null) && (node.right === null)) ||
      ((node.left === null) && (node.right !== null))
    )
  }

  hasTwoChildren(node) {
    return ((node.left !== null) && (node.right !== null));
  }

  getChildren(node) {
    let children = [];
    if(node.left) children.push(node.left);
    if(node.right) children.push(node.right);

    return children;
  }

  findMin(node) {
    let array = [];
    this.inOrder((node) => array.push(node), node);

    return array[0];
  }

  deleteItem(value, isBalanced = true) {
    let { node: nodeToDelete, parentNode, side } = isBalanced ? this.find(value) : this.findUnbalanced(value);
    let children = this.getChildren(nodeToDelete);

    if(children.length === 0) parentNode[side] = null;
    if(children.length === 1) parentNode[side] = children[0];
    if(children.length === 2) {
      const inOrderSuccessor = this.findMin(children[1]);
      nodeToDelete.data = inOrderSuccessor.data;
      inOrderSuccessor.data = value;
      this.deleteItem(inOrderSuccessor.data, false);
    }

    return this.root;
  }

  find(value, node = this.root, parentNode = null, side = null) {
    if(value === node.data) return { node, parentNode, side };

    if((value < node.data) && (node.left !== null)) return this.find(value, node.left, node, 'left');
    if((value > node.data) && (node.right !== null)) return this.find(value, node.right, node, 'right');

    return "Value not found";
  }

  findUnbalanced(value, node = this.root, parentNode = null, side = null) {
    if(!node) return "Value not found";
    if(value === node.data) return { node, parentNode, side };

    const leftResult = this.findUnbalanced(value, node.left, node, 'left');
    if(leftResult !== "Value not found") return leftResult;

    const rightResult = this.findUnbalanced(value, node.right, node, 'right');
    if(rightResult !== "Value not found") return rightResult;

    return "Value not found";
  }

  levelOrder(callback, queue = [this.root]) {
    if(!callback) throw new Error("No callback function!");
    
    try {
      if(queue.length === 0) return;
      let node = queue[0];
      // Do callback with first item of queue
      callback(node);
      // Push node.left to queue
      if(node.left) queue.push(node.left);
      // Push node.right to queue
      if(node.right) queue.push(node.right);
      // Delete first item of queue
      queue.shift();
      this.levelOrder(callback, queue);
    } catch (error) {
      console.log(error);
    }
  }

  preOrder(callback, node = this.root) {
    if(!callback) throw new Error("No callback function!");

    try {
      if(!node) return;
      callback(node);
      if(node.left) this.preOrder(callback, node.left);
      if(node.right) this.preOrder(callback, node.right);
    } catch (error) {
      console.log(error);
    }
  }

  inOrder(callback, node = this.root) {
    if(!callback) throw new Error("No callback function!");

    try {
      if(!node) return;
      if(node.left) this.inOrder(callback, node.left);
      callback(node);
      if(node.right) this.inOrder(callback, node.right);
    } catch (error) {
      console.log(error);
    }
  }

  postOrder(callback, node = this.root) {
    if(!callback) throw new Error("No callback function!");

    try {
      if(!node) return;
      if(node.left) this.postOrder(callback, node.left);
      if(node.right) this.postOrder(callback, node.right);
      callback(node);
    } catch (error) {
      console.log(error);
    }
  }

  height(value, node = this.root) {
    if (!node) return "Value not found";

    if (node.data === value) {
      return this.calculateHeight(node);
    }

    if (value < node.data) return this.height(value, node.left);
    if (value > node.data) return this.height(value, node.right);
  }

  calculateHeight(node) {
    if (!node) return -1; // altura de nó nulo é -1 por convenção

    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(value, node = this.root, depth = 0) {
    if(value === node.data) return depth;

    if((value < node.data) && (node.left !== null)) return this.depth(value, node.left, depth + 1);
    if((value > node.data) && (node.right !== null)) return this.depth(value, node.right, depth + 1);

    return "Value not found";
  }

  isBalanced(node = this.root) {
    const check = (node) => {
      if (!node) return 0;

      const leftHeight = check(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = check(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return 1 + Math.max(leftHeight, rightHeight);
    };

    return check(node) !== -1;
  }

  rebalance() {
    this.sortedArray = [];
    this.inOrder((node) => this.sortedArray.push(node.data));
    this.root = this.buildTree();
    return this.root;
  }
}