/**
 * Z 字形变换
 * @param s - 原始字符串
 * @param rows - Z 字形排列的行数
 * @returns 按 Z 字形排列后，逐行拼接的结果字符串
 */
export function strZConvert(s: string, rows: number): string {
    // 只有 1 行或字符串长度不足以形成 Z 形，直接返回原字符串
    if (rows === 1 || s.length < rows) {
        return s;
    }

    // 创建一个数组，每个元素代表 Z 字形中的一行，初始为空字符串
    const strRows = new Array(rows).fill("");
    // 当前字符应该放到第几行
    let currRow = 0;
    // 标记当前遍历方向：true 表示从上往下，false 表示从下往上
    let goingDown = false;

    for (const char of s) {
        // 把当前字符追加到对应行
        strRows[currRow] += char;

        // 到达第一行或最后一行时，需要掉头（反转方向）
        if (currRow === 0 || currRow === rows - 1) {
            goingDown = !goingDown;
        }

        // 根据方向移动行号：向下则 +1，向上则 -1
        currRow += goingDown ? 1 : -1;
    }

    // 把所有行拼接起来就是最终结果
    return strRows.join("");
}