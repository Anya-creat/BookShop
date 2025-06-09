'use client'

import { CartIcon, FavoritesIcon, ProfileIcon, SvgLogout, TitleIcon } from "@/app/svg/svg";
import styles from "./styles.module.css"
import Search from "@/app/features/search/components/Search";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/app/signin/profileSlice";



const Header: React.FC = () => {
    const profileEmail = useAppSelector(state=> state.profile.email)
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                    <TitleIcon/>
                    <Search/>
                    <nav className={styles.header_nav}>
                        <Link href="/favorites" className={styles.header_icon}><FavoritesIcon/></Link>
                        <Link href="/cart" className={styles.header_icon}><CartIcon/></Link>
                        { profileEmail ? <button className={styles.header_icon} onClick={handleLogout}><SvgLogout/></button>:
                        <Link href="/signin" className={styles.header_icon}><ProfileIcon/></Link>}
                    </nav>
                </div>
        </header>
    );
};

export default Header;