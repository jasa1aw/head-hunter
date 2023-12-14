'use client'
import Link from 'next/link';
export default function Header () {
    return(
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div className="left-block">
                        <Link href={'/'}>
                            <img src="/img/logo.svg" />
                        </Link>
                        <Link href={'/resumes'}>Мои резюме</Link>
                        <Link href={''}>Помощь</Link>
                    </div>
                    <div className="rigth-block">
                        <button className="header-search">
                            <img src="/img/search.svg" />
                            Поиск
                        </button>
                        <Link href={'/create-resume'} className="header-button header-button-green">
                            Создать резюме
                        </Link>
                        <Link href={'/login'} className="header-button">
                            Войти
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}