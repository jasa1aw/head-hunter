"use client";
import Header from '@/components/header'
import { useDispatch } from 'react-redux';
import { getEmployeeApplies } from '@/app/store/slices/applySlice';
import { useEffect } from 'react';
import MyApplies from '@/components/myApplies';
import Footer from '@/components/footer';
import Search from '@/components/header/search';

export default function Applies() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployeeApplies())
    }, []);

    return (
        <div className='wrapper'>
            <Header />
            <main>
                <div className="container">
                    <Search/>
                    <div className="flex flex-ai-c flex-jc-sb ptb7">
                        <h1>Отклики и приглашения</h1>
                    </div>
                    <MyApplies />
                </div>
            </main>
            <Footer/>
         </div>
    )
}
