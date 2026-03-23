/**
 * @param steps - 每个位置最大可跳跃步数的数组
 * @returns 是否可以到达最后一个位置
 *
 * @example
 * canJump([2,3,1,1,4]) // true
 * canJump([3,2,1,0,4]) // false
 */
export function canJump(steps: number[]): boolean {
    // 记录当前能到达的最远下标
    let maxReach = 0;

    // 遍历每个位置
    for(let i = 0; i < steps.length; i++) {
        // 如果当前位置已超出最远可达范围，说明无法到达
        if(i > maxReach){
            return false;
        }

        // 更新最远可达下标
        maxReach = Math.max(maxReach, i + steps[i]);

        // 如果最远可达下标已覆盖终点，提前返回 true
        if(maxReach >= steps.length - 1){
            return true;
        }
    }

    // 循环结束还没覆盖终点，返回 false
    return false;
}