// 函数：返回字符串 str 中出现频率最高的前 n 个字符
// 参数 str：要统计的字符串；参数 n：取前几名
// 返回值：[{ char, count }, ...] 形式的数组，按出现次数从多到少排列
export function getTopNChars(str, n) {
  // 边界守卫：
  //   !str           —— str 为空字符串、null 或 undefined 时直接返回空数组
  //   !Number.isInteger(n) —— n 必须是整数，排除 undefined / NaN / 小数等非法值
  //   n <= 0         —— n 必须大于 0，否则"前 0 名"没有意义
  if (!str || !Number.isInteger(n) || n <= 0) {
    return [];
  }

  // 第一步：构建字符频率表（Map）
  // [...str] 利用字符串迭代器将字符串拆成单个字符的数组
  //   例如 'abc' => ['a', 'b', 'c']，能正确处理 emoji 等多字节字符
  // .reduce(回调, 初始值) 从左到右遍历数组，把结果累积到 acc 中
  //   初始值 new Map() 是一个空的键值对映射表，用来存 { 字符 => 出现次数 }
  const charMap = [...str].reduce((acc, char) => {
    // acc.get(char) 取出该字符目前的计数，若从未出现过则返回 undefined
    // || 0 把 undefined 转为 0，保证后续 +1 不会产生 NaN
    // acc.set(char, ...) 将新计数写回 Map，完成一次"计数 +1"
    acc.set(char, (acc.get(char) || 0) + 1);
    // 必须 return acc，让下一次迭代继续使用同一个 Map
    return acc;
  }, new Map()); // new Map() 是累加器的初始值（空频率表）

  // 第二步：排序 → 截取前 n 名 → 格式化输出，三步链式调用
  return [...charMap] // 将 Map 转为 [[char, count], ...] 二维数组，方便排序
    .sort((a, b) => b[1] - a[1]) // 按 count（索引 1）从大到小排序：b[1] - a[1] > 0 时 b 排前面
    .slice(0, n) // 只保留前 n 个元素（索引 0 到 n-1）
    .map(([char, count]) => ({ char, count })); // 将 [char, count] 解构为 { char, count } 对象，更易读
}

// 测试：找出字符串 "aabbbccccddddd" 中出现次数前 3 的字符
const result = getTopNChars('aabbbccccddddd', 3);
console.log(result);
/* 输出: 
[
  { char: 'd', count: 5 },
  { char: 'c', count: 4 },
  { char: 'b', count: 3 }
]
*/
