/**
 * 两数之和：哈希表解法
 * 给定一个整数数组 nums 和一个目标值 target，在该数组中找出和为目标值的两个整数，并返回它们的数组下标。
 * 
 * 时间复杂度: O(n) - 只需要遍历一次数组，哈希表的查找和插入操作平均时间复杂度为 O(1)。
 * 空间复杂度: O(n) - 在最坏情况下需要存储所有数组元素。
 * 
 * @param {number[]} nums - 输入的整数数组
 * @param {number} target - 目标和
 * @returns {number[]} - 返回两个数字的下标数组，如果未找到则返回空数组 []
 */
export function twoSum(nums, target) {
  // 1. 参数校验：如果数组不存在、不是数组或者长度不足 2（至少需要两个数才能求和）
  if (!nums || !Array.isArray(nums) || nums.length < 2) {
    return [];
  }

  // 2. 创建一个 Map 用来存储已经遍历过的数字及其索引
  // Key: 数字的值, Value: 该数字在原数组中的下标 (Index)
  const hashMap = new Map();

  // 3. 遍历数组
  for (let i = 0; i < nums.length; i++) {
    // 计算当前数字想要达成目标值所需要的“另一半”（也就是补数）
    const diff = target - nums[i];

    // 4. 检查补数是否已经在哈希表中
    // 如果在，说明我们之前遇到过它，它的下标 + 当前下标 i 就是结果
    if (hashMap.has(diff)) {
      // 返回保存的下标和当前下标
      return [hashMap.get(diff), i];
    }

    // 5. 如果补数不在哈希表里，将当前数字及其下标存入哈希表
    // 这样后面遍历到的数字如果需要它，就能快速找到
    hashMap.set(nums[i], i);
  }

  // 6. 如果遍历完都没有找到结果，按照约定返回空数组
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
