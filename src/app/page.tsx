// styles
import styles from './page.module.css';
import '@radix-ui/themes/styles.css';

// components
import Main from '@/layouts/Main/Main';
import { Theme } from '@radix-ui/themes';

export default function Home() {
    return (
        <Theme appearance="dark">
            <main className={styles.main}>
                <Main>
                    <h1>Hello</h1>
                </Main>
            </main>
        </Theme>
    );
}
