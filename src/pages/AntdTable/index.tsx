// @ts-nocheck
import React from 'react'
import ResizeableTable from '@/components/Resizeable'
import PageWarp from '@/components/BusinessComponent/PageWarp'

const data: any = [
  {
    key: 0,
    date: '2018-02-11',
    amount: 120,
    type: 'income',
    note: 'transfer'
  },
  {
    key: 1,
    date: '2018-03-11',
    amount: 243,
    type: 'income',
    note: 'transfer'
  },
  {
    key: 2,
    date: '2018-04-11',
    amount: 98,
    type: 'income',
    note: 'transfer'
  }
]

const columns: any = [
  {
    title: 'Date',
    dataIndex: 'date',
    width: 200
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 100
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 100
  },
  {
    title: 'Note',
    dataIndex: 'note',
    width: 100
  }
]

const Component: React.FC = (): JSX.Element => {
  return (
    <PageWarp>
      <h1> Antd Table</h1>
      <ResizeableTable columns={columns} dataSource={data} />
    </PageWarp>
  )
}

export default Component
