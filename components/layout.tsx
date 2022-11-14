import {FC, ReactNode} from 'react';

import NavigationBar from './NavigationBar';

const Layout: FC<{children: ReactNode}> = ({children}) => {
    return (
        <>
            <NavigationBar />
            <main>{children}</main>
        </>
    );
};

export default Layout;
