import { NextPage } from "next";
import React, { ReactNode} from "react";
import { Form, Input, Button, Checkbox, Space, PageHeader, Menu, Card, Tabs } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useRouter } from "next/dist/client/router";
import fetch from '../../services/fetch.service'
import apis from '../../services/api.service'

import FormBuilder from 'antd-form-builder'

const { SubMenu } = Menu;
const { TabPane } = Tabs;


type IAction = {
    uid: string
    name?: string
    chick: (event: React.MouseEvent<HTMLElement, MouseEvent>, self: IAction) => void
}

type IFormInput = {
    uid: string
    type: 'text' | 'number' | 'checkbox'
    label: string
    required:boolean
    placeholder?: string
}

const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
};


const CustomInput: React.FC<{self:IFormInput}> = ({self}) => {
    return (
    
        <Form.Item
            label={self.label}
            valuePropName={'input_' + self.uid}
            name={'input_'+self.uid}
            rules={[{ required: self.required, message: 'Field require!' }]}
            {...tailFormItemLayout}
        >
            <Input type={self.type} name={'input_'+self.uid} placeholder={self.placeholder}/>
            
        </Form.Item>
    

    )
}

const JobTemplate: NextPage = () => {

    const router = useRouter()

    const [inputFields, setInputFields] = React.useState<Array<IFormInput>>([])
    
    React.useEffect(() => {
        fetch(apis.GET.jobTemplate).then(res => res.json()).then(res => {
            console.log(res)
            setInputFields(res.fields)
        })
    }, []);

    const [form] = Form.useForm();


    const actionHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>, action: IAction) => {
        event.preventDefault()
        console.log(form.getFieldsValue()['input_3'].target.checked)
        // fetch('http://127.0.0.1:3000/api/job-templates').then(res => res.json()).then(res => {
        //     console.log(res)
        // })
        
        // .catch(error => {
        //     // console.log(error)
        // })
    }

    const actions: Array<IAction> = [
        {
            uid: '1',
            name: 'Create Template',
            chick: actionHandler
        }
    ]

    const context = new Map<string, undefined>()

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleClick = (e: { key: any; }) => {
        console.log('click ', e);
        setCurrent(e.key)
    };

    const [current, setCurrent] = React.useState('home')

    return (
        <>
        {/* <PageHeader
            className="site-page-header"
            onBack={() => router.back()}
            title="Job template"
            subTitle="This is a subtitle"
            extra={[
                <Button key="3">Operation</Button>,
                <Button key="2">Operation</Button>,
                <Button key="1" type="primary">
                  Primary
                </Button>,
            ]}
            footer={
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Details" key="1" />
                  <TabPane tab="Rule" key="2" />
                </Tabs>
              }
        /> */}
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<MailOutlined />}>
            Home
            </Menu.Item>
            <Menu.Item key="details" disabled icon={<AppstoreOutlined />}>
            Details
            </Menu.Item>
        </Menu>
            <Card>                
                <section>
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {inputFields.map(inputField => (<div key={inputField.uid}>{<CustomInput self={inputField}/>}</div>))}
                    
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                        {actions.map(action => (
                            <Button key={action.uid} type="primary" htmlType="submit" onClick={e => action.chick(e, action)}>
                                {action.name}
                            </Button>
                        ))}
                        </Space>
                    </Form.Item>
                </Form>
                </section>
            </Card>

        </>
    )
    
}

export default JobTemplate
