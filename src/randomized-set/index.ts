
/**
 * 随机集合类，支持 O(1) 时间的插入、删除和获取随机元素。
 */
export class RandomizedSet {
  /**
   * 存储元素的数组。
   */
  private nums: number[];

  /**
   * 存储元素值到其在数组中索引的映射。
   */
  private map: Map<number, number>;

  /**
   * 构造函数，初始化数据结构。
   */
  constructor() {
    this.nums = [];
    this.map = new Map();
  }

  /**
   * 插入一个元素，如果元素已存在则返回 false，否则插入并返回 true。
   * @param val 要插入的元素
   * @returns 是否插入成功
   */
  insert(val: number): boolean {
    // 如果元素已存在，插入失败
    if (this.map.has(val)) {
      return false;
    }
    // 记录元素值和其索引
    this.map.set(val, this.nums.length);
    // 将元素添加到数组末尾
    this.nums.push(val);
    return true;
  }

  /**
   * 删除一个元素，如果元素不存在则返回 false，否则删除并返回 true。
   * @param val 要删除的元素
   * @returns 是否删除成功
   */
  remove(val: number): boolean {
    // 如果元素不存在，删除失败
    if (!this.map.has(val)) {
      return false;
    }

    // 获取要删除元素的索引
    const removeIndex = this.map.get(val)!;
    // 获取数组最后一个元素
    const lastNum = this.nums[this.nums.length - 1];
    // 用最后一个元素覆盖要删除的位置
    this.nums[removeIndex] = lastNum;
    // 更新最后一个元素在 map 中的索引
    this.map.set(lastNum, removeIndex);

    // 移除数组最后一个元素
    this.nums.pop();
    // 从 map 中删除该元素
    this.map.delete(val);
    return true;
  }

  /**
   * 获取一个随机元素。
   * @returns 随机元素
   */
  getRandom(): number {
    // 生成随机索引
    const randomIndex = Math.floor(Math.random() * this.nums.length);
    // 返回对应元素
    return this.nums[randomIndex];
  }
}
