import PageWarp from '@/components/BusinessComponent/PageWarp'

const Component: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const handleGoHome = () => {
    navigate(`/`)
  }
  return (
    <PageWarp isTitle={false}>
      <Result
        status="500"
        title="513"
        subTitle="Sorry, server error pednging"
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
