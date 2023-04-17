// @ts-nocheck
import PageWarp from '@/components/BusinessComponent/PageWarp'
import React from 'react'
import { Button, Result } from 'antd'

const Component: React.FC = (): JSX.Element => {
  return (
    <PageWarp>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Back Home</Button>}
      />
    </PageWarp>
  )
}

export default Component
