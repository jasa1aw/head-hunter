'use client'
import Link from 'next/link'
export default function Footer() {
    return(
        <footer className="header footer">
            <div className="container">
                <div className="header-inner">
                    <div className="left-block footer-left">
                        <span>© 2024 RECRUV.KZ</span>
                        <div className='help'>
                            <Link href={''}>Помощь</Link>
                            <Link href={''}>Документация</Link>
                            <Link href={''}>Приложения</Link>
                            <Link href={''}>Согласия</Link>
                        </div>
                        <div className='help'>
                            <Link href={''}>Руский</Link>
                            <Link href={''}>Казахский</Link>
                            <Link href={''}>Английский</Link>
                        </div>
                    </div>
                    <div className="footer-right">
                        <div>
                            <img src="/img/facebook.png" alt="" />
                        </div>
                        <div>
                            <img src="/img/instagram.png" alt="" />
                        </div>
                        <div>
                            <img src="/img/vk.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}