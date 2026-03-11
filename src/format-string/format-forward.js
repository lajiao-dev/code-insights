// 从同目录下的 prepare-data.js 文件中引入 prepareData 函数
// prepareData 负责：去除负号、四舍五入、拆分整数部分和小数部分
import { prepareData } from './prepare-data.js';

/**
 * 将数字字符串格式化为带千位分隔符的字符串
 * 算法思路：从整数部分的最高位（左侧）向最低位（右侧）遍历，
 *          利用"当前字符之后还剩余的位数"是否为 3 的倍数来判断是否插入逗号。
 *          例如 "1234567"，在索引 0（字符 '1'）之后还剩 6 位，6 % 3 === 0，插入逗号；
 *               在索引 1（字符 '2'）之后还剩 5 位，5 % 3 !== 0，不插入；以此类推。
 *
 * @param {number|string} numStr    - 输入数字，例如 "1234567.89" 或 -42
 * @param {number}        precision - 保留的小数位数，例如 2 表示保留两位小数
 * @returns {string} 格式化后的字符串，例如 "1,234,567.89"
 *
 * 示例：
 *   formatForward("1234567.89", 2)  => "1,234,567.89"
 *   formatForward("-9876543.1", 1)  => "-9,876,543.1"
 *   formatForward("0.999", 2)       => "1.00"
 *
 * ⚠️ 注意：底层使用 toFixed 做四舍五入，存在极少数浮点精度边界问题，
 *   例如 formatForward("1.005", 2) 可能返回 "1.00" 而非 "1.01"。
 */
export function formatForward(numStr, precision) {
  // 调用 prepareData 对输入做预处理，返回三个字段：
  //   integerPart  —— 整数部分字符串，例如 "1234567"
  //   isNegative   —— 布尔值，表示原始数字是否为负数
  //   decimalPart  —— 小数部分字符串（含小数点），例如 ".89"；无小数时为 ""
  const { integerPart, isNegative, decimalPart } = prepareData(
    numStr,
    precision,
  );

  // result：用于拼接最终格式化结果的字符串，初始为空
  let result = '';

  // 获取整数部分的字符总长度，用于控制循环次数及计算剩余位数
  // 例如 integerPart = "1234567"，len = 7
  const len = integerPart.length;

  // 从整数部分的第一个字符（最高位）向最后一个字符（个位）逐位遍历
  // 例如 "1234567" 的索引从 0 到 6，依次取到 '1', '2', '3', '4', '5', '6', '7'
  for (let i = 0; i < len; i++) {
    // 将当前位置的数字字符追加到结果字符串
    // 例如：i=0 时追加 '1'，i=1 时追加 '2'，以此类推
    result += integerPart[i];

    // 计算当前字符之后还剩余多少个数字字符（不含当前字符）
    // 公式：len - 1 是最后一个字符的索引，再减去 i 就是当前字符后面的字符数量
    // 例如 len=7，i=0 时 remainingLen=6，i=1 时 remainingLen=5，...，i=6 时 remainingLen=0
    const remainingLen = len - 1 - i;

    // 判断是否需要在当前字符后面插入逗号：
    //   条件一：remainingLen > 0，即当前字符后面还有字符（最后一位个位不插入逗号）
    //   条件二：remainingLen % 3 === 0，即后面剩余的字符数恰好是 3 的倍数，
    //           这意味着当前字符正好是某个"千位分组"的最高位
    //   例如 len=7：
    //     i=0，remainingLen=6，6%3===0 → 插入逗号（'1' 后面是 6 位，分成两组）
    //     i=1，remainingLen=5，5%3!==0 → 不插入
    //     i=2，remainingLen=4，4%3!==0 → 不插入
    //     i=3，remainingLen=3，3%3===0 → 插入逗号（'4' 后面是 3 位，分成一组）
    //     i=4~6，remainingLen=2,1,0    → 不插入
    //   最终结果："1,234,567"
    if (remainingLen > 0 && remainingLen % 3 === 0) {
      // 插入千位分隔符逗号
      result += ',';
    }
  }

  // 拼接最终结果：
  //   1. 若原始数字为负数则在最前面加上 '-'，否则加空字符串（即不加符号）
  //   2. 拼上已插入逗号的整数部分字符串 result
  //   3. 拼上小数部分（已包含 '.'，例如 ".89"）；若无小数则 decimalPart 为 ""
  return (isNegative ? '-' : '') + result + decimalPart;
}

// --- 测试 ---
console.log(formatForward('1.2345', 2)); // "1.23"
console.log(formatForward('1234567890.12345678905', 10)); // "1,234,567,890.1234567891"
console.log(formatForward('0.999', 2));
