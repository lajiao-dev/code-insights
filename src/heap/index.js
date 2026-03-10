/**
 * 最小堆（Min Heap）
 *
 * 堆是一棵完全二叉树（Complete Binary Tree），满足以下性质：
 *   - 最小堆：每个节点的值都 ≤ 其子节点的值，因此堆顶永远是整棵树中最小的元素。
 *   - 最大堆：每个节点的值都 ≥ 其子节点的值，堆顶是最大值。
 *
 * 用数组存储完全二叉树时，下标关系如下（下标从 0 开始）：
 *   - 节点 i 的左子节点：2i + 1
 *   - 节点 i 的右子节点：2i + 2
 *   - 节点 i 的父节点：Math.floor((i - 1) / 2)
 *
 * 核心操作时间复杂度：
 *   - push（插入）：O(log n)
 *   - pop（删除堆顶）：O(log n)
 *   - peek（查看堆顶）：O(1)
 */
export class Heap {
  /**
   * @param {Function} compareFn - 自定义比较函数，签名为 (a, b) => number
   *   返回值 < 0 表示 a 优先级高于 b（a 应排在更靠近堆顶的位置）。
   *   默认比较函数为数字升序，即构造一个数字最小堆。
   *   传入 (a, b) => b - a 则构造最大堆。
   *   传入 (a, b) => a.count - b.count 可对对象按字段排序。
   */
  constructor(compareFn) {
    // 用数组模拟完全二叉树，索引 0 是堆顶
    this.heap = [];
    // 若未传入比较函数则默认数字升序（最小堆）
    this.compFn = compareFn || ((a, b) => a - b);
  }

  /** 返回堆中元素数量，即底层数组的长度 */
  size() {
    return this.heap.length;
  }

  /** 堆为空时返回 true，底层数组长度为 0 */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * 交换数组中下标 i 和 j 的元素。
   * 使用 ES6 解构赋值一行完成，无需临时变量。
   */
  swap(i, j) {
    [this.heap[j], this.heap[i]] = [this.heap[i], this.heap[j]];
  }

  /**
   * 插入一个新元素，时间复杂度 O(log n)。
   *
   * 思路：
   *   1. 把新元素追加到数组末尾（即完全二叉树的最后一个位置）。
   *   2. 此时新元素可能比它的父节点更小，违反堆性质。
   *   3. 调用 heapifyUp 从下往上"上浮"，直到满足堆性质为止。
   */
  push(val) {
    // 将新元素放到数组末尾（树的最后一层）
    this.heap.push(val);
    // 从末尾索引开始上浮，恢复堆性质
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * 弹出并返回堆顶元素（最小值），时间复杂度 O(log n)。
   *
   * 思路：
   *   1. 如果堆为空，返回 null。
   *   2. 如果堆只有 1 个元素，直接 pop 返回，无需维护。
   *   3. 否则：
   *      a. 记录堆顶（索引 0）的值，这是最终要返回的结果。
   *      b. 把数组最后一个元素移到索引 0（覆盖堆顶）。
   *         — 不直接删除 heap[0] 是因为删除数组头部代价是 O(n)，
   *           而 Array.pop() 从尾部删除是 O(1)。
   *      c. 调用 heapifyDown 从根节点向下"下沉"，恢复堆性质。
   */
  pop() {
    // 堆为空，没有可弹出的元素
    if (this.isEmpty()) {
      return null;
    }
    // 只剩一个元素，直接移除并返回，无需调整
    if (this.size() === 1) {
      return this.heap.pop();
    }

    // 保存堆顶（最小值），稍后返回
    const top = this.heap[0];
    // 将数组最后一个元素移到堆顶，同时缩短数组
    this.heap[0] = this.heap.pop();
    // 从堆顶开始下沉，恢复堆性质
    this.heapifyDown(0);
    // 返回之前保存的最小值
    return top;
  }

  /**
   * 查看堆顶元素但不移除，时间复杂度 O(1)。
   * 堆顶始终是满足比较函数的"最优先"元素（最小堆即最小值）。
   */
  peek() {
    return this.isEmpty() ? null : this.heap[0];
  }

  /**
   * 上浮操作（Bubble Up / Sift Up），时间复杂度 O(log n)。
   *
   * 用于 push 之后：新元素在末尾，可能比父节点优先级更高（值更小），
   * 需要不断与父节点比较并交换，直到到达堆顶或不再比父节点小。
   *
   * 父节点的索引公式：Math.floor((i - 1) / 2)
   * 推导：左子 = 2p+1，右子 = 2p+2，反解得 p = floor((i-1)/2)。
   *
   * @param {number} index - 新插入元素的当前索引
   */
  heapifyUp(index) {
    // index === 0 时已到达根节点，停止
    while (index > 0) {
      // 根据索引公式计算父节点位置
      const parentIndex = Math.floor((index - 1) / 2);

      if (this.compFn(this.heap[index], this.heap[parentIndex]) < 0) {
        // 当前节点比父节点优先级更高（更小）
        // 交换两者，将当前节点上移
        this.swap(index, parentIndex);
        // 更新 index，继续向上比较
        index = parentIndex;
      } else {
        // 当前节点 ≥ 父节点，已满足堆性质，停止
        break;
      }
    }
  }

  /**
   * 下沉操作（Bubble Down / Sift Down），时间复杂度 O(log n)。
   *
   * 用于 pop 之后：末尾元素被移到堆顶，通常比子节点大，
   * 需要不断与两个子节点中"更小"的那个比较并交换，直到满足堆性质。
   *
   * 子节点的索引公式（下标从 0 开始）：
   *   左子节点：2i + 1
   *   右子节点：2i + 2
   *
   * @param {number} index - 需要下沉的节点的当前索引（通常为 0）
   */
  heapifyDown(index) {
    // 记录堆的长度，避免越界
    const len = this.size();

    // 至少存在左子节点时才需要继续下沉
    while (index * 2 + 1 < len) {
      // 左子节点索引：2i + 1
      let leftIndex = index * 2 + 1;
      // 右子节点索引：2i + 2（即左子索引 + 1）
      let rightIndex = leftIndex + 1;
      // 先假设左子节点是优先级更高（更小）的那个
      let bestIndex = leftIndex;

      // 必须确认右子节点存在（不越界）
      // 右子节点比左子节点更小（优先级更高）
      if (
        rightIndex < len &&
        this.compFn(this.heap[rightIndex], this.heap[leftIndex]) < 0
      ) {
        // 则选择右子节点作为候选进行比较
        bestIndex = rightIndex;
      }

      // 当前节点已经 ≤ 两个子节点中最小的
      if (this.compFn(this.heap[index], this.heap[bestIndex]) <= 0) {
        // 满足堆性质，不需要继续下沉
        break;
      }

      // 当前节点 > 较小子节点，交换两者
      this.swap(index, bestIndex);
      // 更新 index，继续向下比较
      index = bestIndex;
    }
  }
}
