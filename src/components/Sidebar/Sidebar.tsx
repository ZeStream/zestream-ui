import { Box, ScrollArea } from '@radix-ui/themes';
import SideBarItem from './widgets/SideBarItem';

interface IProps {
    children: React.ReactElement;
}

const SideBar = () => (
    <Box
        display={{ initial: 'none', md: 'block' }}
        style={{ width: 250, flexShrink: 0 }}
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
                <SideBarItem href="">Files</SideBarItem>
                <SideBarItem href="transformations">
                    Transformations
                </SideBarItem>
                <SideBarItem href="monitoring">Monitoring</SideBarItem>
                <SideBarItem href="profile">Profile</SideBarItem>
            </ScrollArea>
        </Box>
    </Box>
);

export default SideBar;
