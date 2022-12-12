type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

const defaultHeaders: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export async function callApi(
    url: string,
    method: HttpMethod = 'GET',
    data: any = undefined,
    headers: HeadersInit = defaultHeaders,
): Promise<any> {
    const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';
    const body = data !== undefined ? JSON.stringify(data) : undefined;
    const request = new Request(`${baseUrl}${url}`, {method, headers, body});
    const response = await fetch(request);
    return await response.json();
}
