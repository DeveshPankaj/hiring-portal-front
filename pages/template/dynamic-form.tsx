import React, { useCallback, useState } from 'react'
import { Form, Button, Modal, Menu, List, Avatar, Card, Divider, Table, Tag, Space} from 'antd'
import moment from 'moment'
import FormBuilder from 'antd-form-builder'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { NextPage } from 'next'
import apis from '../../services/api.service'
import Column from 'antd/lib/table/Column';

const _dataSource = [
  { key: 'name.first', label: 'First Name', required: true, order: 1},
  { key: 'name.last', label: 'Last Name', required: true , order: 2},
  { key: 'gender', label: 'Gender', widget: 'radio-group', options: ['Male', 'Female'],   required: true, order: 3},
  { key: 'dateOfBirth', label: 'Date of Birth', widget: 'date-picker', order: 4},
  { key: 'email', label: 'Email', order: 5},
  { key: 'phone', label: 'Phone', order: 6},
  { key: 'address', label: 'Address', order: 7},
  { key: 'city', label: 'City', order: 8},
  { key: 'zipCode', label: 'Zip Code', order: 9},
];
// //key: string
// label: string
// required?: boolean
// widget?: string
// options?: any
// initialValue?: any
// tooltip?: string
// placeholder?: string
const columns = [
  {
    title: 'Order',
    dataIndex: 'order',
    key: 'order',
  },
  {
    title: 'Input key',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Is Required',
    dataIndex: 'required',
    key: 'required',
  },
  {
    title: 'Widget',
    dataIndex: 'widget',
    key: 'widget',
  },
  {
    title: 'Tooltip',
    dataIndex: 'tooltip',
    key: 'tooltip',
  },
  {
    title: 'Placeholder',
    dataIndex: 'placeholder',
    key: 'placeholder',
  },
  {
    title: 'Initial Value',
    dataIndex: 'initialValue',
    key: 'initialValue',
  },
  {
    title: 'Options',
    dataIndex: 'options',
    key: 'options',
  },
];


const DateView = ({ value }: {value: any}) => value.format('MMM Do YYYY')
const Page: NextPage = () => {
  const [form] = Form.useForm()
  const [viewMode, setViewMode] = useState(false)
  const [pending, setPending] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({})

  const [dataSource, setSourceData] = React.useState<Array<any>>(_dataSource);


  const handleFinish = useCallback(values => {
    console.log('Submit: ', values)
    form.resetFields()

    setPending(true)
    setTimeout(() => {
      setPending(false)
      setPersonalInfo(values)
      // setViewMode(true)

      setSourceData([values].concat(dataSource))
      form.resetFields()

      Modal.success({
        title: 'Success',
        content: 'Input item added.',
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
    fetch(apis.GET.createTemplateForm).then(res => res.json()).then(res => {
      dateInputs = res.fields.filter((x: any) => x.widget === 'date-picker').map((x: any) => x.key)
      setTemplate(res)
      return res
    })

   

  }, []);

  const getMeta = (...args: any[]) => {
    const meta = {
      columns: 3,
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
       
          <Form.Item className="form-footer" wrapperCol={{ span: 16, offset: 4 }}>
            <Button htmlType="submit" type="primary" disabled={pending}>
              {pending ? 'Adding...' : 'Add Item'}
            </Button>
          </Form.Item>
      </Form>

      <Divider orientation="left">Template items</Divider>


      <Table dataSource={dataSource}>
      <Column title="order" dataIndex="order" key="order" />
      <Column title="Key" dataIndex="key" key="key" />
      <Column title="label" dataIndex="label" key="label" />
      <Column title="widget" dataIndex="widget" key="widget" />
      <Column title="tooltip" dataIndex="tooltip" key="tooltip" />

      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        )}
      />
      </Table>
   
    </div>
  )
}

export default Page