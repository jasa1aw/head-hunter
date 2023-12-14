import { useState } from "react"

export default function ModalAddExp({close, addWorkingHistory}){
    const [start_date, setStartDate] = useState(Date.now())
    const [end_date, setEndDate] = useState(Date.now())
    const [company_name, setCompany_name] = useState("");
    const [company_description, setCompany_description] = useState("");
    const [responsibilities, setResponsibilities] = useState("");

    const onChangeMonth = (e) => {
        let date = new Date(start_date);
        date.setMonth(e.target.value)
        setStartDate(date.getTime())
    }
    const onChangeYear = (e) => {
        let date = new Date(start_date);
        date.setFullYear(e.target.value)
        setStartDate(date.getTime())
    }
    const onChangeMonthEnd = (e) => {
        let date = new Date(end_date);
        date.setMonth(e.target.value)
        setEndDate(date.getTime())
    }
    const onChangeYearEnd = (e) => {
        let date = new Date(end_date);
        date.setFullYear(e.target.value)
        setEndDate(date.getTime())
    }

    const onChangeCompanyName = (e) =>{
        setCompany_name(e.target.value)
    }
    const onChangeCompanyDesc = (e) =>{
        setCompany_description(e.target.value)
    }
    const onChangeResp = (e) =>{
        setResponsibilities(e.target.value)
    }

    const save = () => {
        const workingHistory = {
            start_date,
            end_date,
            responsibilities,
            company_name,
            company_description
        }
        addWorkingHistory(workingHistory);
    }
    // let testdate = new Date(endDate)
    return(
        <div className="modal">
            <div className="modal-backdrop" onClick={close}></div>
            <div className="modal-inner">
                <h3>Опыт работы</h3>
                <h4>Начало работы</h4>
                {/* {testdate.toLocaleDateString()} Проверка Даты*/} 
                <div className="selectdate selectdate-noday">
                    <select onChange={onChangeMonth} placeholder="Месяц" className="input">
                        <option disabled>Выберите месяц</option>
                        <option value={0}>январь</option>
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
                    <input className='input' type='text' placeholder="Год" onChange={onChangeYear}/>
                </div>
                <h4>Конец работы</h4>
                <div className="selectdate selectdate-noday">
                    <select onChange={onChangeMonthEnd} placeholder="Месяц" className='input'>
                        <option disabled>Выберите месяц</option>
                        <option value={0}>январь</option>
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
                    <input className='input' type='text' placeholder="Год" onChange={onChangeYearEnd}/>
                </div>
                <h4>Организация</h4>
                <input className='input' type='text' placeholder="Название компании" onChange={onChangeCompanyName} value={company_name}/>
                
                <h4>Должность</h4>
                <input className='input' type='text' placeholder="Должность" onChange={onChangeCompanyDesc} value={company_description}/>
                
                <h4>Обязанности на рабочем месте</h4>
                <textarea className='textarea' type='text' placeholder="Опишите что вы делали на работе" onChange={onChangeResp}>{responsibilities}</textarea>
                <div className="modal-actions">
                    <button className="button button-primary-bordered" onClick={close}>Отменить</button>
                    <button className="button button-primary" onClick={save}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}