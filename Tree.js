import Node from "./Node.js";

export default class Tree {
  constructor(array) {
    this.array = array;
    this.sortedArray = this.sortArray(this.removeDuplicates(this.array));
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
}