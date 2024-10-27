export default function Input({label, placeholder, type, onChange, size, value, counter = -1, disabled}){

    return(
        <fieldset className={"fieldset " + size}>
            {counter <= 0 && <label>{label}</label>}
            {counter >= 0 &&<div className="flex flex-jc-s flex-ai-c">
                <label className="counterLabel">{label}</label>
                <span className="counter">{counter}</span>
            </div>}
            <input maxLength={counter ? 255 : 100} className='input' type={type} placeholder={placeholder} onChange={onChange} value={value}/>
        </fieldset>
    )
}