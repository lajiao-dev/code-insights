/**
 * 寻找数组中的多数元素（出现次数超过 n/2 的元素）
 * 使用 Boyer-Moore 投票算法 (Moore Voting Algorithm)
 * 时间复杂度: O(n) - 只需遍历一次数组
 * 空间复杂度: O(1) - 只需要两个变量记录状态
 * 
 * @param {number[]} nums 输入的数字数组
 * @returns {number | null} 返回多数元素，若数组为空则返回 null
 */
export function majorityElement(nums) {
  // 基础校验：如果数组为空或未定义，直接返回 null
  if (!nums || !Array.isArray(nums) || nums.length === 0) {
    return null;
  }
  // 如果只有一个元素，直接返回该元素
  if (nums.length === 1) {
    return nums[0];
  }

  // 1. 初始化候选人 (candidate) 和计票器 (count)
  let count = 0;
  let candidate = null;

  // 2. 开始投票过程
  for (const num of nums) {
    // 如果计票器归零，说明之前的候选人被其他数字抵消了，
    // 我们选择当前的数字作为新的候选人。
    if (count === 0) {
      candidate = num;
    }

    // 计票规则：
    // 如果当前数字与候选人相同，计票加 1；
    // 如果不同，计票减 1（相当于两个不同的数字同归于尽）。
    count += candidate === num ? 1 : -1;
  }

  /**
   * 提示：根据 Boyer-Moore 算法原理，
   * 如果数组中一定存在出现次数超过 n/2 的元素，
   * 那么循环结束后 candidate 就是我们要找的答案。
   */
  return candidate;
}

