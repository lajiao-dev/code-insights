/**
 * 通过计数桶法计算 h 指数。
 *
 * @param citations - 每篇论文的引用次数数组
 * @returns h 指数
 */
export function hIndexByBuckets(citations: number[]): number {
  const n = citations.length;
  // 创建 n+1 个桶，buckets[i] 表示引用数为 i 的论文数，buckets[n] 表示引用数 >= n 的论文数
  const buckets = new Array(n + 1).fill(0);

  // 统计每个引用数出现的次数
  for (const c of citations) {
    if (c >= n) {
      // 引用数大于等于 n 的论文都归到最后一个桶
      buckets[n]++;
    } else {
      // 其余归到对应桶
      buckets[c]++;
    }
  }

  let count = 0; // 记录累计论文数
  // 从后往前遍历桶，寻找最大的 h 使得有至少 h 篇论文引用数 >= h
  for (let i = n; i >= 0; i--) {
    count += buckets[i];
    if (count >= i) {
      // 找到第一个满足条件的 i，即为 h 指数
      return i;
    }
  }
  // 理论上不会走到这里，返回 0 兜底
  return 0;
}
