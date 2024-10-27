'use client';

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import CustomSelect from "../ui/select";
import styles from './ticket.module.css';
import Input from "@/components/input";
import dynamic from "next/dynamic";

export default function Ticket() {
    const [role, setRole] = useState('notSelect');
    const [counter, setCounter] = useState(100)
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState("<h2>Описание проблемы</h2> <ul><li></li><li></li></ul>")
    const handleRoleChange = (e) => {
        setRole(e);
    };

    const options = [
        { value: 'notSelect', label: 'Не выбрано' },
        { value: 'employer', label: 'Соискатель' },
        { value: 'employee', label: 'Работодатель' }
    ];

    const handleChangeTopic = (e) => {
        setTopic(e.target.value)
    }
    useEffect(() => {
        setCounter(100 - topic.length)
    }, [topic])
    const Editor = dynamic(() => import("../create-vacancy/editor"), { ssr: false });
    return (
        <div className="wrapper">
        <Header />
        <main>
            <span className={styles.write}>Написать письмо</span>
            <div className="container midContainer">
                <label className={styles.role} htmlFor="role">Я обращаюсь как</label>
                <CustomSelect
                    options={options}
                    value={role}
                    onChange={handleRoleChange}
                    placeholder="Не выбрано"
                />
                <div className="mtb4"></div>
                <label className={styles.role} htmlFor="role">Выберите нужную опцию </label>
                <CustomSelect
                    options={options}
                    value={role}
                    onChange={handleRoleChange}
                    placeholder="Не выбрано"
                />
                <div className="mtb4"></div>
                <Input type='text' counter={counter} label='Тема' onChange={(e) => handleChangeTopic(e)}/>
                <Editor description={description} setDescription={setDescription}/>
                <Input placeholder='Мади Ерасылович' label="Имя" type='text' onChange={(e) => handleChangeTopic(e)}/>
                <Input placeholder='example@com' label="Почта" type='text' onChange={(e) => handleChangeTopic(e)}/>
                <button className="button button-black">Продолжить</button>
            </div>
        </main>
        <Footer />
        </div>
    );
}
