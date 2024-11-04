'use client'
export default function AddEducation({onChange, education, t}){
    const onChangeData = (e) => {
        let [index, name] = e.target.name.split('-');
        index = index * 1
    
        let eds = [...education]
    
        eds[index][name] = e.target.value
        onChange(eds)
      }
    
      const newEducation = () => {
        onChange([...education, {
          level: "Высшее",
          university_name: "",
          faculty: "",
          major: "",
          end_date: ""
        }])
      }
    
      const removeEd = (ed) => {
        const eds = [...education]
        const index = education.indexOf(ed)
        eds.splice(index, 1)
        onChange(eds)
      }

    const educations = education.map((ed,index) => (
        <div className="education" key={index}>
            <span onClick={() => removeEd(ed)}>X</span>
            
            <fieldset className={"fieldset fieldset-md"}>
                <label>{t('educationExperience.level')}</label>
                <select className="input" onChange={onChangeData} name={index + "-level"} value={ed.level} >
                    <option value={t('educationExperience.high')}>{t('educationExperience.high')}</option>
                    <option value={t('educationExperience.notHigh')}>{t('educationExperience.notHigh')}</option>
                </select>
            </fieldset>
                
            <fieldset className={"fieldset fieldset-md"}>
                <label >{t('educationExperience.name')}</label>
                <input className="input" type="text" onChange={onChangeData} name={index + "-university_name"} value={ed.university_name}/>
            </fieldset>

            <fieldset className={"fieldset fieldset-md"}>
                <label >{t('educationExperience.faculty')}</label>
                <input className="input" type="text" onChange={onChangeData} name={index + "-faculty"} value={ed.faculty}/>
            </fieldset>

            <fieldset className={"fieldset fieldset-md"}>
                <label >{t('educationExperience.specialization')}</label>
                <input className="input" type="text" onChange={onChangeData} name={index + "-major"} value={ed.major}/>
            </fieldset>

            <fieldset className={"fieldset fieldset-md"}>
                <label >{t('educationExperience.graduatedYear')}</label>
                <input className="input" type="text" onChange={onChangeData} name={index + "-end_date"} value={ed.end_date}/>
            </fieldset>
    </div>
    ))
    return(
        <div className="eds">
            {educations}
            <a onClick={() => newEducation()}> {education.length ? t('educationExperience.add1') : t('educationExperience.add')} </a>
        </div>
    )
}