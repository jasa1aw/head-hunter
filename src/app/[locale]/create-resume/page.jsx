'use client';

import AddEducation from '@/components/AddEducation'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import AutoCompliteTags from '@/components/AutoCompliteTags'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Input from '@/components/input'
import ModalAddExp from '@/components/ModalAddExp'
import SelectDate from '@/components/SelectDate'
import SelectEmploymentTypes from '@/components/SelectEmploymentTypes'
import SelectSpec from '@/components/Spec/SelectSpec'
import Stepper from '@/components/Stepper'
import WorkingHistory from '@/components/WorkingHistory'
import { END_POINT } from '@/config/end-point'

import { getSpecializations } from '@/app/[locale]/store/slices/vacancySlice'
import { useRouter } from '@/i18n/routing'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function CreateResume() {
  const router = useRouter();
  const t = useTranslations('CreateResume');
  const dispatch = useDispatch();

  // Form data states
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allEmploymentTypes, setEmploymentTypes] = useState([]);
  const [workingHistories, setWorkingHistories] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [modalExpIsOpen, setModalExpIsOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Form fields
  const [specializationId, setSpecializationId] = useState(null);
  const [specializationName, setSpecializationName] = useState('');
  const [first_name, setName] = useState('');
  const [last_name, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [cityId, setCityId] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState('');
  const [citizenship, setCitizenship] = useState(null);
  const [employmentTypes, setSelectedEmpTypes] = useState([]);


  // Data fetching
  const fetchData = useCallback(async () => {
    try {
      const [skillsRes, citiesRes, countriesRes, employmentTypesRes] = await Promise.all([
        axios.get(`${END_POINT}/api/skills`),
        axios.get(`${END_POINT}/api/region/cities`),
        axios.get(`${END_POINT}/api/region/countries`),
        axios.get(`${END_POINT}/api/employment-types`)
      ]);

      setAllSkills(skillsRes.data);
      setCities(citiesRes.data);
      setCountries(countriesRes.data);
      setEmploymentTypes(employmentTypesRes.data);
      dispatch(getSpecializations());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handlers
  const handleGenderChange = (e) => setGender(e.target.value);
  const onSkillsChange = (data) =>{
    const arr = data.map(item => item.name);
    setSkills(arr.join(','))
  }
  const closeModalExp = () =>{
    setModalExpIsOpen(false)
  }
  const handleSpecializationChange = (spec) => {
    setSpecializationId(spec.specializationId);
    setSpecializationName(spec.specializationName);
  };
  const removeWorkingHistory = (workingHistory) =>{
    let wh = [...workingHistories];
    let index = workingHistories.indexOf(workingHistory);
    wh.splice(index, 1);
    setWorkingHistories(wh);
  }

  const handleSave = () => {
    console.log({
      specializationId,
      first_name,
      last_name,
      phone,
      birthday,
      gender,
      // about,
      main_language:"Казахский",
      skills,
      cityId,
      citizenship,
      workingHistories,
      education,
      employmentTypes
    })
    // dispatch(createResume({
    //   first_name,
    //   last_name,
    //   phone,
    //   birthday,
    //   gender,
    //   about,
    //   position,
    //   salary,
    //   salary_type,
    //   main_language:"Казахский",
    //   skills,
    //   cityId,
    //   citizenship,
    //   workingHistories,
    //   education,
    //   foreignLanguages,
    //   employmentTypes
    // }, router))
  }
  const steps = [
    "Выберите или укажите профессию",
    "Информация",
    "Образование",
    "Навыки",
    "Опыт работы",
    "Дополнительная информация",
  ];
  
  const handleNext = () => setStep(step < steps.length ? step + 1 : step);
  const handleBack = () => setStep(step > 1 ? step - 1 : step);
  const addWorkingHistory = (history) => setWorkingHistories([...workingHistories, history]);

  
  return (
    <div className='wrapper'>
      <Header/>
      <main>
          <div className='container p7'>
            <div className="resumeTop">
              {step === 0 && 
                <>
                  <h1>Давай создадим резюме</h1>
                </>
              }
              {step === 1 && 
                <>
                  <h1>Выберите или укажите профессию</h1>
                  <SelectSpec onChange={handleSpecializationChange} value={specializationId * 1} />
                </>
              }
              {step === 2 && 
                <>
                  <h3>{t('information')}</h3>
                  <h4 style={{ color: '#0070ff' }}>Резюме: {specializationName}</h4>
                  <Input placeholder={`${t("name")}`} type='text' label={`${t("placeholderName")}`} size="fieldset-md" onChange={(e) => setName(e.target.value)} value={first_name}/>
                  <Input placeholder={`${t("lastName")}`} type='text' label={`${t("placeholderLastName")}`} size="fieldset-md" onChange={(e) => setSurname(e.target.value)} value={last_name}/>
                  <Input placeholder={`${t('placeholderPhone')}`} type='text' label={`${t("phone")}`} size="fieldset-md" onChange={(e) => setPhone(e.target.value)} value={phone}/>
                  <AutoCompliteSelect placeholder={`${t('placeholderCity')}`} type="text" label={`${t("city")}`} size="fieldset-md" items={cities} onSelect={(data) => setCityId(data.id)}/>
                  <SelectDate t={t} size="fieldset-sm" label={`${t("birthdate")}`} onChange={(date) => setBirthday(date)}/>  
                  <fieldset className={"fieldset fieldset-sm"} >
                    <label>{t("gender")}</label>
                    <div className='radio-group'>
                      <div className="radio">
                        <input  type="radio" onChange={handleGenderChange} name="gender" id="g1" value={'Мужской'}/>
                        <label for="g1">{t("male")}</label>
                      </div>
                      <div className="radio">
                        <input  type="radio" onChange={handleGenderChange} name="gender" id="g2" value={'Женский'}/>
                        <label for="g2">{t("female")}</label>
                      </div>
                    </div>
                  </fieldset>

                  <AutoCompliteSelect placeholder="" type="text" label={`${t("citizenship")}`} size="fieldset-md" items={countries} onSelect={(data) => setCitizenship(data.id)}/>
                </>
              }
              {step === 3 && 
                <>
                  <h3>{t("education")}</h3>
                  <h4 style={{ color: '#0070ff' }}>Резюме: {specializationName}</h4>
                  <AddEducation t={t} onChange={(eds) => setEducation(eds)} education={education}/>
                </>
              }
              {step === 4 && 
                <>
                  <h3>Какими навыками обладаете?</h3>
                  <h4 style={{ color: '#0070ff' }}>Резюме: {specializationName}</h4>
                  <AutoCompliteTags placeholder={''} type='text' label={`${t("skills")}`} size="fieldset-md" items={allSkills} onSelect={onSkillsChange} selected={skills.length > 0 ? skills.split(",").map(item=> ({name: item})) : []}/>
                </>
              }
              {step === 5 && (
                  <>
                    <h3>Расскажите об опыте работы</h3>
                    <h4 style={{ color: '#0070ff' }}>Резюме: {specializationName}</h4>
                    {modalExpIsOpen && (
                      <ModalAddExp close={closeModalExp} addWorkingHistory={addWorkingHistory} t={t}/>
                    )}
                    <fieldset className={"fieldset fieldset-lg"} >
                      <legend>{t("place")}</legend>
                      {workingHistories.map((history, i) => (
                        <WorkingHistory key={i} workingHistory={history} remove={removeWorkingHistory} t={t}/>
                      ))}
                      <button className='button button-primary-bordered' onClick={() => setModalExpIsOpen(true)}>{t('addPlace')}</button>
                    </fieldset>
                  </>
                )}
              {step === 6 && 
                <>
                  <h3>{t("otherInf")}</h3>
                  <h4 style={{ color: '#0070ff' }}>Резюме: {specializationName}</h4>
                  <SelectEmploymentTypes label={`${t("employmentTypes")}`} allEmploymentTypes={allEmploymentTypes} size="fieldset-md" onChange={(tps) => setSelectedEmpTypes(tps)} employmentTypes={[]}/>
                </>           
              }
            </div>
            
          </div>
          <div className="resumeBottom">
            <Stepper activeStep={step} handleNext={handleNext} handleBack={handleBack} steps={steps} handleSave={handleSave}/>
          </div>
          <Footer />
      </main>
    </div>
  )
}
