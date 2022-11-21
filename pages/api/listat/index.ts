import type {NextApiRequest, NextApiResponse} from 'next';
import {ShopList} from '@/utils/types';
import {getDatabase} from '@/utils/db';

type ErrorResponse = {
    error: string;
    errorCode: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ShopList | ShopList[] | ErrorResponse>
) {
    try {
        if (req.method == 'POST') {
            const shopList = await createShopList(req);
            res.status(201).json(shopList);
        } else if (req.method == 'GET') {
            const shopLists = await getShopLists(req);
            res.status(200).json(shopLists);
        } else {
            res.status(405).json({
                error: `Method ${req.method} Not Allowed`,
                errorCode: 'invalid-method',
            });
        }
    } catch (e) {
        const error: Error = <Error>e;
        res.status(400).json({
            error: `${error.message}`,
            errorCode: 'bad-request',
        })
    }
}

async function createShopList(req: NextApiRequest): Promise<ShopList> {
    const db = await getDatabase();
    const {name} = req.body;
    if (name) {
        const id = await db.createShopList(name);
        return {id, name};
    }
    throw Error('No name given');
}

async function getShopLists(req: NextApiRequest): Promise<ShopList[]> {
    const db = await getDatabase();
    return db.getShopLists();
}
