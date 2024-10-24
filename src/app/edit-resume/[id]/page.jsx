'use client'
import Header from '@/components/header';
import Input from '@/components/input';
import { END_POINT } from '@/config/end-point';
import axios from 'axios';
import AutoCompliteSelect from '@/components/AutoCompliteSelect';
import SelectDate from '@/components/SelectDate';
import ModalAddExp from '@/components/ModalAddExp';
import WorkingHistory from '@/components/workingHistory';
import AutoCompliteTags from '@/components/AutoCompliteTags';
import AddEducation from '@/components/AddEducation';
import AddLang from '@/components/AddLang';
import SelectEmploymentTypes from '@/components/SelectEmploymentTypes';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { editResume, getMyResumeById } from '@/app/store/slices/resumeSlice';
import Footer from '@/components/footer';
import Search from '@/components/header/search';


export default function EditResume() {
    const router = useRouter()
    const dispatch = useDispatch()
    const {id} = useParams();
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

let eds = education.map(ed =>{
    const end = new Date(ed.end_date)
    return{
        ...ed,
        end_date: end.getFullYear()
    }})
return (
    <div className='wapper'>

    <Header/>
    <main>
        <div className='container p7'>
            <Search/>
            <h1>Ваше резюме</h1>

            <h3>Контактные данные</h3>
            <Input placeholder={'Введите имя'} type='text' label="Имя" size="fieldset-md" onChange={(e) => setName(e.target.value)} value={first_name}/>
            <Input placeholder={'Введите фамилию'} type='text' label="Фамилия" size="fieldset-md" onChange={(e) => setSurname(e.target.value)} value={last_name}/>
            <Input placeholder={'+7'} type='text' label="Мобильный телефон" size="fieldset-md" onChange={(e) => setPhone(e.target.value)} value={phone}/>
            <AutoCompliteSelect placeholder="" type="text" label="Город проживания" size="fieldset-md" items={cities} onSelect={(data) => setCity(data.id)} selected={cityId}/>


            <h3>Основная информация</h3>
            <SelectDate size="fieldset-sm" label="Дата рождения" onChange={(date) => setBirthday(date)} value={resume.birthday}/>  
            <fieldset className={"fieldset fieldset-sm"} >
                <label>Пол</label>
                <div className='radio-group'>
                    <div className="radio">
                        {resume.gender && resume.gender === "Мужской" && <input  type="radio" onChange={handleGenderChange} name="gender" id="g1" value={"Мужской"} checked/>}
                        {!resume.gender || resume.gender !== "Мужской" && <input  type="radio" onChange={handleGenderChange} name="gender" id="g1" value={"Мужской"}/>}
                        <label htmlFor="g1">Мужской</label>
                    </div>
                    <div className="radio">
                        {resume.gender && resume.gender === "Женский" && <input  type="radio" onChange={handleGenderChange} name="gender" id="g2" value={"Женский"} checked/>}
                        {!resume.gender || resume.gender !== "Женский" && <input  type="radio" onChange={handleGenderChange} name="gender" id="g2" value={"Женский"}/>}
                        <label htmlFor="g2">Женский</label>
                    </div>
                </div>
            </fieldset>

            <AutoCompliteSelect placeholder="" type="text" label="Гражданство" size="fieldset-md" items={countries} onSelect={(data) => setCitizenship(data.id)} selected={citizenship}/>

            <h3>Специальность</h3>
            <Input placeholder="" type='text' label="Желаемая должность" size="fieldset-lg" onChange={(e) => setPosition(e.target.value)}  value={position}/>

            <fieldset className={"fieldset fieldset-lg"} >
                <label>Зарплата</label>
                <div className='salary'>
                    <input type="number" className='input' onChange={e => setSalary(e.target.value*1)} value={salary}/>
                    <select name="" id="" className='input' onChange={e => setSalaryType(e.target.value)} value={salary_type}>
                        <option value={"KZT"}>KZT</option>
                        <option value={"USD"}>USD</option>
                        <option value={"RUB"}>RUB</option>
                    </select>
                    на руки
                </div>
            </fieldset>
            <h3>Опыт работы</h3>
            {modalExpIsOpen && <ModalAddExp close={closeModalExp} addWorkingHistory={addWorkingHistory}/>}
            <fieldset className={"fieldset fieldset-lg"} >
                <label>Места работы</label>
                <div className='exp'>
                    {workingHistories.map((item, index) => (<WorkingHistory workingHistory={item} remove={removeWorkingHistory} key={index}/>))}
                    <button className='button button-primary-bordered' onClick={() => setModalExpIsOpen(true)}>Добавить место работы</button>
                </div>
            </fieldset>
            
            <fieldset className={"fieldset fieldset-lg"} >
                <label>О себе</label>
                <textarea className='textarea' placeholder="Расскажите о себе" onChange={(e) => setAbout(e.target.value)} value={about}></textarea>
            </fieldset>

            <AutoCompliteTags placeholder={''} type='text' label="Ключевые навыки" size="fieldset-md" items={allSkills} onSelect={onSkillsChange} selected={skills.split(',').map(item => ({name: item}))}/>

            <h3>Образование</h3>
            <AddEducation onChange={(eds) => setEducation(eds)} education={eds ? eds : []}/>

            <h3>Владение языками</h3>
            <AddLang onChange={(lns) => setForeignLanguages(lns)} foreignLanguages={foreignLanguages ? foreignLanguages : []}/>

            <h3>Другая важная информация</h3>
            <SelectEmploymentTypes label="Занятость" allEmploymentTypes={allEmploymentTypes} size="fieldset-md" onChange={(tps) => setSelectedEmpTypes(tps)} employmentTypes={employmentTypes}/>

            <button type='button' className="button button-primary" onClick={handleSave}>Сохранить и опубликовать</button>
        </div>
    </main>
    <Footer/>
    </div>

    )
}
