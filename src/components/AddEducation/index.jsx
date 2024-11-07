'use client'
import React from 'react';

function AddEducation({ onChange, education = [], t }) {
    const onChangeData = (e) => {
        const [index, name] = e.target.name.split('-');
        const updatedEducation = [...education];
        updatedEducation[+index][name] = e.target.value;
        onChange(updatedEducation);
    };

    const newEducation = () => {
        onChange([...education, {
            level: t('educationExperience.high'),
            university_name: "",
            faculty: "",
            major: "",
            end_date: ""
        }]);
    };

    const removeEducation = (index) => {
        const updatedEducation = education.filter((_, i) => i !== index);
        onChange(updatedEducation);
    };

    return (
        <div className="eds">
            {education.map((ed, index) => (
                <div className="education" key={index}>
                    <span 
                        onClick={() => removeEducation(index)} 
                        aria-label={t('educationExperience.remove')}
                    >
                        X
                    </span>
                    {['level', 'university_name', 'faculty', 'major', 'end_date'].map((field) => (
                        <fieldset key={field} className="fieldset fieldset-md">
                            <label>{t(`educationExperience.${field}`)}</label>
                            <input 
                                className="input" 
                                type="text" 
                                name={`${index}-${field}`} 
                                value={ed[field]} 
                                onChange={onChangeData} 
                                aria-label={t(`educationExperience.${field}`)}
                            />
                        </fieldset>
                    ))}
                </div>
            ))}
            <a onClick={newEducation}>
                {education.length ? t('educationExperience.add1') : t('educationExperience.add')}
            </a>
        </div>
    );
}

export default React.memo(AddEducation);
