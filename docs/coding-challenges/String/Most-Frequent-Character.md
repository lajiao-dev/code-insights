# Most Frequent Character

## 题目描述

给定一个字符串，找出其中出现频率最高的字符以及对应的出现次数。

**注意点：**
1. 字符串可能包含空格、符号或数字。
2. 可能存在多个字符出现的频率并列最高，此时应当返回所有符合条件的字符。
3. 如果字符串为空，应返回合理的默认值（如空数组和计数 0）。

**示例：**
- 输入: `"aabbc"` -> 输出: 频率为 2，字符为 `['a', 'b']`
- 输入: `"apple"` -> 输出: 频率为 2，字符为 `['p']`

## 思路分析
核心的思路是利用哈希表或者字典来记录每个字符出现的次数，然后通过一次遍历找到最大值。即**先统计，再筛选**。

1. 遍历字符串，用一个对象或者是 `Map` 记录每个字符出现的次数，用字符作为键，出现次数作为值。
2. 在遍历过程中，维护两个变量记录出现次数最多的字符以及该字符出现的次数。分别记作 `maxChar` 和 `maxCount`。
3. 每轮循环中，将字符出现的次数和 `maxCount` 进行比较和更新。

## 解题方案

```js lineNumbers
function getAllMostFrequentChars(str) {
  // 简单处理边界情况
  if(!str) {
    return { chars: [], count: 0 };
  }
  
  // 初始化中间变量
  const charMap = {}; // { [char]: 0 }
  let maxChar = '', maxCount = 0;
  
  // 遍历字符串
  for(let char of str) {
    // 统计每个字符出现的次数
    // 如果已出现次数加一，否则初始化为 1
    charMap[char] = (charMap[char] || 0) + 1;
    
    // 统计之后与当前出现的最大次数进行比较
    if(charMap[char] > maxCount){
      maxCount = charMap[char];
      maxChar = char;
    }
  }
  
  // 找出所有出现次数等于 maxCount 的字符
  const result = Object.keys(charMap).filter(char => charMap[char] === maxCount);
  
  return {
    chars: result,
    count: maxCount
  }
}

// 测试案例
const testStr = "aabbc";
const result = getAllMostFrequentChars(testStr);

console.log(`最高频率为: ${result.count}`);
console.log(`对应的字符有: ${result.chars.join(', ')}`); 
// 输出: 最高频率为: 2, 对应的字符有: a, b
```

## 复杂度分析

1. 时间复杂度是 `O(n)`。主要是对字符串的遍历，虽然使用了 `Object.keys` 和 `filter`，但这是属于对频率表的二次遍历，它通常远小于字符串的长度。
2. 空间复杂度是 `O(k)`。用于存储频率表和结果数组。

## 进阶优化

使用更现代的风格对代码进行重构，让代码看起来更简洁，更高级。

```js lineNumbers
const getMostFreqChars = (str) => {
  if(!str){
    return { chars: [], count: 0 };
  }
  
  // 统计频率
  // 1. 使用对象
  const charMap = [...str].reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
  
  // 2. 使用 Map
  // const charMap = [...str].reduce((acc, char) => {
    // acc.set(char, (acc.get(char) || 0) + 1);
    // return acc;
  // }, new Map())
  
  // 核心逻辑，一次 reduce 搞定最大频率和对应的字符数组
  // 使用 Map 需要把 Object.entries(charMap) 替换为 [...charMap]
  return Object.entries(charMap).reduce((res, [char, count]) => {
    if(count > res.count){
      // 发现更大的频率，重置结果
      return { chars: [ char], count }
    } else if(count === res.count){
      // 如果持平，就更新数组
      res.chars.push(char);
    }
    return res;
  }, { chars: [], count: 0 })
  
}

// 测试
const { chars, count } = getMostFreqChars("mississippi");
console.log(`最高频次: ${count}, 字符: ${chars}`); 
// 输出: 最高频次: 4, 字符: i, s
```

上述代码为什么显得 “高级” ？

1. 使用解构赋值、展开运算符、`Map`、`reduce` 等更现代的语法和 API。
2. 所有的逻辑都封装在数据转换的过程中，而不是通过修改外部变量来完成。
3. 它是一段声明式逻辑，它告诉程序 “我要把这个对象 `reduce` 成一个结果”，而不是让机器 “先做第一步，再做第二步”。

注意：虽然这 `reduce` 用起来很简洁，但是面对超大规模数据时，传统的 `for..of` 循环性能会更好，因为函数的调用是用性能开销的。

## 问题扩展

当需求从 “找第 1 名” 变为 “找前 n 名” 时，问题的性质就从简单的最大值变成了**排序或堆**的问题了。

核心思路：

1. 统计频率，依然使用 `Map` 记录每个字符出现的次数。
2. 转换为数组，将 `Map` 转换为键值对数组。
3. 排序，依据出现的次数对数组进行降序排序。
4. 截取出排序后的前 n 个元素。

```js lineNumbers
const getTopNChars = (str, n) => {
  if(!str || n <= 0){
    return [];
  }
  
  // 统计频率
  const charMap = [...str].reduce((acc, char) => {
    acc.set(char, (acc.get(char) || 0) + 1);
    return acc;
  }, new Map());
  
  // 转换数组 -> 排序 -> 截取
  return [...charMap] // 得到 [[char, count]] 数组
  	.sort((a, b) => b[1] - a[1]) // 依据 count 排序
  	.slice(0, n)
  	.map(([char, count]) => ({ char, count})); // 格式化输出
}

// 测试：找出字符串 "aabbbccccddddd" 中出现次数前 3 的字符
const result = getTopNChars("aabbbccccddddd", 3);
console.log(result);
/* 输出: 
[
  { char: 'd', count: 5 },
  { char: 'c', count: 4 },
  { char: 'b', count: 3 }
]
*/
```

虽然这个代码看起简洁，但是存在一些性能问题。首先统计频率的时间复杂度为 `O(n)`，在排序阶段假设有 m 个不重复的字符，由于 `sort` 的时间复杂度为 `O(mlogm)`。这样一来，整体的复杂度来到了 `O(k + mlogm)`。

如果字符串非常大，但是我们只需要前三名，用 `sort` 去排序就会很浪费。

可以采用小顶堆(Min-Heap)来进行优化。维护一个大小只有 n 的小顶堆，遍历频率表的时候，如果当前字符频率比堆顶大，就替换堆顶并重新调整。

这样可以将复杂度降低到 `O(mlogn)`。由于 n 远小于 m，这在处理超长字符时更有优势。

为什么选用小顶堆来找 “最大” ？

想象一个只有 n 个座位的房间，我们需要找到最强的 n 个人:

1. 让前 n 个人进去。
2. 用里面最弱的那个人（堆顶）守在大门口。
3. 门来每来一个新人，只跟门里最弱的那个人比较。
4. 如果新人更强，就把最弱的踢走，新人进去。
5. 最后房间里剩下的就是最强的 n 个人。

**注：如果使用大顶堆，则需要对所有的数据进行堆排序后才能知道哪些是最大的。**

