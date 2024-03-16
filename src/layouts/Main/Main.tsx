// components
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// styles
import styles from "./Main.module.css";

// radix-ui
import { Box, Flex } from "@radix-ui/themes";

interface IProps {
    children: React.ReactNode;
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
