'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, setError} from '@/app/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Search from '@/components/header/search';

export default function EmployerSignIn() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error)
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        dispatch(signIn({
            email,
            password
        }, router))
    }

    useEffect(() => {
        return () =>{
            dispatch(setError(null))
        }
    }, []);

    return (
        <div className='wrapper'>
            <Header/>
            <main>
            <div className="container">
            <Search/>
                <section className="login-page">
                    <div className="card">
                        <h1>Поиск сотрудников</h1>
                        <form>
                            <input className="input" placeholder="Электронная почта" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type='password' className="input" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type='button' className="button button-primary" onClick={handleSignIn}>Войти в личный кабинет</button>
                        </form>
                        {error && Object.keys(error).map((key, index) => (<p key={index} className='error'>{error[key]}</p>))}
                    </div>
                    <div className="card">
                        <h1>Поиск работы</h1>
                        <p>Публикация резюме и поиск по вакансиям</p>
                        <button className="button button-primary-bordered">Я ищу работу</button>
                    </div>
                </section>
            </div>
        </main>
        <Footer/>
        </div>
    )
}
