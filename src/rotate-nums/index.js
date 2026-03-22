/**
 * 旋转数组（三步翻转法）
 * 将数组中的元素向右轮转 k 个位置
 * @param {number[]} nums - 需要旋转的数组
 * @param {number} k - 旋转的步数
 * @returns {number[]} 旋转后的数组
 */
export function rotateNums(nums, k) {
  // 基础边界检查：如果不是数组、数组为空或只有一个元素，无需旋转
  if (!Array.isArray(nums) || nums.length <= 1) {
    return nums;
  }

  const len = nums.length;
  // 核心处理：
  // 1. k % len: 旋转 10 次对于长度为 7 的数组，实际上等于旋转 3 次
  // 2. (k % len + len) % len: 处理 k 可能为负数的情况，向左转转化为等价的向右转
  k = (k % len + len) % len;

  if (k === 0) return nums;

  /**
   * 辅助函数：翻转数组特定范围内的元素
   * @param {number[]} arr - 目标数组
   * @param {number} left - 起始下标
   * @param {number} right - 结束下标
   */
  function reverse(arr, left, right) {
    while (left < right) {
      // 使用解构赋值交换两个元素的值
      [arr[right], arr[left]] = [arr[left], arr[right]];
      left++;
      right--;
    }
  }

  // 三步翻转逻辑（向右旋转 k 的经典算法）：
  // 1. 翻转整个数组：[1,2,3,4,5,6,7] -> [7,6,5,4,3,2,1]
  reverse(nums, 0, len - 1);
  // 2. 翻转前 k 个元素：[7,6,5, 4,3,2,1] -> [5,6,7, 4,3,2,1] (假设 k=3)
  reverse(nums, 0, k - 1);
  // 3. 翻转剩余元素：[5,6,7, 4,3,2,1] -> [5,6,7, 1,2,3,4]
  reverse(nums, k, len - 1);

  return nums;
}

// 可视化测试用例
const list = [1, 2, 3, 4, 5, 6, 7];
rotateNums(list, 3);
console.log('旋转结果:', list); // 预期输出: [5, 6, 7, 1, 2, 3, 4]
