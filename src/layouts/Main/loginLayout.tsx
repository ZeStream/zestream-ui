// components

// styles
import styles from './Main.module.css';

// radix-ui
import { Box, Flex } from '@radix-ui/themes';
import Login from '@/app/login/page';

interface IProps {
    children: React.ReactNode;
    
}

export default function Main({ children }: IProps) {
    return (
        <Box className={styles.container}>

            <Flex className={styles.body}>
                <Login/>
                <div className={styles.content}>{children}</div>
            </Flex>
        </Box>
    );
}
