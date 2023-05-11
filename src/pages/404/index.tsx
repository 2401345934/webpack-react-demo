import PageWarp from '@/components/BusinessComponent/PageWarp'

const Component: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const handleGoHome = () => {
    navigate(`/`)
  }
  return (
    <PageWarp isTitle={false}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
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
