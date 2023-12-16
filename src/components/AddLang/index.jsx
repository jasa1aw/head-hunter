import { useEffect, useState } from "react"

export default function AddLang({onChange}){
    const[foreignLanguages,setForeignLanguages] = useState([])
    
    const remove = (index) => {
        const lns = [...foreignLanguages];
        lns.splice(index, 1);
        setForeignLanguages(lns);
    }
    const onSelect = (e) => {
        const [index, key] = e.target.name.split("-");
        const lns = [...foreignLanguages];
        lns[index][key] = e.target.value;
        setForeignLanguages(lns);
        
        onChange(lns)
    }

    const langs = foreignLanguages.map((ed,index) => (
        <div className="langs fieldset-md selectdate selectdate-noday" key={index}>
            <span className="remove" onClick={() => remove(index)}>X</span>
            <select placeholder="Язык" className="input" name={index + "-name"} value={foreignLanguages[index].name} onChange={onSelect}>
                <option value={"Казахский"}>Казахский</option>
                <option value={"Английский"}>Английский</option>
                <option value={"Русский"}>Русский</option>
            </select>
            <select placeholder="Уровень" className="input" name={index + "-level"} value={foreignLanguages[index].level} onChange={onSelect}>
                <option value="A1">A1 - Начальный</option>
                <option value="A2">A2 - Элементарный</option>
                <option value="B1">B1 - Средний</option>
                <option value="B2">B2 - Средне-продвинутый</option>
                <option value="C1">C1 - Продвинутый</option>
                <option value="C2">C2 - В совершенстве</option>
            </select>
        </div>
    ))
    return(
        <div className="eds">
            {langs}
            <a onClick={() => setForeignLanguages([...foreignLanguages, {name: "", level: ""}])}>Добавить язык</a>
        </div>
    )
}