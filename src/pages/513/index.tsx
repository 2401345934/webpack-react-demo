import PageWarp from '@/components/BusinessComponent/PageWarp'
import React from 'react'
import { Button, Result } from 'antd'

const Component: React.FC = (): JSX.Element => {
  return (
    <PageWarp>
      <Result
        status="500"
        title="513"
        subTitle="Sorry, server error pednging"
        extra={<Button type="primary">Back Home</Button>}
      />
    </PageWarp>
  )
}

export default Component
