'use client'
import {useEffect, useState} from 'react';
import Spec from './Spec';
export default function SpecType({specType, onChange, value}) {
    const [active, setActive] = useState(false)
    useEffect(() => {
        specType.specializations.map(spec => spec.id === value ? setActive(true) : null)
    }, [])
    return (
        <div>
            <div className={`mtb2 specTypes${active ?" active":""}`} onClick={() => setActive(!active)}>
                    <img src="/img/arrow-right.svg"/>
                    {specType.name}
            </div>
                {active && specType.specializations.map(spec => (<Spec key={spec.id} spec={spec} onChange={onChange} value={value}/>))}
        </div>
    )
}