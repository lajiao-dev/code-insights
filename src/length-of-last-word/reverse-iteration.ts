/**
 * 解法二：反向遍历
 * 空间复杂度：O(1)
 * 时间复杂度：O(N)
 */
export function lengthOfLastWord(s: string): number {
    let length = 0;
    let i = s.length - 1;

    // 1. 跳过尾部的空格
    while (i >= 0 && s[i] === ' ') {
        i--;
    }

    // 2. 计算最后一个单词的长度
    while (i >= 0 && s[i] !== ' ') {
        length++;
        i--;
    }

    return length;
}
