'use client';
import { Link, useRouter } from '@/i18n/routing';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { suggestion } from "@/app/mocks/suggestion";
import Suggestions from './suggestions';
import { getSearchedVacancies } from '@/app/[locale]/store/slices/vacancySlice';
import SuccessMessage from '@/app/[locale]/ui/succesMessage';

export default function Search( {disabled, size} ) {
    const dispatch = useDispatch()
    const router = useRouter()
    const t = useTranslations("")

    const isAuth = useSelector((state) => state.auth.isAuth)
    const searchState = useSelector((state) => state.resume.search);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [value, setValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [disableValue, setDisableValue] = useState(true);

    useEffect(() => {
        if (searchState || disabled) {
            setIsVisible(true);
            setIsAnimating(false);
        } else {
            setIsAnimating(true);
            setTimeout(() => setIsVisible(false), 1000); 
        }
    }, [searchState]);

    useEffect(() => {        
        if (value) {
            const filtered = suggestion.filter(job => 
                job.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredJobs(filtered)
        } else {
            setFilteredJobs([])
        }
    }, [value]);

    useEffect(() => {
        if (value && !disableValue) {
            setDisableValue(true);
        }
    }, [value]);

    const handleClick = async () => {
        if (isAuth) {
          dispatch(getSearchedVacancies({ name: value }, router));
        } else {
          setShowSuccessMessage(true);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setShowSuccessMessage(false);
          router.push('/login');
        }
      };

    return (
        <>
            {(isVisible || disabled) && (
                <div className={`search ${isAnimating ? 'hide' : ''} ${size}`}>
                    <div className="search-left">
                        <img src="/img/search.svg" alt="icon" />
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type="text"
                            placeholder={`${t('Header.placeholder')}`}
                        />
                        <span className="clear-icon" onClick={() => setValue("")}>&#10006;</span>
                        <Suggestions 
                            filteredJobs={filteredJobs} 
                            setValue={setValue} 
                            setDisableValue={setDisableValue} 
                            disableValue={disableValue} 
                        />
                    </div>
                    <div className="search-right">
                        <button onClick={handleClick} className="button searchBtn">
                            {size === 'large' ? t('Header.searchEmployee') : t('Header.search')}
                        </button>
                        {!disabled && <Link href={'/search/vacancy/advanced'}>
                            <img src="/img/filter.png" alt="" />
                        </Link>}
                    </div>
                </div>
            )}
            <SuccessMessage message={t('messages.authError')} showSuccessMessage={showSuccessMessage} className={'successMessage errorMessage'}/>
        </>
    );
}
