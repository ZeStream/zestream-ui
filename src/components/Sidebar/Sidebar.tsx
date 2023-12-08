import { Box, ScrollArea } from '@radix-ui/themes';
import SideBarItem from './widgets/SideBarItem';

import styles from "./Sidebar.module.css";
import { SIDEBAR_NAVs } from '@/constants';

interface IProps {
    children: React.ReactElement;
}

const SideBar = () => (
    <Box
        display={{ initial: 'none', md: 'block' }}
        style={{ width: 250, flexShrink: 0 }}
        className={styles.container}
    >
        <Box
            position="fixed"
            left="0"
            top="0"
            style={{
                zIndex: 1,
                top: 'var(--header-height)',
                overflowX: 'hidden',
                width: 'inherit',
            }}
        >
            <ScrollArea style={{ padding: 5 }}>
                {SIDEBAR_NAVs.map(sidebar => <SideBarItem key={sidebar.href} href={sidebar.href}>{sidebar.title}</SideBarItem>)}
            </ScrollArea>
        </Box>
    </Box>
);

export default SideBar;
