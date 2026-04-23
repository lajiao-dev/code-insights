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
    // 统一转为小写，方便后续 isValid 只需覆盖 'a'~'z' 范围
    s = s.toLowerCase();

    /**
     * 判断一个字符是否为有效字符（小写字母或数字）。
     * 利用字符的字典序比较，无需正则，也不产生新字符串。
     */
    const isValid = (char: string): boolean =>
        (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9');

    // 左指针从字符串头部出发
    let left = 0;
    // 右指针从字符串尾部出发
    let right = s.length - 1;

    // 两指针未相遇时持续循环
    while (left < right) {
        const lChar = s[left];
        const rChar = s[right];

        // 左侧字符无效，跳过并右移左指针
        if (!isValid(lChar)) {
            left++;
            continue;
        }

        // 右侧字符无效，跳过并左移右指针
        if (!isValid(rChar)) {
            right--;
            continue;
        }

        // 两侧字符均有效，若不相等则不是回文，立即返回 false
        if (lChar !== rChar) {
            return false;
        }

        // 当前这对字符匹配，继续向中间移动
        left++;
        right--;
    }

    // 所有有效字符均两两匹配，是回文
    return true;
}
