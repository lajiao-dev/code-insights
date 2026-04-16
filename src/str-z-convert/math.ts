/**
 * Z 字形变换 — 进阶数学解法（直接构造法）
 * 不需要模拟遍历过程，而是通过数学公式直接计算每个字符在原字符串中的索引位置。
 * @param s - 原始字符串
 * @param rows - Z 字形排列的行数
 * @returns 按 Z 字形排列后，逐行拼接的结果字符串
 */
export function strZConvertMath(s: string, rows: number): string {
    // 只有 1 行或字符串长度不足以形成 Z 形，直接返回原字符串
    if (rows === 1 || s.length < rows) {
        return s;
    }

    // 一个完整的 Z 字形周期长度：从第 0 行走到第 rows-1 行再折返回第 1 行
    // 例如 rows=4 时，周期为 0→1→2→3→2→1，共 6 步，即 2*(4-1)=6
    const cycle = 2 * (rows - 1);

    let result = "";

    // 逐行构造结果
    for (let row = 0; row < rows; row++) {
        // 在每个周期中，寻找属于当前行的字符
        for (let j = 0; j + row < s.length; j += cycle) {
            // 每个周期的「下行阶段」都会经过当前行一次，索引为 j + row
            result += s[j + row];

            // 对于非首行和非末行，每个周期还有「上行阶段」会再经过当前行一次
            // 上行阶段的索引 = 下一个周期起点 - 当前行号，即 j + cycle - row
            // 首行(row=0)和末行(row=rows-1)在上行阶段不会产生额外字符，
            // 因为它们的上行索引和下行索引重合（首行：j+cycle-0 = 下一周期的下行；末行：j+cycle-(rows-1) = j+rows-1 = 下行索引本身）
            if (row !== 0 && row !== rows - 1 && j + cycle - row < s.length) {
                result += s[j + cycle - row];
            }
        }
    }

    return result;
}
