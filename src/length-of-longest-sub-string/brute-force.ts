/**
 * 使用蛮力方法找到字符串中最长不重复子字符串的长度
 *
 * 算法思路：
 * - 双层循环遍历所有可能的子字符串
 * - 对每个子字符串检查是否所有字符都不重复
 * - 记录满足条件的最长子字符串长度
 *
 * 时间复杂度：O(n³)
 * 空间复杂度：O(min(n, m)) - m为字符集大小，存储在 Set 中
 *
 * @param str - 输入字符串
 * @returns 最长不重复子字符串的长度
 */
export function lengthOfLongestSubString(str: string): number {
    // 获取字符串长度，用于循环边界
    const n = str.length;
    // 用来存储找到的最长不重复子字符串的长度
    let maxLen = 0;

    // 外层循环：设置子字符串的起始位置 i
    for (let i = 0; i < n; i++) {
        // 内层循环：设置子字符串的结束位置 j
        for (let j = i; j < n; j++) {
            // 检查从位置 i 到 j 的子字符串是否所有字符都不重复
            if (isUnique(str, i, j)) {
                // 如果不重复，计算当前子字符串长度 (j - i + 1)，并更新最大值
                maxLen = Math.max(maxLen, j - i + 1);
            }
        }
    }
    // 返回最长不重复子字符串的长度
    return maxLen;
}

/**
 * 检查字符串在指定范围内是否所有字符都不重复
 *
 * 算法思路：
 * - 使用 Set 来跟踪已经见过的字符
 * - 遍历指定范围内的每个字符
 * - 如果遇到重复字符，立即返回 false
 * - 否则将字符加入 Set 中继续检查
 *
 * 时间复杂度：O(n) - n为检查范围的大小
 * 空间复杂度：O(n) - Set 最多存储 n 个字符
 *
 * @param s - 输入字符串
 * @param left - 检查范围的起始位置（包含）
 * @param right - 检查范围的结束位置（包含）
 * @returns 如果范围内所有字符都不重复返回 true，否则返回 false
 */
export function isUnique(s: string, left: number, right: number): boolean {
    // 创建一个 Set 用来存储已经见过的字符
    const set = new Set();
    // 遍历从 left 到 right（包含）的所有字符
    for (let i = left; i <= right; i++) {
        // 检查当前字符是否已经存在于 Set 中
        if (set.has(s[i])) {
            // 如果字符已存在，说明有重复，返回 false
            return false;
        }
        // 如果字符不存在，将其添加到 Set 中
        set.add(s[i]);
    }
    // 如果遍历完所有字符都没有发现重复，返回 true
    return true;
}