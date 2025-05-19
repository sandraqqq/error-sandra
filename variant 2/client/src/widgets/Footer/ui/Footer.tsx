import styles from './Footer.module.css';

export function Footer(): React.JSX.Element {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.copyright}>
                    © {currentYear} Your Company Name. All rights reserved.
                </div>
                <div className={styles.socialLinks}>
                    <a
                        href="https://github.com/Elbrus-Bootcamp/arctic-foxes-online-2025"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}