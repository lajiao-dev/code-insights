export function getMostFrequentChars(str) {
  // 边界处理：空字符串、null、undefined 时直接返回默认值
  if (!str) {
    return { chars: [], count: 0 };
  }

  // 第一步：用 reduce 构建频率表（Map）
  // [...str] 将字符串拆分为字符数组，例如 'ab' => ['a', 'b']
  // reduce 从左到右遍历每个字符，acc 是累加器（这里是一个 Map）
  const charMap = [...str].reduce((acc, char) => {
    // acc.get(char) 取出该字符当前计数，若还没出现过则为 undefined，|| 0 使其初始为 0
    // 然后 +1，再用 acc.set 写回 Map
    acc.set(char, (acc.get(char) || 0) + 1);
    // 必须 return acc，让下一次迭代继续使用同一个 Map
    return acc;
  }, new Map()); // new Map() 是累加器的初始值（空频率表）

  // 第二步：遍历频率表，找出出现次数最多的字符
  // [...charMap] 将 Map 转为 [[char, count], ...] 形式的数组
  return [...charMap].reduce(
    (res, [char, count]) => {
      // 如果当前字符的次数 > 已记录的最大值，说明找到了新的最高频字符
      // 用新字符替换结果，重置 chars 数组
      if (count > res.count) {
        return { chars: [char], count };
      } else if (count === res.count) {
        // 次数与当前最大值相同，是并列最高频，追加到 chars 数组
        res.chars.push(char);
      }
      // 次数更小则忽略，直接返回未修改的 res
      return res;
    },
    { chars: [], count: 0 }, // 初始结果：空字符列表，最大计数为 0
  );
}

// 测试
const { chars, count } = getMostFrequentChars('mississippi');
console.log(`最高频次: ${count}, 字符: ${chars}`);
// 输出: 最高频次: 4, 字符: i, s
