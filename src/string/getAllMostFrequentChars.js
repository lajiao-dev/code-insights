export function getAllMostFrequentChars(str) {
  // 边界处理：如果传入的字符串为空（null、undefined 或空字符串），
  // 直接返回默认值，避免后续逻辑报错
  if (!str) {
    return { chars: [], count: 0 };
  }

  // 用一个普通对象充当"频率表"（哈希表）
  // 键是字符，值是该字符出现的次数
  // 例如 "aab" 遍历完后 charMap = { a: 2, b: 1 }
  const charMap = {};

  // maxCount：记录目前为止出现次数最多的字符的次数
  // 随着遍历不断更新
  let maxCount = 0;

  // 逐字符遍历整个字符串
  for (const char of str) {
    // 如果该字符已经出现过，次数 +1；否则初始化为 1
    // (charMap[char] || 0) 的作用：当 charMap[char] 为 undefined 时，取 0 作为初始值
    charMap[char] = (charMap[char] || 0) + 1;

    // 每次更新频率后，检查是否超过了当前记录的最大值
    // 如果是，就更新 maxCount
    if (charMap[char] > maxCount) {
      maxCount = charMap[char];
    }
  }

  // 遍历结束后，从频率表中筛选出所有出现次数等于 maxCount 的字符
  // 这样可以同时找出所有并列最高频的字符，而不只是第一个
  const result = Object.keys(charMap).filter(
    (char) => charMap[char] === maxCount,
  );

  // 返回结果对象：
  // chars —— 所有出现频率最高的字符组成的数组
  // count —— 最高频率是多少次
  return {
    chars: result,
    count: maxCount,
  };
}

// 测试案例
const testStr = 'aabbc';
const result = getAllMostFrequentChars(testStr);

console.log(`最高频率为: ${result.count}`);
console.log(`对应的字符有: ${result.chars.join(', ')}`);
// 输出: 最高频率为: 2, 对应的字符有: a, b
