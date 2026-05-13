/**
 * 使用滑动窗口方法找到字符串中最长不重复子字符串的长度
 *
 * 算法思路：
 * - 使用两个指针（left 和 right）维护一个窗口
 * - 窗口内的子字符串始终保持不包含重复字符
 * - 右指针不断向右扩展，当遇到重复字符时，左指针向右移动以缩小窗口
 * - 记录过程中最大的窗口大小
 *
 * 时间复杂度：O(n) - 左右指针各遍历一次字符串
 * 空间复杂度：O(min(n, m)) - m为字符集大小，存储在 Set 中
 *
 * @param s - 输入字符串
 * @returns 最长不重复子字符串的长度
 */
export function slidingWindow(s: string) {
    // 获取字符串长度
    const n = s.length;
    // 创建 Set 用来存储当前窗口内的字符，用于快速检查字符是否重复
    const set = new Set();
    // 用来存储找到的最长不重复子字符串的长度
    let maxLen = 0;
    // 左指针：窗口的左边界
    let left = 0;
    // 右指针：窗口的右边界
    let right = 0;

    // 不断向右扩展窗口，直到遍历完整个字符串
    while (right < n) {
        // 检查右指针指向的字符是否已在窗口中
        if (!set.has(s[right])) {
            // 如果字符不存在，说明可以添加到窗口中
            set.add(s[right]);
            // 计算当前窗口大小 (right - left + 1)，并更新最大值
            maxLen = Math.max(maxLen, right - left + 1);
            // 右指针继续向右移动，扩展窗口
            right++;
        } else {
            // 如果字符已存在，说明有重复，需要缩小窗口
            // 从窗口左边删除字符，缩小窗口大小
            set.delete(s[left]);
            // 左指针向右移动一步
            left++;
            // 不移动右指针，继续检查这个字符是否可以加入
        }
    }
    // 返回找到的最长不重复子字符串的长度
    return maxLen;
}
