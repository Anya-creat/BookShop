
import { CartIcon, FavoritesIcon, ProfileIcon, TitleIcon } from "@/app/svg/svg";
import styles from "./styles.module.css"
import Search from "@/app/features/search/components/Search";



const Header: React.FC = () => {

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                    <TitleIcon/>
                    <Search/>
                    <nav className={styles.header_nav}>
                        <a className={styles.header_icon}><FavoritesIcon/></a>
                        <a className={styles.header_icon}><CartIcon/></a>
                        <a className={styles.header_icon}><ProfileIcon/></a>
                    </nav>
                </div>
        </header>
    );
};

export default Header;