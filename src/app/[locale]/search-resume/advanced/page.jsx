'use client';
import { useEffect, useState, useCallback } from "react";
import Header from "@/components/header";
import { useDispatch, useSelector } from "react-redux";
import {
    getSpecializations,
    getCities,
    getExperiences,
    getSkills,
    getEmpTypes,
    getSearchedVacancies
} from "@/app/[locale]/store/slices/vacancySlice";
import AutoCompliteSelect from '@/components/AutoCompliteSelect';
import Footer from "@/components/footer";
import Search from "@/components/header/search";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import AutoCompliteTags from "@/components/AutoCompliteTags";
import { FormControlLabel, Modal, Slider, Switch } from "@mui/material";
import { dataTypes, experienceOptions } from "@/app/mocks/dataTypes";
import SelectSpec from "@/components/Spec/SelectSpec";
import { getSearchedResumes } from "../../store/slices/resumeSlice";

export default function SearchVacancyAdvanced() {
    const t = useTranslations('SearchVacancyAdvanced');
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [name, setName] = useState(null);
    const [specializationId, setSpecialization] = useState(null);
    const [dateRange, setDateRange] = useState(null);
    const [skills, setSelectedSkills] = useState(null);
    const [cityId, setCity] = useState(null);
    const [salaryType, setSalaryType] = useState("KZT");
    const [salaryRange, setSalaryRange] = useState([0, 1000]);
    const [experienceId, setExperienceId] = useState(null);
    const [employmentTypeId, setEmploymentType] = useState(null);
    const [sortOptions, setSortOptions] = useState({
        sortBySalary: false,
        sortByCreatedAt: false,
    });

    const fetchData = useCallback(() => {
        dispatch(getSpecializations());
        dispatch(getCities());
        dispatch(getExperiences());
        dispatch(getSkills());
        dispatch(getEmpTypes());
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, []);

    const cities = useSelector(state => state.vacancy.cities);
    const empTypes = useSelector(state => state.vacancy.empTypes);
    const allSkills = useSelector(state => state.vacancy.skills);

    const onSkillsChange = (data) => {
        setSelectedSkills(data.map(item => item.name).join(','));
    };

    const handleSpecializationChange = (spec) => {
        setSpecialization(spec.specializationId);
        setSpecializationName(spec.specializationName);
    };
      
    const handleSearch = () => {
        const requestBody = {
            name,
            salary_from: salaryRange[0],
            salary_to: salaryRange[1],
            salary_type: salaryType,
            skills,
            cityId,
            specializationId,
            employmentTypeId,
            experience: experienceId,
            dateRange,
            sortBySalary: !sortOptions.bySalaryFrom ? null : '0',
            sortByCreatedAt: !sortOptions.byCreatedAt ? null : '0',
        };

        const filteredRequestBody = Object.fromEntries(
            Object.entries(requestBody).filter(([_, value]) => value !== null && value !== undefined)
        );

        dispatch(getSearchedResumes(filteredRequestBody, router));
    };

    return (
        <div className="wrapper">
            <main>
                <Header />
                <div className="container p7">
                    <Search />
                    <h1>{t('searchResume')}</h1>

                    <fieldset className="fieldset-vertical">
                        <label>{t('keywords')}</label>
                        <input
                            className="input"
                            placeholder={t('placeholderTitle')}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </fieldset>

                    <AutoCompliteTags
                        placeholder={''}
                        type='text'
                        label={`${t("skills")}`}
                        size="fieldset-md"
                        items={allSkills}
                        onSelect={onSkillsChange}
                    />

                    <fieldset className="fieldset-vertical">
                        <p className="link" onClick={() => setSpecModalOpen(true)}>{t('setSpecialization')}</p>
                    </fieldset>

                    <SelectSpec onChange={handleSpecializationChange} value={specializationId * 1} />


                    <AutoCompliteSelect
                        placeholder=""
                        type="text"
                        label={t('city')}
                        size="fieldset-md fieldset-vertical mb1"
                        items={cities}
                        onSelect={(data) => setCity(data.id)}
                    />

                    <div className="sort-icon">
                        <img src="/img/filter.png" alt="" />
                        <span>{t('sort.sortLabel')}</span>
                    </div>

                    {Object.entries(sortOptions).filter(([key]) => key !== 'open').map(([key, value]) => (
                        <FormControlLabel
                            key={key}
                            control={<Switch color="info" checked={value} onChange={() => setSortOptions(prev => ({ ...prev, [key]: !value }))} />}
                            label={t(`sort.${key.replace('by', 'sortBy')}`)} 
                        />
                    ))}

                    <fieldset className="fieldset fieldset-sm flex-cl">
                        <div>
                            <label>{t('salary')}</label>
                            <Slider
                                value={salaryRange}
                                onChange={(event, newValue) => setSalaryRange(newValue)}
                                valueLabelDisplay="auto"
                                min={0}
                                max={1000000}
                                size="small"
                            />
                        </div>
                        <div>
                            <div className="salary-labels">
                                <span>{t('from')}: {salaryRange[0]}</span>
                                <span>{t('to')}: {salaryRange[1]}</span>
                            </div>
                            <select
                                className="input small-select"
                                name="salary_type"
                                value={salaryType}
                                onChange={(e) => setSalaryType(e.target.value)}
                            >
                                <option value="KZT">KZT</option>
                                <option value="USD">USD</option>
                                <option value="RUB">RUB</option>
                            </select>
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
                                        checked={experienceId == value}
                                        onChange={(e) => setExperienceId(e.target.value)}
                                    />
                                    <label>{label}</label>
                            </div>
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
                                        name="dtp"
                                        onChange={() => setDateRange(dtp.range.gte)}
                                    />
                                    <label>{dtp.value}</label>
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className="fieldset-vertical fieldset-md">
                        <label>{t('employmentType')}</label>
                        <div>
                            {empTypes.map(et => (
                                <div className="radio" key={et.id}>
                                    <input
                                        type="radio"
                                        value={et.id}
                                        name="empType"
                                        onChange={() => setEmploymentType(et.id)}
                                    />
                                    <label>{et.name}</label>
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <button className="button button-primary" onClick={handleSearch}>{t('search')}</button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
