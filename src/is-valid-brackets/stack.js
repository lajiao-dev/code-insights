/**
 * 判断给定字符串中的括号是否有效。
 * 有效的标准是：
 * 1. 左括号必须用相同类型的右括号闭合。
 * 2. 左括号必须以正确的顺序闭合。
 * 
 * @param {string} str - 包含 '(', ')', '{', '}', '[', ']' 的字符串
 * @returns {boolean} - 如果字符串有效返回 true，否则返回 false
 */
export function isValidBrackets(str) {
  // 1. 基础校验：如果是空字符串、非字符串或长度为奇数（括号必定无法配对），则直接返回 false
  if (!str || typeof str !== 'string' || str.length % 2 !== 0) {
    return false;
  }

  // 2. 创建一个栈（Stack），利用“后进先出”的特点来处理匹配关系
  const stack = [];
  
  // 3. 定义括号映射关系，键为左括号，值为对应的右括号
  const hashMap = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  // 4. 遍历字符串中的每一个字符
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    // 如果是左括号（即 char 能在 hashMap 中找到对应的值）
    if (hashMap[char]) {
      // 将对应的“预期右括号”入栈，这样后面遇到右括号时直接对比即可
      stack.push(hashMap[char]);
    } else {
      // 5. 如果是右括号，则从栈顶弹出一个元素进行匹配
      // 如果弹出的元素与当前字符不匹配，说明括号顺序错误或无法配对
      if (stack.pop() !== char) {
        return false;
      }
    }
  }

  // 6. 最后检查栈是否已经清空。如果是空栈，说明所有括号都成功匹配了
  return stack.length === 0;
}
// test case
// 示例 1：
console.log(isValidBrackets('()')); // true

// 示例 2：
console.log(isValidBrackets('()[]{}')); // true

// 示例 3：
console.log(isValidBrackets('(]')); // false

// 示例 4：
console.log(isValidBrackets('([])')); // true

// 示例 5：
console.log(isValidBrackets('([)]')); // false
