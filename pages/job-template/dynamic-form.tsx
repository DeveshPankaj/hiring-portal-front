import React, { useCallback, useState } from 'react'
import { Form, Button, Modal, Menu } from 'antd'
import moment from 'moment'
import FormBuilder from 'antd-form-builder'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { NextPage } from 'next'
import apis from '../../services/api.service'


const DateView = ({ value }: {value: any}) => value.format('MMM Do YYYY')
const Page: NextPage = () => {
  const [form] = Form.useForm()
  const [viewMode, setViewMode] = useState(true)
  const [pending, setPending] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({})
  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
    setPending(true)
    setTimeout(() => {
      setPending(false)
      setPersonalInfo(values)
      setViewMode(true)
      Modal.success({
        title: 'Success',
        content: 'Infomation updated.',
      })
    }, 1500)
  }, [])

  // const handleFinish = (values: any) => {
  //   console.log(values)
  //   setPersonalInfo(values)
  //   setViewMode(true)
  // }

  const [template, setTemplate] = React.useState<{uid: string, name: string, fields:Array<any>}|null>(null)
  React.useEffect(() => {
    let dateInputs:Array<string> = []
    fetch(apis.GET.jobTemplate).then(res => res.json()).then(res => {
      dateInputs = res.fields.filter((x: any) => x.widget === 'date-picker').map((x: any) => x.key)
      
      return res
    }).then((template) => {

      fetch(apis.GET.templateData).then(res => res.json()).then(res => {
        for(const key in res) {
          if(dateInputs.includes(key)) {
            res[key] = moment(res[key])
          }
        }
        setPersonalInfo(res)
        setTemplate(template)
      })
    })

   

  }, []);

  const getMeta = (...args: any[]) => {
    const meta = {
      columns: 1,
      disabled: pending,
      initialValues: personalInfo,
      fields: template && template.fields?template.fields:[],
    }
    return meta
  }

  const [current, setCurrent] = React.useState('home')
  const handleClick = (e: { key: any; }) => {
    console.log('click ', e);
    setCurrent(e.key)
};
  return (
    <div>
        {/* <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<MailOutlined />}>
            Home
            </Menu.Item>
            <Menu.Item key="details" icon={<AppstoreOutlined />}>
            Details
            </Menu.Item>
        </Menu> */}

        <div style={{padding: '0 4rem'}}>
        <Form layout="horizontal" form={form} onFinish={handleFinish} style={{}}>
        <h1 style={{ height: '40px', fontSize: '16px', marginTop: '20px', color: '#888' }}>
          {template?.name}
          {viewMode && (
            <Button type="link" onClick={() => setViewMode(false)} style={{ float: 'right' }}>
              Edit
            </Button>
          )}
        </h1>
        <FormBuilder form={form} getMeta={getMeta} viewMode={viewMode} />
        {!viewMode && (
          <Form.Item className="form-footer" wrapperCol={{ span: 16, offset: 4 }}>
            <Button htmlType="submit" type="primary" disabled={pending}>
              {pending ? 'Updating...' : 'Update'}
            </Button>
            <Button
              onClick={() => {
                form.resetFields()
                setViewMode(true)
              }}
              style={{ marginLeft: '15px' }}
            >
              Cancel
            </Button>
          </Form.Item>
        )}
      </Form>
        </div>
      
    </div>
  )
}

export default Page