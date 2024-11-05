'use client';
import { useState, useEffect, useMemo } from "react";
import Input from '@/components/input'
import { useTranslations } from "next-intl";

export default function AutoCompliteTags({label, placeholder, type, size, items, onSelect, selected}) {
    const t = useTranslations('CreateVacancy');
    const [value, setValue] = useState(selected || []);
    const [inputValue, setInputValue] = useState('');
    
    const onClick = (item) => {
        if (!value.some(tag => tag.name === item.name)) {
            setValue([...value, item]);
        }
    };

    const deleteTag = (tag) => {
        setValue(value.filter(t => t.name !== tag.name));
    };

    const onChange = (e) => {
        setInputValue(e.target.value);
    };

    const filteredItems = useMemo(() => {
        if (!inputValue) return [];
        return items.filter(item =>
            item.name.toLowerCase().includes(inputValue.toLowerCase()) &&
            !value.some(tag => tag.name === item.name)
        );
    }, [inputValue, items, value]);

    useEffect(() => {
        onSelect(value);
    }, [value]);

    useEffect(() => {
        if (selected && JSON.stringify(value) !== JSON.stringify(selected)) {
            setValue(selected);
        }
    }, [selected]);

    return (
        <div className="fieldset-lg">
            <div className="tags">
                {value.length > 0 && value.map((tag, index) => (
                    <div key={index} className="tag">
                        <span>{tag.name}</span> <i onClick={() => deleteTag(tag)}>X</i>
                    </div>
                ))}
            </div>
            <div className={"autocomplite " + size}>
                <Input 
                    placeholder={placeholder} 
                    type={type} 
                    onChange={onChange} 
                    value={inputValue}
                    label={label} 
                    size={size}
                /> 
                {filteredItems.length > 0 && (
                    <div className="dropdown dropdown-tags">
                        <h4>{t('recommend')}</h4>
                        {filteredItems.map(item => (
                            <a key={item.id} onClick={() => onClick(item)}>{item.name}</a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
