import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    uid: string
    name: string // template name
    fields: Array<{
        key: string
        label: string
        required?: boolean
        widget?: string
        options?: any
        initialValue?: any
        tooltip?: string
        placeholder?: string
    }>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    res.status(200).json({
        uid: '123-456',
        name: 'Create Template',
        fields: [
            { key: 'key', label: 'Input Key', required: true, tooltip: 'Form object key.', placeholder: 'user_name'},
            { key: 'label', label: 'Input Label', required: true, tooltip: 'Form input label.'},
            { key: 'widget', label: 'Input type', widget: 'select', options: ['input', 'password', 'textarea', 'number', 'select', 'date-picker', 'radio', 'checkbox', 'checkbox-group', 'switch', 'radio-group', 'button'], required: true},
            { key: 'initialValue', label: 'Initial Value', required: false, placeholder: 'Initial data value' },
            { key: 'order', label: 'Order', widget: 'number', tooltip:'Form item index', required: true },
            { key: 'tooltip', label: 'Tooltip', required: false, placeholder: 'Tooltip for input field.' },
            { key: 'required', label: 'Require', widget: 'switch', initialValue: true },
        ]
    })
}
