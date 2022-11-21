import type {NextApiRequest, NextApiResponse} from 'next';

import {getDatabase} from '@/utils/db';
import {ErrorResponse} from '@/utils/errors';
import {tryParseInt} from '@/utils/numbers';
import {ShopList} from '@/utils/types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ShopList | ErrorResponse>
) {
    if (req.method == 'GET') {
        const {query} = req;
        const db = await getDatabase();
        const {id} = query;
        const idNumber: number | null = tryParseInt(<string>id);
        if (idNumber === null) {
            res.status(400).json({
                error: "The 'id' must be integer",
                errorCode: 'bad-request',
            });
            return;
        }
        const shopList = await db.getShopList(idNumber);
        res.status(200).json(shopList);
    }
}
