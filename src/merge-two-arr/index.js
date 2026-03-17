/**
 * 将两个已排序的数组合并到第一个数组中（就地替换）。
 *
 * @param {number[]} nums1 - 目标数组，长度至少为 m + n。前 m 个元素已按升序排列，其余位置可用作合并后数组的缓冲区。
 * @param {number[]} nums2 - 要合并进 nums1 的数组，长度为 n，已按升序排列。
 * @param {number} m - nums1 中有效元素的个数（从索引 0 到 m-1）。
 * @param {number} n - nums2 的长度（有效元素个数）。
 * @returns {number[]} 经过合并后的 nums1（直接修改传入的 nums1 并返回它）。
 */
export function mergeTwoArr(nums1, nums2, m, n) {
  // 初始化三个指针：p1 指向 nums1 的最后一个有效元素，p2 指向 nums2 的最后一个元素，
  // p 指向 nums1 的最后一个位置（目标写入位置）。
  let p1 = m - 1;
  let p2 = n - 1;
  let p = m + n - 1;

  // 只要 nums2 还有元素，就继续合并。若 nums1 先耗尽，剩下的 nums2 元素会直接写入 nums1。
  while (p2 >= 0) {
    // 如果 nums1 还有可比较元素，且 nums1 当前元素大于 nums2 当前元素，则写入 nums1 的元素；
    // 否则写入 nums2 的元素。
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    // 移动写入指针到下一个位置
    p--;
  }

  return nums1;
}

// 测试
console.log('mergeTwoArr:', mergeTwoArr([1, 2, 3, 0, 0, 0], [2, 5, 6], 3, 3));
console.log('mergeTwoArr:', mergeTwoArr([0], [1], 0, 1));
