export default function SelectDate({size , label}){
    const onChangeDay = () => {

    }
    const onChangeMonth = () => {
        
    }
    const onChangeYear = () => {
        
    }
    return(
        <fieldset className={"fieldset " + size}>
            <label>{label}</label>
            <div className="selectdate">
                <input className='input' type='text' placeholder="День" onChange={onChangeDay} />
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
        </fieldset>
    )
}