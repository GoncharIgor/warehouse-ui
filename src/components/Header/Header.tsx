import styles from './Header.module.scss';

export const Header = ({ title }: { title: string }): JSX.Element => (
    <div className={styles.header}>
        <p className={styles.logo}>{title}</p>
        <img className={styles.avatar} src="user-avatar.jpeg" alt="user-avatar" />
    </div>
);
