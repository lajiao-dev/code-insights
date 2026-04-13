/**
 * 计算字符串中最后一个单词的长度（使用内置方法）
 * 
 * @param s 包含空格和单词的输入字符串
 * @returns 最后一个单词的长度
 * 
 * 空间复杂度：O(N) - split 方法会创建一个包含所有单词的数组，需要额外的 O(N) 空间
 * 时间复杂度：O(N) - trim 方法和 split 方法都需要遍历整个字符串，时间复杂度为 O(N)
 */
export function lengthOfLastWord(s: string): number {
    // 1. 使用 trim() 去除字符串首尾的空白字符，防止末尾空格导致最后分割出空字符串
    s = s.trim();
    
    // 2. 使用 split(' ') 以空格为分隔符，将字符串拆分成由各个单词组成的数组
    const arr = s.split(' ');
    
    // 3. 获取数组的最后一个元素，即最后一个单词
    const lastWord = arr[arr.length - 1];
    
    // 4. 返回最后一个单词的长度
    return lastWord.length;
}