/**
 * 翻转字符串中的单词顺序（双指针解法）。
 * 不使用内置的 split 方法，而是通过倒序遍历原字符串，
 * 利用双指针（left 和 right）从后往前锁定并截取每一个单词。
 *
 * @param s 需要处理的原始字符串
 * @returns 翻转单词顺序后得到的新字符串，单词之间仅用单个空格隔开
 */
export function reverseWords(s: string): string {
    // 1. 去除首尾的空格，确保两端没有干扰数据
    s = s.trim();
    
    // 初始化两个指针，它们刚开始都指向字符串的末尾字符
    let right = s.length - 1;
    let left = right;
    
    // 用于收集从后往前找到的一个个单词
    const res: string[] = [];
    
    // 从后往前遍历查找单词，只要 left 还没越界越出字符串的最前面
    while (left >= 0) {
        // 既然目前我们在一个单词内部，就不断向左移动 left 指针，
        // 直到 left 停在一个空格上（或者越出边界为 -1）
        // 这样我们就锁定了当前单词的清晰边界：s[left + 1] 到 s[right]
        while (left >= 0 && s[left] !== ' ') {
            left--;
        }
        
        // 此时切出这个单词，左闭右开区间，从 left + 1 切到 right + 1（从而包含 s[right]）
        res.push(s.substring(left + 1, right + 1));
        
        // 因为单词中间可能有多个空格，所以我们继续向左跳过连续的空隙
        // 寻找下一个单词出现的尾巴
        while (left >= 0 && s[left] === ' ') {
            left--;
        }
        
        // 让 right 跟上 left 的步伐，重新就位在这个“新发现的更靠前的单词”的末尾
        right = left;
    }
    
    // 把收集好并且已经排好倒序的单词数组，用单个空格粘合即可返回
    return res.join(' ');
}
