// 从同目录下的 prepare-data.js 文件中引入 prepareData 函数
// prepareData 负责：去除负号、四舍五入、拆分整数部分和小数部分
import { prepareData } from './prepare-data.js';

/**
 * 将数字字符串格式化为带千位分隔符的字符串
 * 算法思路：从整数部分的最后一位（个位）向前遍历，每累计 3 位就插入一个逗号，
 *          最终将收集到的字符数组反转，拼上符号和小数部分。
 *
 * @param {number|string} numStr    - 输入数字，例如 "1234567.89" 或 -42
 * @param {number}        precision - 保留的小数位数，例如 2 表示保留两位小数
 * @returns {string} 格式化后的字符串，例如 "1,234,567.89"
 *
 * 示例：
 *   formatBackward("1234567.89", 2)  => "1,234,567.89"
 *   formatBackward("-9876543.1", 1)  => "-9,876,543.1"
 *   formatBackward("0.999", 2)       => "1.00"
 */
export function formatBackward(numStr, precision) {
  // 调用 prepareData 对输入做预处理，返回三个字段：
  //   integerPart  —— 整数部分字符串，例如 "1234567"
  //   isNegative   —— 布尔值，表示原始数字是否为负数
  //   decimalPart  —— 小数部分字符串（含小数点），例如 ".89"；无小数时为 ""
  const { integerPart, isNegative, decimalPart } = prepareData(
    numStr,
    precision,
  );

  // result：用于收集处理后的字符（数字字符和逗号），最终会被反转拼接成字符串
  // count：记录已经放入 result 的"数字字符"个数，用于判断何时插入逗号
  let result = [],
    count = 0;

  // 获取整数部分的字符总长度，用于控制循环的起始位置
  // 例如 integerPart = "1234567"，len = 7
  const len = integerPart.length;

  // 从整数部分的最后一个字符（个位）向前遍历到第一个字符（最高位）
  // 例如 "1234567" 的索引从 6 到 0，依次取到 '7', '6', '5', '4', '3', '2', '1'
  for (let i = len - 1; i >= 0; i--) {
    // 每当已收集的数字字符数量达到 3 的倍数时（且不是第一个字符），
    // 说明需要在这里插入一个千位分隔符逗号。
    // 例如：count=3 时（已放入 '7','6','5'），此时准备放第4位，先插入 ','
    if (count > 0 && count % 3 === 0) {
      result.push(','); // 向数组末尾添加逗号
    }

    // 将当前位置的数字字符加入数组
    // 例如：i=6 时取 integerPart[6] = '7'，i=5 时取 '6'，以此类推
    result.push(integerPart[i]);

    // 数字字符计数加一，用于下一次循环判断是否需要插入逗号
    count++;
  }

  // 循环结束后 result 中的字符是"从个位到最高位"的倒序，例如 ['7','6','5',',','4','3','2',',','1']
  // reverse() 将数组原地反转，变为正序：['1',',','2','3','4',',','5','6','7']
  // join('') 将数组元素拼接成字符串（不加任何分隔符）："1,234,567"
  // 最后在开头加上负号（若原始数字为负），末尾拼上小数部分
  return (isNegative ? '-' : '') + result.reverse().join('') + decimalPart;
}

// --- 测试 ---
console.log(formatBackward('1.2345', 2)); // "1.23"
console.log(formatBackward('1234567890.12345678905', 10)); // "1,234,567,890.1234567891"
console.log(formatBackward('0.999', 2));
