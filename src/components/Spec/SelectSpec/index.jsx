'use client'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpecType from "../SpecType";

export default function SelectSpec({ onChange, value }) {
    const [specializationId, setSpecialization] = useState();
    const [specializationName, setSpecializationName] = useState('');
    const [search, setSearch] = useState("");
    const [filteredSpecTypes, setFilteredSpecTypes] = useState([]);
    const specializationTypes = useSelector(state => state.vacancy.specializations);

    const handleOnSpecChange = (e) => {
        const name = e.target.dataset.name;
        const id = e.target.value * 1;

        setSpecializationName(name);
        setSpecialization(id);

        onChange({ specializationId: id, specializationName: name });
    };

    const onSearch = (e) => {
        setSearch(e.target.value);
        let types = specializationTypes.filter(item => 
            item.specializations.some(spec => spec.name.includes(e.target.value))
        );
        setFilteredSpecTypes(types);
    };

    useEffect(() => {
        setFilteredSpecTypes(specializationTypes);
    }, [specializationTypes]);

    return (
        <>
            {specializationName && <h2 style={{ color: '#0070ff' }}>{specializationName}</h2>}
            <input 
                className="input" 
                type="text" 
                value={search} 
                onChange={onSearch} 
                placeholder="Искать" 
            />
            <div className="selectSpec">
                {filteredSpecTypes.map(specType => (
                    <SpecType 
                        specType={specType} 
                        key={specType.id} 
                        onChange={handleOnSpecChange} 
                        value={value} 
                    />
                ))}
            </div>
        </>
    );
}
