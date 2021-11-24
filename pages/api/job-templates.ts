import {NextApiRequest, NextApiResponse} from "next";

type IFormInput = {
    uid: string
    type: 'text' | 'number' | 'checkbox'
    label: string
    placeholder?: string
}

type Data = {
    uid: string
    name: string // template name
    fields: Array<IFormInput>
}


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	res.status(200).json({
		uid: '123-456',
		name: 'IT department',
		fields: [
			{key: 'name.first', label: 'First Name', required: true},
			{key: 'name.last', label: 'Last Name', required: true},
			{key: 'gender', label: 'Gender', widget: 'radio-group', options: ['Male', 'Female'], required: true},
			{
				key: 'dateOfBirth',
				label: 'Date of Birth',
				widget: 'date-picker',
				// viewWidget: DateView,
			},
			{key: 'email', label: 'Email'},
			{key: 'phone', label: 'Phone'},
			{
				key: 'address', label: 'Address',
				// colSpan: 2 
			},
			{key: 'city', label: 'City'},
			{key: 'zipCode', label: 'Zip Code'},
		]
	})
}