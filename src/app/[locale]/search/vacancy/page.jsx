"use client";
import Header from '@/components/header';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedVacancies, getSpecializations, getCities, getExperiences, getSkills, getEmpTypes } from '@/app/[locale]/store/slices/vacancySlice';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import AutoCompliteSelect from '@/components/AutoCompliteSelect'
import MyVacancies from '@/components/myVacancies';
import Footer from '@/components/footer';
import Search from '@/components/header/search';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import AutoCompliteTags from '@/components/AutoCompliteTags';
import { FormControlLabel, Slider, Switch } from '@mui/material';
import { dataTypes } from '@/app/mocks/dataTypes';
import SelectSpec from '@/components/Spec/SelectSpec';

export default function SearchVacancy() {
    const t = useTranslations('SearchVacancy');
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useSearchParams()
    console.log(params)
    const [searchCriteria, setSearchCriteria] = useState({
        name: params.get('name'),
        specializationId: Number(params.get('specializationId')) || undefined,
        specializationName: '',
        dateRange: params.get('dateRange') || undefined,
        skills: params.get('skills') || '',
        cityId: Number(params.get('cityId')) || undefined,
        salaryType: params.get('salary_type') || 'KZT',
        salaryRange: [
            Number(params.get('salary_from')) || 0,
            Number(params.get('salary_to')) || 1000,
        ],
        experienceId: Number(params.get('experienceId')) || undefined,
        employmentTypeId: Number(params.get('employmentTypeId')) || undefined,
        sortBy: {
            name: params.get('sortByName') === '1',
            salaryFrom: params.get('sortBySalaryFrom') === '1',
            createdAt: params.get('sortByCreatedAt') === '1',
        }
    });

    const handleOnSpecChange = (e) => {
        setSearchCriteria(prev => ({
            ...prev,
            specializationId: Number(e.target.value),
            specializationName: e.target.dataset.name
        }));
    };

    const handleSearch = () => {
        const requestBody = {
            name: searchCriteria.name,
            salary_from: Number(searchCriteria.salaryRange[0]),
            salary_to: Number(searchCriteria.salaryRange[1]),
            salary_type: searchCriteria.salaryType,
            skills: searchCriteria.skills,
            cityId: searchCriteria.cityId ? Number(searchCriteria.cityId) : null,
            specializationId: searchCriteria.specializationId ? Number(searchCriteria.specializationId) : null,
            employmentTypeId: searchCriteria.employmentTypeId ? Number(searchCriteria.employmentTypeId) : null,
            experienceId: searchCriteria.experienceId ? Number(searchCriteria.experienceId) : null,
            dateRange: searchCriteria.dateRange,
            sortByName: searchCriteria.sortBy.name ? '0' : '1',
            sortBySalaryFrom: searchCriteria.sortBy.salaryFrom ? '0' : '1',
            sortByCreatedAt: searchCriteria.sortBy.createdAt ? '0' : '1',
        };

        const filteredRequestBody = Object.fromEntries(
            Object.entries(requestBody).filter(([_, value]) => value !== null && value !== undefined)
        );
    
        dispatch(getSearchedVacancies(filteredRequestBody, router));
    };

    useEffect(() => {
        dispatch(getSpecializations());
        dispatch(getCities());
        dispatch(getExperiences());
        dispatch(getSkills());
        dispatch(getEmpTypes());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSkillsChange = (data) => {
        const arr = data.map(item => item.name);

        setSearchCriteria(prev => ({
            ...prev,
            skills: arr.join(',')
        }));
    };

    const cities = useSelector(state => state.vacancy.cities);
    const experiences = useSelector(state => state.vacancy.experiences);
    const empTypes = useSelector(state => state.vacancy.empTypes);
    const allSkills = useSelector(state => state.vacancy.skills);

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
                                name="name"
                                value={searchCriteria.name}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <button className='button button-primary' onClick={handleSearch}>{t('findButton')}</button>
                    </div>
                    <div className='flex'>
                        <div style={{ width: '30%' }}>
                            <fieldset className="fieldset-vertical">
                                <label>{t('specLabel')}</label>
                                {searchCriteria.specializationName && <p>{searchCriteria.specializationName}</p>}
                                <p className="link" onClick={() => setSpecModalOpen(true)}>{t('specSelectLink')}</p>
                            </fieldset>
                            <SelectSpec onChange={handleOnSpecChange} value={searchCriteria.specializationId} />

                            <AutoCompliteTags
                                placeholder={''}
                                type='text'
                                label={`${t("skills")}`}
                                size="fieldset fieldset-sm"
                                items={allSkills}
                                onSelect={onSkillsChange}
                                selected={searchCriteria.skills.split(',').map(item => ({name: item}))}
                            />

                            <AutoCompliteSelect
                                placeholder=""
                                type="text"
                                label={t('cityLabel')}
                                size="fieldset-md fieldset-vertical"
                                items={cities}
                                selected={searchCriteria.cityId}
                                onSelect={(data) => setSearchCriteria(prev => ({ ...prev, cityId: data?.id ? data.id : null }))}
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
                            <fieldset className="fieldset fieldset-sm flex-cl">
                                <div>
                                    <label>{t('salaryLabel')}</label>
                                    <Slider
                                        value={searchCriteria.salaryRange}
                                        onChange={(event, newValue) => setSearchCriteria(prev => ({ ...prev, salaryRange: newValue }))}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={1000000}
                                        size="small"
                                    />
                                </div>
                                <div>
                                    <div className="salary-labels">
                                        <span>{t('from')}: {searchCriteria.salaryRange[0]}</span>
                                        <span>{t('to')}: {searchCriteria.salaryRange[1]}</span>
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

                            <fieldset className="fieldset-vertical fieldset-md">
                                <label>{t('experienceLabel')}</label>
                                <div>
                                    {experiences.map(exp => (
                                        <div className="radio" key={exp.id}>
                                            <input type="radio" value={exp.id} checked={exp.id == searchCriteria.experienceId} name="experienceId" onChange={handleChange} />
                                            <label>{exp.duration}</label>
                                        </div>
                                    ))}
                                </div>
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

                            <fieldset className="fieldset-vertical fieldset-md">
                                <label>{t('employmentTypeLabel')}</label>
                                <div>
                                    {empTypes.map(et => (
                                        <div className="radio" key={et.id}>
                                            <input type="radio" value={et.id} checked={et.id == searchCriteria.employmentTypeId} name="employmentTypeId" onChange={handleChange} />
                                            <label>{et.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                            <button className="button button-primary" onClick={handleSearch}>{t('search')}</button>

                        </div>

                        <div style={{ width: '80%', paddingLeft: '40px' }}>
                            <MyVacancies />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
