/**
 * 将罗马数字字符串转换为整数
 * @param str 罗马数字字符串，例如 "XIV"
 * @returns 对应的整数值
 */
export function romanToNum(str: string): number {
    // 建立罗马字符到数值的映射表
    const romanMap = new Map([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000]
    ]);

    let ans = 0;
    const n = str.length;

    for (let i = 0; i < n; i++) {
        // 取当前字符对应的数值，若不在映射表中则为 0
        const value = romanMap.get(str[i]) ?? 0;
        // 若当前值小于下一个字符的值，说明是减法规则（如 IV = 4，IX = 9）
        // 此时应减去当前值；否则正常累加
        if (i < n - 1 && value < (romanMap.get(str[i + 1]) ?? 0)) {
            ans -= value
        } else {
            ans += value;
        }
    }

    return ans;
}

console.log('III', romanToNum('III')) // 3
console.log('IV', romanToNum('IV')) // 4
console.log('IX', romanToNum('IX')) // 9
console.log('LVIII', romanToNum('LVIII')) // 58
console.log('MCMXCIV', romanToNum('MCMXCIV')) // 1994
