"use client";
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyVacancyById } from '@/app/[locale]/store/slices/vacancySlice';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getMyResumes } from '@/app/[locale]/store/slices/resumeSlice';
import { createApply, getEmployeeApplies, getVacancyApplies } from '@/app/[locale]/store/slices/applySlice';
import Footer from '@/components/footer';
import { useTranslations } from 'next-intl';
import { buttonBaseClasses } from '@mui/material';
import { formatDate } from '../../utils/dateToLocale';

export default function VacancyPage() {
    const t = useTranslations('VacancyPage');
    const dispatch = useDispatch();
    const { id } = useParams();
    const vacancy = useSelector(state => state.vacancy.vacancy);
    const resumes = useSelector(state => state.resume.resumes);
    const currentUser = useSelector(state => state.auth.currentUser);
    const applies = useSelector(state => state.apply.applies);

    const [resumeId, setResume] = useState();

    useEffect(() => {
        dispatch(getMyVacancyById(id));
    }, []);

    useEffect(() => {
        if (currentUser && currentUser.role.name === "employee") {
            dispatch(getMyResumes());
            dispatch(getEmployeeApplies());
        } else if (currentUser) {
            dispatch(getVacancyApplies(id));
        }
    }, [currentUser]);

    useEffect(() => {
        if (resumes[0]) {
            setResume(resumes[0].id);
        }
    }, [resumes]);

    const handleApply = () => {
        dispatch(createApply({
            resumeId,
            vacancyId: id
        }));
    };

    const handleDelete = () => {
        console.log("Delete vacancy:", id);
    };

    let isApplied = applies.some(item => item.vacancyId === Number(id));
    let skills = [];
    if (vacancy.skills) skills = vacancy.skills.split(",");

    console.log(vacancy)
    return (
        <div className='wrapper'>
            <Header />
            <main>
                <div className='container'>
                    {currentUser && currentUser.id === vacancy.userId && (
                        <div className='flex flex-ai-c flex-jc-sb ptb4'>
                            <Link href={`/edit-vacancy/${vacancy.id}`} className='button button-secondary-bordered'>
                                {t('editButton')}
                            </Link>
                            <button className='button button-danger' onClick={handleDelete}>
                                {t('deleteButton')}
                            </button>
                        </div>
                    )}
                    <div className="card mt4">
                        <Link href={`/vacancy/${id}/applies`} className='link'>
                            {applies.length} {t('applicants')}
                        </Link>
                        <h1>{vacancy.name}</h1>
                        <p> Salary:
                            {vacancy.salary_from && ` ${t('salaryFrom')} ${vacancy.salary_from}`} 
                            {vacancy.salary_to && ` ${t('salaryTo')} ${vacancy.salary_to}`} 
                        </p>
                        <p>{t('salaryType')}: {vacancy.salary_type}</p>
                        <p>{vacancy.city?.name && `${t('location')}: ${vacancy.city.name}`}</p>
                        {vacancy.experience && <p>{t('experienceRequired')} {vacancy.experience.duration}</p>}
                        {vacancy.specialization && <p>{t('experienceRequired')} {vacancy.specialization.name}</p>}
                        {vacancy.employmentType && <p>{t('specialization')}: {vacancy.employmentType.name}</p>}
                        {vacancy.about_company && <p>{t('aboutCompany')}: {vacancy.about_company}</p>}
                        {vacancy.description && <p className="secondary" dangerouslySetInnerHTML={{ __html: vacancy.description }}></p>}

                        {
                            currentUser && currentUser.role.name === "employee" && (
                                <select className='input mtb4' value={resumeId} onChange={(e) => setResume(e.target.value)} style={{ maxWidth: '200px' }}>
                                    {resumes.map(item => (
                                        <option key={item.id} value={item.id}>{item.position}</option>
                                    ))}
                                </select>
                            )
                        }

                        {currentUser && currentUser.id !== vacancy.userId && !isApplied && (
                            <button className="button button-primary mt7" onClick={handleApply}>
                                {t('applyButton')}
                            </button>
                        )}
                        {currentUser && currentUser.id !== vacancy.userId && isApplied && (
                            <Link className="button button-primary mt7" href={'/applies'} style={{ maxWidth: '200px' }}>
                                {t('viewApplication')}
                            </Link>
                        )}
                        
                        {vacancy.createdAt && (
                            <p className='link'>{t('createdAt')}: {formatDate(vacancy.createdAt)}</p>
                        )}
                    </div>

                    {vacancy.company && (
                        <div className="company-info mt7">
                            <p><b>{vacancy.company.name}</b></p>
                            <p>{vacancy.company.description}</p>
                            <p>{vacancy.company.address}</p>
                        </div>
                    )}

                    <h3 className='mt7'>{t('keySkills')}</h3>
                    <div className="skills-container">
                        {skills.map((skill, index) => <span key={index} className='tag tag2 mr4'>{skill}</span>)}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
