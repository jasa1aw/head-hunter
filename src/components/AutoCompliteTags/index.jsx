'use client';
import { useState, useEffect } from "react";
import Input from '@/components/input'

export default function AutoCompliteTags({label, placeholder, type, size, items, onSelect, selected}) {
    const [value, setValue] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    
    const onClick = (item) => {
        setValue([...value, item])
    }
    const deleteTag = (tag) => {
        let v = [...value]
        let index = value.indexOf(tag)
        v.splice(index, 1)
        setValue(v)
        setFilteredItems([...filteredItems, tag])
    }

    useEffect(() => {
        if(selected){
            if(JSON.stringify(value) !== JSON.stringify(selected)){
                setValue(selected)
            }
        }
    }, [selected])

    const onChange = (e) => {
        // console.log(e.target.value)
        if(e.target.value === "") {
            setFilteredItems([])
        }else {
            const filter = items.filter(item => item.name.includes(e.target.value))
            let fi = [];
            filter.map(item => {
                let exist = false;
                value.map(tag => {
                    if(tag.name === item.name) {
                        exist = true;
                    }
                })
                if(!exist) {
                    fi.push(item)
                }
            })
            setFilteredItems(fi)
        }
    }
    useEffect(() => {
        let fi = [];
        filteredItems.map(item => {
            let exist = false;
            value.map(tag => {
                if(tag.name === item.name) {
                    exist = true;
                }
            })
            if(!exist) {
                fi.push(item)
            }
        })
        setFilteredItems(fi)
        onSelect(value)
    }, [value])
    // console.log(value, selected)
    return (
        <div className="fieldset-lg">
            <div className="tags">
                {value.length > 0 && value.map((tag, index )=> <div key={index} className="tag">
                    <span>{tag.name}</span> <i onClick={() => deleteTag(tag)}>X</i>
                </div>)}
            </div>
            <div className={"autocomplite " + size}>
                <Input placeholder={placeholder} type={type} onChange={onChange} label={label} size={size}/> 
                {filteredItems.length > 0 && <div className="dropdown dropdown-tags">
                    <h4>Рекомендуемые навыки</h4>
                    {filteredItems.map(item => (<a key={item.id} onClick={() => onClick(item)}>{item.name}</a>))}
                </div>}
            </div>
        </div>
    )
}