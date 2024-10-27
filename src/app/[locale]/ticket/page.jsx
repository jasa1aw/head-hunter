'use client';

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import CustomSelect from "../ui/select";
import styles from './ticket.module.css';
import Input from "@/components/input";
import { sendContactForm } from "@/library/send";
import Editor from "../create-vacancy/editor";
import { getOptions, getRoles } from "@/app/mocks/helps";
import Search from "@/components/header/search";
import { useTranslations } from 'next-intl';

export default function Ticket() {
    const t = useTranslations();
    const [role, setRole] = useState('notSelect');
    const [option, setOption] = useState('notSelect');
    const [counter, setCounter] = useState(100);
    const [topic, setTopic] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('<h1>Сообщения</h1> <ul><li></li><li></li></ul>');

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

    useEffect(() => { setCounter(100 - topic.length) }, [topic]);

    return (
        <div className="wrapper">
            <Header />
            <main>
                <span className={styles.write}>{t('ticket.writeLetter')}</span>
                <div className="container midContainer">
                    <Search />
                    <label className={styles.role} htmlFor="role">{t('ticket.contactAs')}</label>
                    <CustomSelect
                        options={getRoles(t)}
                        value={role}
                        onChange={setRole}
                        placeholder={t('ticket.notSelected')}
                    />
                    <div className="mtb4"></div>
                    <label className={styles.role} htmlFor="role">{t('ticket.selectOption')}</label>
                    <CustomSelect
                        options={getOptions(t)}
                        value={option}
                        onChange={setOption}
                        placeholder={t('ticket.notSelected')}
                    />
                    <div className="mtb4"></div>
                    <Input type='text' counter={counter} label={t('ticket.topic')} onChange={(e) => setTopic(e.target.value)} />
                    <Editor description={description} setDescription={setDescription} />
                    <Input placeholder={t('ticket.placeholderName')} label={t('ticket.name')} type='text' onChange={(e) => setName(e.target.value)} />
                    <Input placeholder={t('ticket.placeholderEmail')} label={t('ticket.email')} type='text' onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={handleSubmit} className="button button-black">{t('ticket.continue')}</button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
