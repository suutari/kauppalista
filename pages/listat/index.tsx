import {GetServerSideProps} from 'next';
import Link from 'next/link';

import {Page} from '@/components/Page';
import {callApi} from '@/utils/apicall';
import {formatDateString} from '@/utils/datetime';
import {ErrorResponse} from '@/utils/errors';
import {ShopList} from '@/utils/types';

type PropsType = {
    listat: ShopList[] | null;
    error: string | null;
};

export default function ListatSivu({listat, error}: PropsType) {
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

    function Content() {
        if (!listat) {
            return <div className="error">{error ?? 'Tuntematon virhe'}</div>;
        }
        return (
            <ul>
                {listat.map((lista) => (
                    <ListaListItem key={lista.id} tiedot={lista} />
                ))}
            </ul>
        );
    }

    return (
        <Page title="Listat">
            <Content />
        </Page>
    );
}

export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
    let listat: ShopList[] | ErrorResponse | null = null;
    let error: string | null = null;
    try {
        listat = await callApi('/api/listat');
    } catch (e) {
        error = (e as Error).message;
    }
    if (!listat || 'error' in listat) {
        error = listat?.error ?? 'An error';
        listat = null;
    }
    return {
        props: {listat, error},
    };
};
