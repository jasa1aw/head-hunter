'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'use-intl';
import { editResume, getMyResumeById } from '@/app/[locale]/store/slices/resumeSlice';
import { useParams } from 'next/navigation';
import axios from 'axios';

import Header from '@/components/header';
import Footer from '@/components/footer';
import Search from '@/components/header/search';
import Input from '@/components/input';
import AutoCompliteSelect from '@/components/AutoCompliteSelect';
import SelectDate from '@/components/SelectDate';
import ModalAddExp from '@/components/ModalAddExp';
import WorkingHistory from '@/components/workingHistory';
import AutoCompliteTags from '@/components/AutoCompliteTags';
import AddEducation from '@/components/AddEducation';
import AddLang from '@/components/AddLang';
import SelectEmploymentTypes from '@/components/SelectEmploymentTypes';

import { END_POINT } from '@/config/end-point';
import Head from 'next/head';

export default function EditResume() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = useParams();
    const t = useTranslations('CreateResume');
    
    const resume = useSelector(state => state.resume.resume);
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [allSkills, setSkills] = useState([]);
    const [allEmploymentTypes, setEmploymentTypes] = useState([]);
    const [modalExpIsOpen, setModalExpIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        cityId: null,
        birthday: null,
        gender: '',
        citizenship: null,
        position: '',
        salary: null,
        salary_type: 'KZT',
        skills: '',
        education: [],
        foreignLanguages: [],
        employmentTypes: [],
        about: '',
        workingHistories: [],
    });

    useEffect(() => {
        dispatch(getMyResumeById(id));
        const fetchData = async () => {
            const [citiesRes, countriesRes, skillsRes, employmentTypesRes] = await Promise.all([
                axios.get(`${END_POINT}/api/region/cities`),
                axios.get(`${END_POINT}/api/region/countries`),
                axios.get(`${END_POINT}/api/skills`),
                axios.get(`${END_POINT}/api/employment-types`),
            ]);

            setCities(citiesRes.data);
            setCountries(countriesRes.data);
            setSkills(skillsRes.data);
            setEmploymentTypes(employmentTypesRes.data);
        };
        fetchData();
    }, [id, dispatch]);

    useEffect(() => {
        if (resume.id) {
            setFormData({
                first_name: resume.first_name || '',
                last_name: resume.last_name || '',
                phone: resume.phone || '',
                cityId: resume.cityId || null,
                birthday: resume.birthday || null,
                gender: resume.gender || '',
                citizenship: resume.citizenship || null,
                position: resume.position || '',
                salary: resume.salary || null,
                salary_type: resume.salary_type || 'KZT',
                skills: resume.skills || '',
                education: resume.education || [],
                foreignLanguages: resume.foreignLanguages || [],
                employmentTypes: resume.employmentTypes?.map(et => et.id) || [],
                about: resume.about || '',
                workingHistories: resume.workingHistories || [],
            });
        }
    }, [resume]);

    const handleChange = useCallback((field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(() => {
        dispatch(editResume({ id: resume.id, ...formData }, router));
    }, [dispatch, resume.id, formData, router]);

    const handleSkillsChange = useCallback((data) => {
        handleChange('skills', data.map(item => item.name).join(','));
    }, [handleChange]);

    const handleModalClose = useCallback(() => setModalExpIsOpen(false), []);

    const addWorkingHistory = useCallback((item) => {
        handleChange('workingHistories', [...formData.workingHistories, item]);
        handleModalClose();
    }, [formData.workingHistories, handleChange, handleModalClose]);

    const removeWorkingHistory = useCallback((item) => {
        handleChange('workingHistories', formData.workingHistories.filter(history => history !== item));
    }, [formData.workingHistories, handleChange]);

    return (
        <>
            <Head>
                <title>Edit Resume - My Application</title>
                <meta name="description" content="Edit your resume with detailed information and preferences for potential employers." />
            </Head>
            <div className='wrapper'>
                <Header />
                <main>
                    <div className='container p7'>
                        <Search />
                        <h1>{t('title')}</h1>

                        <h3>{t('contact')}</h3>
                        <Input placeholder={t('name')} type='text' label={t('placeholderName')} size="fieldset-md" onChange={(e) => handleChange('first_name', e.target.value)} value={formData.first_name} />
                        <Input placeholder={t('lastName')} type='text' label={t('placeholderLastName')} size="fieldset-md" onChange={(e) => handleChange('last_name', e.target.value)} value={formData.last_name} />
                        <Input placeholder={t('placeholderPhone')} type='text' label={t('phone')} size="fieldset-md" onChange={(e) => handleChange('phone', e.target.value)} value={formData.phone} />
                        <AutoCompliteSelect placeholder={t('placeholderCity')} label={t('city')} size="fieldset-md" items={cities} onSelect={(data) => handleChange('cityId', data.id)} selected={formData.cityId} />

                        <h3>{t('information')}</h3>
                        <SelectDate t={t} size="fieldset-sm" label={t('birthdate')} onChange={(date) => handleChange('birthday', date)} value={formData.birthday} />
                        <fieldset className="fieldset fieldset-sm">
                            <label>{t('gender')}</label>
                            <div className='radio-group'>
                                {['Мужской', 'Женский'].map((g) => (
                                    <div key={g} className="radio">
                                        <input type="radio" onChange={() => handleChange('gender', g)} name="gender" id={g} value={g} checked={formData.gender === g} />
                                        <label htmlFor={g}>{t(g === 'Мужской' ? 'male' : 'female')}</label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>

                        <AutoCompliteSelect label={t('citizenship')} size="fieldset-md" items={countries} onSelect={(data) => handleChange('citizenship', data.id)} selected={formData.citizenship} />

                        <h3>{t('mainSpec')}</h3>
                        <Input placeholder="" type='text' label={t('position')} size="fieldset-lg" onChange={(e) => handleChange('position', e.target.value)} value={formData.position} />

                        <fieldset className="fieldset fieldset-lg">
                            <label>{t('salary')}</label>
                            <div className='salary'>
                                <input type="number" className='input' onChange={(e) => handleChange('salary', parseInt(e.target.value, 10))} value={formData.salary} />
                                <select className='input' onChange={(e) => handleChange('salary_type', e.target.value)} value={formData.salary_type}>
                                    {['KZT', 'USD', 'RUB'].map((type) => <option key={type} value={type}>{t(`currency.${type}`)}</option>)}
                                </select>
                                {t('hands')}
                            </div>
                        </fieldset>

                        <h3>{t('workExperience')}</h3>
                        {modalExpIsOpen && <ModalAddExp t={t} close={handleModalClose} addWorkingHistory={addWorkingHistory} />}
                        <fieldset className="fieldset fieldset-lg">
                            <label>{t('place')}</label>
                            <div className='exp'>
                                {formData.workingHistories.map((item, index) => (
                                    <WorkingHistory key={index} t={t} workingHistory={item} remove={() => removeWorkingHistory(item)} />
                                ))}
                                <button className='button button-primary-bordered' onClick={() => setModalExpIsOpen(true)}>{t('addPlace')}</button>
                            </div>
                        </fieldset>

                        <fieldset className="fieldset fieldset-lg">
                            <label>{t('about')}</label>
                            <textarea className='textarea' placeholder={t('tellYou')} onChange={(e) => handleChange('about', e.target.value)} value={formData.about}></textarea>
                        </fieldset>

                        <AutoCompliteTags
                            label={t("skills")}
                            placeholder="Enter a skill"
                            items={allSkills}
                            onSelect={handleChange}
                            selected={formData.skills.split(",")}
                        />

                        <AddEducation
                            t={t}
                            education={formData.education}
                            onChange={handleChange}
                        />

                        <AddLang
                            foreignLanguages={formData.foreignLanguages}
                            onChange={handleChange}
                        />

                        <SelectEmploymentTypes
                            label={t("employmentTypes")}
                            size="fieldset-md"
                            allEmploymentTypes={allEmploymentTypes}
                            employmentTypes={formData.employmentTypes}
                            onChange={handleChange}
                        />
                        <div className='container-fluid'>
                            <button className='button button-primary' onClick={handleSave}>{t('save')}</button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
