'use client';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector} from 'react-redux';
import {authorize, sendVerificationEmail, VerifyCode} from '@/app/store/slices/authSlice';

export default function UserLogin () {
    const router = useRouter()
    const isAuth = useSelector((state) => state.auth.isAuth)
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState()
    const [time, setTime] = useState(119);


    const sendVerifyEmail = () => {
        dispatch(sendVerificationEmail(email));
        setStep(2);
    }

    useEffect(() => {
        let interval;
        if(step === 2){
            interval = setInterval(() => {
                if(time !== 0) setTime(time => time - 1)
            }, 1000);
        }else if(interval){
            clearInterval(interval)
        }
    }, [step])

    const min = parseInt(time / 60);
    const sec = time % 60;

    const verifyCodeFunc = () => {
        dispatch(VerifyCode(email, code));
    }

    useEffect(() => {
        if(isAuth) router.push("/resumes")
    },[isAuth])


    return(
        <section className="login-page">
            {/* {isAuth ? 'True' : 'False'} */}
            {step == 1 && <div className="card">
                <h1>Поиск работы</h1>
                <form>
                    <input className="input" placeholder="Электронная почта или телефон" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <button className="button button-primary" onClick={sendVerifyEmail}>Продолжить</button>
                </form>
            </div>}
            {step == 1 &&<div className="card">
                <h1>Поиск сотрудников</h1>
                <p>Размещение вакансий и доступ к базе резюме</p>
                <button className="button button-primary-bordered">Я ищу сотрудников</button>
            </div>}
            {step == 2 && <div className="card">
                <h1>Отправили код на {email}</h1>
                <p>
                    Напишите его, чтобы подтвердить, что это вы, а не кто-то другой входить в личный кабинет 
                </p>
                <form>
                    <input className="input" placeholder="Введите код" value={code} onChange={(e) => setCode(e.target.value)}/>
                    <p>Повторить можно через {min}:{sec}</p>
                    <button className="button button-primary" type='button' onClick={verifyCodeFunc}>Подтвердить</button>
                    <button className="button button-primary-bordered"  onClick={()=> setStep(1)}>Назад</button>
                </form>
            </div>}
        </section>
    )
}