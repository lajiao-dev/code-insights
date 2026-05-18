/**
 * 螺旋矩阵 —— 按顺时针螺旋顺序返回矩阵中的所有元素。
 *
 * 核心思路：用四个变量维护一个"可访问区域"的边界（上、下、左、右）。
 * 每遍历完一条边，就把该边界向内收缩一格，下一轮循环处理更小的区域，
 * 直到边界交叉（区域为空）为止。
 *
 * 想象你站在矩阵外圈，沿着 → ↓ ← ↑ 的顺序走一圈，
 * 然后走进内圈再走一圈，如此往复直到走完全部格子。
 *
 * @param matrix - m 行 n 列的整数矩阵
 * @returns 按螺旋顺序排列的所有元素
 *
 * @example
 * spiralOrder([
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9],
 * ]);
 * // 返回 [1, 2, 3, 6, 9, 8, 7, 4, 5]
 */
export function spiralOrder(matrix: number[][]): number[] {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return [];
  }

  const result: number[] = [];

  // 四个边界变量描述当前"还没被访问过"的矩形区域。
  // 每遍历完一条边，对应的边界就向内收缩一格。
  let top = 0;                      // 未访问区域的最上行
  let left = 0;                     // 未访问区域的最左列
  let bottom = matrix.length - 1;   // 未访问区域的最下行
  let right = matrix[0].length - 1; // 未访问区域的最右列

  // 只要区域还存在（行和列都没有交叉），就继续遍历
  while (left <= right && top <= bottom) {

    // ── 第一步：→ 沿顶部行从左到右 ──────────────────────────
    // 固定行为 top，列从 left 走到 right
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    // 顶部行已全部收集，将上边界下移，把这一行"划出"可访问区域
    top++;

    // ── 第二步：↓ 沿右侧列从上到下 ──────────────────────────
    // 注意：top 已经加过 1，所以从新的 top 开始，避免重复收集右上角
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    // 右侧列已全部收集，将右边界左移
    right--;

    // ── 第三步：← 沿底部行从右到左 ──────────────────────────
    // 必须先确认 top <= bottom：
    // 如果矩阵只有一行（或剩余区域只有一行），第一步已经把它收集完了，
    // 此时 top > bottom，底部行根本不存在，跳过可避免重复采集。
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      // 底部行已全部收集，将下边界上移
      bottom--;
    }

    // ── 第四步：↑ 沿左侧列从下到上 ──────────────────────────
    // 同理，必须先确认 left <= right：
    // 如果矩阵只有一列（或剩余区域只有一列），第二步已经把它收集完了，
    // 此时 left > right，左侧列不存在，跳过可避免重复采集。
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      // 左侧列已全部收集，将左边界右移
      left++;
    }
  }

  return result;
}
