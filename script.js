// node constructor
class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  // adds child node to a given node
  add(data) {
    this.children.push(new Node(data));
  }

  // visits all children of a given node and removes the ones that match the data
  remove(data) {
    this.children = this.children.filter((node) => {
      return node.data !== data;
    });
  }
}

// tree constructor
class Tree {
  // initializes empty tree
  constructor() {
    this.root = null;
  }

  // prints the tree in a diagram
  prettyPrint() {
    if (!this.root) {
      console.log("Tree is empty.");
      return;
    }

    const lines = [];
    const connector = "──"; // connector between nodes
    const spaces = "    "; // 4 spaces for each level

    function buildPrettyLines(node, prefix = "", isLastChild = true) {
      lines.push(prefix + (isLastChild ? "└" : "├") + connector + node.data);
      const childPrefix = prefix + (isLastChild ? spaces : "│" + spaces);

      for (let i = 0; i < node.children.length - 1; i++) {
        buildPrettyLines(node.children[i], childPrefix, false);
      }

      if (node.children.length > 0) {
        buildPrettyLines(
          node.children[node.children.length - 1],
          childPrefix,
          true
        );
      }
    }

    buildPrettyLines(this.root);
    console.log(lines.join("\n"));
  }

  // adds a given node as a child of a specified parent node
  addChildToParent(childData, parentData) {
    if (!this.root) {
      console.log("Tree is empty.");
      return;
    }

    // traverse the tree (depth-first, pre-order)
    function findNodeAndAdd(node) {
      // base case: when the parent has been found, create & add child node
      if (node.data === parentData) {
        node.children.push(new Node(childData));
        return;
      }

      // recursive case
      for (const child of node.children) {
        findNodeAndAdd(child);
      }
    }

    // call findNodeAndAdd starting from the root of the tree
    findNodeAndAdd(this.root);
  }

  // breadth-first traversal
  breadthFirstTraversal(node = this.root) {
    if (!node) {
      console.log("Tree is empty.");
      return;
    }

    const queue = [node]; // initialize a queue with the root node

    while (queue.length > 0) {
      const currentNode = queue.shift(); // dequeue the front node

      console.log(currentNode.data); // process the node's data

      // enqueue the children of the current node
      for (const child of currentNode.children) {
        queue.push(child);
      }
    }
  }

  // depth-first traversal (pre-order)
  depthFirstTraversal(node = this.root) {
    // base case: return if current node is non-existent
    if (!node) {
      return;
    }

    console.log(node.data); // process the node's data (in this case, print)

    // recursively traverse each child of the current node
    for (const child of node.children) {
      this.depthFirstTraversal(child);
    }
  }

  // counts total number of nodes in the tree
  countNodes() {
    let count = 0;
    // helper function that navigates the tree in depth-first traversal and counts nodes,
    // updating the count variable accordingly
    function countRecursive(node) {
      // base case: if there is no node, stop recursion
      if (!node) return;

      // increment count for the current node
      count++;

      // call itself for each child of the current node
      for (const child of node.children) {
        countRecursive(child);
      }
    }

    // start counting from root
    countRecursive(this.root);

    // return the total count of nodes in the tree
    return count;
  }

  // returns the height starting from a given node
  // defined as the number of edges (steps) in longest path from a given node to a leaf node
  height(node = this.root) {
    // there is no node
    if (!node) {
      return 0;
      // it's a leaf (has a height of 1)
    } else if (node.children.length === 0) {
      return 1;
      // calculate height recursively for current node and children
    } else {
      const heights = node.children.map((child) => this.height(child));
      // find the max value of heights array
      // add 1 to account for the current node
      return 1 + Math.max(...heights);
    }
  }
}

// example usage

const tree = new Tree();
tree.root = new Node("A");
tree.root.add("B");
tree.root.add("C");
tree.root.children[0].add("D");
tree.root.children[0].add("E");
tree.root.children[1].add("F");
tree.root.children[1].add("G");

tree.prettyPrint();

tree.addChildToParent("child", "C");

tree.prettyPrint();

tree.depthFirstTraversal();

tree.breadthFirstTraversal();

console.log(tree.countNodes());

console.log(tree.height());
