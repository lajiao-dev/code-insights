/**
 * @param prices - 每日股票价格数组
 * @returns 最大利润，无法获利时返回 0
 *
 * @example
 * maxProfit([7, 1, 5, 3, 6, 4]) // 5  （第2天买入，第5天卖出）
 * maxProfit([7, 6, 4, 3, 1])    // 0  （价格持续下跌，无法获利）
 */
export function maxProfit(prices: number[]): number {
  // 记录遍历过程中的最大利润
  let profit = 0;

  // 记录遍历过程中遇到的最低价格，初始为第一天的价格
  let minPrice = prices[0];

  // 从第二天开始遍历
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      // 发现更低的买入价格，更新 minPrice
      minPrice = prices[i];
    } else {
      // 以当前价格卖出，计算利润并与历史最大利润比较
      profit = Math.max(profit, prices[i] - minPrice);
    }
  }

  return profit;
}
