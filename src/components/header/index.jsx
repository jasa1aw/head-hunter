'use client'
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux';
import { logOut } from '@/app/store/slices/authSlice';
export default function Header () {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const currentUser = useSelector((state) => state.auth.currentUser)
    const dispatch = useDispatch()

    return(
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div className="left-block">
                        <Link href={'/'}>
                            <img src="/img/logo.svg" />
                        </Link>
                        {currentUser && currentUser.role && currentUser.role.name !== 'manager' && <Link href={'/resumes'}>Мои вакансии</Link>}
                        {currentUser && currentUser.role && currentUser.role.name === 'manager' && <Link href={'/vacancy'}>Мои резюме</Link>}
                        <Link href={''}>Помощь</Link>
                    </div>
                    <div className="rigth-block">
                        <button className="header-search">
                            <img src="/img/search.svg" />
                            Поиск
                        </button>
                        {currentUser && currentUser.role && currentUser.role.name !== 'manager' && <Link href={'/create-resume'} className="header-button header-button-green">Создать резюме</Link>}
                        {currentUser && currentUser.role && currentUser.role.name === 'manager' && <Link href={'/create-vacancy'} className="header-button header-button-green">Создать вакансию</Link>}
                        {!isAuth && <Link href={'/login'} className="header-button">
                            Войти
                        </Link>}
                        {isAuth && <a className="header-button" onClick={() => dispatch(logOut())}>
                            Выйти
                        </a>}
                    </div>
                </div>
            </div>
        </header>
    )
}