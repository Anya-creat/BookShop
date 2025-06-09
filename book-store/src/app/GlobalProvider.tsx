import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import SignIn from "./signin/page";
import { getUser } from "./signin/profileSlice";
import { usePathname } from "next/navigation";

const PUBLIC_PAGES = [
    '/registration',
    '/signin',
    '/success'
]


const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const email = useAppSelector(state => state.profile.email)
    const dispath = useAppDispatch()
    useEffect(() => {
        dispath(getUser())
    },[])
    const path = usePathname()

    if (!email && PUBLIC_PAGES.indexOf(path) === -1) {
        return <SignIn />
    }
    return (
        <>
            {children}
        </>
    )
}

export default GlobalProvider