import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {query} = req;

    console.log(JSON.stringify(req));
    res.status(200).json({name: 'John Doe'});
}
