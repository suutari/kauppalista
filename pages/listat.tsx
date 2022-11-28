import {GetServerSideProps} from 'next';
import Link from 'next/link';

import {Page} from '@/components/Page';
import {callApi} from '@/utils/apicall';
import {ShopList} from '@/utils/types';

type PropsType = {
    listat: ShopList[];
};

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
                    <ListaListItem
                        key={lista.id}
                        id={lista.id}
                        name={lista.name}
                    />
                ))}
            </ul>
        </Page>
    );
}

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
    const listat: ShopList[] = await callApi('/api/listat');
    return {
        props: {listat},
    };
};
