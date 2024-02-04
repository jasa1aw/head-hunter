'use client'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, setError} from '@/app/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function EmployerSignUp() {
    const dispatch = useDispatch();
    const router = useRouter()
    const error = useSelector((state) => state.auth.error)

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('');
    const [first_name, setName] = useState('');
    const [last_name, setSurname] = useState('');
    const [company_name, setCompanyName] = useState('');
    const [company_description, setCompanyDesc] = useState('');
    const [company_address, setCompanyAdr] = useState('');
    const [company_logo, setCompanyLogo] = useState();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const onLogoChange = (e) =>{
        setCompanyLogo(e.target.files[0]);
    }

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
        }, router))
    }

    useEffect(() => {
        return () =>{
            dispatch(setError(null))
        }
    }, [])
    return (
        <main className='bg'>
            <div className="container">
                <div className='auth-header'>
                    <img src="/img/logo.svg" />
                    <p>
                        Зарегистрируйтесь сейчас,
                        чтобы купить доступ к базе резюме или
                        публикацию вакансий по выгодным ценам — все
                        акции уже ждут вас в разделе
                        «Спецпредложения».
                    </p>
                    <p>
                        Ответим на ваши вопросы
                    </p>
                    <a href='tel:77272321313'>+7 727 232 13 13</a>
                </div>
                <section className="login-page">
                    {/* {isAuth ? 'True' : 'False'} */}
                    {step === 1 && <div className="card">
                        <h1>Регистрация для поиска сотрудников</h1>
                        <p>В завершении на почту придёт пароль</p>
                        <form>
                            <input className="input" placeholder="Электронная почта или телефон" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <button type='button' className="button button-primary" onClick={()=> setStep(2)}>Продолжить</button>
                        </form>
                        {error && Object.keys(error).map((key, index) => (<p key={index} className='error'>{error[key]}</p>))}
                    </div>}
                    {step === 2 && <div className="card">
                        <div className="card-header flex flex-jc-sb">
                            <button className='button button-link link' onClick={()=> setStep(1)}>Назад</button>
                            <span>Шаг 1 из 3</span>
                        </div>
                        <h1>Как вас зовут</h1>
                        <form>
                            <input className="input" placeholder="Имя" value={first_name} onChange={(e) => setName(e.target.value)}/>
                            <input className="input" placeholder="Фамилия" value={last_name} onChange={(e) => setSurname(e.target.value)}/>
                            <button type='button' className="button button-primary" onClick={()=> setStep(3)}>Продолжить</button>
                        </form>
                        {error && Object.keys(error).map((key, index) => (<p key={index} className='error'>{error[key]}</p>))}
                    </div>}
                    {step === 3 && <div className="card">
                        <div className="card-header flex flex-jc-sb">
                            <button className='button button-link link' onClick={()=> setStep(2)}>Назад</button>
                            <span>Шаг 2 из 3</span>
                        </div>
                        <h1>Введите название комапании</h1>
                        <form>
                            <input className="input" placeholder="Название компании" value={company_name} onChange={(e) => setCompanyName(e.target.value)}/>
                            <textarea className="textarea" placeholder="Описание" value={company_description} onChange={(e) => setCompanyDesc(e.target.value)}></textarea>
                            <input className="input" placeholder="Адресс" value={company_address} onChange={(e) => setCompanyAdr(e.target.value)}/>
                            <input type='file' className="input" placeholder="Логотип" onChange={onLogoChange}/>
                            <button type='button' className="button button-primary" onClick={()=> setStep(4)}>Продолжить</button>
                        </form>
                        {error && Object.keys(error).map((key, index) => (<p key={index} className='error'>{error[key]}</p>))}
                    </div>}
                    {step === 4 && <div className="card">
                        <div className="card-header flex flex-jc-sb">
                            <button className='button button-link link' onClick={()=> setStep(3)}>Назад</button>
                            <span>Шаг 3 из 3</span>
                        </div>
                        <h1>Введите пароль</h1>
                        <form>
                            <input type='password' className="input" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <input type='password' className="input" placeholder="Повторите пароль" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                            <button type='button' className="button button-primary" onClick={handleSignUp}>Регистрировать</button>
                        </form>
                        {error && Object.keys(error).map((key, index) => (<p key={index} className='error'>{error[key]}</p>))}
                    </div>}
                </section>
            </div>
        </main>
    )
}
