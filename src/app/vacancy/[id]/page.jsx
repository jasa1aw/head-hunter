'use client'
import Header from '@/components/header';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getMyVacancyById } from '@/app/store/slices/vacancySlice';
import { useParams } from 'next/navigation';


export default function VacancyPage() {
    const dispatch = useDispatch()
    const {id} = useParams();
    const vacancy = useSelector(state => state.resume.vacancy);
    const currentUser = useSelector(state => state.auth.currentUser);

    const didMount = () => {
        dispatch(getMyVacancyById(id))
    }

    console.log('in page', resume);

    useEffect(didMount, [])


    let skills = []
    if(vacancy.skills) skills = vacancy.skills.split(',');

    return (
        <main>
            <Header/>
            <div className='container'>
                {currentUser.id === vacancy.userId && <div className='flex flex-ai-c flex-jc-sb ptb7'>
                    <Link href={`/edit-vacancy/${vacancy.id}`} className='button button-secondary-bordered'>Редактировать</Link>
                </div>}
                <div className="card mt7">
                    <h1>{vacancy.name}</h1>
                    <p> {vacancy.salary_from && `от ${vacancy.salary_from}`} {vacancy.salary_to&& `до ${vacancy.salary_to}`} {vacancy.salary_type}</p>
                    {vacancy.experience && <p>Требуемый опыт работы: {vacancy.experience.duration}</p>}
                    {vacancy.employmentType && <p>Тип занятости: {vacancy.employmentType.name}</p>} 
                    {currentUser.id !== vacancy.userId && <button className="button button-primary">Откликнуться</button>}
                </div>

                {vacancy.company && <p className="secodary mt7"><b>{vacancy.company.name}</b></p>}
                {vacancy.company && <p className="secodary">{vacancy.company.description}</p>}

                {vacancy.description && <p className="secondary">{vacancy.description}</p>}
                {vacancy.company && <p className="secodary">{vacancy.company.address}</p>}


                <h3 className='mt7'>Ключевые навыки</h3>
                {skills.map((skill, index) => <span key={index} className='tag mr4'>{skill}</span>)}
            </div>               
        </main>
    )
}
