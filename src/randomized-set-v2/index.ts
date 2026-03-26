
/**
 * 支持重复元素的随机集合
 */
export class RandomizedSet {
  /** 存储所有元素 */
  private nums: number[];
  /** 记录每个元素在数组中的所有索引 */
  private map: Map<number, Set<number>>;

  /** 初始化数据结构 */
  constructor() {
    this.nums = [];
    this.map = new Map();
  }

  /**
   * 插入元素 val
   * @param val 要插入的元素
   * @returns 是否首次插入该元素
   */
  insert(val: number): boolean {
    const has = this.map.has(val);
    if (!has) {
      this.map.set(val, new Set());
    }
    // 将元素添加到数组末尾，并记录其索引
    this.nums.push(val);
    this.map.get(val)!.add(this.nums.length - 1);
    return !has;
  }

  /**
   * 删除一个 val（只删一个）
   * @param val 要删除的元素
   * @returns 是否删除成功
   */
  remove(val: number): boolean {
    if (!this.map.has(val)) {
      return false;
    }
    // 取出 val 的一个索引
    const indexSet = this.map.get(val)!;
    const removeIndexResult = indexSet.values().next();
    if (removeIndexResult.done) {
      // 理论上不会发生，防御性处理
      return false;
    }
    const removeIndex = removeIndexResult.value as number;
    const lastIndex = this.nums.length - 1;
    const lastNum = this.nums[lastIndex];

    // 用最后一个元素覆盖要删除的位置
    this.nums[removeIndex] = lastNum;

    // 更新 lastNum 的索引集合
    if (this.map.has(lastNum)) {
      const lastNumSet = this.map.get(lastNum)!;
      lastNumSet.add(removeIndex);
      lastNumSet.delete(lastIndex);
    }

    // 移除 val 的该索引
    indexSet.delete(removeIndex);
    if (indexSet.size === 0) {
      this.map.delete(val);
    }

    // 移除数组最后一个元素
    this.nums.pop();
    return true;
  }

  /**
   * 随机返回一个元素
   * @returns 随机元素
   */
  getRandom(): number {
    // 生成 [0, nums.length) 的随机索引
    const randomIndex = Math.floor(Math.random() * this.nums.length);
    return this.nums[randomIndex];
  }
}
