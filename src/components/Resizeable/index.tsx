// @ts-nocheck
import { Resizable } from 'react-resizable'
import React from 'react'
import './resizeable-table.less'

class ResizeableTitle extends React.Component {
  render() {
    const { onResize, width, onClick, ...restProps } = this.props
    if (!width) {
      return <th {...restProps} />
    }
    return (
      <Resizable
        width={width}
        height={0}
        onResizeStart={() => (this.resizing = true)}
        onResizeStop={() => {
          setTimeout(() => {
            this.resizing = false
          })
        }}
        onResize={onResize}
      >
        <th
          onClick={(...args) => {
            if (!this.resizing && onClick) {
              onClick(...args)
            }
          }}
          {...restProps}
        />
      </Resizable>
    )
  }
}

class ResizeableTable extends React.PureComponent {
  constructor(props: any) {
    super(props)
    this.state = {
      columns: props.columns,
    }
  }

  components = {
    header: {
      cell: ResizeableTitle,
    },
  }

  componentDidMount() {
    const handlers = document.querySelectorAll(
      '.react-resizable .react-resizable-handle',
    )
    handlers.forEach(handler =>
      handler.addEventListener('click', e => {
        return false
      }),
    )
  }

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width || 200,
        onResize: this.handleResize(index),
      }),
    }))

    const components = Object.assign({}, this.props.components, this.components)

    return (
      <Table
        {...this.props}
        scroll={{ x: 'max-content' }}
        columns={columns}
        components={components}
      />
    )
  }

  handleResize =
    index =>
    (e, { size }) => {
      e.stopImmediatePropagation()
      // e.preventDefault();
      this.setState(({ columns }) => {
        const nextColumns = [...columns]
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        }
        return { columns: nextColumns }
      })
    }
}

export default ResizeableTable
