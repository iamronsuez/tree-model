export class NodeOfTree {
  left?: NodeOfTree;
  value: number;
  right?: NodeOfTree;

  constructor(value: number, leftNode?: NodeOfTree, rightNode?: NodeOfTree) {
    this.value = value;
    this.left = leftNode;
    this.right = rightNode;
  }

  isLeaf(): boolean {
    return !this.left && !this.right;
  }

  static create(value: number): NodeOfTree {
    return new NodeOfTree(value, undefined, undefined);
  }

  static insertNode(value: number, node?: NodeOfTree) {
    if (node === undefined) return NodeOfTree.create(value);

    if (value < node.value) {
      node.left = NodeOfTree.insertNode(value, node.left);
    }

    if (value > node.value) {
      node.right = NodeOfTree.insertNode(value, node.right);
    }

    return node;
  }

  static findValue(
    value: number,
    node: NodeOfTree,
    path: number[]
  ): { exists: boolean; path: number[] } {
    if (node === undefined) return { exists: false, path };

    if (!node.left && !node.right) {
      return { exists: node.value - value === 0, path };
    }

    if (value < node.value) {
      let leftPath = NodeOfTree.findValue(value, node.left!, [
        ...path,
        node.value,
      ]);

      return leftPath;
    }

    if (value > node.value) {
      let rightPath = NodeOfTree.findValue(value, node.right!, [
        ...path,
        node.value,
      ]);

      return rightPath;
    }

    return { exists: node.value - value === 0, path: [node.value] };
  }

  static traverse(node: NodeOfTree, path: number[], order: string): number[] {
    if (node === undefined) return path;

    if (node.isLeaf()) return [node.value, ...path];

    if (order === "in") {
      return [
        ...NodeOfTree.traverse(node.left!, path, order),
        node.value,
        ...NodeOfTree.traverse(node.right!, path, order),
      ];
    }

    if (order === "post") {
      return [
        ...NodeOfTree.traverse(node.left!, path, order),
        ...NodeOfTree.traverse(node.right!, path, order),
        node.value,
      ];
    }

    return [
      node.value,
      ...NodeOfTree.traverse(node.left!, path, order),
      ...NodeOfTree.traverse(node.right!, path, order),
    ];
  }

  static heightOf(node: NodeOfTree): number {
    if (node === undefined || node.isLeaf()) return 0;

    return (
      1 +
      Math.max(
        NodeOfTree.heightOf(node.left!),
        NodeOfTree.heightOf(node.right!)
      )
    );
  }

  static minimumOf(node: NodeOfTree): number {
    if (node === undefined) return +Infinity;

    if (node.isLeaf()) return node.value;

    return Math.min(
      Math.min(
        NodeOfTree.minimumOf(node.left!),
        NodeOfTree.minimumOf(node.right!)
      ),
      node.value
    );
  }

  static isEqualTo(nodeA: NodeOfTree, nodeB: NodeOfTree): boolean {
    if (nodeA === undefined && nodeB === undefined) return true;

    if (nodeA !== undefined && nodeB !== undefined) {
      return (
        nodeA.value === nodeB.value &&
        NodeOfTree.isEqualTo(nodeA.left!, nodeB.left!) &&
        NodeOfTree.isEqualTo(nodeA.right!, nodeB.right!)
      );
    }

    return false;
  }

  static isValid(
    node: NodeOfTree,
    minValue: number,
    maxValue: number
  ): boolean {
    if (node === undefined) return true;

    if (node.value < minValue || node.value > maxValue) {
      return false;
    }

    return (
      NodeOfTree.isValid(node.left!, minValue, node.value) &&
      NodeOfTree.isValid(node.right!, node.value, maxValue)
    );
  }

  static nodesAtKDistance(
    node: NodeOfTree,
    kDistance: number,
    currDistance: number = 0,
    path: number[] = []
  ): number[] {
    if (node === undefined) return path;

    if (kDistance === currDistance) {
      return [...path, node.value];
    }

    return [
      ...NodeOfTree.nodesAtKDistance(
        node.left!,
        kDistance,
        currDistance + 1,
        path
      ),
      ...NodeOfTree.nodesAtKDistance(
        node.right!,
        kDistance,
        currDistance + 1,
        path
      ),
    ];
  }
}
