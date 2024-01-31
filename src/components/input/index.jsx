export default function Input({label, placeholder, type, onChange, size, value}){

    return(
        <fieldset className={"fieldset " + size}>
            <label>{label}</label>
            <input className='input' type={type} placeholder={placeholder} onChange={onChange} value={value}/>
        </fieldset>
    )
}