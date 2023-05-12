import TreeNodeItem from './TreeNodeItem'

import './index.less'

const OFFSET_VERTICAL = 200

class CustomTree extends PureComponent {
  static defaultProps = {
    /**
     * keys 用于指定数据字段映射
     * text: 必选，显示的文字
     * children: 必选，子节点
     * id: 可选，节点ID(此参数可以没有),如需指定节点展开，必须指定此字段
     * _target: 可选，链接打开方式，同href合用；可选值：_blank, _self等
     */
    keysMap: { text: 'title', children: 'children', id: 'key' },
    // 可视区域的高度
    visibleHeight: 500,
    // 单行高度
    itemHeight: 28,
  }

  constructor(props) {
    super(props)
    const { data, expandedIds, checkedIds } = props

    this.state = {
      ...getNewState(props),
      // 记录原props传入的值，用于后面的数据对比
      props: {
        data,
      },
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { data, expandedIds, checkedIds } = props
    const { props: sProps, obj } = state

    // 树形结构数据有变化时
    if (data !== sProps.data) {
      return {
        ...getNewState(props),
        props: {
          data,
        },
      }
    }

    const stateProps = {}
    const newState = {}
    // 展开的keys有变化时
    if (expandedIds !== state.expandedArrIds) {
      const newExpanedIds = getExpandedArrIds(expandedIds, obj)
      newState.expandedArrIds = newExpanedIds
      stateProps.expandedIds = expandedIds
    }

    // 复选框有变化时
    if (checkedIds !== state.checkedArrIds) {
      newState.checkedArrIds = getCheckedArrIds(checkedIds, obj)
      stateProps.checkedIds = checkedIds
    }

    newState.props = {
      ...state.props,
      ...stateProps,
    }

    return newState
  }

  // 监听纵向滚动事件的处理
  handleTreeScroll = e => {
    const { scrollTop = 0 } = e.target

    this.setState({
      scrollTop,
    })
  }

  getScrollRef = dom => {
    const { virtualConfig = {} } = this.props
    const { scrollEl } = virtualConfig
    this.scrollEl = scrollEl || dom
  }

  // 手动点击展开/收起 icon 的处理
  handleItemExpanded = (record = {}, isExpanded, e) => {
    const { childrenIds, isLeaf } = record
    const { expandedArrIds = [], obj } = this.state
    const { keysMap = {}, hasLeaf } = this.props
    const { id: kId } = keysMap
    const strId = String(record[kId])
    const has = expandedArrIds.has(strId)
    if (childrenIds && childrenIds.length) {
      if (isExpanded && !has) {
        // 手动操作时不存在某个节点展开了，但其祖先节点没有展开的情况，所以不予处理
        expandedArrIds.add(strId)
      } else if (!isExpanded) {
        // 当收起时需要移除所有子孙节点，即收起所有子孙节点
        traverseRemove(strId)
      }

      this.setOnExpanded(record, isExpanded, expandedArrIds, e)

      this.setState({
        expandedArrIds: expandedArrIds,
      })
    }

    // 递归移除当前节点及其子孙节点
    function traverseRemove(id) {
      const sId = String(id)
      if (expandedArrIds.has(sId)) {
        const { childrenIds: cIds = [] } = obj[id]
        expandedArrIds.delete(sId, 1)

        if (cIds.length) {
          cIds.forEach(cId => {
            traverseRemove(cId)
          })
        }
      }
    }
  }

  setOnExpanded = (...args) => {
    const { onExpanded } = this.props
    if (typeof onExpanded === 'function') {
      onExpanded(...args)
    }
  }

  // 手动改变Checkbox状态的事件处理
  handleItemChecked = (record, isChecked, e) => {
    const { checkedArrIds, obj } = this.state
    const { keysMap, onChecked } = this.props
    const { id: kId, children: childrenKey } = keysMap
    const { parentIds } = record
    const strId = String(record[kId])

    if (isChecked && !checkedArrIds.has(strId)) {
      checkedArrIds.add(strId)
      // 判断其父级&祖先节点是否需要被选中
      getCheckedParents(strId, checkedArrIds, obj)
      // 选中其所有其子孙节点
      getCheckedChildren(strId, checkedArrIds, obj)
    } else if (!isChecked) {
      checkedArrIds.delete(strId)
      // 移除祖先节点的选中状态
      parentIds.forEach(pId => {
        if (checkedArrIds.has(pId)) {
          checkedArrIds.delete(pId)
        }
      })

      traverseRemove(record)
    }
    if (typeof onChecked === 'function') {
      onChecked(record, isChecked, checkedArrIds, e)
    }

    this.setState({
      checkedArrIds: checkedArrIds,
    })

    // 递归移除当前节点及其子孙节点
    function traverseRemove(item) {
      const children = item[childrenKey]
      if (children && children.length) {
        children.forEach(pre => {
          // const i = checkedIdsMap[pre[kId]];
          if (checkedArrIds.has(pre[kId])) {
            checkedArrIds.delete(pre[kId])
          }
          traverseRemove(pre)
        })
      }
    }
  }

  getCheckedStatus = record => {
    const { checkedArrIds, obj } = this.state
    const { keysMap = {} } = this.props
    const { id: kId } = keysMap
    const strId = String(record[kId])
    // 查看自身是否被选中
    if (checkedArrIds.has(strId)) {
      return true
    } else {
      const { childrenIds } = record
      let checked = false

      // 查看子孙元素被选中情况
      if (!checked && childrenIds && childrenIds.length) {
        checked = traverseChecked(childrenIds)
      }

      return checked
    }

    // 递归探查子孙节点被选中的状态，全选、部分选中、未选
    function traverseChecked(cIds) {
      let checkedAll = true
      let checkedCount = 0
      let cStatus = false
      cIds.forEach(cId => {
        if (!checkedArrIds.has(cId)) {
          checkedAll = false

          const { childrenIds: subCIds } = obj[cId] || {}
          if (subCIds && subCIds.length) {
            cStatus = cStatus || traverseChecked(subCIds)
          }
        } else {
          checkedCount += 1
        }
      })

      // true：全选，false: 未选，'some'：部分选中
      return checkedAll || (checkedCount || cStatus ? 'some' : false)
    }
  }

  virtualRender = () => {
    const { keysMap, visibleHeight, itemHeight, data } = this.props
    const { expandedArrIds } = this.state
    const scrollTop = this.scrollEl?.scrollTop || 0
    const { id: kId } = keysMap

    // 获取虚拟滚动可视区域&缓存区域的渲染项，纵向移动值和整体高度
    const { items, translateY, height } = getVisibleRange({
      treeData: data,
      scrollTop,
      visibleHeight,
      itemHeight,
      expandedArrIds,
      keysMap,
    })

    const style = { height: `${String(height)}px` }

    return (
      <div className="vui-virtual-container" style={style}>
        <ul
          className="vui-tree-group vui-tree-virtual"
          style={{ transform: `translate(0, ${translateY}px)` }}
        >
          {items.map(item => {
            const strId = String(item[kId])
            const isExpanded = expandedArrIds.has(strId)
            return (
              <TreeNodeItem
                key={item[kId]}
                data={item}
                keysMap={keysMap}
                isExpanded={isExpanded}
                isChecked={this.getCheckedStatus(item)}
                onChecked={this.handleItemChecked}
                onExpanded={this.handleItemExpanded}
              />
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="vui-tree vui-tree-small">
        <div
          className="vui-group-container"
          ref={this.getScrollRef}
          onScroll={this.handleTreeScroll}
        >
          {this.virtualRender()}
        </div>
      </div>
    )
  }
}

function getNewState(props) {
  const { data = [], keysMap = {}, expandedIds = [], checkedIds = [] } = props
  // obj 的数据结构为 { [key: string]: treeItem } 的格式；并补充 parentIds, paretNames, $pos 等辅助数据，后面可能需要使用到
  const { obj, list } = resolveTreeDataToList(data, keysMap)
  const expandedArrIds = getExpandedArrIds(expandedIds, obj)
  const checkedArrIds = getCheckedArrIds(checkedIds, obj)

  return { obj, list, expandedArrIds, checkedArrIds }
}

function resolveTreeDataToList(treeData, keysMap) {
  const { id: kId, children, text } = keysMap
  const list = []
  const obj = {}

  traverseData(treeData)

  return { obj, list }

  function traverseData(tree, pIds, pNames, pLevels) {
    const parentIds = pIds || []
    const parentNames = pNames || []
    const levels = pLevels || []

    return tree.map((info, i) => {
      const levs = [].concat(levels)
      levs.push(i)

      // 记录位置信息，即 tree 中的 path，有'_'链接
      info.$pos = levs.join('_')
      if (!info[kId]) {
        info[kId] = info.$pos
      }
      // 记录所有的祖先节点 Id
      info.parentIds = parentIds
      info.parentNames = parentNames

      list.push(info)
      obj[info[kId]] = info

      if (info[children] && info[children].length) {
        const newParentIds = parentIds.slice()
        const newParentNames = parentNames.slice()
        const strId = String(info[kId])

        newParentIds.push(strId)
        newParentNames.push(info[text])

        info.childrenIds = traverseData(
          info[children],
          newParentIds,
          newParentNames,
          levs,
        )
      }
      return String(info[kId])
    })
  }
}

function getExpandedArrIds(expandedIds, obj) {
  // 展开节点逻辑
  let expandedArrIds = new Set()
  if (expandedIds instanceof Array) {
    expandedArrIds = new Set(expandedIds)
  } else if (!(expandedIds instanceof Set)) {
    expandedArrIds = new Set()
    console.error('expandedIds 属性仅支持 Array 或 Set 类型')
  }
  // 检查指定展开节点的父级节点是否被展开，如果未被展开则设置为展开
  expandedArrIds.forEach(id => {
    const { parentIds = [] } = obj[id] || {}
    parentIds.forEach(pId => {
      if (!expandedArrIds.has(pId)) {
        expandedArrIds.add(pId)
      }
    })
  })

  return expandedArrIds
}

function getCheckedArrIds(checkedIds, obj) {
  let checkedArrIds = checkedIds
  // 选中节点逻辑
  if (checkedIds instanceof Array) {
    checkedArrIds = new Set(checkedIds)
  } else if (!(checkedIds instanceof Set)) {
    checkedArrIds = new Set()
    console.error('checkedIds 属性仅支持 Array 或 Set 类型')
  }

  for (let i = 0, l = checkedArrIds.length; i < l; i++) {
    const id = checkedArrIds[i]
    getCheckedParents(id, checkedArrIds, obj)
    getCheckedChildren(id, checkedArrIds, obj)
  }

  return checkedArrIds
}

// 收集被选中节点下的所有子孙节点的ID
function getCheckedChildren(id, ids, obj) {
  const { childrenIds } = obj[id] || {}
  if (childrenIds && childrenIds.length) {
    childrenIds.forEach(cId => {
      if (!ids.has(cId)) {
        ids.add(cId)
      }
      getCheckedChildren(cId, ids, obj)
    })
  }
}

// 收集所有子节点被选中的父节点
function getCheckedParents(id, ids, obj) {
  const { parentIds = [] } = obj[id] || {}
  for (let i = parentIds.length - 1; i >= 0; i--) {
    const pId = parentIds[i]
    const { childrenIds } = obj[pId]
    let checkedAll = true
    for (let j = 0, l = childrenIds.length; j < l; j++) {
      const cId = childrenIds[j]
      if (!ids.has(cId)) {
        checkedAll = false
        break
      }
    }
    if (checkedAll) {
      // 如果所有的子元素被选中，则注入checkedArrIds
      ids.add(pId)
      // checkedIdsMap[pId] = ids.length - 1;
    } else {
      // 否则退出循环
      break
    }
  }
}

/**
 * 入参说明：
 * treeData: 当前用于渲染树的数据
 * scrollTop: 滚动条滚动的Top值
 * visibleHeight: 可视区域高度
 * itemHeight: 渲染树的单项高度
 * expandedArrIds: 被收起的节点Key
 * keysMap: 用于隐射字段的键值对
 */

function getVisibleRange({
  treeData = [],
  scrollTop,
  visibleHeight,
  itemHeight,
  expandedArrIds,
  keysMap,
}) {
  // idKey: id对应的键名；childrenKey: 子节点对应的键名
  const { id: idKey, children: childrenKey } = keysMap

  let totalHeight = 0 // 树形结构内容的总高度；
  // 0: 顶部被隐藏阶段；1: 可视区域阶段；2: 可视区域以下阶段；
  // 注：此处的可视区域包含上下缓冲区
  let currentStep = 0
  let translateY = 0 // 纵向需要被移动的值
  const items = []

  // 递归解析树形结构的数据，计算整体高度并找出需要在可视区域内展示的内容
  loopData(treeData)

  function loopData(list) {
    list.forEach(item => {
      const key = item[idKey]
      const children = item[childrenKey]
      totalHeight += itemHeight

      if (currentStep === 0) {
        if (totalHeight >= scrollTop - OFFSET_VERTICAL) {
          currentStep += 1
          // 开始收集需要渲染的项
          items.push(item)
        } else {
          translateY += itemHeight
        }
      } else if (currentStep === 1) {
        items.push(item)
        if (totalHeight > scrollTop + visibleHeight + OFFSET_VERTICAL) {
          // 结束收集可渲染项
          currentStep += 1
        }
      }

      if (children && children.length && expandedArrIds.has(key)) {
        loopData(children)
      }
    })
  }

  return {
    items,
    translateY,
    height: totalHeight,
  }
}

export default CustomTree
