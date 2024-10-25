'use client'
import Header from '@/components/header';
import Input from '@/components/input';
import { END_POINT } from '@/config/end-point';
import axios from 'axios';
import AutoCompliteSelect from '@/components/AutoCompliteSelect';
import SelectDate from '@/components/SelectDate';
import ModalAddExp from '../../../../components/ModalAddExp';
import WorkingHistory from '@/components/workingHistory';
import AutoCompliteTags from '@/components/AutoCompliteTags';
import AddEducation from '@/components/AddEducation';
import AddLang from '@/components/AddLang';
import SelectEmploymentTypes from '@/components/SelectEmploymentTypes';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { editResume, getMyResumeById } from '@/app/[locale]/store/slices/resumeSlice';
import Footer from '@/components/footer';
import Search from '@/components/header/search';
import { useTranslations } from 'use-intl';
import { useRouter } from '@/i18n/routing';


export default function EditResume() {
    const router = useRouter()
    const dispatch = useDispatch()
    const {id} = useParams();
    const t = useTranslations("CreateResume")
    const resume = useSelector(state => state.resume.resume)

    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [allSkills, setSkills] = useState([]);
    const [allEmploymentTypes, setEmploymentTypes] = useState([]);
    const [workingHistories, setWorkingHistories] = useState([]);
    const [modalExpIsOpen, setModalExpIsOpen] = useState(false);

    const [first_name, setName] = useState('');
    const [last_name, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [cityId, setCity] = useState();
    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState();
    const [citizenship,setCitizenship] = useState();
    const [position, setPosition] = useState('')
    const [salary,setSalary] = useState();
    const [salary_type, setSalaryType] = useState('KZT')
    const [skills, setSelectedSkills] = useState('');
    const [education, setEducation] = useState([])
    const [foreignLanguages, setForeignLanguages] = useState([]);
    const [employmentTypes, setSelectedEmpTypes] = useState([]);
    const [about, setAbout] = useState('')

    

    
    useEffect(() => {
        console.log("did mount");
        dispatch(getMyResumeById(id))
        axios.get(`${END_POINT}/api/region/cities`).then(res => {
        setCities(res.data)
    })

    axios.get(`${END_POINT}/api/region/countries`).then(res=>{
        setCountries(res.data)
    })

    axios.get(`${END_POINT}/api/skills`).then(res =>{
        setSkills(res.data)
    })

    axios.get(`${END_POINT}/api/employment-types`).then(res =>{
        setEmploymentTypes(res.data)
    })
    }, [])

    useEffect(() => {
        if(resume.id){
            setCity(resume.cityId);
            setCitizenship(resume.citizenship)
            setSelectedEmpTypes(resume.employmentTypes.map(et => et.id));
            setName(resume.first_name);
            setSurname(resume.last_name);
            setPhone(resume.phone);
            setGender(resume.gender);
            setPosition(resume.position);
            setSalary(resume.salary);
            setSalaryType(resume.salary_type);
            setWorkingHistories(resume.workingHistories);
            setAbout(resume.about);
            setSelectedSkills(resume.skills);
            setEducation(resume.education);
            setForeignLanguages(resume.foreignLanguages)
        }
    },[resume])


    const closeModalExp = () =>{
        setModalExpIsOpen(false)
    }

    const addWorkingHistory = (item) =>{
        setWorkingHistories([...workingHistories, item]);
        closeModalExp();
    }
    const removeWorkingHistory = (workingHistory) =>{
        let wh = [...workingHistories];
        let index = workingHistories.indexOf(workingHistory);
        wh.splice(index, 1);
        setWorkingHistories(wh);
    }

    const handleGenderChange = (e) =>{
        setGender(e.target.value)
    }

    const onSkillsChange = (data) =>{
        const arr = data.map(item => item.name);
        setSelectedSkills(arr.join(','))
    }

const handleSave = () => {
    dispatch(editResume({
        id:resume.id,
        first_name,
        last_name,
        phone,
        birthday,
        gender,
        about,
        position,
        salary,
        salary_type,
        main_language:"Казахский",
        skills,
        cityId,
        citizenship,
        workingHistories,
        education,
        foreignLanguages,
        employmentTypes
        }, router))
}

return (
    <div className='wrapper'>
    <Header/>
    <main>
        <div className='container p7'>
            <Search/>
            <h1>{t("title")}</h1>

            <h3>{t("contact")}</h3>
            <Input placeholder={`${t("name")}`} type='text' label={`${t("placeholderName")}`} size="fieldset-md" onChange={(e) => setName(e.target.value)} value={first_name}/>
            <Input placeholder={`${t("lastName")}`} type='text' label={`${t("placeholderLastName")}`} size="fieldset-md" onChange={(e) => setSurname(e.target.value)} value={last_name}/>
            <Input placeholder={`${t('placeholderPhone')}`} type='text' label={`${t("phone")}`} size="fieldset-md" onChange={(e) => setPhone(e.target.value)} value={phone}/>
            <AutoCompliteSelect placeholder={`${t('placeholderCity')}`} type="text" label={`${t("city")}`} size="fieldset-md" items={cities} onSelect={(data) => setCity(data.id)} selected={cityId}/>

            <h3>{t('information')}</h3>
            <SelectDate t={t} size="fieldset-sm" label={`${t("birthdate")}`} onChange={(date) => setBirthday(date)} value={birthday}/>  
            <fieldset className={"fieldset fieldset-sm"} >
                <label>{t("gender")}</label>
                <div className='radio-group'>
                    <div className="radio">
                        {gender && gender === "Мужской" && <input  type="radio" onChange={handleGenderChange} name="gender" id="g1" value={"Мужской"} checked/>}
                        {!gender || gender !== "Мужской" && <input  type="radio" onChange={handleGenderChange} name="gender" id="g1" value={"Мужской"}/>}
                        <label htmlFor="g1">{t("male")}</label>
                    </div>
                    <div className="radio">
                        {gender && gender === "Женский" && <input  type="radio" onChange={handleGenderChange} name="gender" id="g2" value={"Женский"} checked/>}
                        {!gender || gender !== "Женский" && <input  type="radio" onChange={handleGenderChange} name="gender" id="g2" value={"Женский"}/>}
                        <label htmlFor="g2">{t("female")}</label>
                    </div>
                </div>
            </fieldset>

            <AutoCompliteSelect placeholder="" type="text" label={`${t("citizenship")}`} size="fieldset-md" items={countries} onSelect={(data) => setCitizenship(data.id)} selected={citizenship}/>

            <h3>{t("mainSpec")}</h3>
            <Input placeholder="" type='text' label={`${t("position")}`} size="fieldset-lg" onChange={(e) => setPosition(e.target.value)}  value={position}/>

            <fieldset className={"fieldset fieldset-lg"} >
                <label>{t("salary")}</label>
                <div className='salary'>
                    <input type="number" className='input' onChange={e => setSalary(e.target.value*1)} value={salary}/>
                    <select name="" id="" className='input' onChange={e => setSalaryType(e.target.value)} value={salary_type}>
                        <option value={"KZT"}>{t("currency.KZT")}</option>
                        <option value={"USD"}>{t("currency.USD")}</option>
                        <option value={"RUB"}>{t("currency.RUB")}</option>
                    </select>
                    {t('hands')}
                </div>
            </fieldset>
            <h3>{t("workExperience")}</h3>
            {modalExpIsOpen && <ModalAddExp t={t} close={closeModalExp} addWorkingHistory={addWorkingHistory}/>}
            <fieldset className={"fieldset fieldset-lg"} >
                <label>{t("place")}</label>
                <div className='exp'>
                    {workingHistories.map((item, index) => (<WorkingHistory t={t} workingHistory={item} remove={removeWorkingHistory} key={index}/>))}
                    <button className='button button-primary-bordered' onClick={() => setModalExpIsOpen(true)}>{t('addPlace')}</button>
                </div>
            </fieldset>
            
            <fieldset className={"fieldset fieldset-lg"} >
                <label>{t("about")}</label>
                <textarea className='textarea' placeholder={`${t("tellYou")}`} onChange={(e) => setAbout(e.target.value)} value={about}></textarea>
            </fieldset>

            <AutoCompliteTags placeholder={''} type='text' label={`${t("skills")}`} size="fieldset-md" items={allSkills} onSelect={onSkillsChange} selected={skills.split(',').map(item => ({name: item}))}/>

            <h3>{t("education")}</h3>
            <AddEducation t={t} onChange={(eds) => setEducation(eds)} education={education}/>

            <h3>{t("languages")}</h3>
            <AddLang onChange={(lns) => setForeignLanguages(lns)} foreignLanguages={foreignLanguages ? foreignLanguages : []}/>

            <h3>{t("otherInf")}</h3>
            <SelectEmploymentTypes label={`${t("employmentTypes")}`} allEmploymentTypes={allEmploymentTypes} size="fieldset-md" onChange={(tps) => setSelectedEmpTypes(tps)} employmentTypes={employmentTypes}/>

            <button type='button' className="button button-primary" onClick={handleSave}>{t('save')}</button>
        </div>
    </main>
    <Footer/>
</div>


    )
}
