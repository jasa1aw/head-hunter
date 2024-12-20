'use client'
import Header from '@/components/header';
import { Link } from '@/i18n/routing';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyResumeById } from '@/app/[locale]/store/slices/resumeSlice';
import { useParams } from 'next/navigation';
import { monthsInRussian2 } from '@/app/[locale]/utils/format';
import Footer from '@/components/footer';
import Search from '@/components/header/search';
import { useTranslations } from 'next-intl';

export default function ResumePage() {
    const t = useTranslations('ResumePage');
    const dispatch = useDispatch();
    const { id } = useParams();
    const resume = useSelector(state => state.resume.resume);
    console.log(resume.user && resume.user.birthday)

    const didMount = () => {
        dispatch(getMyResumeById(id));
    };

    useEffect(didMount, []);

    const showPhone = (phone) => {
        if (phone[0] === "8") {
            phone = '+7' + phone.slice(1);
        }
        return `${phone.slice(0, 2)} (${phone.slice(2, 5)}) ${phone.slice(5, 8)}-${phone.slice(8, 10)}-${phone.slice(10, 12)}`;
    };

    let skills = [];
    if (resume.skills) skills = resume.skills.split(',');
    return (
        <div className='wrapper'>
            <Header />
            <main>
                <div className='container'>
                    <Search />
                    <div className='flex flex-ai-c flex-jc-sb ptb7'>
                        <Link href={'/resumes'} className='link'>{t('backToList')}</Link>
                        <Link href={`/edit-resume/${resume.id}`} className='button button-secondary-bordered'>{t('edit')}</Link>
                    </div>
                    <h1>{resume.first_name} {resume.last_name}</h1>
                    <p>{resume.gender} 18 {t('yearsOld')}, {t('born')} 2006 january</p>

                    <p className="secondary">{t('contacts')}</p>
                    <p>
                        {resume.phone ? (
                            <Link className='link' href={`tel:${resume.phone}`}>
                                {showPhone(resume.phone)}
                            </Link>
                        ) : (
                            <Link className='link' href={`https://t.me/${resume.contact}`} target="_blank">
                                t.me/{resume.contact}
                            </Link>
                        )}
                    </p>
                    <p>{t('location')}: {resume.city && resume.city.name}</p>

                    <div className="flex flex-jc-sb">
                        <div>
                            <h1>{resume.position}</h1>
                            <p>{t('employmentType')}: {resume.employmentTypes && resume.employmentTypes.map(et => `${et.name} `)}</p>
                        </div>
                        <div>
                            <h2 className='h1'>{resume.salary} {resume.salary_type}</h2>
                        </div>
                    </div>

                    <h3>{t('workExperience')}</h3>
                    {resume.workingHistories && resume.workingHistories.map((job, index) => {
                        let start = new Date(job.start_date);
                        let end = new Date(job.end_date);
                        return (
                            <div className="flex working-history" key={index}>
                                <div className='workingHistoryDate'>
                                    {monthsInRussian2[start.getMonth()]} {start.getFullYear()} - {monthsInRussian2[end.getMonth()]} {end.getFullYear()}
                                </div>
                                <div className='workingHistoryInfo'>
                                    <h4>{job.company_name}</h4>
                                    <h4>{job.company_description}</h4>
                                    <p>{job.responsibilities}</p>
                                </div>
                            </div>
                        );
                    })}

                    <h3>{t('skills')}</h3>
                    {skills.map((skill, index) => <span key={index} className='tag mr4'>{skill}</span>)}

                    <h3>{t('aboutMe')}</h3>
                    <p>{resume.about}</p>

                    <h3>{t('education')}</h3>
                    {resume.education && resume.education.map((ed, index) => {
                        let end = new Date(ed.end_date);
                        return (
                            <div className="flex working-history" key={index}>
                                <div className='workingHistoryDate'>
                                    {end.getFullYear()}
                                </div>
                                <div className='workingHistoryInfo'>
                                    <h4>{ed.university_name}</h4>
                                    <p>{ed.faculty}, {ed.major}</p>
                                </div>
                            </div>
                        );
                    })}

                    <h3>{t('languages')}</h3>
                    {resume.foreignLanguages && resume.foreignLanguages.map((fl, index) =>
                        <p className='tag mr4' key={index}>{fl.name} - {fl.level}</p>
                    )}

                    <h3>{t('citizenship')}</h3>
                    <p>{resume.citizenshipObj && resume.citizenshipObj.name}</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
