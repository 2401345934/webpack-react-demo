import PageWarp from '@/components/BusinessComponent/PageWarp'
import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const Component: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const handleGoHome = () => {
    navigate(`/`)
  }
  return (
    <PageWarp isTitle={false}>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button onClick={handleGoHome} type="primary">
            Back Home
          </Button>
        }
      />
    </PageWarp>
  )
}

export default Component
