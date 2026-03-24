/**
 * @param nums - 非负整数数组，每个元素代表最大可跳步数
 * @returns 最少跳跃次数
 *
 * 示例：
 * 输入: [2,3,1,1,4]
 * 输出: 2
 * 解释: 跳到下标 1（跳 1 步），再跳 4（跳 3 步），共 2 步到达终点。
 */
export function jump(nums: number[]): number {
  let steps = 0; // 记录跳跃次数
  let farthest = 0; // 当前能跳到的最远位置
  let currentEnd = 0; // 当前这一步能到达的边界

  // 遍历到倒数第二个元素即可，最后一步一定能到终点
  for (let i = 0; i < nums.length - 1; i++) {
    // 更新当前能跳到的最远位置
    farthest = Math.max(farthest, i + nums[i]);

    // 如果到达了当前边界，需要跳一次，并更新边界
    if (i === currentEnd) {
      steps++;
      currentEnd = farthest;
    }
    // 如果最远边界已经覆盖终点，可以提前结束
    if (currentEnd >= nums.length - 1) {
      break;
    }
  }

  return steps;
}
