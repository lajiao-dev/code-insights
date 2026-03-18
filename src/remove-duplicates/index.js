/**
 * 移除排序数组中的重复项，并返回新长度。
 * 注意：必须在“原地”修改输入数组，并在使用 O(1) 额外空间的条件下完成。
 * 
 * @param {number[]} nums - 已排序的整数数组
 * @returns {number} - 去重后数组的新长度
 */
export function removeDuplicates(nums) {
  // 基础边界检查：如果 nums 不是有效的数组或长度为 0，直接返回长度 0
  if (!nums || !Array.isArray(nums) || nums.length === 0) {
    return 0;
  }

  // 使用双指针法：
  // slow (慢指针)：记录当前已确定的不重复序列的最后一个元素的位置
  let slow = 0;

  // fast (快指针)：遍历整个数组，寻找与 slow 指向的元素不同的新值
  for (let fast = 1; fast < nums.length; fast++) {
    // 如果快指针发现了一个与当前 slow 指向的值不同的新元素
    if (nums[fast] !== nums[slow]) {
      // 慢指针后移一位，为存放新元素腾出空间
      slow++;
      // 将新元素覆盖到慢指针当前指向的位置
      nums[slow] = nums[fast];
    }
    // 如果 nums[fast] 等于 nums[slow]，说明是重复项，快指针跳过
  }

  // 由于数组下标从 0 开始，长度应为最后一位下标 + 1
  return slow + 1;
}

// 示例调用
const nums1 = [1, 1, 2];
const len1 = removeDuplicates(nums1);
console.log(len1, nums1.slice(0, len1)); // Expected: 2, [1, 2]

const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const len2 = removeDuplicates(nums2);
console.log(len2, nums2.slice(0, len2)); // Expected: 5, [0, 1, 2, 3, 4]
