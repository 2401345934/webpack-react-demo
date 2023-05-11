import QueryTable from '@/components/BusinessComponent/QueryTable'
import PageWarp from '@/components/BusinessComponent/PageWarp'

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]
const initForm = [
  {
    label: '姓名',
    name: 'name',
    type: 'input',
    props: {},
  },
  {
    label: '年龄',
    name: 'age',
    type: 'inputnumber',
    props: {},
  },
  {
    label: '性别',
    name: 'sex',
    type: 'select',
    props: {},
    source: () => {
      return [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ]
    },
  },
  {
    label: '性别2',
    name: 'sex2',
    type: 'radio',
    props: {},
    source: () => {
      return [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ]
    },
  },
  {
    label: '喜好',
    name: 'xihao',
    type: 'checkbox',
    props: {},
    source: () => {
      return [
        {
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        },
      ]
    },
  },
  {
    label: '出生日期',
    name: 'time1',
    type: 'datepicker',
    props: {},
  },
  {
    label: '生日',
    name: 'time2',
    type: 'rangepicker',
    props: {},
  },
  {
    label: '个人介绍',
    name: 'textarea',
    type: 'textarea',
    props: {},
  },
]
const Component: React.FC = (): JSX.Element => {
  const ref = useRef<any>(null)
  const [tableColumns, setTableColumns] = useState<any>([])
  const [formItem, setFormItem] = useState<any>([])

  useMount(() => {
    setTimeout(() => {
      setTableColumns([
        ...columns,
        {
          title: '动态天际的数据',
          dataIndex: '1',
          key: '2',
        },
      ])
      setFormItem([
        ...initForm,
        {
          label: '姓名222',
          name: 'nam333e',
          type: 'input',
          props: {},
        },
      ])
    }, 1000)
  })

  const tableProps = {
    dataSource,
    columns: tableColumns,
  }

  const formProps = {
    formItems: formItem,
  }
  const requestProps = {
    url: 'xx',
    method: 'GET',
  }
  const actions = (
    <Space>
      <Button
        onClick={() => {
          console.log('ref', ref.current.formRef)
        }}
      >
        更新
      </Button>
      <Button>删除</Button>
    </Space>
  )
  const config = {
    tableProps,
    formProps,
    actions,
    requestProps,
    ref,
    tableResize: true,
  }

  return (
    <PageWarp>
      <QueryTable {...config}></QueryTable>
    </PageWarp>
  )
}

export default Component
