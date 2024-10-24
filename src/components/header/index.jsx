'use client'
import { jwtDecode } from "jwt-decode";
import {useSelector, useDispatch} from 'react-redux'
import Link from 'next/link'
import { logOut, authorize } from '@/app/store/slices/authSlice'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { setSearchResumes } from "@/app/store/slices/resumeSlice";
export default function Header() {

    const router = useRouter()
    const isAuth = useSelector((state) => state.auth.isAuth)
    const currentUser = useSelector((state) => state.auth.currentUser)

    const dispatch = useDispatch()
    useEffect(() => {
        
        const token = localStorage.getItem("token")
        if(token){
            let decodedToken = jwtDecode(token)
            if(decodedToken.exp * 1000 > Date.now()){
                dispatch(authorize({token}))
            }else{
                localStorage.removeItem("token")
            }

        }
        
    },[])
    

    return(
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div className="left-block">
                        <Link href={'/'}>
                            <img src="/img/logo.svg" />
                        </Link>
                        {currentUser && currentUser.role && currentUser.role.name !== 'manager' && <Link href={'/resumes'}>Мои резюме</Link>}
                        {currentUser && currentUser.role && currentUser.role.name !== 'manager' && <Link href={'/applies'}>Отклики</Link>}
                        {currentUser && currentUser.role && currentUser.role.name === 'manager' && <Link href={'/vacancy'}>Мои вакансии</Link>}
                        <Link href={''}>Помощь</Link>
                    </div>
                    <div className="rigth-block">
                        <span onClick={() => dispatch(setSearchResumes())} className="header-search">
                            <img src="/img/search.svg" />
                            Поиск
                        </span>
                        {currentUser && currentUser.role && currentUser.role.name !== 'manager' && <Link href={'/create-resume'} className="header-button header-button-green">Создать резюме</Link>}
                        {currentUser && currentUser.role && currentUser.role.name === 'manager' && <Link href={'/create-vacancy'} className="header-button header-button-green">Создать вакансию</Link>}
                        {!isAuth && <Link href={'/login'} className="header-button">
                            Войти
                        </Link>}
                        {isAuth && <a className="header-button" onClick={() => dispatch(logOut(router))}>
                            Выйти
                        </a>}
                    </div>
                </div>
            </div>
        </header>
    )
}