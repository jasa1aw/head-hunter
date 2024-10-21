"use client";
import Header from '@/components/header'
import { useDispatch } from 'react-redux';
import { getEmployeeApplies } from '@/app/store/slices/applySlice';
import { useEffect } from 'react';
import MyApplies from '@/components/myApplies';

export default function Applies() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployeeApplies())
    }, []);

    return (
        <main>
            <Header />
            <div className="container">
                <div className="flex flex-ai-c flex-jc-sb ptb7">
                    <h1>Отклики и приглашения</h1>
                    <h1>Отклики и отклонение</h1>
                    <h1>Отклики и наша работа</h1>
                    <h1>Отклики и pull reequest</h1>
                </div>
                <div className="flex flex-ai-c flex-jc-sb ptb7">
                    <h4>sgfsdfg</h4>
                </div>
                <MyApplies />
            </div>
        </main>
    )
}
