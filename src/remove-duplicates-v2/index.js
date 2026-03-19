/**
 * 从有序数组中原地删除重复项，使每个元素最多出现两次。
 *
 * 思路（双指针）：
 *   - slow 指向下一个"可以写入"的位置。
 *   - fast 遍历整个数组，每次检查当前元素是否可以保留。
 *   - 判断条件：nums[fast] !== nums[slow - 2]
 *     即：当前元素与"已保留区域的倒数第二个元素"不相同，
 *     说明它在已保留区域中出现次数还不到 2 次，可以写入。
 *
 * 时间复杂度：O(n)  — 只遍历一次数组
 * 空间复杂度：O(1)  — 原地修改，不使用额外空间
 *
 * @param {number[]} nums - 升序排列的整数数组（原地修改）
 * @returns {number} 去重后有效元素的个数 k；
 *                   调用后 nums 前 k 个元素即为结果。
 *
 * @example
 * const nums = [1, 1, 1, 2, 2, 3];
 * const k = removeDuplicatesV2(nums);
 * // k === 5，nums 前 5 项为 [1, 1, 2, 2, 3]
 */
export function removeDuplicatesV2(nums) {
  // 入参校验：非数组直接返回 0
  if (!nums || !Array.isArray(nums)) {
    return 0;
  }

  // 长度 <= 2 时，每个元素最多出现 2 次的条件天然满足，无需处理
  if (nums.length <= 2) {
    return nums.length;
  }

  // slow：已处理（保留）区域的末尾后一位，初始为 2
  // 前两个元素无论如何都保留，所以从索引 2 开始写入
  let slow = 2;

  for (let fast = 2; fast < nums.length; fast++) {
    // 若当前元素与已保留区域的倒数第二个不同，
    // 说明它不会导致某个值出现 3 次以上，可以保留
    if (nums[fast] !== nums[slow - 2]) {
      nums[slow] = nums[fast]; // 写入到 slow 位置
      slow++; // slow 后移，准备接收下一个合法元素
    }
    // 否则跳过该元素（fast 继续前进，slow 不动）
  }

  // slow 即为有效元素的个数
  return slow;
}

// --- tests ---
const cases = [
  { input: [1, 1, 1, 2, 2, 3], expected: 5 }, // [1,1,2,2,3]
  { input: [0, 0, 1, 1, 1, 1, 2, 3, 3], expected: 7 }, // [0,0,1,1,2,3,3]
  { input: [1, 1], expected: 2 }, // length <= 2, return as-is
  { input: [1], expected: 1 },
  { input: [], expected: 0 },
];

for (const { input, expected } of cases) {
  const arr = [...input];
  const result = removeDuplicatesV2(arr);
  const pass = result === expected;
  console.log(
    `${pass ? 'PASS' : 'FAIL'} removeDuplicatesV2([${input}]) => ${result} (expected ${expected})`,
  );
}
