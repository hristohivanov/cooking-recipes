
export const hydraResourceToRouteLink = (resource) => {
    return resource.replace('/api', '')
}

export const objectToUrlParams = (obj) => {
    const paramsArray = Object.entries(obj);
    const paramsString = paramsArray.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    return `?${paramsString}`;
};