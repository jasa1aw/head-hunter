"use client";
import Header from '@/components/header';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedVacancies, getSpecializations, getCities, getExperiences, getSkills, getEmpTypes, getCountries } from '@/app/[locale]/store/slices/vacancySlice';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import AutoCompliteSelect from '@/components/AutoCompliteSelect';
import Footer from '@/components/footer';
import Search from '@/components/header/search';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import AutoCompliteTags from '@/components/AutoCompliteTags';
import { FormControlLabel, Slider, Switch } from '@mui/material';
import MyResumes from '@/components/myresumes';
import SelectEmploymentTypes from '@/components/SelectEmploymentTypes';
import { dataTypes, experienceOptions } from '@/app/mocks/dataTypes';
import { getSearchedResumes } from '../store/slices/resumeSlice';

export default function SearchVacancy() {
    const t = useTranslations('SearchVacancy');
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useSearchParams();

    const [searchCriteria, setSearchCriteria] = useState({
        id: Number(params.get('id')) || undefined,
        position: params.get('position') || '',
        dateRange: params.get('dateRange') || undefined,
        salary: Number(params.get('salary')) || undefined,
        salary_from: Number(params.get('salary_from')) || 0,
        salary_to: Number(params.get('salary_to')) || 1000,
        skills: params.get('skills'),
        cityId: Number(params.get('cityId')) || undefined,
        citizenship: Number(params.get('citizenship')) || undefined,
        employmentType: params.get('employmentType') || [],
        experience: '',
        sortBy: {
            salary: params.get('sortBySalary') === '1',
            createdAt: params.get('sortByCreatedAt') === '1',
        }
    });

    const handleSearch = () => {
        const requestBody = {
            id: searchCriteria.id,
            salary: searchCriteria.salary,
            salary_from: searchCriteria.salary_from,
            salary_to: searchCriteria.salary_to,
            skills: searchCriteria.skills,
            cityId: searchCriteria.cityId,
            experience: searchCriteria.selectedExperience,
            dateRange: searchCriteria.dateRange,
            citizenship: searchCriteria.citizenship,
            created_at: searchCriteria.created_at,
            employmentType: searchCriteria.employmentType,
            sortBySalary: searchCriteria.sortBy.salary ? '0' : null,
            sortByCreatedAt: searchCriteria.sortBy.createdAt ? '0' : null,
        };

        const filteredRequestBody = Object.fromEntries(
            Object.entries(requestBody).filter(([_, value]) => value !== null && value !== undefined)
        );
    
        dispatch(getSearchedResumes(filteredRequestBody, router));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleExperienceChange = (event) => {
        const { value } = event.target;
        setSearchCriteria(prev => ({
            ...prev,
            selectedExperience: value  
        }));
    };

    const onSkillsChange = (data) => {
        const arr = data.map(item => item.name);

        setSearchCriteria(prev => ({
            ...prev,
            skills: arr.join(',')
        }));
    };
    
    const resumes = useSelector(state => state.resume.resumes)
    const cities = useSelector((state) => state.vacancy.cities);
    const countries = useSelector((state) => state.vacancy.countries);
    const allSkills = useSelector((state) => state.vacancy.skills);
    const allEmploymentTypes = useSelector((state) => state.vacancy.empTypes);

    useEffect(() =>{
        dispatch(getSpecializations());
        dispatch(getCities());
        dispatch(getCountries())
        dispatch(getExperiences());
        dispatch(getSkills());
        dispatch(getEmpTypes())
    }, [])


    
    return (
        <div className='wrapper'>
            <Header />
            <main>
                <div className="container mt7">
                    <Search />
                    <div className='flex'>
                        <fieldset className="fieldset-vertical pt7 flex" style={{ width: '100%' }}>
                            <input
                                className="input"
                                placeholder={t('titlePlaceholder')}
                                type="text"
                                name="position"
                                value={searchCriteria.position}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <button className='button button-primary' onClick={handleSearch}>{t('findButton')}</button>
                    </div>
                    <div className='flex'>
                        <div style={{ width: '30%' }}>
                            <fieldset className="fieldset-vertical">
                                <label>{t('citizenship')}</label>
                                <AutoCompliteSelect
                                    type="text"
                                    size="fieldset-md fieldset-vertical"
                                    items={countries}
                                    selected={searchCriteria.citizenship}
                                    onSelect={(data) => setSearchCriteria(prev => ({ ...prev, citizenship: data?.id ? data.id : null }))}
                                />
                            </fieldset>
                            
                            <fieldset className="fieldset-vertical">
                                <label>{t('cityLabel')}</label>
                                <AutoCompliteSelect
                                    placeholder=""
                                    type="text"
                                    size="fieldset-md fieldset-vertical"
                                    items={cities}
                                    selected={searchCriteria.cityId}
                                    onSelect={(data) => setSearchCriteria(prev => ({ ...prev, cityId: data?.id ? data.id : null }))}
                                />
                            </fieldset>

                            <AutoCompliteTags
                                placeholder={''}
                                type='text'
                                label={`${t("skills")}`}
                                size="fieldset fieldset-sm"
                                items={allSkills}
                                onSelect={onSkillsChange}
                                selected={searchCriteria.skills.split(',').map(item => ({name: item}))}
                            />
                            
                            <fieldset className="fieldset-vertical fieldset-md">
                                <legend>{t('sort.sortLabel')}</legend>
                                {Object.entries(searchCriteria.sortBy).map(([key, value]) => (
                                    <FormControlLabel
                                        key={key}
                                        control={<Switch checked={value} color="info" onChange={(e) => setSearchCriteria(prev => ({
                                            ...prev,
                                            sortBy: { ...prev.sortBy, [key]: e.target.checked }
                                        }))} />}
                                        label={t(`sort.sortBy${key.charAt(0).toUpperCase() + key.slice(1)}`)}
                                    />
                                ))}
                            </fieldset>

                            <fieldset className="fieldset-vertical fieldset-md">
                                <label>{t('timeGet')}</label>
                                <div>
                                    {dataTypes(t).map(dtp => (
                                        <div className="radio" key={dtp.id}>
                                            <input
                                                type="radio"
                                                value={dtp.id}
                                                checked={dtp.range.gte == searchCriteria.dateRange}
                                                name="dateRange"
                                                onChange={(e) => setSearchCriteria(prev => ({ ...prev, dateRange: dtp.range.gte }))}
                                            />
                                            <label>{dtp.value}</label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset className="fieldset-vertical">
                                <label>{t('experienceArray.title')}</label>
                                {experienceOptions(t).map(({ id, label, value }) => (
                                    <div key={id} className="radio">
                                            <input
                                                type="radio"
                                                name="experience"
                                                value={value}
                                                checked={searchCriteria.selectedExperience === value}
                                                onChange={handleExperienceChange}
                                            />
                                            <label>{label}</label>
                                    </div>
                                ))}
                            </fieldset>

                            <fieldset className="fieldset fieldset-sm flex-cl">
                                <div>
                                    <label>{t('salaryLabel')}</label>
                                    <Slider
                                        value={[searchCriteria.salary_from, searchCriteria.salary_to]}
                                        onChange={(event, newValue) => setSearchCriteria(prev => ({ ...prev, salary_from: newValue[0], salary_to: newValue[1] }))}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={1000000}
                                        size="small"
                                    />
                                </div>
                                <div>
                                    <div className="salary-labels">
                                        <span>{t('from')}: {searchCriteria.salary_from}</span>
                                        <span>{t('to')}: {searchCriteria.salary_to}</span>
                                    </div>
                                    <select
                                        className="input small-select"
                                        name="salaryType"
                                        value={searchCriteria.salaryType}
                                        onChange={handleChange}
                                    >
                                        <option value={"KZT"}>KZT</option>
                                        <option value={"USD"}>USD</option>
                                        <option value={"RUB"}>RUB</option>
                                    </select>
                                </div>
                            </fieldset>

                            <SelectEmploymentTypes label={`${t("employmentTypes")}`} allEmploymentTypes={allEmploymentTypes} size="fieldset-md" onChange={(tps) => setSearchCriteria(prev => ({...prev, employmentType:tps }))} employmentTypes={[]}/>

                            <button className="button button-primary" onClick={handleSearch}>{t('search')}</button>
                        </div>

                        <div style={{ width: '80%', paddingLeft: '40px' }}>
                            <MyResumes resumes={resumes}/>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
