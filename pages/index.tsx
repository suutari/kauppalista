import {Page} from '@/components/Page';
import Image from 'next/image';

export default function Etusivu() {
    return (
        <Page title="Kauppalista">
            <Image src="/kauppalista.ico" width={128} height={128} alt="" />
        </Page>
    );
}
