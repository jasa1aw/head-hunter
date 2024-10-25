'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, setError} from '@/app/[locale]/store/slices/authSlice';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function EmployerSignUp() {
    const dispatch = useDispatch();
    const router = useRouter();
    const t = useTranslations('EmployerSignUp');
    const error = useSelector((state) => state.auth.error);

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [first_name, setName] = useState('');
    const [last_name, setSurname] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [company_description, setCompanyDesc] = useState('');
    const [company_address, setCompanyAdr] = useState('');
    const [company_logo, setCompanyLogo] = useState();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const onLogoChange = (e) => {
        setCompanyLogo(e.target.files[0]);
    };

    const handleSignUp = () => {
        dispatch(signUp({
            email,
            full_name: `${first_name} ${last_name}`,
            company_name,
            company_description,
            company_address,
            company_logo,
            password,
            password2,
        }, router));
    };

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, []);

    return (
        <main className='bg'>
            <div className="container">
                <div className='auth-header'>
                    <img src="/img/logo.svg" alt="Logo" />
                    <p>{t('registerPrompt')}</p>
                    <p>{t('contactSupport')}</p>
                    <a href='tel:77272321313'>{t('supportPhone')}</a>
                </div>
                <section className="login-page">
                    {step === 1 && (
                        <div className="card">
                            <h1>{t('registrationTitle')}</h1>
                            <p>{t('passwordEmailPrompt')}</p>
                            <form>
                                <input className="input" placeholder={t('emailOrPhonePlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} />
                                <button type='button' className="button button-primary" onClick={() => setStep(2)}>{t('continueButton')}</button>
                            </form>
                            {error && Object.keys(error).map((key, index) => (<p key={index} className='error'>{error[key]}</p>))}
                        </div>
                    )}
                    {step === 2 && (
                        <div className="card">
                            <div className="card-header flex flex-jc-sb">
                                <button className='button button-link link' onClick={() => setStep(1)}>{t('backButton')}</button>
                                <span>{t('step1of3')}</span>
                            </div>
                            <h1>{t('nameTitle')}</h1>
                            <form>
                                <input className="input" placeholder={t('firstNamePlaceholder')} value={first_name} onChange={(e) => setName(e.target.value)} />
                                <input className="input" placeholder={t('lastNamePlaceholder')} value={last_name} onChange={(e) => setSurname(e.target.value)} />
                                <button type='button' className="button button-primary" onClick={() => setStep(3)}>{t('continueButton')}</button>
                            </form>
                            {error && Object.keys(error).map((key, index) => (<p key={index} className='error'>{error[key]}</p>))}
                        </div>
                    )}
                    {step === 3 && (
                        <div className="card">
                            <div className="card-header flex flex-jc-sb">
                                <button className='button button-link link' onClick={() => setStep(2)}>{t('backButton')}</button>
                                <span>{t('step2of3')}</span>
                            </div>
                            <h1>{t('companyTitle')}</h1>
                            <form>
                                <input className="input" placeholder={t('companyNamePlaceholder')} value={company_name} onChange={(e) => setCompanyName(e.target.value)} />
                                <textarea className="textarea" placeholder={t('companyDescPlaceholder')} value={company_description} onChange={(e) => setCompanyDesc(e.target.value)} />
                                <input className="input" placeholder={t('companyAddressPlaceholder')} value={company_address} onChange={(e) => setCompanyAdr(e.target.value)} />
                                <input type='file' className="input" placeholder={t('companyLogoPlaceholder')} onChange={onLogoChange} />
                                <button type='button' className="button button-primary" onClick={() => setStep(4)}>{t('continueButton')}</button>
                            </form>
                            {error && Object.keys(error).map((key, index) => (<p key={index} className='error'>{error[key]}</p>))}
                        </div>
                    )}
                    {step === 4 && (
                        <div className="card">
                            <div className="card-header flex flex-jc-sb">
                                <button className='button button-link link' onClick={() => setStep(3)}>{t('backButton')}</button>
                                <span>{t('step3of3')}</span>
                            </div>
                            <h1>{t('passwordTitle')}</h1>
                            <form>
                                <input type='password' className="input" placeholder={t('enterPasswordPlaceholder')} value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type='password' className="input" placeholder={t('repeatPasswordPlaceholder')} value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                <button type='button' className="button button-primary" onClick={handleSignUp}>{t('registerButton')}</button>
                            </form>
                            {error && Object.keys(error).map((key, index) => (<p key={index} className='error'>{error[key]}</p>))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
