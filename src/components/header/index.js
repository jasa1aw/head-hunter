'use client'
export default function Header () {
    return(
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div className="left-block">
                        <img src="/img/logo.svg" />
                        <a>Работодателям</a>
                        <a>Помощь</a>
                    </div>
                    <div className="rigth-block">
                        <button className="header-search">
                            <img src="/img/search.svg" />
                            Поиск
                        </button>
                        <button className="header-button header-button-green">
                            Создать резюме
                        </button>
                        <button className="header-button">
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}