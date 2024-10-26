'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authorize, sendVerificationEmail, VerifyCode } from '@/app/[locale]/store/slices/authSlice';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function UserLogin() {
    const t = useTranslations('UserLogin');
    const router = useRouter();
    const isAuth = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState();
    const [time, setTime] = useState(119);

    const sendVerifyEmail = () => {
        dispatch(sendVerificationEmail(email));
        setStep(2);
    }

    useEffect(() => {
        let interval;
        if (step === 2) {
            interval = setInterval(() => {
                if (time !== 0) setTime(time => time - 1);
            }, 1000);
        } else if (interval) {
            clearInterval(interval);
        }
        return () => clearInterval(interval); // Cleanup on unmount
    }, [step]);

    const min = parseInt(time / 60);
    const sec = time % 60;

    const verifyCodeFunc = () => {
        dispatch(VerifyCode(email, code));
    }

    useEffect(() => {
        if (isAuth) router.push("/resumes");
    }, [isAuth]);

    return (
        <section className="login-page">
            {step === 1 && (
                <div className="card">
                    <h1>{t('jobSearchTitle')}</h1>
                    <form>
                        <input 
                            className="input" 
                            placeholder={t('emailOrPhone')} 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                        <button className="button button-primary" onClick={sendVerifyEmail}>{t('continue')}</button>
                    </form>
                </div>
            )}
            {step === 1 && (
                <div className="card">
                    <h1>{t('employerSearchTitle')}</h1>
                    <p>{t('employerSearchDescription')}</p>
                    <Link href={`/employer/signin`} className="button button-primary-bordered">{t('employerButton')}</Link>
                </div>
            )}
            {step === 2 && (
                <div className="card">
                    <h1 className='codeSentTitle'>{t('codeSentTitle')} <span>{ email }</span></h1>
                    <p>{t('codeConfirmationMessage')}</p>
                    <form>
                        <input 
                            className="input" 
                            placeholder={t('enterCode')} 
                            value={code} 
                            onChange={(e) => setCode(e.target.value)} 
                            required 
                        />
                        <p>{t('repeatAfter')} {min}:{sec}</p>
                        <button className="button button-primary" type='button' onClick={verifyCodeFunc}>{t('confirm')}</button>
                        <button className="button button-primary-bordered" type='button' onClick={() => setStep(1)}>{t('back')}</button>
                    </form>
                </div>
            )}
        </section>
    );
}
