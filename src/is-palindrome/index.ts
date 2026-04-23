/**
 * @param s - 待判断的字符串
 * @returns 若字符串满足回文条件则返回 true，否则返回 false
 *
 * @example
 * isPalindrome("A man, a plan, a canal: Panama") // true
 * isPalindrome("race a car") // false
 * isPalindrome(" ") // true
 */
export function isPalindrome(s: string): boolean {
    // 用正则去掉所有非字母数字字符，并统一转为小写，屏蔽大小写和标点符号的干扰。
    const cleaned = s.replace(/[^a-z0-9]/gi, '').toLowerCase();

    // 左指针从头部出发，右指针从尾部出发。
    let left = 0;
    let right = cleaned.length - 1;

    // 两指针向中间逼近，逐一比较对称位置的字符。
    while (left < right) {
        // 对称位置字符不相等，直接判定不是回文。
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }

    // 所有对称字符均匹配，是回文。
    return true;
}
