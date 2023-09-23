// styles
import styles from "./Header.module.css"

// widgets
import { Avatar, Text } from "@radix-ui/themes"

export default function Header() {
    return (
        <header className={styles.container}>
            <Text as="p">
                ZeStream
            </Text>

            <Avatar size="2" fallback="AR" />
        </header>
    )
}
