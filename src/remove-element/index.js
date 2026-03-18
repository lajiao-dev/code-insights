/**
 * 移除数组中所有等于给定值的元素，并返回新长度。
 * 必须在“原地”修改输入数组，并在使用 O(1) 额外空间的条件下完成。
 * 
 * @param {number[]} nums - 待处理的整数数组
 * @param {number} val - 需要移除的目标值
 * @returns {number} - 移除目标值后数组的新长度
 */
export function removeElement(nums, val) {
  // 基础边界检查：如果 nums 不是有效的数组，直接返回长度 0
  if (!nums || !Array.isArray(nums)) {
    return 0;
  }

  // 慢指针 (slow)：记录下一个“合格”元素应该存放的位置
  let slow = 0;

  // 快指针 (fast)：遍历整个数组，充当侦察兵的角色
  for (let fast = 0; fast < nums.length; fast++) {
    // 只有当当前元素不等于目标值 val 时，它才是“合格”的
    if (nums[fast] !== val) {
      // 将这个合格的元素搬移到慢指针指向的位置
      nums[slow] = nums[fast];
      // 慢指针向后移动一步，为下一个合格元素腾出位置
      slow++;
    }
    // 如果 nums[fast] 等于 val，我们什么都不做，快指针继续向后搜寻
  }

  // 循环结束后，slow 的数值正好就是新数组的长度
  return slow;
}

// 示例调用
const nums1 = [3, 2, 2, 3];
const val1 = 3;
const len1 = removeElement(nums1, val1);
console.log(len1, nums1.slice(0, len1)); // Expected: 2, [2, 2]

const nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
const val2 = 2;
const len2 = removeElement(nums2, val2);
console.log(len2, nums2.slice(0, len2)); // Expected: 5, [0, 1, 3, 0, 4]
