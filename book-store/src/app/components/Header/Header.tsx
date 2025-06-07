'use client'

import { CartIcon, FavoritesIcon, ProfileIcon, TitleIcon } from "@/app/svg/svg";
import styles from "./styles.module.css"
import Search from "@/app/features/search/components/Search";
import Link from "next/link";



const Header: React.FC = () => {

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                    <TitleIcon/>
                    <Search/>
                    <nav className={styles.header_nav}>
                        <Link href="features/favorites" className={styles.header_icon}><FavoritesIcon/></Link>
                        <Link href="features/cart" className={styles.header_icon}><CartIcon/></Link>
                        <a className={styles.header_icon}><ProfileIcon/></a>
                    </nav>
                </div>
        </header>
    );
};

export default Header;