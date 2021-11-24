import {NextPage} from 'next'
import React, {useCallback, useState} from 'react'
import {Button, Divider, Form, Modal, Space, Table} from 'antd'
import Column from 'antd/lib/table/Column';
import apis from '../../services/api.service'
import FormBuilder from 'antd-form-builder'


type TemplateInput = {
    order: number
    key: string
    label: string
    required?: boolean
    widget?: string
    options?: any
    initialValue?: any
    tooltip?: string
    placeholder?: string
}


const _dataSource: Array<TemplateInput> = [
	{key: 'name.first', label: 'First Name', required: true, order: 1},
	{key: 'name.last', label: 'Last Name', required: true, order: 2},
	{key: 'gender', label: 'Gender', widget: 'radio-group', options: ['Male', 'Female'], required: true, order: 3},
	{key: 'dateOfBirth', label: 'Date of Birth', widget: 'date-picker', order: 4},
	{key: 'email', label: 'Email', order: 5},
	{key: 'phone', label: 'Phone', order: 6},
	{key: 'address', label: 'Address', order: 7},
	{key: 'city', label: 'City', order: 8},
	{key: 'zipCode', label: 'Zip Code', order: 9},
];

const DateView = ({value}: { value: any }) => value.format('MMM Do YYYY')
const Page: NextPage = () => {
	const [form] = Form.useForm()
	const [pending, setPending] = useState(false)
	const [personalInfo, setPersonalInfo] = useState({})

	const [dataSource, setSourceData] = React.useState<Array<any>>(_dataSource);


	const handleFinish = useCallback(values => {
		console.log('Submit: ', values)

		if (dataSource.find(x => x.order === values.order)) {
			Modal.warn({
				title: 'Warning',
				content: 'Duplicate item with same order not allowed!',
			})
			return
		}


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
	}, [dataSource])


	const removeTemplateItem = (item: TemplateInput) => {
		setSourceData(dataSource.filter(x => x.key !== item.key))
	}

	// const handleFinish = (values: any) => {
	//   console.log(values)
	//   setPersonalInfo(values)
	//   setViewMode(true)
	// }

	const [template, setTemplate] = React.useState<{ uid: string, name: string, fields: Array<any> } | null>(null)
	React.useEffect(() => {
		let dateInputs: Array<string> = []
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
			fields: template && template.fields ? template.fields : [],
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
				<h1 style={{height: '40px', fontSize: '16px', marginTop: '20px', color: '#888'}}>
					{template?.name}

					<Button type="link" htmlType="submit" style={{float: 'right'}}>
						{pending ? 'Adding...' : 'Add Item'}
					</Button>

				</h1>
				<FormBuilder form={form} getMeta={getMeta} viewMode={false}/>
			</Form>

			<Divider orientation="left">Template items</Divider>


			<Table dataSource={dataSource}>
				<Column title="Order" dataIndex="order" key="order"/>
				<Column title="Key" dataIndex="key" key="key"/>
				<Column title="label" dataIndex="label" key="label"/>
				<Column title="Widget" dataIndex="widget" key="widget"/>
				<Column title="Tooltip" dataIndex="tooltip" key="tooltip"/>
				<Column title="Required" key="required"
					render={(text, record) => (
						<span>{Boolean((record as TemplateInput).required).toString()}</span>
					)}/>

				<Column
					title="Action"
					key="action"
					render={(text, record) => (
						<Space size="middle">
							{/* <a>Edit</a> */}
							<a onClick={() => removeTemplateItem(record as TemplateInput)}>Delete</a>
						</Space>
					)}
				/>
			</Table>

		</div>
	)
}

export default Page