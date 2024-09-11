'use client'
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getMyVacancyById } from '@/app/store/slices/vacancySlice';
import { useParams, Link } from 'next/navigation';
import { getMyResumes } from '@/app/store/slices/resumeSlice';
import { createApply, getEmployeeApplies, getVacancyApplies } from '@/app/store/slices/applySlice';


export default function VacancyPage() {
    const dispatch = useDispatch()
    const {id} = useParams();
    const vacancy = useSelector(state => state.resume.vacancy);
    const resumes = useSelector(state => state.resume.resumes);
    const currentUser = useSelector(state => state.auth.currentUser);
    const applies = useSelector(state => state.apply.applies);
    

    const [resumeId, setResume] = useState()

    useEffect(() => {
        if(resumes[0]){
            setResume(resumes[0].id)
        }
    }, [resumes])

    const didMount = () => {
        dispatch(getMyVacancyById(id));
    }
        
    useEffect(() => {
        if(currentUser && currentUser.role.name === "employee") {
            dispatch(getMyResumes())
            dispatch(getEmployeeApplies())
        } else if(currentUser){
            dispatch(getVacancyApplies(id))
        }
    }, [currentUser])

    const handleApply = () =>{
        dispatch(createApply({
            resumeId,
            vacancyId: id
        }))
    }
    // console.log('in page', resume);

    useEffect(didMount, [])
        
    let isApplied = applies.some(item => item.vacancyId === id * 1);

    let skills = []
    if(vacancy.skills) skills = vacancy.skills.split(',');

    return (
        <main>
            <Header/>
            <div className='container'>
                {currentUser && currentUser.id === vacancy.userId && <div className='flex flex-ai-c flex-jc-sb ptb7'>
                    <Link href={`/edit-vacancy/${vacancy.id}`} className='button button-secondary-bordered'>Редактировать</Link>
                </div>}
                <div className="card mt7">
                    <Link href={`/vacancy/${id}/applies`} className='link'> {applies.length} соискателей </Link>
                    <h1>{vacancy.name}</h1>
                    <p> {vacancy.salary_from && `от ${vacancy.salary_from}`} {vacancy.salary_to&& `до ${vacancy.salary_to}`} {vacancy.salary_type}</p>
                    {vacancy.experience && <p>Требуемый опыт работы: {vacancy.experience.duration}</p>}
                    {vacancy.employmentType && <p>Тип занятости: {vacancy.employmentType.name}</p>} 
                    {
                        currentUser && currentUser.role.name === "employee" && (
                        <select className='input mtb4' value={resumeId} onChange={(e) => setResume(e.target.value)} style={{maxWidth: `200px`}}>
                            {resumes.map(item => (<option key={item.id} value={item.id}>{item.position}</option>))}
                        </select>
                        )
                    }
                    
                    {currentUser && currentUser.id !== vacancy.userId && !isApplied && <button className="button button-primary" onClick={handleApply}>Откликнуться</button>}
                    {currentUser && currentUser.id !== vacancy.userId && isApplied && <Link className="button button-primary" href={'/applies'} style={{maxWidth: `200px`}}>Смотреть отклик</Link>}
                </div>

                {vacancy.company && <p className="secodary mt7"><b>{vacancy.company.name}</b></p>}
                {vacancy.company && <p className="secodary">{vacancy.company.description}</p>}

                {vacancy.description && <p className="secondary" dangerouslySetInnerHTML={{__html: vacancy.description}}></p>}
                {vacancy.company && <p className="secodary">{vacancy.company.address}</p>}


                <h3 className='mt7'>Ключевые навыки</h3>
                {skills.map((skill, index) => <span key={index} className='tag mr4'>{skill}</span>)}
            </div>               
        </main>
    )
}
