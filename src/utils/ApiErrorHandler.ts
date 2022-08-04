export const handleErrors = (response: Response): Response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};

export const generateRequestOptions = (method: string, body: object) => {
    return {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
};
