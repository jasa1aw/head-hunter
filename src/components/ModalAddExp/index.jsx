export default function ModalAddExp({close}){
    const onChangeMonth = () => {
        
    }
    const onChangeYear = () => {
        
    }
    const onChangeMonthEnd = () => {
        
    }
    const onChangeYearEnd = () => {
        
    }
    return(
        <div className="modal">
            <div className="modal-backdrop" onClick={close}></div>
            <div className="modal-inner">
                <h3>Опыт работы</h3>
                <h4>Начало работы</h4>
                <div className="selectdate selectdate-noday">
                    <select name="" id="" onChange={onChangeMonth} placeholder="Месяц" className='input'>
                        <option value="">январь</option>
                        <option value="">февраль</option>
                        <option value="">март</option>
                        <option value="">апрель</option>
                        <option value="">май</option>
                        <option value="">июнь</option>
                        <option value="">июль</option>
                        <option value="">август</option>
                        <option value="">сентябрь</option>
                        <option value="">октябрь</option>
                        <option value="">ноябрь</option>
                        <option value="">декабрь</option>
                    </select>
                    <input className='input' type='text' placeholder="Год" onChange={onChangeYear}/>
                </div>
                <h4>Конец работы</h4>
                <div className="selectdate selectdate-noday">
                    <select name="" id="" onChange={onChangeMonthEnd} placeholder="Месяц" className='input'>
                        <option value="">январь</option>
                        <option value="">февраль</option>
                        <option value="">март</option>
                        <option value="">апрель</option>
                        <option value="">май</option>
                        <option value="">июнь</option>
                        <option value="">июль</option>
                        <option value="">август</option>
                        <option value="">сентябрь</option>
                        <option value="">октябрь</option>
                        <option value="">ноябрь</option>
                        <option value="">декабрь</option>
                    </select>
                    <input className='input' type='text' placeholder="Год" onChange={onChangeYearEnd}/>
                </div>
                <h4>Организация</h4>
                <input className='input' type='text' placeholder="Название компании"/>
                <h4>Должность</h4>
                <input className='input' type='text' placeholder="Должность"/>
                <h4>Обязанности на рабочем месте</h4>
                <textarea className='textarea' name="" id="" cols="30" rows="10" placeholder="Опишите что вы делали на работе"></textarea>
                <div className="modal-actions">
                    <button className="button button-primary-bordered" onClick={close}>Отменить</button>
                    <button className="button button-primary">Сохранить</button>
                </div>
            </div>
        </div>
    )
}