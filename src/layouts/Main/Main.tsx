// components
import Sidebar from '@/components/Sidebar';

// styles
import styles from './Main.module.css';

// radix-ui
import { Box, Flex } from '@radix-ui/themes';
import Header from '@/components/Header';

interface IProps {
    children: React.ReactElement;
}

export default function Main({ children }: IProps) {
    return (
        <Box className={styles.container}>
            <Header />

            <Flex className={styles.body}>
                <Sidebar />
                <div className={styles.content}>{children}</div>
            </Flex>
        </Box>
    );
}
