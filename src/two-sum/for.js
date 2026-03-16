/**
 * 两数之和：暴力搜索解法 (Double For Loop)
 * 给定一个整数数组 nums 和一个目标值 target，在该数组中找出和为目标值的两个整数，并返回它们的数组下标。
 * 
 * 时间复杂度: O(n^2) - 嵌套的双重循环，外层循环运行 n 次，内层循环平均运行 n/2 次。
 * 空间复杂度: O(1) - 只需要常数级的额外空间存储循环变量。
 * 
 * 优点：写法最直观，不需要额外的内存（如 Map）。
 * 缺点：当数组规模很大时，运行效率非常低。
 * 
 * @param {number[]} nums - 输入的整数数组
 * @param {number} target - 目标和
 * @returns {number[]} - 返回两个数字的下标数组，如果未找到则返回空数组 []
 */
export function twoSum(nums, target) {
  // 1. 参数校验：确保 nums 存在且至少有两个元素，否则无法求和
  if (!nums || !Array.isArray(nums) || nums.length < 2) {
    return [];
  }

  // 2. 外层循环：遍历每一个数作为“第一个数”
  for (let i = 0; i < nums.length; i++) {
    // 计算当前数字想要达成目标值所需要的“另一半” (补数)
    const diff = target - nums[i];

    // 3. 内层循环：从第一个数后面的数字中查找是否存在匹配的补数
    // 注意这里 j = i + 1，是为了避免重复使用同一个数字
    for (let j = i + 1; j < nums.length; j++) {
      // 4. 检查：如果当前数字正好等于我们正在找的补数
      if (diff === nums[j]) {
        // 5. 找到匹配！返回这两个数的下标组成的数组
        return [i, j];
      }
    }
  }

  // 6. 如果所有循环结束都没有找到结果，返回空数组
  return [];
}

// --- 测试用例 (Test Cases) ---
/**
 * 运行示例
 */
// 示例 1: 标准情况
// nums = [2, 7, 11, 15], target = 9
// 2 + 7 = 9, 返回 [0, 1]
console.log('Test 1:', twoSum([2, 7, 11, 15], 9)); 

// 示例 2: 目标值由后面的数字组成
// nums = [3, 2, 4], target = 6
// 2 + 4 = 6, 返回 [1, 2]
console.log('Test 2:', twoSum([3, 2, 4], 6));

// 示例 3: 两个相同的数字相加
// nums = [3, 3], target = 6
// 3 + 3 = 6, 返回 [0, 1]
console.log('Test 3:', twoSum([3, 3], 6));

// 示例 4: 无解情况
console.log('Test 4 (No solution):', twoSum([1, 2, 3], 7));

// 示例 5: 边界情况（空数组或长度不足）
console.log('Test 5 (Empty/Short):', twoSum([1], 9));
