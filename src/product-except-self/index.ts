/**
 * @param nums - 整数数组
 * @returns 返回一个新数组，其中每个位置的值等于原数组中除当前元素外其余元素的乘积
 *
 * @example
 * productExceptSelf([1, 2, 3, 4]) // [24, 12, 8, 6]
 * productExceptSelf([-1, 1, 0, -3, 3]) // [0, 0, 9, 0, 0]
 */
export function productExceptSelf(nums: number[]): number[] {
    // 记录数组长度，后面会多次用到，避免重复写 nums.length。
    const len = nums.length;
    // 创建结果数组 answer，长度和 nums 一样，先全部填成 1，方便后续做乘法累积。
    const answer = new Array(len).fill(1);

    // 从左往右遍历，计算每个位置左边所有元素的乘积。
    for (let i = 1; i < len; i++) {
        // answer[i - 1] 是“前一个位置左边所有元素的乘积”，再乘上 nums[i - 1]，
        // 就得到了“当前位置左边所有元素的乘积”。
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    // right 表示“当前位置右边所有元素的乘积”，一开始右边没有元素，所以初始值是 1。
    let right = 1;
    // 从右往左遍历，把右边乘积和前面已经算好的左边乘积合并起来。
    for (let i = len - 1; i >= 0; i--) {
        // answer[i] 当前存的是左边乘积，乘上 right 之后，就变成“除自己以外所有元素的乘积”。
        answer[i] = answer[i] * right;
        // 更新 right：把当前元素 nums[i] 也乘进去，供左边一个位置继续使用。
        right *= nums[i];
    }

    // 返回最终结果数组。
    return answer;
}