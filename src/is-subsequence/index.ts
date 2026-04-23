/**
 * 判断 s 是否是 t 的子序列
 * 使用双指针法：依次在 t 中寻找 s 的每个字符，保持相对顺序
 * 
 * @param s - 待检查的子序列字符串
 * @param t - 源字符串
 * @returns 如果 s 是 t 的子序列返回 true，否则返回 false
 * 
 * @example
 * isSubsequence("abc", "ahbgdc") // true
 * isSubsequence("axc", "ahbgdc") // false
 */
export function isSubsequence(s: string, t: string): boolean {
    let i = 0, j = 0; // i 指向 s 的当前字符，j 指向 t 的当前字符

    // 同时遍历 s 和 t，直到其中一个遍历完
    while (i < s.length && j < t.length) {
        // 如果当前字符匹配
        if (s[i] === t[j]) {
            i++; // s 指针前移，继续匹配下一个字符
        }
        j++; // t 指针始终前移，继续在 t 中寻找
    }

    // 循环结束后，检查 s 是否已完全匹配
    return i === s.length;
}