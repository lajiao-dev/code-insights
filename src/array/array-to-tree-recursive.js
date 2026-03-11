// parentId 默认为 0，表示从根节点开始构建
export function arrayToTreeRecursive(items, parentId = 0) {
  return items
    // 筛选出所有属于当前 parentId 的直接子节点
    .filter((it) => it.parentId === parentId)
    // 将每个子节点展开，并递归构建其 children
    .map((item) => ({
      ...item,
      // 以当前节点的 id 作为新的 parentId，递归查找下一层子节点
      children: arrayToTreeRecursive(items, item.id),
    }));
}

// 测试
const flatData = [
  { id: 1, name: '部门A', parentId: 0 }, // parentId 为 0 通常代表根节点
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 0 },
];
console.log(JSON.stringify(arrayToTreeRecursive(flatData)));
