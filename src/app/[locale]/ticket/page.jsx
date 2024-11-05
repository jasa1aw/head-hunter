'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useMemo } from 'react';
import CustomSelect from "../ui/select";
import styles from './ticket.module.css';
import Input from "@/components/input";
import { sendContactForm } from "@/library/send";
import { getOptions, getRoles } from "@/app/mocks/helps";
import { useTranslations } from 'next-intl';
import SuccessMessage from "../ui/succesMessage";
import { useRouter } from "@/i18n/routing";

const Header = dynamic(() => import('@/components/header'), { ssr: false });
const Footer = dynamic(() => import('@/components/footer'), { ssr: false });
const Search = dynamic(() => import('@/components/header/search'), { ssr: false });
const Editor = dynamic(() => import('../../../components/Editor'), { ssr: false });


export default function Ticket() {
    const t = useTranslations();
    const router = useRouter();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [role, setRole] = useState('notSelect');
    const [option, setOption] = useState('notSelect');
    const [counter, setCounter] = useState(100);
    const [topic, setTopic] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('<h1>Сообщения</h1> <ul><li></li><li></li></ul>');
    const [errors, setErrors] = useState({});

    const rolesOptions = useMemo(() => getRoles(t), [t]);
    const optionValues = useMemo(() => getOptions(t), [t]);

    const handleSubmit = async () => {
        setErrors({});
        const newErrors = {};

        if (!name) newErrors.name = t('ticket.nameRequired');
        if (!email) newErrors.email = t('ticket.emailRequired');
        if (role === 'notSelect') newErrors.role = t('ticket.roleRequired');
        if (option === 'notSelect') newErrors.option = t('ticket.optionRequired');
        if (!topic) newErrors.topic = t('ticket.topicRequired');
        if (!description || description.trim() === '<h1>Сообщения</h1> <ul><li></li><li></li></ul>') {
            newErrors.description = t('ticket.descriptionRequired');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const data = {
            name,
            email,
            option,
            role,
            topic,
            description,
        };

        await sendContactForm(data);
        setShowSuccessMessage(true);

        setTimeout(() => {
            setShowSuccessMessage(false);
            router.push('/');
        }, 2000);
    };

    useEffect(() => {
        setCounter(100 - topic.length);
    }, [topic]);

    return (
        <div className="wrapper">
            <Header />
            <main>
                <span className={styles.write}>{t('ticket.writeLetter')}</span>
                <div className="container midContainer">
                    <Search />
                    <label className={styles.role} htmlFor="role">{t('ticket.contactAs')}</label>
                    <CustomSelect
                        options={rolesOptions}
                        value={role}
                        onChange={setRole}
                        placeholder={t('ticket.notSelected')}
                    />
                    {errors.role && <p className="error">{errors.role}</p>}
                    <div className="mtb4"></div>
                    <label className={styles.role} htmlFor="role">{t('ticket.selectOption')}</label>
                    <CustomSelect
                        options={optionValues}
                        value={option}
                        onChange={setOption}
                        placeholder={t('ticket.notSelected')}
                    />
                    {errors.option && <p className="error">{errors.option}</p>}
                    <div className="mtb4"></div>
                    <Input
                        type='text'
                        counter={counter}
                        label={t('ticket.topic')}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                    {errors.topic && <p className="error">{errors.topic}</p>}
                    <Editor description={description} setDescription={setDescription} />
                    {errors.description && <p className="error">{errors.description}</p>}
                    <Input
                        className={styles.role}
                        placeholder={t('ticket.placeholderName')}
                        label={t('ticket.name')}
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                    <Input
                        className={styles.role}
                        placeholder={t('ticket.placeholderEmail')}
                        label={t('ticket.email')}
                        type='text'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                    <button onClick={handleSubmit} className="button button-black">{t('ticket.continue')}</button>
                </div>
            </main>
            <SuccessMessage message={t('ticket.successMessage')} showSuccessMessage={showSuccessMessage} className="successMessage" />
            <Footer />
        </div>
    );
}
