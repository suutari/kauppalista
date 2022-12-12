import {GetServerSideProps} from 'next';
import Link from 'next/link';

import {Page} from '@/components/Page';
import {callApi} from '@/utils/apicall';
import {formatDateString} from '@/utils/datetime';
import {ShopList} from '@/utils/types';

type PropsType = {
    listat: ShopList[];
};

export default function ListatSivu({listat}: PropsType) {
    function ListaListItem({tiedot}: {tiedot: ShopList}) {
        const {id, name, createdAt} = tiedot;
        return (
            <li>
                <Link href={`/lista/${id}`}>
                    {createdAt ? (
                        <>
                            <i>{formatDateString(createdAt)}</i>
                            <span>&nbsp;&ndash;&nbsp;</span>
                        </>
                    ) : null}
                    {name}
                </Link>
            </li>
        );
    }

    return (
        <Page title="Listat">
            <ul>
                {listat.map((lista) => (
                    <ListaListItem key={lista.id} tiedot={lista} />
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
