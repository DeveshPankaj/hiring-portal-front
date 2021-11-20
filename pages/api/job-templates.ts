import { NextApiRequest, NextApiResponse } from "next";

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
  

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    res.status(200).json({
        uid: '123-456',
        name: 'IT department',
        fields: [
            {
                uid: '1',
                type: 'text',
                placeholder: 'username',
                label: 'Username',
            },
            {
                uid: '2',
                type: 'number',
                placeholder: 'age',
                label: 'Age',
            },
            {
                uid: '3',
                type: 'checkbox',
                label: 'Remember me',
                placeholder: 'check'
            }
        ]
    })
}