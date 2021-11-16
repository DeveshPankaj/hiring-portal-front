import { NextPage } from "next";
import React, { ReactNode} from "react";
import { Form, Input, Button, Checkbox, Space, PageHeader, Menu, Card, Tabs } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useRouter } from "next/dist/client/router";

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
    placeholder?: string
    render: (context:Map<string, undefined>, self: IFormInput) => ReactNode
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

const JobTemplate: NextPage = () => {

    const router = useRouter()

    const inputFields: Array<IFormInput> = [
        {
            uid: '1',
            type: 'text',
            placeholder: 'username',
            label: 'Username',
            render: (context, self) => {
                return (
                    <Form.Item  
                        label={self.label}
                        name={self.uid}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                )
            }
        },
        {
            uid: '2',
            type: 'number',
            placeholder: 'age',
            label: 'Age',
            render: (context, self) => {
                return (
                    <Form.Item  
                        label={self.label}
                        name={self.uid}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input type='number' />
                    </Form.Item>
                        
                )
            }
        },
        {
            uid: '3',
            type: 'checkbox',
            label: 'Remember me',
            render: (context, self) => {
                return (
                    <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    {...tailFormItemLayout}
                >
                    <Checkbox>{self.label}</Checkbox>
                </Form.Item>
                )
            }
        }
    ]

    const [form] = Form.useForm();


    const actionHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>, action: IAction) => {
        event.preventDefault()
        console.log(form.getFieldsValue())
    }

    const actions: Array<IAction> = [
        {
            uid: '1',
            name: 'Create Template',
            chick: actionHandler
        },
        {
            uid: '2',
            name: 'Activate Template',
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
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {inputFields.map(inputField => (<div key={inputField.uid}>{inputField.render(context, inputField)}</div>))}
                    
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
