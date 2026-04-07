/**
 * 贪心算法：找出能够绕环路行驶一圈的起始加油站下标。
 *
 * 核心思路：
 * 1. 如果所有站点的净油量之和 < 0，说明全局无解，直接返回 -1。
 * 2. 否则，一定存在唯一解。用贪心策略寻找起点：
 *    - 从头遍历，累加当前净油量；
 *    - 一旦当前油箱变负，说明从当前起点出发无法到达这里，
 *      将起点候选移到下一站，并重置当前油箱。
 *
 * @param gas  每个加油站可加的油量
 * @param cost 从每个加油站到下一站所需的油量
 * @returns    能完成环路的起始站下标，无解则返回 -1
 */
export function canCompleteCircuit(gas: number[], cost: number[]): number {
    // 记录当前候选起始站的下标
    let gasStationIndex = 0;
    // 记录所有站点净油量的总和，用于判断全局是否有解
    let totalTank = 0;
    // 记录从候选起点出发到当前站点的剩余油量
    let currentTank = 0;

    for (let i = 0; i < gas.length; i++) {
        // 当前站点的净油量：加的油减去到下一站的消耗
        const netGas = gas[i] - cost[i];
        // 累加到全局总量，最终用于判断有无解
        totalTank += netGas;
        // 累加到当前路段油量，模拟从候选起点出发的行驶状态
        currentTank += netGas;

        if (currentTank < 0) {
            // 油箱变负，说明从当前候选起点出发无法到达站点 i
            // 将起点候选移到 i+1，从那里重新出发
            gasStationIndex = i + 1;
            // 重置当前油箱，相当于从新起点重新计算
            currentTank = 0;
        }
    }

    // 如果全局总净油量 >= 0，则一定有解，返回贪心找到的起点；否则无解
    return totalTank >= 0 ? gasStationIndex : -1;
}