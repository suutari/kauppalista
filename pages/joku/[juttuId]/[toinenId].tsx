import Link from 'next/link';
import {useRouter} from 'next/router';

export default function Post() {
    const router = useRouter();
    const {juttuId, toinenId} = router.query;

    console.log(router.query);

    return (
        <div>
            <h1>Joku juttusivu</h1>
            <p>Juttu id: {juttuId}</p>
            <p>Toinen id: {toinenId}</p>
            <p>
                <Link href="/joku/sivu">Joku sivu</Link>
            </p>
        </div>
    );
}
