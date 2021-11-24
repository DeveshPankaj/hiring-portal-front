import React, {useCallback, useState} from 'react'
import {Button, Form, Modal} from 'antd'
import moment from 'moment'
import FormBuilder from 'antd-form-builder'
import {NextPage} from 'next'
import apis from '../../services/api.service'

const DateView = ({value}: { value: any }) => value.format('MMM Do YYYY')
const Application: NextPage = () => {
	return (<div></div>)
}

export default Application