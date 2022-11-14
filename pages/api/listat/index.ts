import type {NextApiRequest, NextApiResponse} from 'next';
import {open} from 'sqlite';
import sqlite3 from 'sqlite3';

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {query} = req;

    console.log(result);
    res.status(200).json({name: 'John Doe'});
}
