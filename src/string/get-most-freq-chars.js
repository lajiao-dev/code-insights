// 优化版（一次 reduce）：累加器同时维护频率表和最高频结果，省去第二次遍历
export function getMostFrequentCharsV2(str) {
  // 边界处理：空字符串、null、undefined 时直接返回默认值
  if (!str) {
    return { chars: [], count: 0 };
  }

  // 只用一次 reduce 完成所有工作
  // 累加器 acc 同时扮演三个角色：
  //   acc.charMap —— 频率表（Map）
  //   acc.chars   —— 当前最高频字符列表
  //   acc.count   —— 当前最高频次数
  const { chars, count } = [...str].reduce(
    (acc, char) => {
      // 取出该字符的当前计数并 +1
      const n = (acc.charMap.get(char) || 0) + 1;
      // 将新计数写回频率表
      acc.charMap.set(char, n);

      if (n > acc.count) {
        // 新计数超过历史最大值：更新最高频字符列表（只保留当前字符）和最大计数
        acc.chars = [char];
        acc.count = n;
      } else if (n === acc.count) {
        // 与当前最大值相同：并列最高频，追加到列表
        acc.chars.push(char);
      }
      // 新计数更小则不影响结果，直接进入下一次迭代
      return acc;
    },
    { charMap: new Map(), chars: [], count: 0 }, // 初始累加器：空频率表、空结果、计数为 0
  );

  // 从累加器中解构出最终结果并返回（charMap 是内部实现细节，不对外暴露）
  return { chars, count };
}

// 测试
const { chars: chars2, count: count2 } = getMostFrequentCharsV2('mississippi');
console.log(`[V2] 最高频次: ${count2}, 字符: ${chars2}`);
// 输出: [V2] 最高频次: 4, 字符: i, s
