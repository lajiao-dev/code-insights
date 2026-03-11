/**
 * 预处理数据：清洗，大数四舍五入，拆分
 * @param {number|string} numStr  - 输入的数字或数字字符串，例如 "1234.5678" 或 -42
 * @param {number}        precision - 保留的小数位数，例如 2 表示保留两位小数
 */
export function prepareData(numStr, precision){
    // 将传入的值统一转成字符串，并去掉首尾空格，防止意外的空格导致解析错误
    let str = String(numStr).trim();

    // 判断字符串是否以 '-' 开头，从而确定该数字是否为负数
    const isNegative = str.startsWith('-');

    if(isNegative){
        // 如果是负数，去掉开头的负号，后续只对纯数字部分进行处理
        str = str.slice(1);
    }

    // 将字符串转为数字，再用 toFixed 按指定精度做四舍五入，结果仍是字符串
    // 例如：Number("1234.5678").toFixed(2) => "1234.57"
    //
    // ⚠️ toFixed 的已知缺陷（浮点精度问题）：
    //   由于 IEEE 754 浮点数在二进制下无法精确表示某些十进制小数，
    //   toFixed 在部分环境中对"恰好在中间"的数四舍五入结果不可靠。
    //   例如：(1.005).toFixed(2) 在 V8 中返回 "1.00"，而非期望的 "1.01"
    //         (1.255).toFixed(2) 同样可能返回 "1.25" 而非 "1.26"
    //
    // ✅ 改善方案：
    //   方案一（字符串偏移法，轻量）：在转换前对原始字符串末尾补一个极小量，
    //     规避"恰好在中间"的浮点误差：
    //     Number(str + "e1").toFixed(precision + 1).slice(0, -1)  —— 仅适合简单场景
    //
    //   方案二（Math.round 乘法，常用）：
    //     (Math.round(Number(str) * 10**precision) / 10**precision).toFixed(precision)
    //     原理：先放大到整数再 round，避开小数阶段的浮点误差；但极大数仍可能溢出
    //
    //   方案三（BigInt 整数法，与方案二思路相同但彻底避免浮点）：
    //     与方案二的"放大→取整→缩回"思路一致，区别在于全程使用字符串解析 + BigInt
    //     运算，不经过浮点数，因此不受 IEEE 754 精度限制，也不会因数字过大而溢出。
    //     实现思路：
    //       1. 将字符串按小数点拆分为整数部分和小数部分
    //       2. 把小数部分填充/截断至 precision+1 位，与整数部分拼接成一个纯整数字符串
    //       3. 转为 BigInt，加 5n 后除以 10n（等价于对第 precision+1 位做四舍五入）
    //       4. 把结果字符串重新插入小数点
    //     例如对 "1.005" precision=2：
    //       整数部分 "1"，小数部分补齐3位 "005" => BigInt("1005")
    //       (1005n + 5n) / 10n = 100n  => "1.00"  ✅ 结果正确，无浮点误差
    //
    //   方案四（第三方库，生产推荐）：
    //     使用 decimal.js / big.js 等任意精度库，可完全避免浮点问题：
    //     import Decimal from 'decimal.js';
    //     new Decimal(str).toFixed(precision)
    const fixed = Number(str).toFixed(precision);

    // 以小数点为分隔符拆分字符串，得到整数部分和小数部分
    // 例如："1234.57".split('.') => ["1234", "57"]
    // 如果没有小数点（precision 为 0），decimalPart 会是 undefined
    const [integerPart, decimalPart] = fixed.split('.');

    return {
        isNegative,   // 是否为负数，布尔值
        integerPart,  // 整数部分字符串，例如 "1234"
        // 如果有小数部分，则在前面拼上 '.'，方便后续格式化；否则返回空字符串
        decimalPart: decimalPart ? `.${decimalPart}` : "",
    };
}
