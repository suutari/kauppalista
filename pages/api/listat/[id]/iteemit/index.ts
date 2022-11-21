import type {NextApiRequest, NextApiResponse} from 'next';

import {getDatabase} from '@/utils/db';
import {ErrorResponse} from '@/utils/errors';
import {tryParseInt} from '@/utils/numbers';
import {ShopListItem} from '@/utils/types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ShopListItem[] | ErrorResponse>
) {
    if (req.method == 'GET') {
        const {query} = req;
        const db = await getDatabase();
        const {id: listIdString} = query;
        const listId: number | null = tryParseInt(<string>listIdString);
        if (listId === null) {
            res.status(400).json({
                error: "The 'id' must be integer",
                errorCode: 'bad-request',
            });
            return;
        }
        const items = await db.getListItems(listId);
        res.status(200).json(items);
    }
}
