import PageWarp from '@/components/BusinessComponent/PageWarp'
import FixedButton from '@/components/FixedButton'

export default function index() {
  return (
    <PageWarp>
      index
      <FixedButton>
        <Space>
          <Button>新增</Button>
          <Button>编辑</Button>
        </Space>
      </FixedButton>
    </PageWarp>
  )
}
