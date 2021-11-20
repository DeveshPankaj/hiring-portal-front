
const fetchAPI = fetch


const PreRequestHandler = (input: RequestInfo, init?: RequestInit): Promise<[input: RequestInfo, init?: RequestInit]> => {
    return Promise.resolve([input, init])
};

const PostRequestHandler = (response: Response, input: RequestInfo, init?: RequestInit): Promise<Response> => {
    if(response.status === 404) {
        return fetch('http://127.0.0.1:3000/api/job-templates')
    } else {
        return Promise.resolve(response);
    }
};

const ErrorResponseHandler = (error: any, input: RequestInfo, init?: RequestInit): Promise<{response: Response}|{ error: any}> => {
    console.log(error)
    return Promise.resolve({error})
};

interface IPreRequestHandler {
    (input: RequestInfo, init?: RequestInit) : Promise<[input: RequestInfo, init?: RequestInit]>
}

interface IPostRequestHandler {
    (response: Response, input: RequestInfo, init?: RequestInit): Promise<Response>
}

interface IErrorResponseHandler {
    (error: any, input: RequestInfo, init?: RequestInit): Promise<{response: Response} | {error: any}>
}

const PreRequestHandlers: Array<IPreRequestHandler> = [PreRequestHandler];
const PostRequestHandlers: Array<IPostRequestHandler> = [PostRequestHandler];
const ErrorResponseHandlers: Array<IErrorResponseHandler> = [ErrorResponseHandler];

const HandelPostRequestHandlers = async (response: Response, input: RequestInfo, init?: RequestInit): Promise<Response> => {
    for(const resHandler of PostRequestHandlers) {
        response = await resHandler(response, input, init);
    }
    return response
}

const HandelErrorResponseHandlers = async (error: any, resolve: (...args:any[]) => any, reject:(...args:any[])=>any, input: RequestInfo, init?: RequestInit): Promise<any> => {
    let fallbackResult:{response?: Response, error?: any} = {error}
    for(const errHandler of ErrorResponseHandlers) {
        if(fallbackResult.error) {
            fallbackResult = await errHandler(fallbackResult.error, input, init);
        }
        if(fallbackResult.response) break;
    }

    if(fallbackResult.response) {
        resolve(fallbackResult.response)
    } else {
        console.log('Failed to correct this error', input)
        reject(fallbackResult.error)
    }
    return fallbackResult
}

const Handler: typeof fetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {

    let returnValue:[input: RequestInfo, init?: RequestInit] = [input, init]
    for(const preHandler of PreRequestHandlers) {
        returnValue = await preHandler(...returnValue);
    }

    return new Promise<Response>((resolve, reject) => {
        fetchAPI(...returnValue)
        .then(response => HandelPostRequestHandlers(response, input, init).then(resolve))
        .catch(error => HandelErrorResponseHandlers(error, resolve, reject, input, init));
    })
}

export default Handler
