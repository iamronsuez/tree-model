import { NodeOfTree } from "./NodeOfTree";

class Tree {
  root?: NodeOfTree;

  constructor(root?: NodeOfTree) {
    this.root = root;
  }

  insert(newValue: number): void {
    if (!this.root) {
      this.root = NodeOfTree.create(newValue);
      return;
    }
    this.root = NodeOfTree.insertNode(newValue, this.root);
  }

  find(value: number): { exists: boolean; path: number[] } {
    return NodeOfTree.findValue(value, this.root!, []);
  }

  traverse(order: string) {
    return NodeOfTree.traverse(this.root!, [], order);
  }

  height() {
    if (this.root === undefined) return -1;
    return NodeOfTree.heightOf(this.root!);
  }

  minimum() {
    return NodeOfTree.minimumOf(this.root!);
  }

  isEqualTo(tree: Tree) {
    return NodeOfTree.isEqualTo(this.root!, tree.root!);
  }

  isValid() {
    return NodeOfTree.isValid(this.root!, -Infinity, +Infinity);
  }

  nodesAt(kDistance: number = this.height()) {
    return kDistance > this.height()
      ? []
      : NodeOfTree.nodesAtKDistance(this.root!, kDistance);
  }

  ToString() {
    return JSON.stringify(this, null, 2);
  }

  static fromValues(values: number[]) {
    const tree = new Tree();
    values.forEach((value) => tree.insert(value));
    return tree;
  }
}

export default Tree;
