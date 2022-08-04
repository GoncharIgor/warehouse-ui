import styles from './Header.module.scss';
import logoSrc from '../../assets/logo.png';
import userAvatarSrc from '../../assets/user-avatar.jpeg';

export const Header = ({ title }: { title: string }): JSX.Element => (
    <div className={styles.header}>
        <div className={styles.logo}>
            <img src={logoSrc} alt="logo"/>
            {title}
        </div>

        <img className={styles.avatar} src={userAvatarSrc} alt="user-avatar" />
    </div>
);
