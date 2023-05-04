import { useCallback, useState } from 'react'
import Tree from '@/components/Tree'

import './tree.css'

// 生成4层（从0开始）结构，每层10个节点；除 '0-0-0-0' 节点外
function treeData(path = '0', level = 3, count = 10) {
  const list = []
  for (let i = 0; i < count; i += 1) {
    const key = `${path}-${i}`
    const treeNode = {
      title: key,
      label: key,
      key,
    }

    if (level === 1 && key === '0-0-0-0') {
      // 100万个子节点
      treeNode.children = treeData(key, level - 1, 1000000)
    } else if (level > 0) {
      treeNode.children = treeData(key, level - 1)
    }

    list.push(treeNode)
  }
  return list
}

const dataSource = treeData()

function App() {
  const [checkedKeys, setCheckedKeys] = useState(new Set())
  const [expandedKeys, setExpandedKeys] = useState(new Set())

  const handleCheck = useCallback((record, isChecked, checkedKeys) => {
    setCheckedKeys(checkedKeys)
  }, [])
  const handleExpand = useCallback((record, isExpanded, expandedKeys) => {
    setExpandedKeys(expandedKeys)
  }, [])

  return (
    <div className="tree-container">
      <Tree
        data={dataSource}
        visibleHeight={500}
        itemHeight={28}
        expandedIds={expandedKeys}
        checkedIds={checkedKeys}
        onChecked={handleCheck}
        onExpanded={handleExpand}
      />
    </div>
  )
}
export default App
