export class Heap {
  constructor(compFn) {
    this.heap = [];
    this.compFn = compFn || ((a, b) => a - b);
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  swap(i, j) {
    [this.heap[j], this.heap[i]] = [this.heap[i], this.heap[j]];
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    // 从数组的尾部开始上浮
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    while (index > 0) {
      // 找到父节点的 index
      const parentIndex = Math.floor((index - 1) / 2);
      // 用父节点和当前节点比较
      if (this.compFn(this.heap[index], this.heap[parentIndex]) < 0) {
        // 如果当前节点比父节点小
        // 交换两个节点，并更新 index
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        // 已满足父节点比当前节点小，跳出当前循环
        break;
      }
    }
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }
    // 保存堆顶的元素，稍后返回
    const top = this.heap[0];
    // 将最后一个元素赋值给第一个元素
    // 并移除最后一个元素
    this.heap[0] = this.heap.pop();
    // 下沉第一个元素，维护堆的特性
    this.heapifyDown(0);
    return top;
  }

  heapifyDown(index) {
    const len = this.heap.length;
    while (true) {
      let leftIndex = index * 2 + 1;
      if (leftIndex >= len) break;
      let rightIndex = leftIndex + 1;
      // 以左子节点为参照物
      let targetIndex = leftIndex;
      // 左子节点和右子节点进行比较
      if (
        rightIndex < len &&
        this.compFn(this.heap[rightIndex], this.heap[leftIndex]) < 0
      ) {
        // 如果右子节点更优，选择右子节点作为候选
        targetIndex = rightIndex;
      }

      // 再将更优的子节点和当前节点比较
      if (this.compFn(this.heap[index], this.heap[targetIndex]) <= 0) {
        break;
      }

      this.swap(index, targetIndex);
      index = targetIndex;
    }
  }
}
