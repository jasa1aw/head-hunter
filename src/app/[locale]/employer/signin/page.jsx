'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, setError } from '@/app/[locale]/store/slices/authSlice';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Search from '@/components/header/search';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function EmployerSignIn() {
    const t = useTranslations('EmployerSignIn');
    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        dispatch(signIn({ email, password }, router));
    };

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    return (
        <div className="wrapper">
            <Header />
            <main>
                <div className="container">
                    <Search />
                    <section className="login-page">
                        <div className="card">
                            <h1>{t('employerTitle')}</h1>
                            <form>
                                <input
                                    className="input"
                                    placeholder={t('emailPlaceholder')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    className="input"
                                    placeholder={t('passwordPlaceholder')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="button button-primary"
                                    onClick={handleSignIn}
                                >
                                    {t('signInButton')}
                                </button>
                            </form>
                            <div className="flex flex-jc-sb mtb4">
                                <Link className="link" href="/employer/signup">Регистрация для поиска сотрудников</Link>
                            </div>
                            {error && Object.keys(error).map((key, index) => (
                                <p key={index} className="error">{error[key]}</p>
                            ))}
                        </div>
                        <div className="card">
                            <h1>{t('jobSearchTitle')}</h1>
                            <p>{t('jobSearchDescription')}</p>
                            <Link href={'/login'} className="button button-primary-bordered">{t('jobSearchButton')}</Link>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
