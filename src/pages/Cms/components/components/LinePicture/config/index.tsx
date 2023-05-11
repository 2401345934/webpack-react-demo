import { Context } from '@/pages/Cms'
import { PlusOutlined } from '@ant-design/icons'
import { UploadFile, UploadProps } from 'antd'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import React, { useContext } from 'react'
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const Component: React.FC = (): JSX.Element => {
  const { sourceData, currentIndex, setSourceData }: any = useContext(Context)

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    getBase64(info.file.originFileObj as RcFile, url => {
      sourceData[currentIndex].config = {
        ...sourceData[currentIndex].config,
        src: url,
      }
      setSourceData([...sourceData])
    })
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div>Upload</div>
    </div>
  )
  return (
    <div>
      <h3>上传图片</h3>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
    </div>
  )
}

export default Component
