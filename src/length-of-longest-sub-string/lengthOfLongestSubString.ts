/**
 * 使用优化的滑动窗口方法找到字符串中最长不重复子字符串的长度
 *
 * 算法思路：
 * - 使用 Map 记录每个字符最后出现的位置（而不是用 Set 存储字符）
 * - 当遇到重复字符时，直接将左指针移动到该字符上次出现位置的下一个位置
 * - 这样避免了逐个删除字符的操作，效率更高
 *
 * 时间复杂度：O(n) - 右指针遍历一次字符串，不会回退
 * 空间复杂度：O(min(n, m)) - m为字符集大小，Map 最多存储不同字符的数量
 *
 * @param s - 输入字符串
 * @returns 最长不重复子字符串的长度
 */
export function lengthOfLongestSubString(s: string): number {
    // 获取字符串长度
    const n = s.length;
    // 用来存储找到的最长不重复子字符串的长度
    let maxLen = 0;
    // 左指针：窗口的左边界，初始为 0
    let left = 0;
    // 右指针：窗口的右边界，初始为 0
    let right = 0;
    // 创建 Map 用来存储字符及其最后出现的位置
    // 键是字符，值是该字符在字符串中最后出现的索引
    const indexMap = new Map<string, number>();

    // 使用右指针不断向右扩展窗口，遍历整个字符串
    while(right < n) {
        // 获取右指针指向的字符
        const chart = s[right];

        // 检查当前字符是否已经在 Map 中出现过
        if(indexMap.has(s[right])){
            // 如果字符已出现过，需要更新左指针以排除重复
            // Math.max 确保左指针不会向左移动（只能向右移动）
            // 新的左指针位置 = 上次出现位置 + 1（跳过上次出现的字符）
            left = Math.max(left, (indexMap.get(chart) || 0) + 1);
        }

        // 更新当前字符在 Map 中的位置为当前右指针的位置
        indexMap.set(chart, right);
        // 计算当前窗口的大小 (right - left + 1)，并更新最大值
        maxLen = Math.max(maxLen, right - left + 1);
        // 右指针向右移动一步，继续扩展窗口
        right++;
    }
    // 返回找到的最长不重复子字符串的长度
    return maxLen;
}