"use client";
// styles
import styles from "./Header.module.css";

import Link from "next/link";
import { Button } from "@radix-ui/themes";
// widgets
import { Avatar, Flex, IconButton, Text } from "@radix-ui/themes";

// icons
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { ThemeMode, useThemeStore } from "@/context/ThemeState";

export default function Header() {
    const { theme, toggleTheme } = useThemeStore();
    const renderThemeIcon = () => {
        if (theme === ThemeMode.LIGHT) {
            return <SunIcon />;
        }
        return <MoonIcon />
    }
    return (
        <header className={styles.container}>
            <Text as="p">
                ZeStream
            </Text>
            <Button>
        <Link href="/login">
            Login
            </Link>
            </Button>

            <Flex gap="3">
                <IconButton onClick={toggleTheme}>
                    {renderThemeIcon()}
                </IconButton>
                <Avatar size="2" fallback="AR" />
            </Flex>
        </header>
    )
}