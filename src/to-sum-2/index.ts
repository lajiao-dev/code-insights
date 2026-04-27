/**
 * 双指针法求两数之和
 * @param numbers 有序数组（升序）
 * @param target 目标和
 * @returns 两个数的索引位置（从 1 开始）
 */
export function twoSum(numbers: number[], target: number): number[] {
    // 左指针从数组起始位置开始
    let left = 0;
    // 右指针从数组末尾位置开始
    let right = numbers.length - 1;

    // 当左指针小于右指针时继续循环
    while (left < right) {
        // 计算当前两个指针指向元素的和
        const sum = numbers[left] + numbers[right];

        // 如果和等于目标值，返回结果（索引需要加 1，因为题目要求从 1 开始）
        if (sum === target) {
            return [left + 1, right + 1]
        }
        // 如果和小于目标值，说明需要更大的数，左指针右移
        else if (sum < target) {
            left++;
        }
        // 如果和大于目标值，说明需要更小的数，右指针左移
        else {
            right--;
        }
    }

    // 没有找到符合条件的两个数，返回空数组
    return [];
}