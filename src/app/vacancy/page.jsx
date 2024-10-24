'use client'
import Header from '@/components/header';
import Link from 'next/link';
import MyVacancies from '@/components/myVacancies';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMyVacancies } from '@/store/slices/vacancySlice';
import Footer from '@/components/footer';

export default function Vacancy() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMyVacancies())
    }, [])

    return (
        <div className='wrapper'>
            <Header/>
            <main>
                <div className='container'>
                    <div className='flex flex-ai-c flex-jc-sb ptb7'>
                        <h1>Мои вакансии</h1>
                        <Link href={'/create-vacancy'} className='button button-secondary-bordered'>Создать вакансию</Link>
                    </div>
                    <MyVacancies/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
