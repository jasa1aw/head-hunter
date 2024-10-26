'use client'
import { jwtDecode } from "jwt-decode";
import {useSelector, useDispatch} from 'react-redux'
import { Link, useRouter } from "@/i18n/routing";
import { logOut, authorize } from '@/app/[locale]/store/slices/authSlice'
import { useEffect } from 'react'
import { setSearchResumes } from "@/app/[locale]/store/slices/resumeSlice";
import { useTranslations } from "next-intl";
export default function Header({bgColor, textColor}) {
    const t = useTranslations('Header')
    const router = useRouter()
    const isAuth = useSelector((state) => state.auth.isAuth)
    const currentUser = useSelector((state) => state.auth.currentUser)
    console.log(t)
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
        <header className="header" style={{background: `${bgColor}`, color: `${textColor}`}}>
            <div className="container">
                <div className="header-inner">
                    <div className="left-block">
                        <Link href={'/'}>
                            <img src="/img/logo.svg" />
                        </Link>
                        {currentUser && currentUser?.role?.name !== 'manager' && <Link href={'/resumes'} style={{color: `${textColor}`}}>{t('resumes')}</Link>}
                        {currentUser && currentUser?.role?.name !== 'manager' && <Link href={'/applies'} style={{color: `${textColor}`}}>{t('applies')}</Link>}
                        {currentUser && currentUser?.role?.name === 'manager' && <Link href={'/vacancy'} style={{color: `${textColor}`}}>{t('vacancy')}</Link>}
                        <Link href={''} style={{color: `${textColor}`}}>{t('help')}</Link>
                    </div>
                    <div className="rigth-block">
                        {currentUser && <span onClick={() => dispatch(setSearchResumes())} className="header-search">
                            <img src="/img/search.svg" />
                            {t('search')}
                        </span>}
                        {currentUser && currentUser?.role?.name !== 'manager' && <Link href={'/create-resume'} className="header-button header-button-green">{t('createResume')}</Link>}
                        {currentUser && currentUser?.role?.name === 'manager' && <Link href={'/create-vacancy'} className="header-button header-button-green">{t('createVacancy')}</Link>}
                        {!isAuth && <Link href={'/login'} className="header-button">
                            {t('login')}
                        </Link>}
                        {isAuth && <a className="header-button" onClick={() => dispatch(logOut(router))} style={{color: `${textColor}`}}>
                            {t('logout')}
                        </a>}
                    </div>
                </div>
            </div>
        </header>
    )
}