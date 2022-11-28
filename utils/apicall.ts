export async function callApi(url: string): Promise<any> {
    const baseUrl = process.env.BASE_URL;
    const response = await fetch(`${baseUrl}${url}`);
    return await response.json();
}
