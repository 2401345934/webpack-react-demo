const indentUnit = 24

class TreeNodeItem extends PureComponent {
  handleExpandIconClick = e => {
    e.stopPropagation()

    const { data, onExpanded, isExpanded } = this.props
    const result = !isExpanded
    if (typeof onExpanded === 'function') {
      onExpanded(data, result, e)
    }
  }

  handleCheckChange = (checked, e) => {
    const { data, onChecked } = this.props
    if (typeof onChecked === 'function') {
      onChecked(data, checked, e)
    }
  }

  // 展开/收起 icon 属性定义
  getIconProps = () => {
    const { isExpanded, keysMap = {}, data = {} } = this.props
    const { children } = keysMap
    const childrenData = data[children]
    const iconProps = {
      className: isExpanded
        ? 'next-icon next-icon-arrow-down'
        : 'next-icon next-icon-arrow-right',
    }

    if (!(childrenData && childrenData.length)) {
      iconProps.className = 'icon-empty'
    }
    iconProps.onClick = this.handleExpandIconClick

    return iconProps
  }

  checkboxRender = () => {
    const { isChecked } = this.props
    const cProps = {
      checked: isChecked,
      indeterminate: false,
    }
    if (isChecked === 'some') {
      cProps.checked = false
      cProps.indeterminate = true
    }
    return (
      <Checkbox
        {...cProps}
        onClick={e => {
          e.stopPropagation()
        }}
        onChange={this.handleCheckChange}
      />
    )
  }

  render() {
    const { keysMap = {}, data = {} } = this.props
    const { parentIds } = data
    const pLen = parentIds.length
    const { text: kText, id: kId } = keysMap
    const strId = String(data[kId])
    const tspnJsx = data[kText]

    return (
      <li
        className="vui-tree-item"
        // 定义当前项需要缩进的宽度
        style={{ paddingLeft: `${pLen * indentUnit}px` }}
        key={strId}
      >
        <span className="vui-tree-item-title">
          <i {...this.getIconProps()} />
          {this.checkboxRender()}
          <span className="text">{tspnJsx}</span>
        </span>
      </li>
    )
  }
}

export default TreeNodeItem
