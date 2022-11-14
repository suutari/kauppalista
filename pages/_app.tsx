import type {AppProps} from 'next/app';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/globals.css';
import Layout from '@/components/layout';

export default function App({Component, pageProps}: AppProps) {
    return (
        <Layout>
            <Head>
                <title>Kauppalista</title>
                <meta
                    name="description"
                    content="Kauppalistan hallintaohjelma"
                />
                <link rel="icon" href="/kauppalista.ico" />
            </Head>

            <Component {...pageProps} />
        </Layout>
    );
}
