'use client'
import Header from '@/components/header';
import { Link } from 'next/navigation';
import MyVacancies from '@/components/myVacancies';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMyVacancies } from '@/store/slices/vacancySlice';

export default function Vacancy() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMyVacancies())
    }, [])

    return (
        <main>
            <Header/>
            <div className='container'>
                <div className='flex flex-ai-c flex-jc-sb ptb7'>
                    <h1>Мои вакансии</h1>
                    <Link href={'/create-vacancy'} className='button button-secondary-bordered'>Создать вакансию</Link>
                </div>
                <MyVacancies/>
            </div>
        </main>
    )
}
