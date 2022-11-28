import Link from 'next/link';

import {Page} from '@/components/Page';

const LIST_ITEMS = [
    {id: 1, text: 'Eka kauppalista'},
    {id: 2, text: 'Toka kauppalista'},
    {id: 3, text: 'Kolmas kauppalista'},
];

export default function ListatSivu() {
    function ListItem({id, text}: {id: number; text: string}) {
        return (
            <li>
                <Link href="/listat/{id}">
                    ({id}) {text}
                </Link>
            </li>
        );
    }

    return (
        <Page title="Listat">
            <ul>
                {LIST_ITEMS.map((item) => (
                    <ListItem id={item.id} text={item.text} />
                ))}
            </ul>
        </Page>
    );
}
