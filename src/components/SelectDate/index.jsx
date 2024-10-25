'use client'
import { useState, useEffect } from "react"
export default function SelectDate({size, label, onChange, value, t}){
    const [day, setDay] = useState('');
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState('');

    useEffect(() => {
        const date = new Date();
        date.setFullYear(year)
        date.setMonth(month)
        date.setDate(day)
        onChange(date)
        console.log(date)
    }, [day, month, year])

    useEffect(() => {
        if(value){
            const date = new Date(value);
            setDay(date.getDate())
            setMonth(date.getMonth())
            setYear(date.getFullYear())
        }
    }, [value])
    return(
        <fieldset className={"fieldset " + size}>
            <label>{label}</label>
            <div className="selectdate">
                <input className='input' type='text' placeholder={`${t('Day')}`} onChange={(e) => setDay(e.target.value)} value={day}/>
                <select name="" id="" onChange={(e) => setMonth(e.target.value)} placeholder="Месяц" className='input' value={month}>
                    <option value={0} >{t('monthNames.J')}</option>
                    <option value={1}>{t('monthNames.F')}</option>
                    <option value={2}>{t('monthNames.M')}</option>
                    <option value={3}>{t('monthNames.A')}</option>
                    <option value={4}>{t('monthNames.MY')}</option>
                    <option value={5}>{t('monthNames.JN')}</option>
                    <option value={6}>{t('monthNames.JL')}</option>
                    <option value={7}>{t('monthNames.AU')}</option>
                    <option value={8}>{t('monthNames.S')}</option>
                    <option value={9}>{t('monthNames.O')}</option>
                    <option value={10}>{t('monthNames.N')}</option>
                    <option value={11}>{t('monthNames.D')}</option>
                </select>
                <input className='input' type='text' placeholder="Год" onChange={(e) => setYear(e.target.value)} value={year}/>
            </div>
        </fieldset>
    )
}