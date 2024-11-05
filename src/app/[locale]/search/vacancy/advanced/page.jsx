'use client';
import { useEffect, useState } from "react";
import Header from "@/components/header";
import { useDispatch, useSelector } from "react-redux";
import { getSpecializations, getCities, getExperiences, getSkills, getEmpTypes, getdateTypes, getSearchedVacancies } from "@/app/[locale]/store/slices/vacancySlice";
import ModalSelectSpec from '@/components/ModalSelectSpec';
import AutoCompliteSelect from '@/components/AutoCompliteSelect';
import Footer from "@/components/footer";
import Search from "@/components/header/search";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from 'next-intl';
import { dataTypes } from "@/app/mocks/dataTypes";
import AutoCompliteTags from "@/components/AutoCompliteTags";
import { Slider } from "@mui/material";

export default function SearchVacancyAdvanced() {
    const t = useTranslations('SearchVacancyAdvanced');
    const [name, setName] = useState();
    const [specializationId, setSpecialization] = useState();
    const [specializationName, setSpecializationName] = useState();
    const [isSpecModalOpen, setSpecModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState(null)
    const [skills, setSelectedSkills] = useState('');
    const [cityId, setCity] = useState();
    const [salary_type, setSalaryType] = useState("KZT");
    const [salaryRange, setSalaryRange] = useState([0, 1000]);
    const [experienceId, setExperienceId] = useState();
    const [employmentTypeId, setEmploymentType] = useState();

    const router = useRouter();
    const dispatch = useDispatch();
    const closeSpecModal = () => {
        setSpecModalOpen(false);
    };

    useEffect(() => {
        dispatch(getSpecializations());
        dispatch(getCities());
        dispatch(getExperiences());
        dispatch(getSkills());
        dispatch(getEmpTypes());
    }, []);

    const handleOnSpecChange = (e) => {
        setSpecializationName(e.target.dataset.name);
        setSpecialization(e.target.value * 1);
        closeSpecModal();
    };

    const cities = useSelector(state => state.vacancy.cities);
    const experiences = useSelector(state => state.vacancy.experiences);
    const empTypes = useSelector(state => state.vacancy.empTypes);
    const allSkills = useSelector(state => state.vacancy.skills);

    const handleChangeExp = (e) => {
        setExperienceId(e.target.value);
    };

    const onSkillsChange = (data) =>{
        const arr = data.map(item => item.name)
        setSelectedSkills(arr.join(','))
    }
    
    const handleSalaryRangeChange = (event, newValue) => {
        setSalaryRange(newValue)
    }

    const handleSearch = () => {
        const requestBody = {
            name,
            salary_from: salaryRange[0],
            salary_to: salaryRange[1],
            salary_type,
            skills,
            cityId,
            specializationId,
            employmentTypeId,
            experienceId,
            dateRange,
            sortByName: 1,
            sortBySalaryFrom: 1,
            sortByCreatedAt: 1,
            sortByUpdatedAt: 1
        };
    
        dispatch(getSearchedVacancies(requestBody))
    };
    

    return (
        <div className="wrapper">
            <main>
                <Header />
                <div className="container p7">
                    <Search />
                    <h1>{t('searchVacancy')}</h1>

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

                    <AutoCompliteTags placeholder={''} type='text' label={`${t("skills")}`} size="fieldset-md" items={allSkills} onSelect={onSkillsChange} selected={skills.split(',').map(item => ({name: item}))}/>

                    <fieldset className="fieldset-vertical">
                        <label>{t('specialization')}</label>
                        {specializationName && <p>{specializationName}</p>}
                        <p className="link" onClick={() => setSpecModalOpen(true)}>{t('setSpecialization')}</p>
                    </fieldset>
                    {isSpecModalOpen && (
                        <ModalSelectSpec
                            close={closeSpecModal}
                            onChange={handleOnSpecChange}
                            value={specializationId * 1}
                        />
                    )}

                    <AutoCompliteSelect
                        placeholder=""
                        type="text"
                        label={t('city')}
                        size="fieldset-md fieldset-vertical mb1"
                        items={cities}
                        onSelect={(data) => setCity(data.id)}
                    />
                    <fieldset className="fieldset fieldset-sm flex-cl">
                        <div>
                            <label>{t('salary')}</label>
                            <Slider
                                value={salaryRange}
                                onChange={handleSalaryRangeChange}
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
                                value={salary_type}
                                onChange={(e) => setSalaryType(e.target.value)}
                                >
                                <option value={"KZT"}>KZT</option>
                                <option value={"USD"}>USD</option>
                                <option value={"RUB"}>RUB</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset className="fieldset-vertical fieldset-md">
                        <label>{t('experience')}</label>
                        <div>
                            {experiences.map(exp => (
                                <div className="radio" key={exp.id}>
                                    <input
                                        type="radio"
                                        value={exp.id}
                                        name="exp"
                                        onChange={handleChangeExp}
                                    />
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
                                        name="dtp"
                                        onChange={(e) => setDateRange(dtp.range.gte)}
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
                                        onChange={(e) => setEmploymentType(e.target.value)}
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
