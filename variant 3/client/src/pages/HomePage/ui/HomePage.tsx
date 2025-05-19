import { useLayoutEffect } from "react";
import styles from './HomePage.module.css';

export function HomePage(): React.JSX.Element {
    useLayoutEffect(() => {
        document.title = "React App: Home Page";
    }, []);

    return (
        <div className={styles.homePage}>
            <section className={styles.hero}>
                <h1 className={styles.title}>Welcome to Task Manager</h1>
                <p className={styles.subtitle}>
                    Manage your tasks efficiently and easily. Organize your work,
                    track progress and achieve goals together with us.
                </p>
            </section>

            <div className={styles.features}>
                <div className={styles.featureCard}>
                    <h2 className={styles.featureTitle}>Easy management</h2>
                    <p className={styles.featureDescription}>
                        Create, edit and delete tasks with one click.
                        Customize priorities and deadlines.
                    </p>
                </div>

                <div className={styles.featureCard}>
                    <h2 className={styles.featureTitle}>Progress tracking</h2>
                    <p className={styles.featureDescription}>
                        Visualize your progress using intuitive graphs and statistics.
                    </p>
                </div>

                <div className={styles.featureCard}>
                    <h2 className={styles.featureTitle}>Team work</h2>
                    <p className={styles.featureDescription}>
                        Work together with colleagues, share tasks and
                        coordinate work in real time.
                    </p>
                </div>
            </div>
        </div>
    );
}