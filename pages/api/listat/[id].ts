import type {NextApiRequest, NextApiResponse} from 'next';

import {getDatabase} from '@/utils/db';
import {ShopList} from '@/utils/types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ShopList>
) {
    if (req.method == 'GET') {
        const {query} = req;
        const db = await getDatabase();
        const {id} = query;
        try {
            const idNumber = parseInt(<string>id);
        } catch (e) {
            console.log(e);
        }
        const shopList = await db.getShopList(idNumber);
        res.status(200).json(shopList);
    }
}
