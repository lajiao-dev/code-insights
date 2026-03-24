/**
 * 计算学者的 h 指数（排序法）。
 *
 * @param citations - 每篇论文的引用次数数组
 * @returns h 指数
 */
export function hIndexBySort(citations: number[]): number {
  // 复制一份数组，避免修改原始数据
  const nums = [...citations].sort((a, b) => b - a); // 降序排列
  const len = nums.length;
  let h = 0; // h 指数初始为 0

  // 遍历排序后的数组
  // h 代表当前尝试的 h 指数
  // nums[h] > h 表示有超过 h 篇论文引用数大于 h
  while (h < len && nums[h] > h) {
    h++;
  }
  // 返回最终的 h 指数
  return h;
}
