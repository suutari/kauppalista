import Link from 'next/link';

import {Page} from '@/components/Page';
import {GetServerSideProps} from 'next';
import {ShopList} from '@/utils/types';
import {propTypes} from 'react-bootstrap/esm/Image';

type PropsType = {
    listat: ShopList[];
};

const LIST_ITEMS = [
    {id: 1, text: 'Eka kauppalista'},
    {id: 2, text: 'Toka kauppalista'},
    {id: 3, text: 'Kolmas kauppalista'},
];

export default function ListatSivu({listat}: PropsType) {
    function ListaListItem({id, name}: {id: number; name: string}) {
        return (
            <li>
                <Link href={`/lista/${id}`}>
                    ({id}) {name}
                </Link>
            </li>
        );
    }

    return (
        <Page title="Listat">
            <ul>
                {listat.map((lista) => (
                    <ListaListItem id={lista.id} name={lista.name} />
                ))}
            </ul>
        </Page>
    );
}

export const getServerSideProps: GetServerSideProps<PropsType> = async (
    context
) => {
    const host: string = context.req.headers.host ?? 'localhost';
    const proto = /^localhost:?/.test(host) ? 'http' : 'https';
    const response = await fetch('${proto}://${host}/api/listat');
    const listat: ShopList[] = await response.json();

    return {
        props: {listat},
    };
};
