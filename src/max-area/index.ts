/**
 * 使用双指针法计算容器能盛的最大水量
 * 
 * 算法思路：
 * 1. 使用两个指针分别从数组两端向中间移动
 * 2. 每次计算当前指针位置能形成的容器面积
 * 3. 移动较短的那一侧指针，因为短板决定了容器高度
 * 4. 持续更新并记录最大面积
 * 
 * 时间复杂度：O(n) - 每个元素最多被访问一次
 * 空间复杂度：O(1) - 只使用常量额外空间
 * 
 * @param height - 整数数组，每个元素代表一条垂直线的高度
 * @returns 返回容器能盛的最大水量（面积）
 * 
 * @example
 * maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]) // 返回 49
 */
export function maxArea(height: number[]): number {
    // 初始化左指针，指向数组起始位置
    let left = 0;
    // 初始化右指针，指向数组末尾位置
    let right = height.length - 1;
    // 用于记录遍历过程中遇到的最大面积
    let maxArea = 0;

    // 当左右指针还未相遇时，继续循环
    while (left < right) {
        // 计算当前两个指针之间的宽度（水平距离）
        const width = right - left;
        
        // 计算当前容器的高度（取两边较短的一边，因为短板决定了水位）
        const currentHeight = Math.min(height[left], height[right]);

        // 计算当前容器的面积 = 宽度 × 高度
        const area = currentHeight * width;
        
        // 更新最大面积：如果当前面积更大，则更新
        maxArea = Math.max(maxArea, area);

        // 移动指针策略：移动较短的一侧
        // 原因：如果移动较高的一侧，新的高度只可能不变或变小，而宽度一定变小
        // 因此移动较短的一侧才有可能找到更大的面积
        if (height[left] < height[right]) {
            // 左侧较短，向右移动左指针
            left++;
        } else {
            // 右侧较短或两侧相等，向左移动右指针
            right--;
        }
    }
    
    // 返回找到的最大面积
    return maxArea;
}
