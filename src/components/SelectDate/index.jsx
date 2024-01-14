'use client'
import { useState, useEffect } from "react"
export default function SelectDate({size, label, onChange}){
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


    return(
        <fieldset className={"fieldset " + size}>
            <label>{label}</label>
            <div className="selectdate">
                <input className='input' type='text' placeholder="День" onChange={(e) => setDay(e.target.value)} value={day}/>
                <select name="" id="" onChange={(e) => setMonth(e.target.value)} placeholder="Месяц" className='input' value={month}>
                    <option value={0} >январь</option>
                    <option value={1}>февраль</option>
                    <option value={2}>март</option>
                    <option value={3}>апрель</option>
                    <option value={4}>май</option>
                    <option value={5}>июнь</option>
                    <option value={6}>июль</option>
                    <option value={7}>август</option>
                    <option value={8}>сентябрь</option>
                    <option value={9}>октябрь</option>
                    <option value={10}>ноябрь</option>
                    <option value={11}>декабрь</option>
                </select>
                <input className='input' type='text' placeholder="Год" onChange={(e) => setYear(e.target.value)} value={year}/>
            </div>
        </fieldset>
    )
}