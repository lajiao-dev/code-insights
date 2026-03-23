/**
 * @param prices - 每日股票价格数组
 * @returns 最大总利润
 *
 * @example
 * maxProfitV2([7, 1, 5, 3, 6, 4]) // 7  （第2天买入第3天卖出 +4，第4天买入第5天卖出 +3）
 * maxProfitV2([1, 2, 3, 4, 5])    // 4  （第1天买入第5天卖出）
 * maxProfitV2([7, 6, 4, 3, 1])    // 0  （价格持续下跌，无法获利）
 */
export function maxProfitV2(prices: number[]): number {
  // 累计总利润
  let totalProfit = 0;

  // 从第二天开始，逐日比较
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      // 今天比昨天贵，累加这段上涨的差价（相当于昨天买今天卖）
      totalProfit += prices[i] - prices[i - 1];
    }
  }

  return totalProfit;
}
