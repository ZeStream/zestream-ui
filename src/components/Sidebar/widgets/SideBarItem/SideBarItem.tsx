'use client';

// libs
import { classNames } from '@/lib/classNames';

// components
import NextLink from 'next/link';

// styles
import styles from './SideBarItem.module.css';
import { usePathname } from 'next/navigation';

interface SideBarItemProps {
    children: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    href: string;
    className?: string;
}

const SideBarItem = ({ disabled, href, ...props }: SideBarItemProps) => {
    const pathname = usePathname();
    const active = `/${href}` === pathname;

    const className = classNames(styles.container, active && styles.active);
    const isExternal = href.startsWith('http');

    if (disabled) {
        return <span className={className} {...props} />;
    }

    if (isExternal) {
        return (
            <a
                className={className}
                href={href}
                target="_blank"
                rel="noopener"
                {...props}
            />
        );
    }

    return (
        <NextLink passHref legacyBehavior href={`/${href}`}>
            <a className={className} {...props} />
        </NextLink>
    );
};

export default SideBarItem;
