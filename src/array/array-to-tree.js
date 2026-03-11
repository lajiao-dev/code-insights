export function arrayToTree(arr) {
  // 入参校验：非数组或空数组直接返回空结果
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  // 构建哈希表：以 id 为键，方便 O(1) 查找父节点
  const arrMap = new Map();

  // 将每个节点存入 Map，同时初始化 children 数组
  for (const item of arr) {
    arrMap.set(item.id, { ...item, children: [] });
  }

  const result = [];
  arrMap.forEach((it) => {
    // 根据当前节点的 parentId 查找父节点
    const parent = arrMap.get(it.parentId);
    if (parent) {
      // 父节点存在，将当前节点挂载到父节点的 children 下
      parent.children.push(it);
    } else {
      // 父节点不存在（parentId 为 0 或无效），视为根节点
      result.push(it);
    }
  });

  // 返回仅包含根节点的树状数组
  return result;
}

// 测试
const flatData = [
  { id: 1, name: '部门A', parentId: 0 }, // parentId 为 0 通常代表根节点
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 0 },
];
console.log(JSON.stringify(arrayToTree(flatData)));
