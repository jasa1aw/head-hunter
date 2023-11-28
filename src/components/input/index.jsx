export default function Input({label, placeholder, type, onChange, size}){

    return(
        <fieldset className={"fieldset " + size}>
            <label>{label}</label>
            <input className='input' type={type} placeholder={placeholder} onChange={onChange}/>
        </fieldset>
    )
}