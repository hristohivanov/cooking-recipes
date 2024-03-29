import {objectToUrlParams} from "../helpers/defaultHelpers";

const apiCall = async (url, parameters= {}, method = 'GET') => {

    const requestData = {
        method: method,
        headers: {
            'Content-Type': method !== 'PATCH' ? 'application/ld+json' : 'application/merge-patch+json',
        },
    };
    if (method !== 'GET' && method !== 'DELETE' && Object.keys(parameters).length > 0) {
        requestData.body = JSON.stringify(parameters);
    } else if (Object.keys(parameters).length > 0) {
        url += objectToUrlParams(parameters);
    }

    const response = await fetch(url, requestData);

    if (!response.ok) {
        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/problem+json')) {
            const error = await response.json()
            throw {message: error['hydra:description'] || 'Something happened!'}

        } else {
            throw {message: 'Failed to fetch data'}
        }
    }

    if (response.status === 204) {
        return {};
    }

    return await response.json();
}

export default apiCall;