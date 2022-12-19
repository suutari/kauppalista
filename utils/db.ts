#!/usr/bin/env -S NODE_NO_WARNINGS=1 npx ts-node --project node.tsconfig.json

import {Id, ShopList, ShopListItem} from './types';

export async function getDatabase(): Promise<Database> {
    const baseUrl = process.env.API_BASE_URL;
    const appId = process.env.API_APP_ID;
    const restApiKey = process.env.API_REST_API_KEY;
    if (!baseUrl || !appId || !restApiKey) {
        throw Error('API not configured');
    }
    return new Database({baseUrl, appId, restApiKey});
}

type DatabaseParameters = {
    baseUrl: string;
    appId: string;
    restApiKey: string;
};

export class Database implements DatabaseParameters {
    baseUrl: string;
    appId: string;
    restApiKey: string;

    constructor({baseUrl, appId, restApiKey}: DatabaseParameters) {
        this.baseUrl = baseUrl;
        this.appId = appId;
        this.restApiKey = restApiKey;
    }

    async createShopList(name: string): Promise<Id> {
        const data = await this.send('POST', '/classes/ShopList', {name});
        return data.objectId;
    }

    async addItemToList(listId: Id, text: string): Promise<number> {
        const shopList = this.makeShopListPointer(listId);
        const params = {where: {shopList}, order: '-sequence', limit: 1};
        const result = await this.send('GET', '/classes/ShopListItem', params);
        const maxSeq = result.results?.[0]?.sequence ?? 0;
        const sequence = maxSeq + 1;

        const data = await this.send('POST', '/classes/ShopListItem', {
            shopList,
            sequence,
            text,
        });
        return sequence;
    }

    async getListItem(listId: Id, sequence: number): Promise<ShopListItem> {
        const shopList = this.makeShopListPointer(listId);
        const params = {where: {shopList, sequence}, order: 'sequence'};
        const {results} = await this.send(
            'GET',
            '/classes/ShopListItem',
            params
        );
        if (!results.length) {
            throw Error(`No such list item: ${listId}/${sequence}`);
        }
        const item = results[0];
        return {
            listId: item.shopList.objectId,
            sequence: item.sequence,
            text: item.text,
            done: item.done,
        };
    }

    async getShopLists(): Promise<ShopList[]> {
        const data = await this.send('GET', '/classes/ShopList');
        return data.results.map((x: any) => ({
            id: x.objectId,
            name: x.name,
            createdAt: x.createdAt,
        }));
    }

    async getShopList(listId: Id): Promise<ShopList> {
        const params = {where: {objectId: listId}};
        const {results} = await this.send('GET', '/classes/ShopList', params);
        if (!results.length) throw Error(`No such list: ${listId}`);
        const item = results[0];
        return {
            id: item.objectId,
            name: item.name,
            createdAt: item.createdAt,
        };
    }

    async getListItems(listId: Id): Promise<ShopListItem[]> {
        const shopList = this.makeShopListPointer(listId);
        const params = {where: {shopList}, order: 'sequence'};
        const {results} = await this.send(
            'GET',
            '/classes/ShopListItem',
            params
        );
        return results.map((item: any) => ({
            listId: item.shopList.objectId,
            sequence: item.sequence,
            text: item.text,
            done: item.done,
        }));
    }

    private async send(method: string, uri: string, data?: unknown) {
        let url = this.baseUrl + uri;
        const headers = {
            'X-Parse-Application-Id': this.appId,
            'X-Parse-REST-API-Key': this.restApiKey,
            'Content-Type': 'application/json',
        };
        let body: string | null = null;
        if (data && method == 'GET') {
            const parameters = Object.entries(data).map(
                ([k, v]) => `${k}=${encodeURIComponent(JSON.stringify(v))}`
            );
            url += '?' + parameters.join('&');
        } else if (data) {
            body = JSON.stringify(data);
        }
        const response = await fetch(url, {method, headers, body});
        const responseData = await response.json();
        if (response.status < 200 || response.status >= 300) {
            throw Error(
                `Failed ${method} ${uri} with status ${response.status}: ` +
                    `${responseData?.error}`
            );
        }
        return responseData;
    }

    private makeShopListPointer(listId: Id) {
        return this.makePointer('ShopList', listId);
    }

    private makePointer(typeName: 'ShopList' | 'ShopListItem', id: Id) {
        return {
            __type: 'Pointer',
            className: typeName,
            objectId: id,
        };
    }
}

async function kokeile() {
    const db = await getDatabase();

    const listaId = await db.createShopList('Testilista');
    console.log(listaId);

    await db.addItemToList(listaId, 'eka rivi');
    await db.addItemToList(listaId, 'toka rivi');
    const listat = await db.getShopLists();
    console.log(listat);

    const listItem = await db.getListItem(listaId, 1);
    console.log(listItem);

    const lista = await db.getShopList(listaId);
    console.log(lista);

    const listanIteemit = await db.getListItems(listaId);
    console.log(listanIteemit);
}

// kokeile();
