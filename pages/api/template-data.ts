import type {NextApiRequest, NextApiResponse} from 'next'
import moment from 'moment'


type Data = {
    [key: string]: string | any
}

const MOCK_INFO = {
	name: {first: 'Pankaj', last: 'Devesh'},
	email: 'myemail@gmail.com',
	gender: 'Male',
	dateOfBirth: moment('2100-01-01'),
	phone: '15988888888',
	city: 'Shanghai',
	address: 'No.1000 Some Road, Zhangjiang Park, Pudong New District',
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	res.status(200).json(MOCK_INFO)
}