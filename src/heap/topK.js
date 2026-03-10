import { Heap } from './index.js';

function topKFrequentChars(str, n) {
  if (!str || n <= 0) {
    return [];
  }

  // 初始化 map 并统计字符出现的频率到哈希表
  const charMap = [...str].reduce((acc, char) => {
    acc.set(char, (acc.get(char) || 0) + 1);
    return acc;
  }, new Map());

  // 初始化堆，传入自定义比较函数
  // 如果对象 a 的 count 小于对象 b 的 count 时
  // 即 A - B < 0, 时，a 会 排在 b 的前面
  // 多次操作之后若 a 最小，则会浮到堆顶。
  const minHeap = new Heap((a, b) => a.count - b.count);

  // 遍历哈希表，逐个推入堆里
  for (const [char, count] of charMap) {
    // 逐个推入堆里，维护长度为 n 的堆
    minHeap.push({ char, count });
    // 如果堆的长度大于 n，则需要取出最小的（堆顶的元素）
    if (minHeap.size() > n) {
      minHeap.pop();
    }
  }

  // 提取结果
  const res = [];
  while (!minHeap.isEmpty()) {
    const item = minHeap.pop();
    if (item) {
      res.push(item);
    }
  }

  // 按照从大到小返回
  return res.reverse();
}

const text = 'javascriptisawesomeee';
const k = 3;
console.log(`Top ${k} characters:`, topKFrequentChars(text, k));
