

const BASE_API_URL = 'http://127.0.0.1:3000'



const APIS: {[key in 'GET'|'POST'|'PUT']: {[key: string]: string}} = {
    GET: {

        createTemplateForm: (new URL('/api/create-template-form', BASE_API_URL)).href,

        jobTemplate: (new URL('/api/job-templates', BASE_API_URL)).href,
        templateData: (new URL('/api/template-data', BASE_API_URL)).href
    },

    POST: {

    },

    PUT: {

    }
}


export default APIS
