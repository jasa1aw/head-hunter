import { useState } from "react"

export default function ModalAddExp({close, addWorkingHistory, t}){
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
        close()
    }
    // let testdate = new Date(endDate)
    return(
        <div className="modal">
            <div className="modal-backdrop" onClick={close}></div>
            <div className="modal-inner">
                <h3>{t('experience.title')}</h3>
                <h4>{t('experience.startDay')}</h4>
                {/* {testdate.toLocaleDateString()} Проверка Даты*/} 
                <div className="selectdate selectdate-noday">
                    <select onChange={onChangeMonth} placeholder={t('ChooseMonth')} className="input">
                        <option disabled>{t('ChooseMonth')}</option>
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
                    <input className='input' type='text' placeholder={t('Year')} onChange={onChangeYear}/>
                </div>
                <h4>{t('experience.endDay')}</h4>
                <div className="selectdate selectdate-noday">
                    <select onChange={onChangeMonthEnd} placeholder={t('ChooseMonth')} className='input'>
                        <option disabled>{t('ChooseMonth')}</option>
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
                    <input className='input' type='text' placeholder={t('Year')} onChange={onChangeYearEnd}/>
                </div>
                <h4>{t('experience.organization')}</h4>
                <input className='input' type='text' placeholder={t('experience.nameCompany')} onChange={onChangeCompanyName} value={company_name}/>
                
                <h4>{t('experience.position')}</h4>
                <input className='input' type='text' placeholder={t('experience.position')} onChange={onChangeCompanyDesc} value={company_description}/>
                
                <h4>{t('experience.responsibilities')}</h4>
                <textarea className='textarea' type='text' placeholder={t('experience.description')} onChange={onChangeResp}>{responsibilities}</textarea>
                <div className="modal-actions">
                    <button className="button button-primary-bordered" onClick={close}>{t('experience.cancel')}</button>
                    <button className="button button-primary" onClick={save}>{t('experience.save')}</button>
                </div>
            </div>
        </div>
    )
}