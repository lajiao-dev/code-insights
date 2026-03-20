/**
 * 寻找数组中的多数元素（出现次数超过 n/2 的元素）
 * 使用哈希表 (Map) 记录频率
 * 时间复杂度: O(n) - 遍历一次数组
 * 空间复杂度: O(n) - 最坏环境下需要存储数组中所有不同的数
 * 
 * @param {number[]} nums 输入的数字数组
 * @returns {number | null} 返回多数元素，若数组为空则返回 null
 */
export function majorityElement(nums) {
  // 1. 基础校验：非数组或空数组返回 null
  if (!nums || !Array.isArray(nums) || nums.length === 0) {
    return null;
  }
  // 如果只有一个元素，直接返回该元素
  if (nums.length === 1) {
    return nums[0];
  }

  // 2. 初始化哈希表来记录每个数字出现的次数
  const hashMap = new Map();
  // 计算“多数”的标准（超过一半的长度）
  const threshold = nums.length / 2;

  // 3. 遍历数组进行计数
  for (const num of nums) {
    // 获取当前数字之前的次数，如果没有则默认为 0，然后加 1
    const count = (hashMap.get(num) || 0) + 1;
    
    // 实时检查：如果当前数字出现次数已经超过一半，直接返回
    if (count > threshold) {
      return num;
    }
    
    // 更新哈希表中的计数值
    hashMap.set(num, count);
  }
  
  return null;
}

