'use client';

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import CustomSelect from "../ui/select";
import styles from './ticket.module.css';
import Input from "@/components/input";
import { sendContactForm } from "@/library/send";
import Editor from "../create-vacancy/editor";

export default function Ticket() {
    const [role, setRole] = useState('notSelect');
    const [option, setOption] = useState('notSelect');
    const [counter, setCounter] = useState(100)
    const [topic, setTopic] = useState('')
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("<h1>Сообщения</h1> <ul><li></li><li></li></ul>")

    const roles = [
        { value: 'notSelect', label: 'Не выбрано' },
        { value: 'employer', label: 'Соискатель' },
        { value: 'employee', label: 'Работодатель' }
    ];

    
    const options = [
        { value: 'notSelect', label: 'Не выбрано' },
        { value: 'question', label: 'Задать вопрос/рассказать о проблеме' },
        { value: 'support', label: 'Оформить жалобу' },
        { value: 'thanks', label: 'Выразить благодарность' }
    ];

    const handleSubmit = async () => {
        const data = {
            name,
            email,
            option,
            role,
            topic,
            description,
        };
        console.log(data);
        await sendContactForm(data);
    };
    

    useEffect(() => {
        setCounter(100 - topic.length)
    }, [topic])
    console.log(description)
    return (
        <div className="wrapper">
        <Header />
        <main>
            <span className={styles.write}>Написать письмо</span>
            <div className="container midContainer">
                <label className={styles.role} htmlFor="role">Я обращаюсь как</label>
                <CustomSelect
                    options={roles}
                    value={role}
                    onChange={setRole}
                    placeholder="Не выбрано"
                />
                <div className="mtb4"></div>
                <label className={styles.role} htmlFor="role">Выберите нужную опцию </label>
                <CustomSelect
                    options={options}
                    value={option}
                    onChange={setOption}
                    placeholder="Не выбрано"
                />
                <div className="mtb4"></div>
                <Input type='text' counter={counter} label='Тема' onChange={(e) => setTopic(e.target.value)}/>
                <Editor description={description} setDescription={setDescription}/>
                <Input placeholder='Мади Ерасылович' label="Имя" type='text' onChange={(e) => setName(e.target.value)}/>
                <Input placeholder='example@com' label="Почта" type='text' onChange={(e) => setEmail(e.target.value)}/>
                <button onClick={handleSubmit} className="button button-black">Продолжить</button>
            </div>
        </main>
        <Footer />
        </div>
    );
}
